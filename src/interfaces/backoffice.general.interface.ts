import { z } from "zod";

const IdSchema = z.number().int().min(1);

const ITipoObraSchema = z.object({
    //id: z.string().transform((value) => parseInt(value)),
    id: z.coerce.number().int(),
    descripcion: z.string(),
    bg_color: z.string(),
    txt_color: z.string().nullable()
})

type ITipoObra = z.infer<typeof ITipoObraSchema>;

interface IBackofficeGeneralRepository {
    findAllTipoObra(): Promise<Array<ITipoObra>>;
}
/////////////////////////////////////////////////////
const ITipoOperacionSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string()
});

type ITipoOperacion = z.infer<typeof ITipoOperacionSchema>;

interface IBackofficeGeneralRepository {
    findAllTipoOperacion(): Promise<Array<ITipoOperacion>>
}
/////////////////////////////////////////////////////
const ITipoActividadSchema = z.object({
    id: z.coerce.number().int(),
    descripcion: z.string()
});

type ITipoActividad = z.infer<typeof ITipoActividadSchema>;

interface IBackofficeGeneralRepository {
    findAllTipoActividad(): Promise<Array<ITipoActividad>>
}
/////////////////////////////////////////////////////
const IMaestroActividadSchema = z.object({
    id: z.coerce.number().int(),
    actividad: z.string(),
    tipo_actividad: ITipoActividadSchema,
    uc_instalacion: z.coerce.number(),
    uc_retiro: z.coerce.number(),
    uc_traslado: z.coerce.number(),
    descripcion: z.string()
});

type IMaestroActividad = z.infer<typeof IMaestroActividadSchema>;

interface IBackofficeGeneralRepository {
    findAllMaestroActividad(): Promise<Array<IMaestroActividad>>
    findOneMaestroActividad(id: number): Promise<IMaestroActividad | null | undefined>;
    findAllMaestroActividadByActividad(actividad: string): Promise<Array<IMaestroActividad>>
}
/////////////////////////////////////////////////////
const IZonalSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string()
})

type IZonal = z.infer<typeof IZonalSchema>;

interface IBackofficeGeneralRepository {
    findAllZonales(): Promise<Array<IZonal>>
}
/////////////////////////////////////////////////////
const IDelegacionSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string()
})

type IDelegacion = z.infer<typeof IDelegacionSchema>;

interface IBackofficeGeneralRepository {
    findAllDelegaciones(): Promise<Array<IDelegacion>>
}
/////////////////////////////////////////////////////
const ITipoTrabajoSchema = z.object({
    id: z.coerce.number().int(),
    descripcion: z.string()
})

type ITipoTrabajo = z.infer<typeof ITipoTrabajoSchema>;

interface IBackofficeGeneralRepository {
    findAllTipoTrabajo(): Promise<Array<ITipoTrabajo>>
}
/////////////////////////////////////////////////////
const IEmpresaContratistaSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string(),
    rut: z.string()
})

type IEmpresaContratista = z.infer<typeof IEmpresaContratistaSchema>;               

interface IBackofficeGeneralRepository {
    findAllEmpresasContratistas(): Promise<Array<IEmpresaContratista>>
}
/////////////////////////////////////////////////////
const ICoordinadorContratistaSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string(),
    id_empresa: z.coerce.number().int(),
    rut: z.string()
})

type ICoordinadorContratista = z.infer<typeof ICoordinadorContratistaSchema>;

interface IBackofficeGeneralRepository {
    findAllCoordinadoresContratistas(): Promise<Array<ICoordinadorContratista>>
}
/////////////////////////////////////////////////////
const IComunaSchema = z.object({
    codigo: z.string(),
    nombre: z.string(),
    provincia: z.string()
})

type IComuna = z.infer<typeof IComunaSchema>;

interface IBackofficeGeneralRepository {
    findAllComunas(): Promise<Array<IComuna>>
}
/////////////////////////////////////////////////////
const IEstadoObraSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string(),
    color: z.string()
})

type IEstadoObra = z.infer<typeof IEstadoObraSchema>;

interface IBackofficeGeneralRepository {
    findAllEstadosObra(): Promise<Array<IEstadoObra>>
}
/////////////////////////////////////////////////////
const IEstadoVisitaSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string(),
    estado_obra_resultante: z.coerce.number().int()
})

type IEstadoVisita = z.infer<typeof IEstadoVisitaSchema>;

interface IBackofficeGeneralRepository {
    findAllEstadosVisita(): Promise<Array<IEstadoVisita>>
}
/////////////////////////////////////////////////////
const ISegmentoSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string(),
    descripcion: z.string()
})

type ISegmento = z.infer<typeof ISegmentoSchema>;

interface IBackofficeGeneralRepository {
    findAllSegmentos(): Promise<Array<ISegmento>>
}
/////////////////////////////////////////////////////
const IOficinaSupervisorSchema = z.object({
    id: z.coerce.number().int(),
    oficina: z.string(),
    supervisor: z.string()
})

type IOficinaSupervisor = z.infer<typeof IOficinaSupervisorSchema>

interface IBackofficeGeneralRepository {
    findAllOficinasSupervisores(): Promise<Array<IOficinaSupervisor >>
}
/////////////////////////////////////////////////////
const IRecargoDistanciaSchema = z.object({
    id: z.coerce.number().int(),
    nombre: z.string(),
    porcentaje: z.coerce.number()
})

type IRecargoDistancia = z.infer<typeof IRecargoDistanciaSchema>;

interface IBackofficeGeneralRepository {
    findAllRecargosDistancias(): Promise<Array<IRecargoDistancia>>
}
/////////////////////////////////////////////////////
const IResumenGeneralSchema = z.object({
    servicio: z.string(),
    produccion: z.string()
})

type IResumenGeneral = z.infer<typeof IResumenGeneralSchema>;

interface IBackofficeGeneralRepository {
    getResumenGeneral(): Promise<Array<IResumenGeneral>>
}
/////////////////////////////////////////////////////
const IUsuariosFuncionesSchema = z.object({
    id: z.coerce.number().int(),
    username: z.string(),
    email: z.string(),
    funcion: z.string(),
    nombres: z.string(),
    fecha_password: z.string()
})

type IUsuariosFunciones = z.infer<typeof IUsuariosFuncionesSchema>;

interface IBackofficeGeneralRepository {
    findAllUsuariosFunciones(): Promise<Array<IUsuariosFunciones>>
}
/////////////////////////////////////////////////////

export { 
    IBackofficeGeneralRepository, 
    IdSchema,
    ITipoObraSchema, 
    ITipoObra, 
    ITipoOperacionSchema, 
    ITipoOperacion,
    ITipoActividadSchema,
    ITipoActividad,
    IMaestroActividadSchema,
    IMaestroActividad,
    IZonalSchema,
    IZonal,
    IDelegacionSchema,
    IDelegacion,
    ITipoTrabajoSchema,
    ITipoTrabajo,
    IEmpresaContratistaSchema,
    IEmpresaContratista,
    ICoordinadorContratistaSchema,
    ICoordinadorContratista,
    IComunaSchema,
    IComuna,
    IEstadoObraSchema,
    IEstadoObra,
    IEstadoVisitaSchema,
    IEstadoVisita,
    ISegmentoSchema,
    ISegmento,
    IOficinaSupervisorSchema,
    IOficinaSupervisor,
    IRecargoDistanciaSchema,
    IRecargoDistancia,
    IResumenGeneralSchema,
    IResumenGeneral,
    IUsuariosFuncionesSchema,
    IUsuariosFunciones
};