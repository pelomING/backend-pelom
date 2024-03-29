import { z } from "zod";
import { zodErrorMap } from "../common/zod.common";
import { DataStoredInToken } from "./dataStoredInToken";

z.setErrorMap(zodErrorMap);

interface ICreaBomInput {
    id_obra: number,
    reserva: number,
    materiales: string
}

const ICreaBomInputSchema = z.object({
    id_obra: z.coerce.number().int().positive(),
    reserva: z.coerce.number().int().positive(),
    materiales: z.string().regex(/^([1-9]\d+|[1-9])+_\d+(.\d+)?(-([1-9]\d+|[1-9])+_\d+(.\d+)?)*$/gm),
})

interface ICreaBomOutput {
    error: boolean,
    message: string
}

interface IConsultaBomInput {
    id_obra: number
}

const IConsultaBomInputSchema = z.object({
    id_obra: z.coerce.number().int().positive(),
})

interface IConsultaBomOutput {
    id: number,
    id_obra: number,
    cod_reserva: number,
    codigo_sap_material: number,
    cantidad_requerida: number,
    fecha_ingreso: string,
    rut_usuario: string,
    persona: string
}

const IConsultaBomOutputSchema = z.object({
    id: z.coerce.number(),
    id_obra: z.coerce.number(),
    cod_reserva: z.coerce.number(),
    codigo_sap_material: z.coerce.number(),
    cantidad_requerida: z.coerce.number(),
    fecha_ingreso: z.coerce.string(),
    rut_usuario: z.coerce.string(),
    persona: z.coerce.string(),
  });

const IArrayConsultaBomOutputSchema = z.array(IConsultaBomOutputSchema);

interface IBackofficeBomRepository {
    createBomMasivo(bom: ICreaBomInput, userStored: DataStoredInToken): Promise<ICreaBomOutput>;
    getBomZero(consultaBomInput: IConsultaBomInput): Promise<IConsultaBomOutput[]>;
    getBomFinal(consultaBomInput: IConsultaBomInput): Promise<IConsultaBomOutput[]>;
}

export { IBackofficeBomRepository, 
    ICreaBomInput, 
    ICreaBomInputSchema, 
    ICreaBomOutput, 
    IConsultaBomInput,
    IConsultaBomOutput, 
    IConsultaBomInputSchema,
    IConsultaBomOutputSchema,
    IArrayConsultaBomOutputSchema }