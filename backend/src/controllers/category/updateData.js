import { Category } from "../../models/catModel.js";
import { handleResError } from "../../utils/ResError.js";
import {
  deleteFromCloudinary,
  uploadToCloudInary,
} from "../../utils/cloudinary.js";

export const updateData = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const { id } = req.params;
    const userId = req.user.userId;

    if (!title || !imageUrl)
      return handleResErrorsError(res, 400, "All fields are required");

    const category = await Categoryory.findById(id);

    if (category.userId.toString() !== userId)
      return handleResError(res, 401, "Unauthorized");

    if (imageUrl !== category.imageUrl) {
      await deleteFromCloudinary(category.imagePublicId, category.imageUrl);
      const result = uploadToCloudInary(imageUrl);
      category.imageUrl = result.secure_url;
      category.imagePublicId = result.public_id;
    }
    category.title = req.body.title;

    const updatedCategory = await category.save();
    return res
      .status(200)
      .send({ message: "updated successfully", data: updatedCategory });
  } catch (error) {
    console.log(error);
    return handleResError(res, 500, error.message);
  }
};
