import { Blog } from "../../models/blogModel.js";
import { Category } from "../../models/catModel.js";
import {
  deleteFromCloudinary,
  uploadToCloudInary,
} from "../../utils/cloudinary.js";
import { handleResError } from "../../utils/ResError.js";

export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const blog = await Blog.findById(id);
    console.log("ckh user Id", userId);
    if (!blog) return handleResError(res, 404, "Blog id not found");
    console.log("ckh blog user Id", typeof blog.userId);

    if (blog.userId.toString() !== userId)
      return handleResError(res, 403, "Unauthorized user input");

    const { title, content, categoryId } = req.body;

    if (!title || !content || !categoryId)
      return handleResError(res, 400, "All fields are required,t,c,cId");

    if (categoryId !== blog.categoryId.toString()) {
      const category = await Category.findById(categoryId);
      blog.categoryId = category._id;
      blog.categoryTitle = category.title;
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    if (blog.imageUrl !== req.file.imageUrl) {
      await deleteFromCloudinary(blog.imagePublicId);
      const result = await uploadToCloudInary(req.file.path);
      blog.imageUrl = result.secure_url;
      blog.imagePublicId = result.public_id;
    }
    await blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
