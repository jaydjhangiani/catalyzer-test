const API_BASE_URL = 'http://localhost:8080';

class ProfileService {
  constructor() {
    this.accessToken = localStorage.getItem('cognito_access_token');
  }

  // Update access token
  updateAccessToken(token) {
    this.accessToken = token;
  }

  // Get current access token
  getAccessToken() {
    return this.accessToken || localStorage.getItem('cognito_access_token');
  }

  // Get user profile
  async getProfile() {
    try {
      const accessToken = this.getAccessToken();
      console.log('ProfileService - Access token available:', !!accessToken);

      if (!accessToken) {
        throw new Error('No access token available');
      }

      console.log(
        'ProfileService - Making API call to:',
        `${API_BASE_URL}/api/v1/profile`
      );
      const response = await fetch(`${API_BASE_URL}/api/v1/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('ProfileService - Response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - please log in again');
        }
        throw new Error('Failed to get profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - please log in again');
        }
        const error = await response.json();
        throw new Error(error.detail || 'Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Delete user profile
  async deleteProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/profile`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - please log in again');
        }
        throw new Error('Failed to delete profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(oldPassword, newPassword) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/profile/change-password`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - please log in again');
        }
        const error = await response.json();
        throw new Error(error.detail || 'Failed to change password');
      }

      return await response.json();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  // Update access token
  updateAccessToken(token) {
    this.accessToken = token;
  }
}

// Create singleton instance
const profileService = new ProfileService();

export default profileService;
