"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const databaseConfig_1 = __importDefault(require("./database/databaseConfig"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const socket_1 = require("./socket/socket");
dotenv_1.default.config();
socket_1.app.use(express_1.default.json()); // to parse incoming requests with JSON payloads
socket_1.app.use(express_1.default.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
socket_1.app.use((0, cookie_parser_1.default)());
const _dirname = path_1.default.resolve();
const port = process.env.PORT || 5000;
socket_1.app.use("/api/auth", auth_routes_1.default);
socket_1.app.use("/api/message", message_routes_1.default);
socket_1.app.use("/api/users", users_routes_1.default);
socket_1.app.use(express_1.default.static(path_1.default.join(_dirname, "/frontend/dist")));
socket_1.app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(_dirname, "/frontend/dist/index.html"));
});
socket_1.server.listen(port, () => {
    (0, databaseConfig_1.default)();
});
