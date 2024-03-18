import { z } from "zod";
import {  IZonalSchema, IDelegacionSchema, ITipoTrabajoSchema, 
    IEmpresaContratistaSchema, ICoordinadorContratistaSchema, IComunaSchema,
    IEstadoObraSchema, ITipoObraSchema, ISegmentoSchema, IOficinaSupervisorSchema,
    IRecargoDistanciaSchema } from "./backoffice.general.interface";

const IObrasParalizacionSchema = z.object({
    id: z.coerce.number().int(),
    id_obra: z.coerce.number().int(),
    fecha_hora: z.string(),
    responsble: z.string(),
    motivo: z.string(),
    observacion: z.string(),
    usuario_rut: z.string()
})

const IObrasCierresSchema = z.object({
    id: z.coerce.number().int(),
    id_obra: z.coerce.number().int(),
    fecha_hora: z.string(),
    supervisor_responsable: z.string(),
    coordinador_responsable: z.string(),
    ito_mandante: z.string(),
    observacion: z.string(),
    usuario_rut: z.string()
})

const IObraSchema = z.object({

    id: z.coerce.number().int(),
    codigo_obra: z.string(),
    numero_ot: z.string(),
    nombre_obra: z.string(),
    zona: IZonalSchema.nullable(),
    delegacion: IDelegacionSchema.nullable(),
    gestor_cliente: z.string(),
    numero_aviso: z.coerce.number().int(),
    numero_oc: z.string(),
    monto: z.coerce.number(),
    cantidad_uc: z.coerce.number(),
    fecha_llegada: z.string(),
    fecha_inicio: z.string(),
    fecha_termino: z.string(),
    tipo_trabajo: ITipoTrabajoSchema.nullable(),
    persona_envia_info: z.string(),
    cargo_persona_envia_info: z.string(),
    empresa_contratista: IEmpresaContratistaSchema.nullable(),
    coordinador_contratista: ICoordinadorContratistaSchema.nullable(),
    comuna: IComunaSchema.nullable(),
    ubicacion: z.string(),
    estado: IEstadoObraSchema.nullable(),
    tipo_obra: ITipoObraSchema.nullable(),
    segmento: ISegmentoSchema.nullable(),
    eliminada: z.coerce.boolean(),
    cantidad_reportes: z.coerce.number().int(),
    reportes_pendientes: z.coerce.number().int(),
    jefe_delegacion: z.string().nullable(),
    cantidad_estados_pago: z.coerce.number().int(),
    oficina: IOficinaSupervisorSchema.nullable(),
    recargo_distancia: IRecargoDistanciaSchema.nullable(),
    fecha_estado: z.string(),
    obra_paralizada: IObrasParalizacionSchema.nullable(),
    obras_cierres: IObrasCierresSchema.nullable(),
    hay_vt: z.coerce.boolean()
})

type IObra = z.infer<typeof IObraSchema>;

interface IBackofficeObrasRepository {
    findAllObra(vista: string): Promise<Array<IObra>>
}

export { IObraSchema, IObra, IBackofficeObrasRepository };