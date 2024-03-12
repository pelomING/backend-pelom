import { config } from "../config/auth.config";
import { IAuthRepository, ISignInInput, IRespuestaLogin, IMenuItem, IJsonMenu } from "../interfaces/auth.interface";
import User from "../models/auth/user.model";
import UsuariosFunciones from "../models/auth/usuariosFunciones.model";
import Menu from "../models/auth/menu.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DataStoredInToken } from "../interfaces/dataStoredInToken";
import { AuthError } from "../common/auth-error";

interface IBuscarUser {
    [key: string]: any;
}

export class AuthRepository implements IAuthRepository {
    async signIn(buscaUser: ISignInInput): Promise<IRespuestaLogin> {

        let condition: IBuscarUser = {};
        //let salida: IRespuestaLogin = {};

        condition.username = buscaUser.username;
        //condition.password = buscaUser.password;
        
        const user = await User.findOne({ where: condition });
        if (!user) {
            throw new AuthError( `El usuario ${buscaUser.username} no existe`);
        }else{
            if (user.id) {
                
                const passwordIsValid = bcrypt.compareSync(
                    buscaUser.password,
                    user.password?user.password:""
                );
                if (!passwordIsValid) {
                    throw new AuthError( "Password incorrecta");
                }
                const dataStoredInToken: DataStoredInToken = {
                    id: user.id,
                };
                const token = jwt.sign(dataStoredInToken,
                    config.secret,
                    {
                     algorithm: 'HS256',
                     allowInsecureKeySizes: true,
                     expiresIn: 86400, // 24 hours
                    });
                let authorities = [];
                let idRole = [];
                const roles = await user.$get("roles");
                for (const element of roles) {
                    idRole.push(element.id);
                    authorities.push("ROLE_" + element.name?.toUpperCase());
                }

                const userFuncion = await UsuariosFunciones.findOne({
                    where: {
                        id: user.id,
                    }
                });
                let funcion = "";
                if (userFuncion) {
                    funcion = userFuncion.funcion?userFuncion.funcion.toUpperCase():"";
                }
                const menuUsuario = await Menu.findAll({ where: { rol_id: idRole[0]?idRole[0]:0 } });

                function compararPorCampo(a: IMenuItem, b: IMenuItem) {
                    if (a.orden < b.orden) {
                      return -1;
                    }
                    if (a.orden > b.orden) {
                      return 1;
                    }
                    return 0;
                  }
                //determina el menu de salida
                let menu_salida: Array<IJsonMenu> = [];
                if (menuUsuario) {
                    for (const element of menuUsuario) {
                        let salida: IJsonMenu = {label: "", items: []};
                        if (element.items) {
                            element.items.sort(compararPorCampo);
                            let items: Array<IMenuItem> = element.items;
                            salida = {
                                label: element.label?element.label:"",
                                items: items.map(function(item) {
                                    return {label: item.label, icon: item.icon, routerLink: item.routerLink};
                                })
                            }
                        }
                        menu_salida.push(salida);
                    }
                }

                const salida: IRespuestaLogin = {
                    id: user.id?user.id:0,
                    username: user.username?user.username:"",
                    nombre: user.username?user.username:"",
                    funcion: funcion,
                    email: user.email?user.email:"",
                    roles: authorities,
                    accessToken: token,
                    menu: menu_salida
                };
                return salida;
            } else {
                throw new AuthError( `El usuario ${buscaUser.username} no existe`);
            }
        }
}
    
    signUp(username: string, email: string, password: string): Promise<IRespuestaLogin> {
        throw new Error("Method not implemented.");
    }
    signOut(): string {
        return "logout ok";
    }
    
    consultaTest(): Promise<String> {
        const salida: String = "ok";
        return new Promise(resolve => resolve(salida));
    }
}

export default new AuthRepository();