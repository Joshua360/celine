import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  taskType: String,
  assignmentType: String,
  course: String,
  pages: Number,
  deadline: String,
  topic: String,
  notes: String,
  files: [
    {
      url: String,
      public_id: String,
      key: String,
    },
  ],
  price: Number,
  status: { type: String, default: "Pending" },
  createdAt: Date,
});

export default mongoose.model("Order", OrderSchema);
