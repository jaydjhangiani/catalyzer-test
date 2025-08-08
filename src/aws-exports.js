const awsmobile = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_QtTAJWy9Z',
  aws_user_pools_web_client_id: '72kaiglhcui5tssh015crb7n2j',
  oauth: {
    domain: 'https://us-east-1qttajwy9z.auth.us-east-1.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: [
      'http://localhost:3000/',
      'https://main.d32kb31ukpboyu.amplifyapp.com/',
    ],
    redirectSignOut: [
      'http://localhost:3000/',
      'https://main.d32kb31ukpboyu.amplifyapp.com/',
    ],
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
};

// Convert to Amplify v6 format for compatibility
const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: awsmobile.aws_user_pools_id,
      userPoolClientId: awsmobile.aws_user_pools_web_client_id,
      loginWith: {
        oauth: {
          domain: awsmobile.oauth.domain.replace('https://', ''),
          scopes: awsmobile.oauth.scope,
          redirectSignIn: awsmobile.oauth.redirectSignIn,
          redirectSignOut: awsmobile.oauth.redirectSignOut,
          responseType: awsmobile.oauth.responseType,
          providers: [
            'Google',
            'Facebook',
            'LoginWithAmazon',
            'SignInWithApple',
          ],
        },
        email: true,
        username: false,
      },
    },
  },
};

export default awsconfig;
