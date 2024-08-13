import { Blog } from "../../models/blogModel.js";
import { deleteFromCloudinary } from "../../utils/cloudinary.js";
import { handleResError } from "../../utils/ResError.js";

export const deleteData = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const userId = req.user.userId;
    const blog = await Blog.findById(blog_id);

    if (!blog) {
      return handleResError(res, 404, "Blog not found");
    }

    if (userId !== blog.userId.toString())
      return handleResError(res, 403, "Unauthorized user");

    await deleteFromCloudinary(blog.imagePublicId);
    await Blog.findByIdAndDelete(blog_id);
    return res.status(200).send({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
