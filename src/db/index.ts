import { Sequelize } from "sequelize-typescript";
import { config, dialect, define } from "../config/db.config";
import Role from "../models/auth/role.model";
import User from "../models/auth/user.model";
import UserRoles from "../models/auth/userRoles.model";
import UsuariosFunciones from "../models/auth/usuariosFunciones.model";
import Menu from "../models/auth/menu.model";
import TipoObra from "../models/obras/tipoObra.model";
import Zonal from "../models/comun/zonal.model";
import MaestroActividad from "../models/obras/maestroActividad.model";
import TipoActividad from "../models/obras/tipoActividad.model";
import VerificaAuth from "../models/auth/verificaAuth.model";
import Delegacion from "../models/obras/delegacion.model";
import TipoTrabajo from "../models/obras/tipoTrabajo.model";
import EmpresaContratista from "../models/obras/empresaContratista.model";
import CoordinadorContratista from "../models/obras/coordinadorContratista.model";
import Comuna from "../models/comun/comuna.model";
import EstadoObra from "../models/obras/estadoObra.model";
import EstadoVisita from "../models/obras/estadoVisita.model";
import Segmento from "../models/obras/segmento.model";
import TipoOperacion from "../models/obras/tipoOperacion.model";
import HttpException from "src/common/http-exception";
import { HttpStatus } from "src/interfaces/httpStatus";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      define: define,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      
      models: [
        Menu,
        Role, 
        User, 
        UserRoles, 
        UsuariosFunciones,
        VerificaAuth, 

        Comuna,
        Zonal,

        CoordinadorContratista,
        Delegacion,
        EmpresaContratista,
        EstadoObra,
        EstadoVisita,
        MaestroActividad,
        Segmento,
        TipoActividad,
        TipoObra,
        TipoOperacion,
        TipoTrabajo]
        
      //models: ["../models/**/*.model.ts"]
    });
    //this.sequelize.addModels(["../models/**/*.model.ts"] )

    await this.sequelize
      .authenticate()
      .then(() => {
        //console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al conectar con la base de datos");
      });
  }
}

export default Database;
