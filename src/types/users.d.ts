type TUserRole = "ROOT" | "USER";

type TUser = {
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

interface IUserCreateMutation {
  createUser: TUser;
}

interface IUserUpdateMutation {
  updateUser: TUser;
}

interface IUserPasswordMutation {
  changePassword: TUser;
}

interface IUserData {
  user: TUser;
}
