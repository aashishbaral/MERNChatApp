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
const ConversationModel_1 = __importDefault(require("../models/ConversationModel"));
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
const socket_1 = require("../socket/socket");
class MessageController {
    static sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id: receiverId } = req.params;
            const { message } = req.body;
            const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!receiverId || !message) {
                return res
                    .status(400)
                    .json({ message: "Please provide all required fields" });
            }
            let conversation = yield ConversationModel_1.default.findOne({
                members: { $all: [senderId, receiverId] },
            });
            if (!conversation) {
                conversation = yield ConversationModel_1.default.create({
                    members: [senderId, receiverId],
                });
            }
            const newMessage = new MessageModel_1.default({
                senderId,
                receiverId,
                message,
            });
            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }
            yield Promise.all([newMessage.save(), conversation.save()]);
            const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
            if (receiverSocketId) {
                socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
            }
            return res.status(200).json({
                status: true,
                message: "Message sent successfully",
                data: newMessage,
            });
        });
    }
    static getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id: chatUserId } = req.params;
            const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!chatUserId) {
                return res
                    .status(400)
                    .json({ message: "Please provide all required fields" });
            }
            let conversation = yield ConversationModel_1.default.findOne({
                members: { $all: [senderId, chatUserId] },
            }).populate("messages");
            return res.status(200).json({ status: true, data: conversation === null || conversation === void 0 ? void 0 : conversation.messages });
        });
    }
}
exports.default = MessageController;
