/**
 * User Interface representing a User in the application
 */
import { Document, Types } from "mongoose";

/**
 * Enum representing the roles that a user can have
 */
enum Role {
  ADMIN = "admin",
  USER = "user",
}

/**
 * Enum representing the permissions that a user can have
 */
enum Permission {
  CREATE = "create",
  READ = "read",
  UPDATE_ALL = "update_all",
  UPDATE_OWN = "update_own",
  DELETE_ALL = "delete_all",
  DELETE_OWN = "delete_own",
}

/**
 * Interface representing a User document in the database.
 * Extends the Mongoose Document interface to add typings for the User model properties.
 */
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

/**
 * Interface representing a User that needs to be authenticated
 */
interface AuthenticateUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}

export { Role, Permission, AuthenticateUser };
