import mongoose from "mongoose";

interface userData {
    userName? : string;
    email? : string;
    password? : string;
    tasks? : any[]
}

interface iUser extends userData, mongoose.Document{}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "myTask"
        }
    ]
})

const userModel = mongoose.model<iUser>("myUser", userSchema)

export default userModel;

