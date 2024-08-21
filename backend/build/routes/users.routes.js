"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const errorHandler_1 = __importDefault(require("../services/errorHandler"));
const router = express_1.default.Router();
router
    .route("/")
    .get(authMiddleware_1.default.isAuthenticated, (0, errorHandler_1.default)(user_controller_1.default.getUsers));
exports.default = router;
