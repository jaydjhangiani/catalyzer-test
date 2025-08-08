# AWS Cognito Authentication Setup Guide

This guide will help you set up AWS Cognito authentication for your Catalyzer application.

## Prerequisites

- AWS Account
- AWS CLI configured (optional but recommended)
- Basic knowledge of AWS Cognito

## Step 1: Create User Pool

1. Go to AWS Cognito in your AWS Console
2. Click "Create User Pool"
3. Configure the following settings:

### Authentication providers
- **Cognito user pool sign-in options**: Email
- **User name requirements**: Allow users to sign in with preferred user name & email

### Security requirements
- **Password policy**: Choose your preferred settings
- **Multi-factor authentication**: Optional (recommended for production)
- **User account recovery**: Email only

### Sign-up experience
- **Self-service sign-up**: Enable
- **Cognito-assisted verification & confirmation**: Email
- **Required attributes**: 
  - Email (required)
  - Given name
  - Family name

### Message delivery
- **Email provider**: Use Cognito (for development) or SES (for production)

### User pool name
- Give your user pool a descriptive name

## Step 2: Create App Client

1. In your User Pool, go to "App integration" tab
2. Click "Create app client"
3. Configure:
   - **App type**: Public client
   - **App client name**: Your app name (e.g., "catalyzer-frontend")
   - **Client secret**: Don't generate (for public clients)
   - **Refresh token expiration**: 30 days (or your preference)
   - **Access token expiration**: 60 minutes (or your preference)
   - **ID token expiration**: 60 minutes (or your preference)

## Step 3: Configure OAuth (for social login)

1. In App client settings, configure:
   - **Allowed OAuth Flows**: Authorization code grant
   - **Allowed OAuth Scopes**: email, openid, profile
   - **Callback URLs**: 
     - `http://localhost:3000/` (for development)
     - `https://yourdomain.com/` (for production)
   - **Sign out URLs**:
     - `http://localhost:3000/` (for development)
     - `https://yourdomain.com/` (for production)

2. **Domain name**: Create a custom domain or use the Cognito domain
   - Format: `your-app-name.auth.us-east-1.amazoncognito.com`

## Step 4: Configure Social Identity Providers (Optional)

### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. In Cognito, add Google as identity provider
4. Enter your Google Client ID & Client Secret

### Facebook
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. In Cognito, add Facebook as identity provider
4. Enter your Facebook App ID & App Secret

### GitHub
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Note: GitHub requires additional setup in Cognito via SAML or custom provider

## Step 5: Configuration

Your AWS Cognito configuration is already set up in `src/aws-exports.js` with the following values:

```javascript
// Current Configuration (already configured)
"aws_project_region": "us-east-2"
"aws_cognito_region": "us-east-2"
"aws_user_pools_id": "us-east-2_Vr9noSUkm"
"aws_user_pools_web_client_id": "2012i9q5k7btkfvap4m9e3f5v7"
"oauth_domain": "https://us-east-2vr9nosukm.auth.us-east-2.amazoncognito.com"
"redirectSignIn": "http://localhost:3000"
"redirectSignOut": "http://localhost:3000"
```

If you need to modify these values, update the `awsmobile` object in `src/aws-exports.js`.

## Step 6: Test Your Setup

1. Start your React application: `npm start`
2. Try signing up with a new account
3. Check your email for verification code
4. Try signing in with your account
5. Test social login (if configured)

## Troubleshooting

### Common Issues

1. **Invalid redirect URI**: Make sure your callback URLs in Cognito match your environment variables
2. **Email verification not working**: Check your Cognito email configuration
3. **Social login not working**: Verify your identity provider credentials & callback URLs
4. **CORS issues**: Ensure your domain is whitelisted in Cognito settings

### Error Messages

- `User is not confirmed`: User needs to verify their email
- `User does not exist`: Check if the user signed up successfully
- `Invalid password`: Check password policy requirements

## Production Considerations

1. **Custom Domain**: Set up a custom domain for your Cognito hosted UI
2. **SES Integration**: Use Amazon SES for email delivery in production
3. **Environment Variables**: Use secure methods to store production credentials
4. **Monitoring**: Set up CloudWatch monitoring for authentication events
5. **Rate Limiting**: Configure appropriate rate limiting for your use case

## Additional Resources

- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Cognito Pricing](https://aws.amazon.com/cognito/pricing/)

## Security Best Practices

1. Enable MFA for production
2. Use short token expiration times
3. Implement proper session management
4. Monitor authentication events
5. Use HTTPS in production
6. Validate tokens on the backend 