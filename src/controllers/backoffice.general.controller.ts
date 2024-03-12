import { verifyToken, revisaPermisos } from "../middleware/authJwt.middleware";
import BackofficeGeneralRepository  from "../repositories/backoffice.general.repository";
import { Get, Middlewares, Route, SuccessResponse, Tags } from "tsoa";


@Route("/obras/backoffice/general/v1")
@Tags("Obras - General")
export class BackofficeGeneralController {

    /**
   * Devuelve todos los tipo de Obra
   */
    @SuccessResponse("200", "ok")
    @Get("/alltipoobras")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllTipoObra(): Promise<any> {

        const tipoObra = await BackofficeGeneralRepository.findAllTipoObra();       
        return tipoObra;
    }
}