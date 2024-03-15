import HttpException from "../common/http-exception";
import  {
    IBackofficeGeneralRepository,
    IDelegacion,
    IDelegacionSchema,
    IdSchema, 
    IMaestroActividad, 
    IMaestroActividadSchema, 
    ITipoActividad, 
    ITipoActividadSchema, 
    ITipoObra, 
    ITipoObraSchema, 
    ITipoOperacion, 
    ITipoOperacionSchema,
    ITipoTrabajo,
    ITipoTrabajoSchema,
    IZonal,
    IZonalSchema,
    IEmpresaContratista,
    IEmpresaContratistaSchema,
    ICoordinadorContratista,
    ICoordinadorContratistaSchema,
    IComuna,
    IComunaSchema,
    IEstadoObra,
    IEstadoObraSchema,
    IEstadoVisita,
    IEstadoVisitaSchema,
    ISegmento,
    ISegmentoSchema,
    IOficinaSupervisor,
    IOficinaSupervisorSchema,
    IRecargoDistancia,
    IRecargoDistanciaSchema,
    IResumenGeneral,
    IResumenGeneralSchema,
    IUsuariosFunciones,
    IUsuariosFuncionesSchema} from "../interfaces/backoffice.general.interface";
import TipoObra from "../models/obras/tipoObra.model";
import { HttpStatus } from "../interfaces/httpStatus";
import TipoOperacion from "../models/obras/tipoOperacion.model";
import TipoActividad from "../models/obras/tipoActividad.model";
import Database from "../db/index";
import Zonal from "../models/comun/zonal.model";
import Delegacion from "../models/obras/delegacion.model";
import TipoTrabajo from "../models/obras/tipoTrabajo.model";
import EmpresaContratista from "../models/obras/empresaContratista.model";
import CoordinadorContratista from "../models/obras/coordinadorContratista.model";
import Comuna from "../models/comun/comuna.model";
import EstadoObra from "../models/obras/estadoObra.model";
import EstadoVisita from "../models/obras/estadoVisita.model";
import Segmento from "../models/obras/segmento.model";
import UsuariosFunciones from "../models/auth/usuariosFunciones.model";
import Recargos from "../models/obras/recargo.model";


export class BackofficeGeneralRepository implements IBackofficeGeneralRepository {

    async findAllTipoObra(): Promise<Array<ITipoObra>> {
        try {
            const tipoObra = await TipoObra.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<ITipoObra> = tipoObra.map( (element: any) => {
                const respuesta = ITipoObraSchema.parse(element);
                return respuesta;
            });
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los tipos de obras");
        }
    }

    async findAllTipoOperacion(): Promise<Array<ITipoOperacion>> {
        try {
            const tipoOperacion = await TipoOperacion.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<ITipoOperacion> = tipoOperacion.map( (element: any) => {
                const respuesta = ITipoOperacionSchema.parse(element);
                return respuesta;
            });
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los tipos de operación");
        }
    }

    async findAllTipoActividad(): Promise<Array<ITipoActividad>> {
        try {
            const tipoActividad = await TipoActividad.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<ITipoActividad> = tipoActividad.map( (element: any) => {
                const respuesta = ITipoActividadSchema.parse(element);
                return respuesta;
            });
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los tipos de actividad");
        }
    }

