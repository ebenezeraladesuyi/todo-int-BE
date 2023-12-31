import userModel from "../model/userModel";
import taskModel from "../model/taskModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { resolve } from "path";


// create task
export const createTask = async (req: Request, res: Response): Promise<Response> => {
    try {

        const getUser = await userModel.findById(req.params.userId)

        if (getUser) {
            const {title, date, startTime, endTime} = req.body;

            let myDate = Date.now().toLocaleString();
            
            const newTask = await taskModel.create({
                title,
                date: date ? date : myDate,
                startTime,
                endTime,
                status: false,
            });

            await getUser?.tasks?.push(
                new mongoose.Types.ObjectId(newTask._id)
            );

            getUser.save();

            return res.status(200).json({
                message: "new task created",
                data: newTask
            })
        } else {
            return res.status(500).json({
                message: "user not found"
            })
        }
        
    } catch (err) {
        return res.status(400).json({
            message: "failed creating task",
            err: err
        })
    }
}


// delete task
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await userModel.findById(req.params.userId);

        if (user) {
            const findTask = await taskModel.findByIdAndDelete(req.params.taskId);

            await user?.tasks?.push(
                new mongoose.Types.ObjectId(findTask?._id)
            )

            user.save();

            return res.status(200).json({
                message: "tasks deleted"
            })
        } else {
            return res.status(400).json({
                message: "user not found"
    
            })
        }

        
        
    } catch (err) {
        return res.status(400).json({
            message: "failed to delete",
            err: err
        })
    }
}


// edit task
export const editTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            title, 
            date, 
            startTime, 
            endTime
        } = req.body;

        const getUserr = await userModel.findById(req.params.userId);
        
        if (getUserr) {
            const checkTask = await taskModel.findById(req.params.taskId);

            const edit = await taskModel.findByIdAndUpdate(
                checkTask?._id, 
                {
                    title,
                    date,
                    startTime,
                    endTime
                },
                {new: true}
                )
            
                return res.status(200).json({
                    message: "task edited",
                    data: edit,
                })
        } else {
            return res.status(400).json({
                message: "user not found"
            })
        }
        
    } catch (err) {
        return res.status(400).json({
            message: "failed to edit task"
        })
    }
}


//Get all tasks 
export const getAllTasks = async (req: Request, res: Response): Promise<Response> => {
    try {

        const getOne = await userModel.findById(req.params.userId)

        if (getOne) {
            const getAllTask = await taskModel.find()

            return res.status(200).json({
                message: 'All tasks gotten successfully',
                data: getAllTask
            })
        } else {
            return res.status(400).json({
                message: "user not found"
            })
        }

        return res.status(200).json({
            message: "user task gotten",
            data: getOne
        })

    } catch (err) {
        return res.status(400).json({
            message: "error getting tasks",
            err: err
        })
    }
}

// get one task
export const getOneTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const findUser = await userModel.findById(req.params.userId)  

        if (findUser) {
            const findOneTask = await taskModel.findById(req.params.taskId);

            return res.status(200).json({
                message: "task gotten",
                data: findOneTask
            })
        }  else {
            return res.status(400).json({
                message: "task not found"
            })
        }
        
        return res.status(200).json({
            message: "one task found",
            data: findUser
        })

    } catch (err) {
        return res.status(400).json({
            message: "error getting one tasks",
            err: err
        })
    }

}
