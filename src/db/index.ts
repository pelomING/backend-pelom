import { Sequelize } from "sequelize-typescript";
import { config, dialect, define } from "../config/db.config";
import HttpException from "../common/http-exception";
import { HttpStatus } from "../interfaces/httpStatus";
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
import VerHomepage from "../models/frontend/verHomepage.model";
import Recargos from "../models/obras/recargo.model";
import Obra from "../models/obras/obra.model";
import ObrasHistorialCambios from "../models/obras/obrasHistorialCambios.model";
import ObrasCierres from "../models/obras/obrasCierres.model";
import ObrasParalizacion from "../models/obras/obrasParalizacion.model";
import ReservasObras from "../models/obras/reservasObras.model";
import LogMovimiento from "../models/obras/logMovimiento.model";
import VwBomZero from "../models/obras/vwBomZero.model";
import VwBomFinal from "../models/obras/vwBomFinal.model";
import LoginHistorial from "../models/auth/loginHistorial.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {

    console.log('config -> ', config);

    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      port: config.PORT,
      dialect: dialect,
      define: define,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      
      models: [
        //Auth
        LoginHistorial,
        Menu,
        Role, 
        User, 
        UserRoles, 
        UsuariosFunciones,
        VerificaAuth, 
        //Comun
        Comuna,
        Zonal,
        //Frontend
        VerHomepage,
        //Obras
        CoordinadorContratista,
        Delegacion,
        EmpresaContratista,
        EstadoObra,
        EstadoVisita,
        LogMovimiento,
        MaestroActividad,
        Obra,
        ObrasCierres,
        ObrasHistorialCambios,
        ObrasParalizacion,
        Recargos,
        ReservasObras,
        Segmento,
        TipoActividad,
        TipoObra,
        TipoOperacion,
        TipoTrabajo,
        VwBomZero,
        VwBomFinal
      ]
        
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
