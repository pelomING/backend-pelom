import { Get, Middlewares, Query, Route, SuccessResponse, Tags } from "tsoa";
import { verifyToken, revisaPermisos } from "../middleware/authJwt.middleware";
import BackofficeObrasRepository from "../repositories/backoffice.obras.repository";


@Route("/obras/backoffice/v1")
@Tags("Obras - Backoffice - Obras")
export class BackofficeObrasController { 

    @SuccessResponse("200", "ok")
    @Get("/allobras")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.obras", "leer")])
    async findAllObra(@Query() vista: string = ""): Promise<any> {
        
        const obras = await BackofficeObrasRepository.findAllObra(vista);
        return obras;
    }

}