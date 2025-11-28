import express from "express";
import { createUploadthing } from "uploadthing/express";

const router = express.Router();

// Create builder
const f = createUploadthing();

// Build endpoint
const uploadBuilder = f({
  "assignment-files": {
    maxFileSize: "8MB",
    maxFileCount: 10,
    allowedFileTypes: ["any"],
  },
}).onUploadComplete(async ({ file }) => {
  console.log("Upload complete:", file.url);

  return {
    url: file.url,
    key: file.key,
  };
});

// UploadThing v7 requires GET and POST routes
router.post("/upload", async (req, res) => {
  return uploadBuilder.handleRequest(req, res);
});

router.get("/upload", async (req, res) => {
  return uploadBuilder.handleRequest(req, res);
});

export default router;
