import mongoose, { Model, Schema } from "mongoose";
import User, { Permission, Role } from "../types/user.type";

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permission),
      default: [Permission.READ],
    },
  },
  { timestamps: true }
);

// add static method's to the schema
// Get user by email
userSchema.statics.getUserByEmail = async function (
  email: string
): Promise<User | null> {
  const user = await this.findOne({ email });
  return user;
};
// Get user by refreshToken
userSchema.statics.getUserByRefreshToken = async function (
  refreshToken: string
): Promise<User | null> {
  const user = await this.findOne({ refreshToken });
  return user;
};

const UserModel: Model<User> = mongoose.model<User>("User", userSchema);

export default UserModel;
