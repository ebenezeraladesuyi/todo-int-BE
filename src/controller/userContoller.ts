import userModel from "../model/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";



//Get all users
export const getAllUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const getAll = await userModel.find()

        return res.status(200).json({
            message: 'All users gotten successfully',
            data: getAll
        })
        
    } catch (err) {
        return res.status(400).json({
            message: "error getting users",
            err: err
        })
    }
}

//Get one user
export const getOneUSer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const getOne = await userModel.findById(req.params.id)

        return res.status(200).json({
            message: "one user gotton",
            data: getOne
        })
        
    } catch (err) {
        return res.status(400).json({
            message: "failed to get one user",
            err: err
        })
    }
}


//signup new user
export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {

        const{
            userName,
            email,
            password
        } = req.body;

        const slt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, slt)

        const checkExist = await userModel.findOne({ email });

        if (checkExist) {
            return res.status(500).json({
                messagr: "email already exist"
            })
        } else {
            const newUser = await userModel.create({
                userName,
                email,
                password: hash,
            })

            return res.status(200).json({
                message: "new user created",
                data: newUser
            })
        }
        
    } catch (err) {
        return res.status(400).json({
            message: "failed to sign up",
            err: err
        })
    }
}


// signin user
export const signin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        const findUser = await userModel.findOne({ email });

        if (!findUser) {
            return res.status(400).json({
                message: "user doesn't exit"
            })
        } else {
            const comparePassword = await bcrypt.compare(
                password,
                findUser?.password!
            )
            if (!comparePassword) {
                return res.status(500).json({
                    message: "incorrect password"
                })
            }
        }

        return res.status(200).json({
            message: 'login successful'
        })
        
    } catch (err) {
        return res.status(400).json({
            message: "failed to signin",
            err: err
        })
    }
}


