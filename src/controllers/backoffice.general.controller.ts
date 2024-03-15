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


    /**
     * Consulta un registro de maestro actividad por codigo actividad
     * @param query
     * @param query.actividad codigo de la actividad
     * */
    @SuccessResponse("200", "ok")
    @Get("/maestroactividadporactividad")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllMaestroActividadByActividad(@Query() actividad: string): Promise<any> {
        
        const maestroActividad = await BackofficeGeneralRepository.findAllMaestroActividadByActividad(actividad);
        return maestroActividad;
    }

    /**
     * Devuelve todos los registros de las zonales
     * */
    @SuccessResponse("200", "ok")
    @Get("/allzonales")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllZonales(): Promise<any> {
        const zonales = await BackofficeGeneralRepository.findAllZonales();
        return zonales;
    }

    /**
     * Devuelve todos los registros de las delegaciones
     * */
    @SuccessResponse("200", "ok")
    @Get("/alldelegaciones")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllDelegaciones(): Promise<any> {
        const delegaciones = await BackofficeGeneralRepository.findAllDelegaciones();
        return delegaciones;
    }

    /**
     * Devuelve todos los registros de los tipo trabajo
     * */
    @SuccessResponse("200", "ok")
    @Get("/alltipotrabajos")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllTipoTrabajo(): Promise<any> {
        const tipoTrabajo = await BackofficeGeneralRepository.findAllTipoTrabajo();
        return tipoTrabajo;
    }

    /**
     * Devuelve todos los registros de las empresas contratistas
     * */
    @SuccessResponse("200", "ok")
    @Get("/allempresacontratistas")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllEmpresasContratistas(): Promise<any> {
        const empresasContratistas = await BackofficeGeneralRepository.findAllEmpresasContratistas();
        return empresasContratistas;
    }

    /**
     * Devuelve todos los registros de los coordinadores contratistas
     * */
    @SuccessResponse("200", "ok")
    @Get("/allcoordinadorcontratistas")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllCoordinadoresContratistas(): Promise<any> {
        const coordinadoresContratistas = await BackofficeGeneralRepository.findAllCoordinadoresContratistas();
        return coordinadoresContratistas;
    }

    /**
     * Devuelve todos los registros de las comunas
     * */
    @SuccessResponse("200", "ok")
    @Get("/allcomunas")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllComunas(): Promise<any> {
        const comunas = await BackofficeGeneralRepository.findAllComunas();
        return comunas;
    }

    /**
     * Devuelve todos los registros de los Estados de Obra
     * */
    @SuccessResponse("200", "ok")
    @Get("/allestados")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllEstadosObra(): Promise<any> {
        const estadoObra = await BackofficeGeneralRepository.findAllEstadosObra();
        return estadoObra;
    }

    /**
     * Devuelve todos los registros de los Estados de Visita
     * */
    @SuccessResponse("200", "ok")
    @Get("/allestadovisitas")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllEstadosVisita(): Promise<any> {
        const estadoVisita = await BackofficeGeneralRepository.findAllEstadosVisita();
        return estadoVisita;
    }

    /**
     * Devuelve todos los registros de los Segmentos
     * */
    @SuccessResponse("200", "ok")
    @Get("/allsegmentos")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllSegmentos(): Promise<any> {
        const segmento = await BackofficeGeneralRepository.findAllSegmentos();
        return segmento;
    }

    /**
     * Devuelve todos los registros de las oficinas
     * */
    @SuccessResponse("200", "ok")
    @Get("/alloficinasupervisor")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllOficinasSupervisores(): Promise<any> {
        const oficinasSupervisores = await BackofficeGeneralRepository.findAllOficinasSupervisores();
        return oficinasSupervisores;
    }

    /**
     * Devuelve todos los registros de los recargos
     * */
    @SuccessResponse("200", "ok")
    @Get("/allrecargospordistancia")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllRecargosDistancias(): Promise<any> {
        const recargosDistancia = await BackofficeGeneralRepository.findAllRecargosDistancias();
        return recargosDistancia;
    }

    /**
     * Devuelve el resumen general
     * */
    @SuccessResponse("200", "ok")
    @Get("/resumengeneral")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async getResumenGeneral(): Promise<any> {
        const resumenGeneral = await BackofficeGeneralRepository.getResumenGeneral();
        return resumenGeneral;
    }

    /**
     * Devuelve todos los registros de los usuarios
     * */
    @SuccessResponse("200", "ok")
    @Get("/allusuarios")
    @Middlewares([verifyToken, revisaPermisos("obras.backoffice.general", "leer")])
    async findAllUsuariosFunciones(): Promise<any> {
        const usuariosFunciones = await BackofficeGeneralRepository.findAllUsuariosFunciones();
        return usuariosFunciones;
    }
}