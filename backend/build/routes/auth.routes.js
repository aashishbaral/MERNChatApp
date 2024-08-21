"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const errorHandler_1 = __importDefault(require("../services/errorHandler"));
const router = express_1.default.Router();
router.route("/register").post((0, errorHandler_1.default)(auth_controller_1.default.registerUser));
router.route("/login").post((0, errorHandler_1.default)(auth_controller_1.default.loginUser));
router.route("/logout").get((0, errorHandler_1.default)(auth_controller_1.default.logoutUser));
exports.default = router;
