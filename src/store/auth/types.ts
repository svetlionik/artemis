export type UserProps = {
  username: string;
  password: string;
};

export type ResetPasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
export type AuthRequestStatus = 'idle' | 'loading' | 'rejected' | 'success';
export type User = {
  email: string;
  username: string;
  sub: string;
  workLocation?: string;
  profile: string;
  status: string;
  familyName: string;
  givenName: string;
  hasSkillRequirement?: boolean;
  privacyChecked?: boolean;
  hasTestRequirement?: boolean;
  hasPracticalTaskRequirement?: boolean;
} | null;
export type AuthState = {
  user: User;
  changePasswordStatus: AuthRequestStatus;
  message: string | null | undefined;
  status: AuthRequestStatus;
};
