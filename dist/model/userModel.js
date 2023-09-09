"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "myTask"
        }
    ]
});
const userModel = mongoose_1.default.model("myUser", userSchema);
exports.default = userModel;
