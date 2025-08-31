type FlashTypeType = "error" | "success" | "info" | "warning";

type FlashMessageType = {
  id: string;
  type: FlashTypeType;
  timeout: Nullable<number>;
  message: string;
};
