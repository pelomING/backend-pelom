import * as express from "express";
import { verifyToken, revisaPermisos } from "../middleware/authJwt.middleware";
import { Body, Middlewares, Post, Route, SuccessResponse, Tags, Request, Query, Get } from "tsoa";
import BackofficeBomRepository from "../repositories/backoffice.bom.repository";
import { IConsultaBomOutput, ICreaBomInput, ICreaBomOutput } from "../interfaces/backoffice.bom.interface";

@Route("/obras/backoffice/v1")
@Tags("Obras - Backoffice - Manejo materiales (bom)")
export class BackofficeBomController {

    /**
   * Función de creación de BOM
   * @param id_obra numero id de la obra
   * @param reserva numero de reserva
   * @param materiales lista de materiales en formato [codigo material]-[cantidad]
   */
    @SuccessResponse("200", "ok")
    @Post("/creabom")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "crear")])
    async createBomMasivo(@Request() req: express.Request, @Body() bom: ICreaBomInput): Promise<ICreaBomOutput> {

        const userStored = req.user;
        const bomMasivo = await BackofficeBomRepository.createBomMasivo(bom, userStored);
        return bomMasivo;
    }

    @SuccessResponse("200", "ok")
    @Get("/bom_inicial_por_obra")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "crear")])
    async getBomZero(@Query() id_obra: number): Promise<IConsultaBomOutput[]> {

        const inputData = { id_obra: id_obra };
        const bomZero = await BackofficeBomRepository.getBomZero(inputData);
        return bomZero;
    }

    @SuccessResponse("200", "ok")
    @Get("/bom_actual_por_obra")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "crear")])
    async getBomFinal(@Query() id_obra: number): Promise<IConsultaBomOutput[]> {

        const inputData = { id_obra: id_obra };
        const bomZero = await BackofficeBomRepository.getBomFinal(inputData);
        return bomZero;
    }
}
