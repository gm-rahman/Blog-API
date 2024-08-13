import { handleResError } from "../../utils/ResError.js";
import { Category } from "../../models/catModel.js";
import { uploadToCloudInary } from "../../utils/cloudinary.js";
import { Blog } from "../../models/blogModel.js";

export const saveData = async (req, res) => {
  try {
    const { title, content, imageUrl, categoryId } = req.body;
    if (!title || !content || !req.file || !categoryId)
      return handleResError(res, 400, "All fields are required");

    const userId = req.user.userId;
    const category = await Category.findById(categoryId);

    if (category.userId.toString() !== userId)
      return handleResError(res, 400, "Category did not match with user");

    const categoryTitle = category.title;
    const result = await uploadToCloudInary(req.file.path);

    const newBlog = new Blog({
      title,
      content,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
      userId,
      categoryId,
      categoryTitle,
    });
    const blog = await newBlog.save();
    return res.status(201).send(blog);
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
