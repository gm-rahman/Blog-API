import { handleResError } from "../../utils/ResError.js";
import { Blog } from "../../models/blogModel.js";
import { Comment } from "../../models/commentModel.js";

export const saveData = async (req, res) => {
  try {
    // console.log(req.body);
    const { content, blogId } = req.body;
    const userId = req.user.userId;

    if (!content || !blogId)
      return handleResError(res, 400, "Content and blog ID are required");

    const blog = await Blog.findById(blogId);

    if (!blog) return handleResError(res, 404, "Blog not exist");

    const newComment = { content, blogId, userId };
    const comment = await Comment.create(newComment);

    return res.status(201).send(comment);
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
