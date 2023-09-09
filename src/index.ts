import express, { Application } from "express";
import appConfig from "./app";
import dbConfig from "./config/db";


const app: Application = express();
appConfig(app);
dbConfig()


const port = 2023;

app.listen(port, () => {
    console.log(`server listening on ${port}`)
});