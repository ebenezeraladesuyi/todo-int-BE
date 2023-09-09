import { Router } from "express";
import { createTask, deleteTask, editTask, getAllTasks } from "../controller/taskController";


const router = Router()


router.route("/createtask/:userId").post(createTask)
router.route("/deleteTask/:userId/:taskId").delete(deleteTask)
router.route("/editTask/:userId/:taskId").patch(editTask)
router.route("/getalltasks/:userId").get(getAllTasks)


export default router;
