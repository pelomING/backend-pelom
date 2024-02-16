import express, { Application } from "express";
import Server from "./src/index";

import swaggerUi from "swagger-ui-express";
import bodyParser from 'body-parser';

const swaggerFile = require('./swagger-output.json')


const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;


app.use(bodyParser.json())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
