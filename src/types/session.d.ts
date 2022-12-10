import { TUser } from ".";

export interface ILoginMutation {
  login: TUser;
}

export interface IRefreshMutation {
  refresh: TUser;
}
