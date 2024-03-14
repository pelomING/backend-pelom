import { config } from "../config/auth.config";
import { IAuthRepository, ISignInInput, IRespuestaLogin, IMenuItem, IJsonMenu } from "../interfaces/auth.interface";
import User from "../models/auth/user.model";
import UsuariosFunciones from "../models/auth/usuariosFunciones.model";
import VerHomepage from "../models/frontend/verHomepage.model";
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
                const rol_consulta = idRole[0]?idRole[0]:0;

                //Si usuario = password debe cambiar la password de inmediato para utilizar el sistema
                //mensaje=2 es para cambio de password, mensaje=1 es normal
                const mensaje_id = buscaUser.username===buscaUser.password?2:1; 

                //consulta el mensaje de inicio y el homepage de acuerdo al numero de mensaje y rol
                const verHomepage = await VerHomepage.findOne({ attributes: ['mensaje', 'homepage'], where: { mensajeId: mensaje_id, rolId: rol_consulta}});
    
                const mensajeMenu = verHomepage?.mensaje?verHomepage.mensaje:null;
                const homepage = verHomepage?.homepage?verHomepage.homepage:null;

                //si requeire cambio de password deb ir con id_servicio = 0
                const where = buscaUser.username===buscaUser.password?{ rol_id: rol_consulta, id_servicio: 0 }:{ rol_id: rol_consulta };
                //En la tabla Menu se especifican los campos porque el sequelize agrega 
                //por defecto un campo id que no existe en la tabla Menu
                const menuUsuario = await Menu.findAll({attributes: ['rol_id', 'rol_modulo_id', 'label', 'items', 'orden', 'id_servicio'], 
                                                        where: where });

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
                    mensaje: mensajeMenu,
                    homepage: homepage,
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