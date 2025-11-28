import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,   // <-- explicitly use your configured instance
  params: {
    folder: "eduassist_uploads",
    resource_type: "auto",  // allows pdf/docx/zip
  },
});

const upload = multer({ storage });

export default upload;
