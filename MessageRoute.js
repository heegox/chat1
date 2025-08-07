import express from 'express';
import { protectRoute } from '../middleware/Auth.js';
import { getMessages, getUsersForSidebar, markMessagesAsSeen, sendMessage } from '../controlers/MessageController.js';

const MessageRouter = express.Router();

MessageRouter.get("/users", protectRoute, getUsersForSidebar);
MessageRouter.get("/:id", protectRoute, getMessages);
MessageRouter.put("mark/:id", protectRoute, markMessagesAsSeen);
MessageRouter.post("/send/:id", protectRoute, sendMessage);

export default MessageRouter;