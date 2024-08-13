import { Category } from "../../models/catModel.js";
import { deleteFromCloudinary } from "../../utils/cloudinary.js";
import { handleResError } from "../../utils/ResError.js";

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.useId;
    const category = await Category.findById(id);
    if (category.userId.toString() !== userId)
      return handleResError(res, 403, "Access denied");
    await deleteFromCloudinary(category.imagePublicId, category.imageUrl);
    await category.findByIdAndDelete(id);
    return res.status(200).send({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return handleResError(res, 500, error.message);
  }
};
