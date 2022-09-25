import { TUser } from ".";

export interface ILoginMutation {
  login: {
    token: string;
    user: TUser;
  };
}

export interface IRefreshMutation {
  refresh: {
    token: string;
    user: TUser;
  };
}
