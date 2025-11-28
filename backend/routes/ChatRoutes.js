import express from "express";
import { StreamChat } from "stream-chat";

const router = express.Router();

const api_key = "dk27mgvx8wrp";
const api_secret = "yyed3mra38m6p6dkqud5mhrweevtt737g55w3ew97pm682ut4xtwgh5rhfdbpmqg"; // Keep secret on backend only
const serverClient = StreamChat.getInstance(api_key, api_secret);

router.get("/api/chat/token", async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ message: "Missing user_id" });

    const token = serverClient.createToken(userId);
    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create token" });
  }
});



// ✅ one-time admin creation route
router.post("/api/chat/create-admin", async (req, res) => {
  try {
    const user = {
      id: "admin",
      name: "Support Agent",
      role: "admin",
    };
    await serverClient.upsertUser(user);
    res.json({ message: "Admin user created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create admin" });
  }
});


export default router;
