import { Category } from "../../models/catModel.js";
import { handleResError } from "../../utils/ResError.js";
import { uploadToCloudInary } from "../../utils/cloudinary.js";

export const saveData = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !req.file)
      return handleResError(res, 400, "All fields are required");

    const userId = req.user.userId;

    const result = await uploadToCloudInary(req.file.path);
    if (!result || !result.secure_url || !result.public_id)
      return handleResError(res, 400, error.message);

    const newCategory = new Category({
      title,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
      userId,
    });
    const category = await Category.create(newCategory);
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return handleResError(res, 500, error.message);
  }
};
