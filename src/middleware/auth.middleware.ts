import * as express from "express";
import jwt from "jsonwebtoken";
import HttpException from "../common/http-exception";
import { DataStoredInToken } from "../interfaces/dataStoredInToken";
import { config } from "../config/auth.config";

export const expressAuthentication = async (
  req: express.Request,
  securityName: string,
  _scopes?: string[]
) => {
  if (securityName === "jwt") {

    if (!req.session || !req.session.token) {
      throw new HttpException(401, "Invalid token");
    }
    const token = req.session.token;

    if (!token) {
      throw new HttpException(401, "Token missing");
    }

    try {
      const verified = jwt.verify(
        token,
        config.secret
      ) as DataStoredInToken;

      const user = {
        id: verified.id
      }


      if (!user) {
        throw new HttpException(401, "Invalid token");
      }
      return user;
      //next();
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      throw new HttpException(401, message || "Invalid Token");
    }
  }
};

