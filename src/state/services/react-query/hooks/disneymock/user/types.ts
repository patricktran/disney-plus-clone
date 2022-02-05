import { User } from "state/ducks/user/types";

export type UpdateUserProfileRequestParams = {
  userId: number;
  user: Omit<User, "id">;
};
