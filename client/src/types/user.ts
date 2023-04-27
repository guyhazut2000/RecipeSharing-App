export interface User {
  username: string;
  email: string;
  password: string;
}

export interface RegistrationUser extends User {
  role: string;
}
export type LoginUser = Omit<User, "username">;
export type LogoutUser = Omit<User, "username">;
