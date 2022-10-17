import { TMutationResult, TUser } from ".";

export interface ILoginMutation {
  login: TMutationResult<{
    token: string;
    user: TUser;
  }>;
}

export interface IRefreshMutation {
  refresh: TMutationResult<{
    token: string;
    user: TUser;
  }>;
}
