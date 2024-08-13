import fs from "fs";
import cloudinary from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_SECRET_KEY,
} from "../config.js";

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

export const uploadToCloudInary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File not given");
    }

    const result = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: "auto",
      public_id: "sample",
    });

    setTimeout(() => fs.unlinkSync(filePath), 2000);
    // console.log("full response", result);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error", error);
    if (error.http_code) {
      console.error(`HTTP Code: ${error.http_code}`);
    }
    setTimeout(() => fs.unlinkSync(filePath), 2000);

    if (error.message) {
      console.error(`Error Message: ${error.message}`);
    }
    throw new Error(
      `Cloudinary upload failed: ${
        error.message ||
        "An unknown error occurred during the Cloudinary upload."
      }`
    );
  }
};

export const deleteFromCloudinary = async (publicId, filePath = null) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`local file ${filePath} deleted`);
    }
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error", error);

    throw new Error(`Cloudinary deletion failed: ${error.message}`);
  }
};
