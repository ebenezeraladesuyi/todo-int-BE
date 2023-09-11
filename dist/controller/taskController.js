"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = exports.editTask = exports.deleteTask = exports.createTask = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const mongoose_1 = __importDefault(require("mongoose"));
// create task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const getUser = yield userModel_1.default.findById(req.params.userId);
        if (getUser) {
            const { title, date, startTime, endTime } = req.body;
            let myDate = Date.now().toLocaleString();
            const newTask = yield taskModel_1.default.create({
                title,
                date: date ? date : myDate,
                startTime,
                endTime,
                status: false,
            });
            yield ((_a = getUser === null || getUser === void 0 ? void 0 : getUser.tasks) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(newTask._id)));
            getUser.save();
            return res.status(200).json({
                message: "new task created",
                data: newTask
            });
        }
        else {
            return res.status(500).json({
                message: "user not found"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            message: "failed creating task",
            err: err
        });
    }
});
exports.createTask = createTask;
// delete task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user = yield userModel_1.default.findById(req.params.userId);
        if (user) {
            const findTask = yield taskModel_1.default.findByIdAndDelete(req.params.taskId);
            yield ((_b = user === null || user === void 0 ? void 0 : user.tasks) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(findTask === null || findTask === void 0 ? void 0 : findTask._id)));
            user.save();
            return res.status(200).json({
                message: "tasks deleted"
            });
        }
        else {
            return res.status(400).json({
                message: "user not found"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            message: "failed to delete",
            err: err
        });
    }
});
exports.deleteTask = deleteTask;
// edit task
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, date, startTime, endTime } = req.body;
        const getUserr = yield userModel_1.default.findById(req.params.userId);
        if (getUserr) {
            const checkTask = yield taskModel_1.default.findById(req.params.taskId);
            const edit = yield taskModel_1.default.findByIdAndUpdate(checkTask === null || checkTask === void 0 ? void 0 : checkTask._id, {
                title,
                date,
                startTime,
                endTime
            }, { new: true });
            return res.status(200).json({
                message: "task edited",
                data: edit,
            });
        }
        else {
            return res.status(400).json({
                message: "user not found"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            message: "failed to edit task"
        });
    }
});
exports.editTask = editTask;
//Get all tasks 
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOne = yield userModel_1.default.findById(req.params.userId);
        if (getOne) {
            const getAllTask = yield taskModel_1.default.find();
            return res.status(200).json({
                message: 'All tasks gotten successfully',
                data: getAllTask
            });
        }
        else {
            return res.status(400).json({
                message: "user not found"
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            message: "error getting tasks",
            err: err
        });
    }
});
exports.getAllTasks = getAllTasks;
