import { Nilable, TMutationResult } from "./types";

export class MutationError extends Error {
  result: Nilable<TMutationResult>;

  constructor(result?: Nilable<TMutationResult>) {
    const errors = result?.messages.map((msg) => `${msg.field}: ${msg.message}`).join("\n") || "unknown error";
    super("Mutation failed:\n" + errors);
    this.result = result;
  }
}
