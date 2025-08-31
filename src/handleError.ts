export class MutationError extends Error {
  constructor() {
    super("Mutation failed");
  }
}
