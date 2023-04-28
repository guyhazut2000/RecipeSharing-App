import { User } from "@features/auth/types/user.types";

export type LoginUser = Omit<User, "username">;
