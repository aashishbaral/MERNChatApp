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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
class AuthMiddleWare {
    isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.token;
                if (!token) {
                    return res.status(401).json({ status: false, message: "Unauthorized" });
                }
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res
                            .status(401)
                            .json({ status: false, message: "Unauthorized" });
                    }
                    else {
                        try {
                            const user = yield UserModel_1.default.findById(decoded.userId).select("-password");
                            if (!user) {
                                return res
                                    .status(404)
                                    .json({ status: false, message: "User not found" });
                            }
                            req.user = user.toObject();
                            next();
                        }
                        catch (error) {
                            res
                                .status(500)
                                .json({ status: "false", message: "Internal server error" });
                        }
                    }
                }));
            }
            catch (error) {
                return res.status(500).json({
                    status: "false",
                    message: "Internal server error",
                    errorMessage: error.message,
                });
            }
        });
    }
}
exports.default = new AuthMiddleWare();
