import HttpException from "../common/http-exception";
import { HttpStatus } from "../interfaces/httpStatus";
import Database from "../db/index";
import {IArrayConsultaBomOutputSchema, IBackofficeBomRepository, IConsultaBomInput, 
  IConsultaBomInputSchema, IConsultaBomOutput, ICreaBomInput, 
  ICreaBomInputSchema, ICreaBomOutput} from "../interfaces/backoffice.bom.interface";
import { ZodError } from "zod";
import { DataStoredInToken } from "../interfaces/dataStoredInToken";
import VwBomZero from "../models/obras/vwBomZero.model";
import VwBomFinal from "../models/obras/vwBomFinal.model";


interface IArregloMaterial {
    codigo_sap: string,
    cantidad: number
}

interface IObjectoJson {
    [key: string]: any;
}

export class BackofficeBomRepository implements IBackofficeBomRepository {

    async createBomMasivo(bomInput: ICreaBomInput, userStored: DataStoredInToken): Promise<ICreaBomOutput> {

        try{
            const bom = ICreaBomInputSchema.parse(bomInput);
            const { QueryTypes } = require('sequelize');
            const db = new Database();
            const sequelize = db.sequelize;

            let todoOk = false;
            let materiales = bom.materiales;
            let id_obra = bom.id_obra;
            let reserva = bom.reserva;

            let materiales_input = materiales.split("-");
            let sql = "";
            let sql_chek = "";
            let sql_reservas = "";
            let sql_bom_movimientos = "";

            const rut_usuario = userStored.username;

            //Verifica que no repitan los código sap
            let materiales_repetidos = []
            for (const element of materiales_input) {
              if (element) {
                const valores = element.split("_")
                const valor = {"codigo_sap": valores[0], "cantidad": Number(valores[1])}
                materiales_repetidos.push(valor);
              }
            };
            const arreglo_materiales = obtenerValoresUnicosConSuma(materiales_repetidos);

            const codigos_sap = arreglo_materiales.reduce((acumulador, elemento, indice) => {
                // Agregar coma si no es el primer elemento
                if (indice !== 0) {
                    acumulador += ', ';
                }
                // Concatenar el elemento actual al acumulador
                return acumulador + elemento.codigo_sap;
            }, '');
            const cantidades = arreglo_materiales.reduce((acumulador, elemento, indice) => {
                // Agregar coma si no es el primer elemento
                if (indice !== 0) {
                    acumulador += ', ';
                }
                // Concatenar el elemento actual al acumulador
                return acumulador + elemento.cantidad;
            }, '');

            if (codigos_sap) {
                sql_chek = "select m.sap_material from (select unnest(array[" + codigos_sap + "]) as sap_material) as m left join obras.maestro_materiales mm on m.sap_material = mm.codigo_sap where mm.codigo_sap is null;";
  
                sql_bom_movimientos = `INSERT INTO obras.bom_movimientos (
                                              id_obra, 
                                              cod_reserva, 
                                              codigo_sap_material, 
                                              cantidad_requerida_old, 
                                              cantidad_requerida_new, 
                                              tipo_movimiento, 
                                              fecha_movimiento, 
                                              rut_usuario
                                            )
                                      SELECT 
                                          m.id_obra, 
                                          m.cod_reserva, 
                                          m.sap_material, 
                                          case when bm.cantidad_requerida_new is null then 0::bigint else bm.cantidad_requerida_new end 
                                            as cantidad_requerida_old, 
                                          case when m.cant_material <= 0 then 0::numeric else  m.cant_material end 
                                            as cantidad_requerida_new, 
                                          case when m.cant_material <= 0 then 'ELIMINADO' else case when bm.cantidad_requerida_new 
                                            is null then 'INGRESADO' else 'MODIFICADO' end end as tipo_movimiento, 
                                            substring((now()::timestamp at time zone 'utc' at time zone 'america/santiago')::text,1,19)::timestamp as fecha_movimiento, 
                                          '${rut_usuario}'::varchar as rut_usuario 
                                      FROM 
                                        (SELECT ${id_obra}::bigint as id_obra, 
                                              ${reserva}::bigint as cod_reserva, 
                                              unnest(array[${codigos_sap}]) as sap_material, 
                                              unnest(array[${cantidades}]) as cant_material) as m 
                                      LEFT JOIN 
                                        (SELECT DISTINCT ON (id_obra, codigo_sap_material) 
                                            id_obra, 
                                            codigo_sap_material, 
                                            cantidad_requerida_new, 
                                            fecha_movimiento 
                                        FROM obras.bom_movimientos 
                                        ORDER BY 
                                            id_obra, 
                                            codigo_sap_material, 
                                            fecha_movimiento desc
                                        ) bm 
                                      ON bm.id_obra = m.id_obra 
                                      AND bm.codigo_sap_material = m.sap_material`;
              };

              /******************** Chequea materiales no existentes */
            if (sql_chek){

                const check_mat = await sequelize?.query(sql_chek, { type: QueryTypes.SELECT });
                if (check_mat) {
                    if (check_mat.length > 0){
                        throw new HttpException(HttpStatus.BAD_REQUEST, 'Hay materiales no definidos en la base de datos');
                    } else {
                      todoOk = true;
                    }
                } else {
                    throw new HttpException(HttpStatus.BAD_REQUEST, 'Error en la consulta (servidor backend)');
                }
              } 
            else {
                throw new HttpException(HttpStatus.BAD_REQUEST, 'Error en la consulta (servidor backend)');
                };

            /******************** Chequea si la reserva existe */
            sql_chek = "select * from obras.reservas_obras where reserva = " + reserva;
            
            const check_reserva = await sequelize?.query(sql_chek, { type: QueryTypes.SELECT });
            if (check_reserva){
              if (check_reserva.length > 0){
                //la reserva existe, verificar que este asociada al mismo id_obra
                sql_chek = sql_chek + " and id_obra = " + id_obra;
              } else {
                //la reserva no existe, se debe insertar en la tabla reservas_obras
                sql_chek = "";
                sql_reservas = "insert into obras.reservas_obras (id_obra, reserva) values (" + id_obra + ", " + reserva + ");";
              }
            } else {
                throw new HttpException(HttpStatus.BAD_REQUEST, 'Error en la consulta (servidor backend)');
            };

            /******************** Chequea si la reserva está asociada al mismo id_obra */
            if (sql_chek){
                const check_asociada = await sequelize?.query(sql_chek, { type: QueryTypes.SELECT });
                if (check_asociada){
                  if (check_asociada.length > 0){
                    //La reserva está asociada al mismo id_obra, todo ok
                    todoOk = true;
                  } else {
                    //La reserva está asociada a otro id_obra, error
                    throw new HttpException(HttpStatus.BAD_REQUEST, 'La reserva está asignada a otro id_obra');
                  }
                } else {
                  throw new HttpException(HttpStatus.BAD_REQUEST, 'Error en la consulta (servidor backend)');
                }
              };

              /******************** Genera la consulta total 
            */
            if (todoOk){
                if (sql_reservas){
                  sql = sql_reservas + sql_bom_movimientos;
                } else {
                  sql = sql_bom_movimientos;
                }
              }
              if (sql){
                  const crea_bom = await sequelize?.query(sql, { type: QueryTypes.INSERT });
                  if (crea_bom) {
                    return { error: false, message: "Ok" };
                  }
                  else {
                    console.log('crea_bom error -> ');
                    throw new HttpException(HttpStatus.BAD_REQUEST, 'Error en la consulta (servidor backend)');
                  }
              } else {
                throw new HttpException(HttpStatus.BAD_REQUEST, 'Error en la consulta (servidor backend)');
              }
        }catch(error) {
            if (error instanceof ZodError) {
                const mensaje = error.issues.map(issue => 'Error en campo: '+issue.path[0]+' -> '+issue.message).join('; ');
                throw new HttpException(HttpStatus.BAD_REQUEST, mensaje);
            }
            if (error instanceof HttpException) {
                throw new HttpException(error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(HttpStatus.BAD_REQUEST, "Los datos vienen en un formato incorrecto");
        }
    }

    async getBomZero(consultaBomInput: IConsultaBomInput): Promise<IConsultaBomOutput[]> {
        try {

          const validated = IConsultaBomInputSchema.parse(consultaBomInput);
          const bom = await VwBomZero.findAll({
            where: {
            id_obra: validated.id_obra}
            });
          const data = IArrayConsultaBomOutputSchema.parse(bom);
          return data;

        }catch(error) {
            if (error instanceof ZodError) {
                const mensaje = error.issues.map(issue => 'Error en campo: '+issue.path[0]+' -> '+issue.message).join('; ');
                throw new HttpException(HttpStatus.BAD_REQUEST, mensaje);
            }
            if (error instanceof HttpException) {
                throw new HttpException(error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(HttpStatus.BAD_REQUEST, "Los datos vienen en un formato incorrecto");
        }
    }

    async getBomFinal(consultaBomInput: IConsultaBomInput): Promise<IConsultaBomOutput[]> {
      try {

        const validated = IConsultaBomInputSchema.parse(consultaBomInput);
        const bom = await VwBomFinal.findAll({
          where: {
          id_obra: validated.id_obra}
          });
        const data = IArrayConsultaBomOutputSchema.parse(bom);
        return data;

      }catch(error) {
          console.log('error -> ', error);
          if (error instanceof ZodError) {
              const mensaje = error.issues.map(issue => 'Error en campo: '+issue.path[0]+' -> '+issue.message).join('; ');
              throw new HttpException(HttpStatus.BAD_REQUEST, mensaje);
          }
          if (error instanceof HttpException) {
              throw new HttpException(error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR, error.message);
          }
          throw new HttpException(HttpStatus.BAD_REQUEST, "Los datos vienen en un formato incorrecto");
      }
  }
}

function obtenerValoresUnicosConSuma(arreglo: Array<IArregloMaterial>) {

    let objetoResultante: IObjectoJson = {};

    // Iterar sobre el arreglo
    arreglo.forEach((elemento) => {
        const codigo_sap = elemento.codigo_sap;
        const cantidad = elemento.cantidad;

        // Si el código ya existe en el objeto, suma el valor al valor existente
        if (objetoResultante.codigo_sap) {
            objetoResultante[codigo_sap] += cantidad;
        } else {
            // Si el código no existe en el objeto, simplemente agrega el código y el valor
            objetoResultante= {...objetoResultante, [codigo_sap]: cantidad};
        }
    });

    // Convertir el objeto en un arreglo de objetos si es necesario
    const resultado = Object.keys(objetoResultante).map((codigo_sap) => ({
        codigo_sap: codigo_sap,
        cantidad: objetoResultante[codigo_sap]
    }));

    return resultado;
}

export default new BackofficeBomRepository();