"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    res.cookie("token", token, {
        httpOnly: true, // cookie cannot be accessed by client-side scripts (XSS protection)
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        sameSite: "strict", // cookie is sent only to the same site as the domain in the address bar (CSRF protection)
        secure: process.env.NODE_ENV === "production",
    });
};
exports.default = generateToken;
