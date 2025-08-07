import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/UserRoutes.js";
import MessageRouter from "./routes/MessageRoute.js";
import { Server} from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

//Store online users
export const userSocketMap = {};  // { userId: socketId}

// Sokcet.io connection handler
io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log ("User Connected", userId);

    if(userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Simple health check route
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", MessageRouter);

// Connect to MongoDB
await connectDB();

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
