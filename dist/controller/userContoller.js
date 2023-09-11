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
exports.signin = exports.signup = exports.getOneUSer = exports.getAllUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Get all users
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAll = yield userModel_1.default.find();
        return res.status(200).json({
            message: 'All users gotten successfully',
            data: getAll
        });
    }
    catch (err) {
        return res.status(400).json({
            message: "error getting users",
            err: err
        });
    }
});
exports.getAllUser = getAllUser;
//Get one user
const getOneUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOne = yield userModel_1.default.findById(req.params.id);
        return res.status(200).json({
            message: "one user gotton",
            data: getOne
        });
    }
    catch (err) {
        return res.status(400).json({
            message: "failed to get one user",
            err: err
        });
    }
});
exports.getOneUSer = getOneUSer;
//signup new user
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const slt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, slt);
        const checkExist = yield userModel_1.default.findOne({ email });
        if (checkExist) {
            return res.status(500).json({
                messagr: "email already exist"
            });
        }
        else {
            const newUser = yield userModel_1.default.create({
                userName,
                email,
                password: hash,
            });
            return res.status(200).json({
                message: "new user created",
                data: newUser
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            message: "failed to sign up",
            err: err
        });
    }
});
exports.signup = signup;
// signin user
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield userModel_1.default.findOne({ email });
        if (!findUser) {
            return res.status(400).json({
                message: "user doesn't exit"
            });
        }
        else {
            const comparePassword = yield bcrypt_1.default.compare(password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
            if (!comparePassword) {
                return res.status(500).json({
                    message: "incorrect password"
                });
            }
        }
        return res.status(200).json({
            message: 'login successful',
            data: findUser
        });
    }
    catch (err) {
        return res.status(400).json({
            message: "failed to signin",
            err: err
        });
    }
});
exports.signin = signin;
