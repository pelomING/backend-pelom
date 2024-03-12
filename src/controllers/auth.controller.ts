import * as express from "express";
import AuthRepository from "../repositories/auth.repository";
import { verifyToken, logout } from "../middleware/authJwt.middleware";
import {
  Body, Controller, Get, Path, Post, Query, Route, Tags, SuccessResponse, Request, Security, Middlewares} from "tsoa";
import { ISignInInput, IRespuestaLogin, IUserRepository } from "../interfaces/auth.interface";
import { HttpStatus } from "../interfaces/httpStatus";
import HttpException from "../common/http-exception";


@Route("/auth/v1")
@Tags("Autenticación")
export class AuthController {

   /**
   * Función de Login
   * @param body
   * @param body.username nombre de usuario
   * @param body.password password de usuario
   *
   */

    @SuccessResponse("201", "usuario ok")
    @Post("/signin")
    async signIn(@Body() credencialesUsuario: ISignInInput, @Request() req: express.Request): Promise<IRespuestaLogin>  
    {
        const user = await AuthRepository.signIn(credencialesUsuario);
        
        /*
        if (!user) {
            throw new Error("Usuario no existe");
        }*/
        req.session = { token: user.accessToken };
        const salida: IRespuestaLogin = {
          id: user.id?user.id:0,
          username: user.username?user.username:"",
          nombre: user.username?user.username:"",
          funcion: user.funcion?user.funcion:"",
          email: user.email?user.email:"",
          roles: user.roles?user.roles:[],
          accessToken: user.accessToken?user.accessToken:"",
          menu: user.menu?user.menu:[]
      };
        return salida;
    }

    @SuccessResponse(HttpStatus.OK, "consulta ok")
    @Get("/consultatest")
    @Middlewares(verifyToken)
    async consultaTest(@Request() req: express.Request): Promise<string>  {
        /*
        console.log("consultaTest --> ", req.headers);
        const token = req.headers["x-access-token"]?req.headers["x-access-token"]:"nulo";
        console.log("token --> ", token);
        const test = await AuthRepository.consultaTest();
        res.status(200).send(test);
        
        if (req.error.statusCode) {
            throw new HttpException(req.error.statusCode, req.error.message);
        }
        */
       
            console.log("consultaTest --> ", req.user);
            return req.user.username?req.user.username:"no ok";
      
      
    }

    @SuccessResponse(HttpStatus.OK)
    @Post("/signout")
    @Middlewares([logout])
    signOut(@Request() req: express.Request): string {

        if (!req.session) {
          return "logout ok";
        }
        return "no pudo cerrar la sesión";
    }

    /**
   * Get the current user.
   */
   @Post("/me")
   @Security("jwt")
   me(@Request() req: express.Request): Omit<IUserRepository, "password"> {
        return req.user;
   }
}