    async findAllMaestroActividad(): Promise<Array<IMaestroActividad>> {
        try {
            const db = new Database();
            const sql = `
            SELECT 
                    ma.id, 
                    actividad, 
                    row_to_json(ta) as tipo_actividad, 
                    uc_instalacion, 
                    uc_retiro, 
                    uc_traslado, 
                    ma.descripcion 
            FROM 
                    obras.maestro_actividades ma 
            JOIN 
                    obras.tipo_actividad ta 
                ON 
                    ma.id_tipo_actividad = ta.id`;

            const { QueryTypes } = require('sequelize');
            const sequelize = db.sequelize;
            const maestroActividad = await sequelize?.query(sql, { type: QueryTypes.SELECT });
            if (!maestroActividad) {
                return [];
            }
            const salida: Array<IMaestroActividad> = maestroActividad?.map( (element: any) => {
                const respuesta = IMaestroActividadSchema.parse(element);
                return respuesta;
            });
            return salida;
        }catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los tipos de actividad");
        }
    }

    async findOneMaestroActividad(id: number): Promise<IMaestroActividad | null | undefined> {
        try {
            try 
            {
                IdSchema.parse(id);
            } 
            catch (error) 
            {
                throw new HttpException(HttpStatus.BAD_REQUEST, "Id debe ser entero mayor a cero");
            }

            const db = new Database();
            const sql = `SELECT 
                            ma.id, 
                            actividad, 
                            row_to_json(ta) as tipo_actividad, 
                            uc_instalacion, 
                            uc_retiro, 
                            uc_traslado, 
                            ma.descripcion 
                        FROM 
                            obras.maestro_actividades ma 
                        JOIN 
                            obras.tipo_actividad ta 
                        ON 
                            ma.id_tipo_actividad = ta.id WHERE ma.id = :id`;

            const { QueryTypes } = require('sequelize');
            const sequelize = db.sequelize;
            const maestroActividad = await sequelize?.query(sql, { replacements: { id: id }, type: QueryTypes.SELECT });
            if (!maestroActividad) {
                return null;
            }
            const salida: IMaestroActividad = IMaestroActividadSchema.parse(maestroActividad[0]);
            return salida;

        }catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el maestro actividad");
        }
    }

    async findAllMaestroActividadByActividad(actividad: string): Promise<Array<IMaestroActividad>> {
        try {
            if (!actividad) {
                throw new HttpException(HttpStatus.BAD_REQUEST, "Actividad es requerido");
            }
            let condicion = actividad.trim().split(" ").filter((item) => item).map((item) => 'ma.actividad ILIKE \'%'+item+'%\'').reduce((acc, valor) => acc + ' AND ' +valor);
            const sql = `SELECT 
                            ma.id, 
                            actividad, 
                            row_to_json(ta) as tipo_actividad, 
                            uc_instalacion, 
                            uc_retiro, 
                            uc_traslado, 
                            ma.descripcion 
                        FROM 
                            obras.maestro_actividades ma 
                        JOIN 
                            obras.tipo_actividad ta 
                        ON 
                            ma.id_tipo_actividad = ta.id 
                        WHERE ${condicion}`;

            const db = new Database();
            const { QueryTypes } = require('sequelize');
            const sequelize = db.sequelize;
            const maestroActividad = await sequelize?.query(sql, { type: QueryTypes.SELECT });
            if (!maestroActividad) {
                return [];
            }
            const salida: Array<IMaestroActividad> = maestroActividad?.map( (element: any) => {
                const respuesta = IMaestroActividadSchema.parse(element);
                return respuesta;
            });
            return salida;
        }catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los tipos de actividad");
        }
    }

    async findAllZonales(): Promise<Array<IZonal>> {
        try {
            const zonales = await Zonal.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<IZonal> = zonales.map( (element: any) => {
                const respuesta = IZonalSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las zonales");
        }
    }

    async findAllDelegaciones(): Promise<Array<IDelegacion>> {
        try {
            const delegaciones = await Delegacion.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<IDelegacion> = delegaciones.map( (element: any) => {
                const respuesta = IDelegacionSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las delegaciones");
        }
    }

    async findAllTipoTrabajo(): Promise<Array<ITipoTrabajo>> {
        try {
            const tipoTrabajo = await TipoTrabajo.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<ITipoTrabajo> = tipoTrabajo.map( (element: any) => {
                const respuesta = ITipoTrabajoSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los tipos de trabajo");
        }
    }

    async findAllEmpresasContratistas(): Promise<Array<IEmpresaContratista>> {
        try {
            const empresaContratista = await EmpresaContratista.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<IEmpresaContratista> = empresaContratista.map( (element: any) => {
                const respuesta = IEmpresaContratistaSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las empresas contratistas");
        }
    }

    async findAllCoordinadoresContratistas(): Promise<Array<ICoordinadorContratista>> {
        try {
            const coordinadorContratista = await CoordinadorContratista.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<ICoordinadorContratista> = coordinadorContratista.map( (element: any) => {
                const respuesta = ICoordinadorContratistaSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las coordinadores contratistas");
        }
    }

    async findAllComunas(): Promise<Array<IComuna>> {
        try {
            const Sequelize = require("sequelize");
            const Op = Sequelize.Op;
            const comuna = await Comuna.findAll( { where: { provincia: { [Op.like]: '07%' } }, order: [['nombre', 'ASC']], } );
            const salida: Array<IComuna> = comuna.map( (element: any) => {
                const respuesta = IComunaSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las comunas");
        }
    }

    async findAllEstadosObra(): Promise<Array<IEstadoObra>> {
        try {
            const estadoObra = await EstadoObra.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<IEstadoObra> = estadoObra.map( (element: any) => {
                const respuesta = IEstadoObraSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los estados de obra");
        }
    }

    async findAllEstadosVisita(): Promise<Array<IEstadoVisita>> {
        try {
            const estadoVisita = await EstadoVisita.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<IEstadoVisita> = estadoVisita.map( (element: any) => {
                const respuesta = IEstadoVisitaSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los estados de visita");
        }
    }

    async findAllSegmentos(): Promise<Array<ISegmento>> {
        try {
            const segmento = await Segmento.findAll( { order: [['id', 'ASC']] } );
            const salida: Array<ISegmento> = segmento.map( (element: any) => {
                const respuesta = ISegmentoSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los segmentos");
        }
    }

    async findAllOficinasSupervisores(): Promise<Array<IOficinaSupervisor>> {
        try {
            const db = new Database();
            const sql = `
                        SELECT 
                            os.id, 
                            o.nombre as oficina, 
                            so.nombre as supervisor 
                        FROM 
                            obras.oficina_supervisor os 
                        JOIN 
                            _comun.oficinas o ON os.oficina = o.id 
                        JOIN 
                            obras.supervisores_contratista so ON os.supervisor = so.id`;

            const { QueryTypes } = require('sequelize');
            const sequelize = db.sequelize;
            const oficinasSupervisores = await sequelize?.query(sql, { type: QueryTypes.SELECT });
            if (!oficinasSupervisores) {
                return [];
            }
            const salida: Array<IOficinaSupervisor> = oficinasSupervisores?.map( (element: any) => {
                const respuesta = IOficinaSupervisorSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las oficinas supervisores");
        }
    }

    async findAllRecargosDistancias(): Promise<Array<IRecargoDistancia>> {
        try {
            const recargosDistancia = await Recargos.findAll( { 
                attributes: ['id', 'nombre', 'porcentaje'], 
                where: { id_tipo_recargo: 2 },
                order: [['id', 'ASC']] } );
            const salida: Array<IRecargoDistancia> = recargosDistancia.map( (element: any) => {
                const respuesta = IRecargoDistanciaSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener los recargos por distancia");
        }
    }

    async getResumenGeneral(): Promise<Array<IResumenGeneral>> {
        try {
            const resumenGeneral = [
                {
                  "servicio": "SAE",
                  "produccion": "$ 45.784.234"
                },
                {
                  "servicio": "OBRAS",
                  "produccion": "$ 120.784.234"
                },
                {
                  "servicio": "PODA",
                  "produccion": "$ 12.784.234"
                },
                {
                  "servicio": "TLD",
                  "produccion": "$ 23.784.234"
                }
              ];
            const salida: Array<IResumenGeneral> = resumenGeneral.map( (element: any) => {
                const respuesta = IResumenGeneralSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el resumen general");
        }
    }

    async findAllUsuariosFunciones(): Promise<Array<IUsuariosFunciones>> {
        try {
            const usuariosFunciones = await UsuariosFunciones.findAll( { 
                                            attributes: ['id', 'username', 'email', 'funcion', 'nombres', 'fecha_password'], 
                                            order: [['username', 'ASC']] } );
            const salida: Array<IUsuariosFunciones> = usuariosFunciones.map( (element: any) => {
                const respuesta = IUsuariosFuncionesSchema.parse(element);
                return respuesta;
            })
            return salida;
        } catch (error) {
            console.log(error);
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las funciones de los usuarios");
        }
    }
}

export default new BackofficeGeneralRepository();