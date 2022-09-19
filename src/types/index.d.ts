export type Nullable<T> = T | null;
export type Nilable<T> = T | null | undefined;

export type TMutationResult<T = any> = TMutationSuccessResult<T> | TMutationErrorResult;

type TMutationSuccessResult<T> = {
  successful: true;
  messages: [];

  result: T;
};

type TMutationErrorResult = {
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
export * from "./ingredients";
