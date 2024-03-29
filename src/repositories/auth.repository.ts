import { config } from "../config/auth.config";
import { ZodError } from "zod";
import { IAuthRepository, ISignInInput, IRespuestaLogin, IMenuItem, IJsonMenu, ICambioPassInput, IRespuestaCambioPass, ICambioPassInputSchema } from "../interfaces/auth.interface";
import User from "../models/auth/user.model";
import UsuariosFunciones from "../models/auth/usuariosFunciones.model";
import VerHomepage from "../models/frontend/verHomepage.model";
import Menu from "../models/auth/menu.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DataStoredInToken } from "../interfaces/dataStoredInToken";
import { AuthError } from "../common/auth-error";
import HttpException from "../common/http-exception";
import { HttpStatus } from "../interfaces/httpStatus";
import Database from "../db/index";
import LoginHistorial from "../models/auth/loginHistorial.model";

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
                
                
                let authorities = [];
                let idRole = [];
                const roles = await user.$get("roles");
                for (const element of roles) {
                    idRole.push(element.id);
                    authorities.push("ROLE_" + element.name?.toUpperCase());
                }

                const dataStoredInToken: DataStoredInToken = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities
                };
                const token = jwt.sign(dataStoredInToken,
                    config.secret,
                    {
                     algorithm: 'HS256',
                     allowInsecureKeySizes: true,
                     expiresIn: 86400, // 24 hours
                    });

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

    async cambioPassword(input: ICambioPassInput, userStored: DataStoredInToken): Promise<IRespuestaCambioPass> {
        try {
            const validate = ICambioPassInputSchema.parse(input);
            if (!userStored) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, "No autorizado");
            }
            if (validate.password === validate.newPassword) {
                throw new HttpException(HttpStatus.BAD_REQUEST, "La nueva contraseña no puede ser igual a la anterior");
            }
            let condition: IBuscarUser = {};
            condition.username = userStored.username;
            const user = await User.findOne({ where: condition });
            if (!user) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, "No autorizado");
            }
            if (!user.password) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, "No autorizado");
            }
            const passwordIsValid = bcrypt.compareSync(
                validate.password,
                user.password
              );

            if (!passwordIsValid) {
                throw new HttpException(HttpStatus.UNAUTHORIZED, "Password incorrecta");
            };

            if (validate.newPassword === user.password) {
                throw new HttpException(HttpStatus.BAD_REQUEST, "La nueva contraseña no puede ser igual a la anterior");
            }
            const password = bcrypt.hashSync(validate.newPassword, 8);
            const c = new Date().toLocaleString("es-CL", {timeZone: "America/Santiago"});
            const fecha_hoy = c.substring(6,10) + '-' + c.substring(3,5) + '-' + c.substring(0,2)


            const db = new Database();
            const sequelize = db.sequelize;
            const t = await sequelize?.transaction();
            if (!t) {
                throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error en la transacción");
            }
            try {
                await User.update({ password: password, fecha_password: fecha_hoy }, { where: { id: user.id}, transaction: t });
                await LoginHistorial.create({
                    username: user.username,
                    email: user.email,
                    accion: 'Cambio Password',
                    fecha_hora: fecha_hoy, 
                    comentario: 'Password actualizada para el usuario ' + user.username}, {transaction: t});
                await t.commit();
            }catch (error) {
                await t.rollback();
                throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al cambiar la contraseña");
            }
            return {"error": false, "message": "Contraseña cambiada correctamente!"};

        } catch (error) {
            if (error instanceof ZodError) {
                const mensaje = error.issues.map(issue => 'Error en campo: '+issue.path[0]+' -> '+issue.message).join('; ');
                throw new HttpException(HttpStatus.BAD_REQUEST, mensaje);
            }
            if (error instanceof HttpException) {
                throw new HttpException(error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(HttpStatus.BAD_REQUEST, "Los datos vienen en un formato incorrecto");
        }
    }
}

export default new AuthRepository();