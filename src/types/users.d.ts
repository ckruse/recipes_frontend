import { Nullable, TMutationResult } from ".";

export type TUserRole = "ROOT" | "USER";

export type TUser = {
  id: string;
  email: string;
  active: boolean;
  role: TUserRole;

  name: Nullable<string>;

  avatar?: {
    original: string;
    thumb: string;
  };

  insertedAt: string;
  updatedAt: string;
};

export interface IUserCreateMutation {
  createUser: TUser;
}

export interface IUserUpdateMutation {
  updateUser: TUser;
}

export interface IUserPasswordMutation {
  changePassword: TMutationResult<TUser>;
}

export interface IUserData {
  user: TUser;
}
