import { Nullable } from ".";

export type TUserRole = "ROOT" | "USER";

export type TUser = {
  id: number;
  email: string;
  active: boolean;
  role: TUserRole;

  name: Nullable<string>;

  avatar: Nullable<string>;

  insertedAt: string;
  updatedAt: string;
};

export interface IUserCreateMutation {
  createUser: TUser;
}

export interface IUserUpdateMutation {
  updateUser: TUser;
}

export interface IUserData {
  user: TUser;
}
