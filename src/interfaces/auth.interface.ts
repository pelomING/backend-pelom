import { z } from "zod";
import { zodErrorMap } from "../common/zod.common";

z.setErrorMap(zodErrorMap);

interface IUserRepository {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    sistema?: boolean;
}

interface IRoleRepository {
    id?: number;
    name?: string;
    sistema?: boolean;
}

interface ISignInInput {
    username: string;
    password: string;
}

interface IMenuItem {
    label: string;
    icon: string;
    routerLink: string;
    orden: number;
}

interface IMensajeHome {
    id: number;
    mensaje: string;
}

interface IHomePage {
    id: number;
    routerlink: string;
}

interface IJsonMenu {
    label: string;
    items: Array<Omit<IMenuItem, "orden">>;
}
interface IRespuestaLogin {
    id: number;
    username: string;
    nombre: string;
    funcion: string;
    email: string;
    roles: string[];
    mensaje: IMensajeHome | null | undefined;
    homepage: IHomePage | null | undefined;
    accessToken: string;
    menu: Array<IJsonMenu>;
}

interface ICambioPassInput {
    password: string;
    newPassword: string;
}

interface IRespuestaCambioPass {
    error: boolean,
    message: string
}

const ICambioPassInputSchema = z.object({
    password: z.string(),
    newPassword: z.string(),
});

interface IAuthRepository {
    
    signIn(buscaUser: ISignInInput): Promise<IRespuestaLogin>;
    
    signUp(username: string, email: string, password: string): Promise<IRespuestaLogin>;
    signOut(): string;
    cambioPassword(passUser: ICambioPassInput, userStored: IRespuestaLogin): Promise<IRespuestaCambioPass>;
}


export { 
    IAuthRepository, 
    IUserRepository, 
    IRoleRepository, 
    ISignInInput, 
    IRespuestaLogin, 
    IJsonMenu, 
    IMenuItem,
    IMensajeHome,
    IHomePage,
    ICambioPassInput,
    ICambioPassInputSchema,
    IRespuestaCambioPass};
