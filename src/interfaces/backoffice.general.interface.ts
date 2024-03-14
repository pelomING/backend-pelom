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
    IEmpresaContratista};