import mongoose from "mongoose";
import { userTask } from "./interface";


interface newTask extends userTask, mongoose.Document{}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    date: {
        type: String,
    },
    status: {
        type: Boolean,
    }
})

const taskModel = mongoose.model<newTask>("myTask", taskSchema)

export default taskModel;