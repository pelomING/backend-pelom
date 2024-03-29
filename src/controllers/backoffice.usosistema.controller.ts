import * as express from "express";
import { IObrasSinRep, IResponseUsoSistema } from "../interfaces/backoffice.usosistema.interface";
import { verifyToken, revisaPermisos } from "../middleware/authJwt.middleware";
import { Get, Middlewares, Route, SuccessResponse, Tags, Request } from "tsoa";
import BackofficeUsoSistemaRepository from "../repositories/backoffice.usosistema.repository";


@Route("/obras/backoffice/usosistema/v1")
@Tags("Obras - Backoffice - Uso del Sistema")
export class BackofficeUsoSistemaController {


    @SuccessResponse("200", "ok")
    @Get("/alllogin")
    @Middlewares([verifyToken])
    async getLoginEnSistema(@Request() req: express.Request): Promise<IResponseUsoSistema> {

        console.log('req.user -> ', req.user);
        const loginEnSistema = await BackofficeUsoSistemaRepository.getResumenUsoSistema( 'resumen_login_sistema' );
        return loginEnSistema;

    }

    @SuccessResponse("200", "ok")
    @Get("/resumenobrasrecientes")
    //@Middlewares([verifyToken])
    async getObrasIngresadas(): Promise<IResponseUsoSistema> {
        const obrasIngresadas = await BackofficeUsoSistemaRepository.getResumenUsoSistema( 'resumen_obras_ingresadas' );
        return obrasIngresadas;

    }

    @SuccessResponse("200", "ok")
    @Get("/resumenobrasinreportes")
    //@Middlewares([verifyToken])
    async getObrasSinRep(): Promise<IObrasSinRep> {
        const obrasSinRep = await BackofficeUsoSistemaRepository.getObrasSinRep();
        return obrasSinRep;
    }
}