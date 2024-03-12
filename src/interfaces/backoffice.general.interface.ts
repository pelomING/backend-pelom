import { z } from "zod";

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

export {ITipoObra, IBackofficeGeneralRepository, ITipoObraSchema};