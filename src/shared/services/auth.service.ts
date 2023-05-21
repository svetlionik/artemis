import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../UserPool';

type ResetPasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

const authService = {
  resetPassword: async ({
    oldPassword,
    newPassword,
  }: ResetPasswordPayload): Promise<any> => {
    const user: any = UserPool.getCurrentUser();
    let cognitoUser = new CognitoUser({
      Username: user.username,
      Pool: UserPool,
    });
    return new Promise((resolve, reject) => {
      if (cognitoUser != null) {
        cognitoUser.getSession(function (err: any, session: any) {
          if (err) {
            reject('Error!');
            return;
          }

          cognitoUser.changePassword(
            oldPassword,
            newPassword,
            (err: any, result) => {
              if (err) {
                const result =
                  err.code === 'InvalidPasswordException'
                    ? 'Password is too short! Minimum of 8 characters are required!'
                    : err.code === 'LimitExceededException'
                    ? 'Attempt limit exceeded, please try after some time.'
                    : "Hmm... These details don't seem to be right";
                reject(result);
              }
              resolve(result);
            },
          );
        });
      }
    });
  },

  signIn: (username: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      let cognitoUser = new CognitoUser({
        Username: username,
        Pool: UserPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          let accessToken = result.getAccessToken().getJwtToken();
          let currentUser = result.getAccessToken().payload.username;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('username', currentUser);
          resolve(result);
        },

        newPasswordRequired: function (userAttributes, requiredAttributes) {
          delete userAttributes.email_verified;
          delete userAttributes.phone_number_verified;
          cognitoUser.completeNewPasswordChallenge(password, null, this);
        },

        onFailure: function (err) {
          const result =
            err.code === 'InvalidParameterException'
              ? 'Please Enter Username and Password'
              : err.code === 'NotAuthorizedException'
              ? 'Your username or password is incorrect.'
              : 'Error!';
          reject(result);
        },
      });
    });
  },
  signOut: () => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    } else {
      localStorage.removeItem('token');
    }
  },
};

export default authService;
