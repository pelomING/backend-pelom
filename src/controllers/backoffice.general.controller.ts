import Delegacion from "src/models/obras/delegacion.model";
import { verifyToken, revisaPermisos } from "../middleware/authJwt.middleware";
import BackofficeGeneralRepository  from "../repositories/backoffice.general.repository";
import { Get, Middlewares, Query, Route, SuccessResponse, Tags } from "tsoa";


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

    /**
     * Devuelve todos los tipo de Operacion
     * */
    @SuccessResponse("200", "ok")
    @Get("/alltipoperacion")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllTipoOperacion(): Promise<any> {
        const tipoOperacion = await BackofficeGeneralRepository.findAllTipoOperacion();
        return tipoOperacion;
    }


    /**
     * Devuelve todos los tipo de Actividad
     * */
    @SuccessResponse("200", "ok")
    @Get("/alltipoactividad")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllTipoActividad(): Promise<any> {
        const tipoActividad = await BackofficeGeneralRepository.findAllTipoActividad();
        return tipoActividad;
    }

    /**
     * Devuelve todos los registros de maestro actividad
     * */
    @SuccessResponse("200", "ok")
    @Get("/allmaestroactividad")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllMaestroActividad(): Promise<any> {
        const maestroActividad = await BackofficeGeneralRepository.findAllMaestroActividad();
        return maestroActividad;
    }

    /**
     * Consulta un registro de maestro actividad por id
     * @param query
     * @param query.id id de la actividad
     * */
    @SuccessResponse("200", "ok")
    @Get("/maestroactividadporid")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findOneMaestroActividad(@Query() id: number): Promise<any> {

        const maestroActividad = await BackofficeGeneralRepository.findOneMaestroActividad(id);
        return maestroActividad;
    }

    @SuccessResponse("200", "ok")
    @Get("/maestroactividadporactividad")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllMaestroActividadByActividad(actividad: string): Promise<any> {
        
        const maestroActividad = await BackofficeGeneralRepository.findAllMaestroActividadByActividad(actividad);
        return maestroActividad;
    }

    @SuccessResponse("200", "ok")
    @Get("/allzonales")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllZonales(): Promise<any> {
        const zonales = await BackofficeGeneralRepository.findAllZonales();
        return zonales;
    }

    @SuccessResponse("200", "ok")
    @Get("/alldelegaciones")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllDelegaciones(): Promise<any> {
        const delegaciones = await Delegacion.findAll();
        return delegaciones;
    }

    @SuccessResponse("200", "ok")
    @Get("/alltipotrabajos")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllTipoTrabajo(): Promise<any> {
        const tipoTrabajo = await BackofficeGeneralRepository.findAllTipoTrabajo();
        return tipoTrabajo;
    }

    @SuccessResponse("200", "ok")
    @Get("/allempresacontratistas")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllEmpresasContratistas(): Promise<any> {
        const empresasContratistas = await BackofficeGeneralRepository.findAllEmpresasContratistas();
        return empresasContratistas;
    }
}