import multer from "multer";

// Define storage settings for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp/"); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    // Rename file to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/* 
// File validation and size limit
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg and .png files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter,
});

// Export configured multer middlewares
// export const uploadSingle = upload.single("file");
// export const uploadMultiple = upload.array("files", 10);
 */

export const upload = multer({ storage: storage });
