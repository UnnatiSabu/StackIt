import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import tagRoutes from "./routes/tags.js";
import authRoutes from "./routes/auth.js";
import notificationRoutes from "./routes/notifications.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// Export io instance for use in controllers
export { io };

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/profile", profileRoutes);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
