export interface ICheckbox {
  isChecked: boolean;
  toggleIsCheck: () => void;
}

export interface ILoginProps {
  history: object;
  location: object;
  match: object;
  prevURL: string;
  staticContext: undefined;
}

export interface IResetPasswordProps {
  onSubmit: (data: IResetCredentials) => void;
  status: string;
}

export interface ILoginFormProps {
  onSubmit: (data: ILoginCredentials) => void;
  status: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface IResetCredentials {
  oldPassword: string;
  newPassword: string;
}

export interface ICognitoUser {
  Session: null;
  authenticationFlowType: string;
  client: object;
  keyPrefix: string;
  pool: object;
  signInUserSession: null;
  storage: object;
  userDataKey: string;
  username: string;
}
