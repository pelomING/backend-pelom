declare namespace Express {
    interface Request {
      user: {
        id: number;
        username: string | undefined;
        email: string | undefined;
        roles: string[] | undefined;
      };      
    }
  }