import { Nullable, TMutationResult } from ".";

export type TUserRole = "ROOT" | "USER";

export type TUser = {
  id: string;
  email: string;
  active: boolean;
  role: TUserRole;

  name: Nullable<string>;

  avatar: Nullable<string>;

  insertedAt: string;
  updatedAt: string;
};

export interface IUserMutation {
  mutateUser: TMutationResult<TUser>;
}

export interface IUserData {
  user: TUser;
}
