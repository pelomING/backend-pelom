import HttpException from "../common/http-exception";
import  {
    IBackofficeGeneralRepository, 
    IMaestroActividad, 
    IMaestroActividadSchema, 
    ITipoActividad, 
    ITipoActividadSchema, 
    ITipoObra, 
    ITipoObraSchema, 
    ITipoOperacion, 
    ITipoOperacionSchema} from "../interfaces/backoffice.general.interface";
import TipoObra from "../models/obras/tipoObra.model";
import { HttpStatus } from "../interfaces/httpStatus";
import TipoOperacion from "../models/obras/tipoOperacion.model";
import TipoActividad from "../models/obras/tipoActividad.model";
import Database from "../db/index";


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
}

export default new BackofficeGeneralRepository();