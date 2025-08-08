import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import cognitoAuthService from '../services/cognitoAuth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const OAuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // This will now hold enriched user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = useCallback(async () => {
    try {
      // Use our custom Cognito service instead of Amplify
      const isAuthenticated = await cognitoAuthService.initializeAuthState();

      if (isAuthenticated) {
        const currentUser = cognitoAuthService.getCurrentUser();
        if (currentUser) {
          // Create display name from user info
          let userDisplayName = 'Guest';
          if (currentUser.email) {
            userDisplayName = currentUser.email.split('@')[0]; // Use email prefix
          } else if (currentUser.username) {
            userDisplayName = currentUser.username;
          }

          setUser({
            ...currentUser,
            displayName: userDisplayName,
          });
        }
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // User is not authenticated
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Email/Password Sign Up - Not used with custom Cognito flow
  const handleSignUp = useCallback(
    async (email, password, firstName, lastName) => {
      // This function is not used with the custom Cognito OAuth flow
      // Users sign up through the Cognito hosted UI
      return { success: false, error: 'Sign up through Cognito hosted UI' };
    },
    []
  );

  // Email/Password Sign In - Not used with custom Cognito flow
  const handleSignIn = useCallback(async (email, password) => {
    // This function is not used with the custom Cognito OAuth flow
    // Users sign in through the Cognito hosted UI
    return { success: false, error: 'Sign in through Cognito hosted UI' };
  }, []);

  // Confirm Sign Up - Not used with custom Cognito flow
  const handleConfirmSignUp = useCallback(async (email, confirmationCode) => {
    // This function is not used with the custom Cognito OAuth flow
    return { success: false, error: 'Confirmation through Cognito hosted UI' };
  }, []);

  // Resend Confirmation Code - Not used with custom Cognito flow
  const handleResendConfirmationCode = useCallback(async (email) => {
    // This function is not used with the custom Cognito OAuth flow
    return { success: false, error: 'Resend through Cognito hosted UI' };
  }, []);

  // OAuth Social Login - Not used with custom Cognito flow
  const handleOAuthLogin = useCallback(async (provider) => {
    // This function is not used with the custom Cognito OAuth flow
    return { success: false, error: 'OAuth through Cognito hosted UI' };
  }, []);

  // Refresh auth state after successful authentication
  const refreshAuthState = useCallback(async () => {
    await checkAuthState();
  }, [checkAuthState]);

  // Sign Out
  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await cognitoAuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message || 'Sign out failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    isLoading,
    error,
    user, // user object now includes displayName
    isAuthenticated,
    handleSignUp,
    handleSignIn,
    handleConfirmSignUp,
    handleResendConfirmationCode,
    handleOAuthLogin,
    handleSignOut,
    checkAuthState,
    refreshAuthState,
    logout: handleSignOut, // Alias for convenience
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default OAuthProvider;
