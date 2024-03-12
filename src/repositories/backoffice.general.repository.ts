import HttpException from "../common/http-exception";
import { IBackofficeGeneralRepository, ITipoObra, ITipoObraSchema } from "../interfaces/backoffice.general.interface";
import TipoObra from "../models/obras/tipoObra.model";
import { HttpStatus } from "../interfaces/httpStatus";

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
}

export default new BackofficeGeneralRepository();