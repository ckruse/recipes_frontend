import { MutationResultType, Nilable } from "./types";

export class MutationError extends Error {
  result: Nilable<MutationResultType>;

  constructor(result: Nilable<MutationResultType>) {
    const errors = result?.messages.map((msg) => `${msg.field}: ${msg.message}`).join("\n") || "unknown error";
    super("Mutation failed:\n" + errors);
    this.result = result;
  }
}
