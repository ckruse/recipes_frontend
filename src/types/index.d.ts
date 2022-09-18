export type Nullable<T> = T | null;
export type Nilable<T> = T | null | undefined;

export type MutationResultType<T = any> = MutationSuccessResultType<T> | MutationErrorResultType;

type MutationSuccessResultType<T> = {
  successful: true;
  messages: [];

  result: T;
};

type MutationErrorResultType = {
  successful: false;
  messages: {
    field: string;
    message: string;
    template: string;
    code: string;
    options: {
      key: string;
      value: string;
    }[];
  }[];

  result: null;
};

export * from "./users";
export * from "./recipes";
export * from "./tags";
