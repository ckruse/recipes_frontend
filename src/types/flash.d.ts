import { Nullable } from ".";

export type FlashTypeType = "error" | "success" | "info" | "warning";

export type FlashMessageType = {
  id: string;
  type: FlashTypeType;
  timeout: Nullable<number>;
  message: string;
};
