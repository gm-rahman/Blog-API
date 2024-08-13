import { Category } from "../../models/catModel.js";
import { handleResError } from "../../utils/ResError.js";

export const getAllData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const categories = await Category.find({ userId });
    return res.status(200).json({ count: categories.length, data: categories });
  } catch (error) {
    console.log(error);
    return handleResError(res, 500, error.message);
  }
};
