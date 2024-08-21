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
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
class AuthController {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, email, username, password, gender } = req.body;
            if (!fullName || !username || !password || !gender || !email) {
                return res
                    .status(400)
                    .json({ message: "Please provide all required fields" });
            }
            if (password.length < 6) {
                return res
                    .status(400)
                    .json({ message: "Password must be at least 6 characters long" });
            }
            const user = yield UserModel_1.default.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ message: "User with that email already exists" });
            }
            const userNameCheck = yield UserModel_1.default.findOne({ username });
            if (userNameCheck) {
                return res
                    .status(400)
                    .json({ message: "Username already exists !! Try other username" });
            }
            // create a hash of the password
            const salt = yield bcrypt_1.default.genSalt();
            const passwordHash = yield bcrypt_1.default.hash(password, salt);
            //default profile picture
            const boyProfilePicture = "https://avatar.iran.liara.run/public/boy?username=" + username;
            const girlProfilePicture = "https://avatar.iran.liara.run/public/girl?username=" + username;
            const newUser = new UserModel_1.default({
                fullName,
                email,
                username,
                password: passwordHash,
                gender,
                profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture,
            });
            if (newUser) {
                // generate a token using jwt
                (0, generateToken_1.default)(newUser._id.toString(), res);
                yield newUser.save().catch((err) => {
                    return res.status(500).json({
                        status: "false",
                        message: "Something went wrong",
                    });
                });
                return res.status(201).json({
                    status: "true",
                    message: "User registered successfully",
                    data: {
                        _id: newUser._id,
                        fullName: newUser.fullName,
                        email: newUser.email,
                        username: newUser.username,
                        profilePicture: newUser.profilePicture,
                    },
                });
            }
            else {
                return res.status(500).json({
                    status: "false",
                    message: "Something went wrong",
                });
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "Please provide all required fields" });
            }
            const user = yield UserModel_1.default.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ status: "false", message: "Invalid email or password" });
            }
            const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordCheck) {
                return res
                    .status(400)
                    .json({ status: "false", message: "Invalid email or password" });
            }
            (0, generateToken_1.default)(user._id.toString(), res);
            return res.status(200).json({
                status: "true",
                message: "User logged in successfully",
                data: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    username: user.username,
                    profilePicture: user.profilePicture,
                },
            });
        });
    }
    static logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.cookie("token", "", { maxAge: 0 });
            res.status(200).json({ status: "true", message: "User logged out" });
        });
    }
}
exports.default = AuthController;
