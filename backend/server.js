import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// ----------------------
// Middleware
// ----------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ----------------------
// Database Connection
// ----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB error:", err));

// ----------------------
// HTTP + Socket.IO Server
// ----------------------
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", () => console.log("Socket connected"));

// ----------------------
// API Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ----------------------
// Serve React Frontend
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// IMPORTANT: Express v5 requires "/*", not "*"
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
