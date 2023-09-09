import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes"


const appConfig = (app: Application ) => {
    app.use(express.json()).use(cors());

    // routes
    app.use("/user", userRouter )
    app.use("/user/task", taskRouter )


    app.get("/", (req: Request, res: Response) => {
        return res.status(200).json({
            message : "default get"
        })
    })
}

export default appConfig;