import express, { Application } from "express";
import Server from "./src/index";
import { RegisterRoutes } from "./src/routes/routes";

import bodyParser from 'body-parser';

import * as swaggerJson from "./src/swagger.json";
import * as swaggerUI from "swagger-ui-express";
import { errorMiddleware } from "./src/middleware/error.middleware";


const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 7080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

RegisterRoutes(app);
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

//esta línea debe ir después de RegisterRoutes
app.use(errorMiddleware);

app
  .listen(PORT, "localhost", function () {
    console.log(`Server in http://localhost:${PORT}/swagger`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
