// AWS Cognito OAuth Service with PKCE
const API_BASE_URL = 'http://localhost:8080';

class CognitoAuthService {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.idToken = null;
    this.user = null;
  }

  // Generate secure state parameter
  generateSecureState() {
    // Generate a cryptographically secure random state
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Initialize PKCE flow and get login URL
  async initPKCEFlow() {
    try {
      // Generate state parameter in frontend for better security
      const state = this.generateSecureState();

      // Send state to backend to store code_verifier
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/pkce-init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: state,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.detail?.error || 'Failed to initialize OAuth flow'
        );
      }

      const data = await response.json();

      // Store state parameter in session storage
      sessionStorage.setItem('pkce_state', state);

      return {
        loginUrl: data.login_url,
        state: state, // Use frontend-generated state
        codeChallenge: data.code_challenge,
      };
    } catch (error) {
      console.error('Error initializing PKCE flow:', error);
      throw error;
    }
  }

  // Start OAuth flow by redirecting to Cognito
  async startOAuthFlow() {
    try {
      // Initialize PKCE flow
      const { loginUrl, state, codeChallenge } = await this.initPKCEFlow();

      // Store state in session storage for verification
      sessionStorage.setItem('pkce_state', state);

      console.log('DEBUG: Starting OAuth flow with URL:', loginUrl);
      console.log('DEBUG: State to be stored:', state);
      console.log(
        'DEBUG: State stored in sessionStorage:',
        sessionStorage.getItem('pkce_state')
      );

      // Redirect to Cognito hosted UI
      window.location.href = loginUrl;
    } catch (error) {
      console.error('Error starting OAuth flow:', error);
      throw error;
    }
  }

  // Handle the callback from Cognito - Now handled by backend redirect
  async handleCallback(code, state) {
    // This method is no longer needed as the backend handles the callback directly
    // The backend will redirect to /auth/success with tokens
    console.log(
      'DEBUG: handleCallback called but should not be used in new flow'
    );
    throw new Error('This method should not be called in the new OAuth flow');
  }

  // Get user information
  async getUserInfo() {
    try {
      if (!this.accessToken) {
        this.accessToken = localStorage.getItem('cognito_access_token');
        if (!this.accessToken) {
          throw new Error('No access token available');
        }
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/auth/userinfo`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, try to refresh
          await this.refreshAccessToken();
          return this.getUserInfo(); // Retry with new token
        }
        throw new Error('Failed to get user info');
      }

      const userInfo = await response.json();
      this.user = userInfo;
      return userInfo;
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    try {
      const refreshToken =
        this.refreshToken || localStorage.getItem('cognito_refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const tokens = await response.json();

      // Update tokens
      this.accessToken = tokens.access_token;
      this.idToken = tokens.id_token;

      // Update localStorage
      localStorage.setItem('cognito_access_token', tokens.access_token);
      if (tokens.id_token) {
        localStorage.setItem('cognito_id_token', tokens.id_token);
      }

      return tokens;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Clear all tokens on refresh failure
      this.logout();
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!(this.accessToken || localStorage.getItem('cognito_access_token'));
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Logout
  async logout() {
    try {
      if (this.accessToken) {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        // If backend returns a logout URL, redirect to Cognito logout
        if (result.logout_url) {
          console.log(
            'DEBUG: Redirecting to Cognito logout URL:',
            result.logout_url
          );
          window.location.href = result.logout_url;
          return; // Exit early, don't clear tokens yet as Cognito will handle it
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear all tokens and user data
      this.accessToken = null;
      this.refreshToken = null;
      this.idToken = null;
      this.user = null;

      // Force clear all localStorage items
      localStorage.clear(); // Clear everything to be sure

      sessionStorage.removeItem('pkce_state');
    }
  }

  // Get access token for API calls
  getAccessToken() {
    return this.accessToken || localStorage.getItem('cognito_access_token');
  }

  // Initialize auth state from localStorage
  async initializeAuthState() {
    try {
      const accessToken = localStorage.getItem('cognito_access_token');
      if (accessToken) {
        this.accessToken = accessToken;
        this.refreshToken = localStorage.getItem('cognito_refresh_token');
        this.idToken = localStorage.getItem('cognito_id_token');

        // Verify token is still valid by getting user info
        await this.getUserInfo();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error initializing auth  state:', error);
      this.logout();
      return false;
    }
  }
}

// Create singleton instance
const cognitoAuthService = new CognitoAuthService();

export default cognitoAuthService;
