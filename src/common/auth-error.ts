export class AuthError extends Error {
    constructor(message: string) {
      super(message); // (1)
      this.name = "AuthError"; // (2)
    }
  };