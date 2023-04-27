import { Document, Types } from "mongoose";

enum Role {
  ADMIN = "admin",
  USER = "user",
}

enum Permission {
  CREATE = "create",
  READ = "read",
  UPDATE_ALL = "update_all",
  UPDATE_OWN = "update_own",
  DELETE_ALL = "delete_all",
  DELETE_OWN = "delete_own",
}

export default interface User extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Role;
  permissions: Permission[];
  refreshToken?: string;
  isOnline?: boolean;
  createdAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

interface AuthenticateUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}

export { Role, Permission, AuthenticateUser };
