import HttpException from "../common/http-exception";
import { HttpStatus } from "../interfaces/httpStatus";
import { IBackofficeUsoSistemaRepository, IObrasSinRep, IObrasSinRepSchemaNoCantidad, 
    IResponseUsoSistema, IResponseUsoSistemaSchema } from "../interfaces/backoffice.usosistema.interface";
import Database from "../db/index";
import { ZodError } from "zod";

export class BackofficeUsoSistemaRepository implements IBackofficeUsoSistemaRepository {

    async getResumenUsoSistema( parametro: string): Promise<IResponseUsoSistema> {
        try {

            if (!parametro) {
                throw new HttpException(HttpStatus.BAD_REQUEST, 'Parametro obligatorio');
            }

            const sql = `SELECT * FROM _auth.${parametro}`; //resumen_login_sistema
            const db = new Database();
            const { QueryTypes } = require('sequelize');
            const sequelize = db.sequelize;


            const obras = await sequelize?.query(sql, { type: QueryTypes.SELECT });
            if (!obras) {
                return {
                    maule_norte: [],
                    maule_sur: [],
                    total: []
                }
            }
            const salida = IResponseUsoSistemaSchema.parse(obras[0]);
            return salida;

        } catch (error) {
            if (error instanceof ZodError) {
                const mensaje = error.issues.map(issue => 'Error en campo: '+issue.path[0]+' -> '+issue.message).join('; ');
                throw new HttpException(HttpStatus.BAD_REQUEST, mensaje);
            }
            if (error instanceof HttpException) {
                throw new HttpException(error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el historico de login del sistema");
        }
    }


    async getObrasSinRep(): Promise<IObrasSinRep> {

        try {

            const sql = `SELECT ( SELECT row_to_json(c.*) AS periodo
            FROM ( SELECT (now()::timestamp without time zone AT TIME ZONE 'america/santiago'::text)::date - b.valor AS desde,
                     (now()::timestamp without time zone AT TIME ZONE 'america/santiago'::text)::date AS hasta
                    FROM ( SELECT
                                 CASE
                                     WHEN a.valor IS NULL THEN 7
                                     ELSE a.valor
                                 END AS valor
                            FROM ( SELECT sum(parametros_config.valor::integer)::integer AS valor
                                    FROM _comun.parametros_config
                                   WHERE parametros_config.clave::text = 'dias_reporte_sinrepdiario'::text) a) b) c) AS periodo,
         ( SELECT array_agg(row_to_json(z.*)) AS detalle
            FROM ( SELECT a.id_obra AS id,
                     a.codigo_obra,
                     a.fecha_reporte AS fecha_ultimo,
                     a.dias AS dias_sin_rep
                    FROM ( SELECT DISTINCT ON (erd.id_obra) erd.id_obra,
                             o.codigo_obra,
                             erd.fecha_reporte,
                             now()::date - erd.fecha_reporte AS dias
                            FROM obras.obras o
                              JOIN obras.encabezado_reporte_diario erd ON o.id = erd.id_obra
                           WHERE NOT o.eliminada AND (o.estado <> ALL (ARRAY[6, 7, 8]))
                           ORDER BY erd.id_obra, erd.fecha_reporte DESC) a
                   WHERE a.dias > (( SELECT
                                 CASE
                                     WHEN a_1.valor IS NULL THEN 7
                                     ELSE a_1.valor
                                 END AS valor
                            FROM ( SELECT sum(parametros_config.valor::integer)::integer AS valor
                                    FROM _comun.parametros_config
                                   WHERE parametros_config.clave::text = 'dias_reporte_sinrepdiario'::text) a_1))
                   ORDER BY a.fecha_reporte DESC) z) AS detalle;`;

            const db = new Database();
            const { QueryTypes } = require('sequelize');
            const sequelize = db.sequelize;


            const obras = await sequelize?.query(sql, { type: QueryTypes.SELECT });

            if (!obras) {
                return {
                    cantidad: 0,
                    periodo: null,
                    detalle: []
                }
            }
            const obrasSalida = IObrasSinRepSchemaNoCantidad.parse( obras[0] );
            const salida = {
                ...obrasSalida,...{
                    cantidad: obrasSalida.detalle.length}
            }
            return salida;

        } catch (error) {
            if (error instanceof ZodError) {
                const mensaje = error.issues.map(issue => 'Error en campo: '+issue.path[0]+' -> '+issue.message).join('; ');
                throw new HttpException(HttpStatus.BAD_REQUEST, mensaje);
            }
            if (error instanceof HttpException) {
                throw new HttpException(error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener el historico de login del sistema");
        }
    }

}

export default new BackofficeUsoSistemaRepository();