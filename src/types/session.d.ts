interface ILoginMutation {
  login: {
    user: TUser;
    token: string;
  };
}

interface IRefreshMutation {
  refresh: {
    user: TUser;
    token: string;
  };
}
