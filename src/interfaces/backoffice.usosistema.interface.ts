import { z } from "zod";
import { zodErrorMap } from "../common/zod.common";

z.setErrorMap(zodErrorMap);

interface IUsoSistema {
    id: number;
    fecha: string;
    dia: string;
    cantidad: number;
    "bg-color": string;
    "text-color": string;
}

const IUsoSistemaSchema = z.object({
    id: z.coerce.number(),
    fecha: z.string(),
    dia: z.string(),
    cantidad: z.coerce.number(),
    "bg-color": z.string(),
    "text-color": z.string(),
});

interface IResponseUsoSistema {
    maule_norte: IUsoSistema[];
    maule_sur: IUsoSistema[];
    total: IUsoSistema[];
}

const IResponseUsoSistemaSchema = z.object({
    maule_norte: z.array(IUsoSistemaSchema),
    maule_sur: z.array(IUsoSistemaSchema),
    total: z.array(IUsoSistemaSchema),
});

interface IIngresadasResumen {
    id: number;
    fecha: string;
    cantidad: number;
    "bg-color": string;
    "text-color": string;
}

const IIngresadasResumenSchema = z.object({
    id: z.coerce.number(),
    fecha: z.string(),
    cantidad: z.coerce.number(),
    "bg-color": z.string(),
    "text-color": z.string(),
});

interface IPeriodoSinRep {
    desde: string;
    hasta: string;
}

const IPeriodoSinRepSchema = z.object({
    desde: z.string(),
    hasta: z.string(),
});

interface IDetalleSinRep {
    id: number;
    codigo_obra: string;
    fecha_ultimo: string;
    dias_sin_rep: number;
}

const IDetalleSinRepSchema = z.object({
    id: z.coerce.number(),
    codigo_obra: z.string(),
    fecha_ultimo: z.string(),
    dias_sin_rep: z.coerce.number(),
});

interface IObrasSinRep {
    cantidad: number;
    periodo: IPeriodoSinRep | null | undefined;
    detalle: IDetalleSinRep[];
}

const IObrasSinRepSchema = z.object({
    cantidad: z.coerce.number(),
    periodo: IPeriodoSinRepSchema.nullable(),
    detalle: z.array(IDetalleSinRepSchema),
});

const IObrasSinRepSchemaNoCantidad = IObrasSinRepSchema.omit({cantidad: true});

interface IBackofficeUsoSistemaRepository {

    getResumenUsoSistema(parametro: string): Promise<IResponseUsoSistema>;
    getObrasSinRep(): Promise<IObrasSinRep>;
}

export {  
    IIngresadasResumen, 
    IBackofficeUsoSistemaRepository, 
    IObrasSinRep, 
    IDetalleSinRep, 
    IPeriodoSinRep, 
    IIngresadasResumenSchema, 
    IObrasSinRepSchema,
    IResponseUsoSistema,
    IResponseUsoSistemaSchema,
    IObrasSinRepSchemaNoCantidad }