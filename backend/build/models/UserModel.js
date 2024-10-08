"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authTypes_1 = require("../types/authTypes");
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: authTypes_1.Gender,
    },
    profilePicture: {
        type: String,
        default: "",
    },
}, { timestamps: true });
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
