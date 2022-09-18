import { TUser } from "./users";

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
