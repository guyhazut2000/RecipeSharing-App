import { User } from "@features/auth/shared/types/user.types";

export type LoginUser = Omit<User, "username">;
