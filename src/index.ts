import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import cookieSession from "cookie-session";
import Database from "./db";


export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    //new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      credentials: true,
      origin: "http://localhost:4200"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      cookieSession({
        name: "pelom-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true,
      })
    );
  }

  private syncDatabase(): any {
    const db = new Database();
    db.sequelize?.sync();
  }

}
