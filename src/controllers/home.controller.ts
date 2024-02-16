import { Request, Response } from "express";

export function welcome(req: Request, res: Response): Response {
  /*  #swagger.tags = ['Backend - Inicio']
      #swagger.description = 'Home' */
  return res.json({ message: "Hola Mundo" });
}
