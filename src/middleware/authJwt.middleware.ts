import * as express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/auth.config";
import { DataStoredInToken } from "../interfaces/dataStoredInToken";
import { HttpStatus } from "../interfaces/httpStatus";
import User from "../models/auth/user.model";
import VerificaAuth from "../models/auth/verificaAuth.model";


const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (!req.session?.token) {

        res.status(HttpStatus.UNAUTHORIZED).json({ message: "No está autenticado" });
        return;
      }
      const token = req.session.token;
  
      if (!token) {

        res.status(HttpStatus.UNAUTHORIZED).json({ message: "No hay Token" });
        return;
      }
  
      try {
        const verified = jwt.verify(
          token,
          config.secret
        ) as DataStoredInToken;
  
        const user = {
          id: verified.id,
          username: undefined,
          email: undefined,
          roles: undefined
        }
  
  
        if (!user) {

          res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid token" });
          return;
        }
        req.user = user;
        return next();
      } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            res.status(HttpStatus.UNAUTHORIZED).json({ message: message ?? "Invalid Token" });
            return;
      }
};

const isValidRol = (rolesInput: string[]) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "Usuario no encontrado" });
        return;
      }
      const roles = await user.$get("roles");

      let conjunto = new Set(rolesInput);
      for (let elemento of roles) {
        if (elemento.name) {
          if (conjunto.has(elemento.name)) {
            return next(); // Se encontró un elemento en común
          }
        }
      }
      res.status(HttpStatus.FORBIDDEN).json({ message: "No tiene el rol adecuado" });
      return;
      
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "No es posible validar el rol" });
        return;
    }
};

const revisaPermisos = (codigo_api: string, crud: string) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id_user = req.user.id;
  const verificaAuth = await VerificaAuth.findOne({
    where: {
      user_id: id_user,
      codigo: codigo_api,
      [crud]: true
    }
  });
  if (!verificaAuth) {
    return res.status(HttpStatus.FORBIDDEN).send({
      error: true,
      message: "No tiene permiso para realizar esta operación"
    })
  }else{
      next();
  }
}

const logout = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("logout");
    req.user = { id: 0, username: "", email: "", roles: [] };
    req.session = null;
    return next();
};

export {
    verifyToken,
    isValidRol,
    revisaPermisos,
    logout
}