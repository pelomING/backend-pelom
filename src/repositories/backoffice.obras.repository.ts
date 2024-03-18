import HttpException from "../common/http-exception";
import { HttpStatus } from "../interfaces/httpStatus";
import Database from "../db/index";
import { IBackofficeObrasRepository, IObra, IObraSchema } from "../interfaces/backoffice.obras.interface";

export class BackofficeObrasRepository implements IBackofficeObrasRepository {

    async findAllObra(vista: string): Promise<Array<IObra>> {
        try {

            let where = " and 111 = ANY (vistas)";
            if (vista) {
                where = " and " + vista + " = ANY (vistas)";
            }
            const sql = `
            SELECT o.id,
            o.codigo_obra,
            o.numero_ot,
            o.nombre_obra,
            row_to_json(z.*) AS zona,
            row_to_json(d.*) AS delegacion,
            o.gestor_cliente,
            o.numero_aviso,
            o.numero_oc,
            o.monto,
            o.cantidad_uc,
            o.fecha_llegada::text AS fecha_llegada,
            o.fecha_inicio::text AS fecha_inicio,
            o.fecha_termino::text AS fecha_termino,
            row_to_json(tt.*) AS tipo_trabajo,
            o.persona_envia_info,
            o.cargo_persona_envia_info,
            row_to_json(ec.*) AS empresa_contratista,
            row_to_json(cc.*) AS coordinador_contratista,
            row_to_json(c.*) AS comuna,
            o.ubicacion,
            row_to_json(eo.*) AS estado,
            row_to_json(tob.*) AS tipo_obra,
            row_to_json(s.*) AS segmento,
            o.eliminada,
                CASE
                    WHEN erd.cuenta IS NULL THEN 0::bigint
                    ELSE erd.cuenta
                END AS cantidad_reportes,
                CASE
                    WHEN erd.pendiente IS NULL THEN 0::bigint
                    ELSE erd.pendiente
                END AS reportes_pendientes,
            o.jefe_delegacion,
                CASE
                    WHEN cep.cuenta IS NULL THEN 0::bigint
                    ELSE cep.cuenta
                END AS cantidad_estados_pago,
            row_to_json(ofi.*) AS oficina,
            row_to_json(rec.*) AS recargo_distancia,
            ohc.fecha_hora::text AS fecha_estado,
            row_to_json(op.*) AS obra_paralizada,
            row_to_json(oc.*) AS obras_cierres,
            evm.vistas,
            cep.hay_dato AS hay_ep,
            erd.hay_dato AS hay_rd,
            vt.hay_dato_vt AS hay_vt
           FROM obras.obras o
             LEFT JOIN ( SELECT DISTINCT ON (obras_historial_cambios.id_obra) obras_historial_cambios.id_obra,
                    obras_historial_cambios.fecha_hora
                   FROM obras.obras_historial_cambios
                  ORDER BY obras_historial_cambios.id_obra, obras_historial_cambios.fecha_hora DESC) ohc ON o.id = ohc.id_obra
             LEFT JOIN ( SELECT DISTINCT ON (obras_paralizacion.id_obra) obras_paralizacion.id_obra,
                    obras_paralizacion.fecha_hora::text AS fecha_hora,
                    obras_paralizacion.responsable,
                    obras_paralizacion.motivo,
                    obras_paralizacion.observacion
                   FROM obras.obras_paralizacion
                  ORDER BY obras_paralizacion.id_obra, (obras_paralizacion.fecha_hora::text) DESC) op ON o.id = op.id_obra
             LEFT JOIN ( SELECT DISTINCT ON (obras_cierres.id_obra) obras_cierres.id_obra,
                    obras_cierres.fecha_hora::text AS fecha_hora,
                    obras_cierres.supervisor_responsable,
                    obras_cierres.coordinador_responsable,
                    obras_cierres.ito_mandante,
                    obras_cierres.observacion
                   FROM obras.obras_cierres
                  ORDER BY obras_cierres.id_obra, (obras_cierres.fecha_hora::text) DESC) oc ON o.id = oc.id_obra
             LEFT JOIN _comun.zonal z ON o.zona = z.id
             LEFT JOIN obras.delegaciones d ON o.delegacion = d.id
             LEFT JOIN obras.tipo_trabajo tt ON o.tipo_trabajo = tt.id
             LEFT JOIN obras.empresas_contratista ec ON o.empresa_contratista = ec.id
             LEFT JOIN obras.coordinadores_contratista cc ON o.coordinador_contratista = cc.id
             LEFT JOIN _comun.comunas c ON o.comuna::text = c.codigo::text
             LEFT JOIN obras.estado_obra eo ON o.estado = eo.id
             LEFT JOIN obras.tipo_obra tob ON o.tipo_obra = tob.id
             LEFT JOIN obras.segmento s ON o.segmento = s.id
             LEFT JOIN ( SELECT encabezado_reporte_diario.id_obra,
                    count(encabezado_reporte_diario.id) AS cuenta,
                    sum(
                        CASE
                            WHEN encabezado_reporte_diario.id_estado_pago IS NULL THEN 1
                            ELSE 0
                        END) AS pendiente,
                        CASE
                            WHEN count(encabezado_reporte_diario.id) > 0 THEN true
                            ELSE false
                        END AS hay_dato
                   FROM obras.encabezado_reporte_diario
                  GROUP BY encabezado_reporte_diario.id_obra) erd ON o.id = erd.id_obra
             LEFT JOIN ( SELECT encabezado_estado_pago.id_obra,
                    count(encabezado_estado_pago.id) AS cuenta,
                        CASE
                            WHEN count(encabezado_estado_pago.id) > 0 THEN true
                            ELSE false
                        END AS hay_dato
                   FROM obras.encabezado_estado_pago
                  GROUP BY encabezado_estado_pago.id_obra) cep ON o.id = cep.id_obra
             LEFT JOIN ( SELECT visitas_terreno.id_obra,
                        CASE
                            WHEN count(visitas_terreno.id_obra) > 0 THEN true
                            ELSE false
                        END AS hay_dato_vt
                   FROM obras.visitas_terreno
                  GROUP BY visitas_terreno.id_obra) vt ON o.id = vt.id_obra
             LEFT JOIN ( SELECT os.id,
                    o_1.nombre AS oficina,
                    so.nombre AS supervisor
                   FROM obras.oficina_supervisor os
                     JOIN _comun.oficinas o_1 ON os.oficina = o_1.id
                     JOIN obras.supervisores_contratista so ON os.supervisor = so.id) ofi ON o.oficina = ofi.id
             JOIN ( SELECT vista_estado_muestra.estado_obra_id,
                    vista_estado_muestra.requiere_rep_dia,
                    vista_estado_muestra.requiere_est_pago,
                    array_agg(vista_estado_muestra.vista) AS vistas
                   FROM obras.vista_estado_muestra
                  GROUP BY vista_estado_muestra.estado_obra_id, vista_estado_muestra.requiere_rep_dia, 
                  vista_estado_muestra.requiere_est_pago) evm ON o.estado = evm.estado_obra_id
             LEFT JOIN ( SELECT recargos.id,
                    recargos.nombre,
                    recargos.porcentaje
                   FROM obras.recargos
                  WHERE recargos.id_tipo_recargo = 2) rec ON o.recargo_distancia = rec.id
          WHERE
                CASE
                    WHEN evm.requiere_rep_dia THEN
                    CASE
                        WHEN erd.hay_dato THEN true
                        ELSE false
                    END
                    ELSE true
                END AND
                CASE
                    WHEN evm.requiere_est_pago THEN
                    CASE
                        WHEN cep.hay_dato THEN true
                        ELSE false
                    END
                    ELSE true
                END AND NOT o.eliminada ${where}
          ORDER BY o.id DESC;`;

            const db = new Database();
            const { QueryTypes } = require('sequelize');
            const sequelize = db.sequelize;


            const obras = await sequelize?.query(sql, { type: QueryTypes.SELECT });
            if (!obras) {
                return [];
            }
            const salida: Array<IObra> = obras?.map( (element: any) => {
                const respuesta = IObraSchema.parse(element);
                return respuesta;
            });
            return salida;
        } catch (error) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener las obras");
        }
    }

}

export default new BackofficeObrasRepository();