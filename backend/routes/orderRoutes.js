import express from "express";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";



const router = express.Router();

// Auth middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// CREATE ORDER (JSON only — no FormData)
// router.post("/create", verifyToken, async (req, res) => {
//   try {
//     const {
//       assignmentType,
//       course,
//       pages,
//       deadline,
//       topic,
//       notes,
//       price,
//       files,
//     } = req.body;

//     const order = new Order({
//       userId: req.user.id,
//       taskType: "writing",
//       assignmentType,
//       course,
//       pages,
//       deadline,
//       topic,
//       notes,
//       price,
//       files: files || [],
//       status: "Pending",
//       createdAt: new Date(),
//     });

//     await order.save();

//     res.json({ message: "Order created successfully!", order });
//   } catch (err) {
//     console.error("Order Error:", err);
//     res.status(500).json({ message: "Error creating order" });
//   }
// });


router.post("/create", verifyToken, async (req, res) => {
  try {
    const {
      assignmentType,
      course,
      pages,
      deadline,
      topic,
      notes,
      price,
      files,
    } = req.body;

    console.log("Received files:", files);

    const order = new Order({
      userId: req.user.id,
      taskType: "writing",
      assignmentType,
      course,
      pages,
      deadline,
      topic,
      notes,
      price,
      files: files || [],   // FIXED HERE
      status: "Pending",
      createdAt: new Date(),
    });

    await order.save();

    res.json({ message: "Order created successfully!", order });

  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});


// HISTORY
router.get("/history", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

// ORDER DETAILS
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.userId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    res.json(order);
  } catch {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

export default router;
