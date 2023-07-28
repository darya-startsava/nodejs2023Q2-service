export type CreateUser = {
  login: string;
  password: string;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};
