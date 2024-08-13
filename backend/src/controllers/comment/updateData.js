import { handleResError } from "../../utils/ResError.js";
import { Comment } from "../../models/commentModel.js";

export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) return handleResError(res, 400, "All fields are required");

    const comment = await Comment.findById(id);
    const userId = req.user.userId;

    if (userId !== comment.userId.toString())
      return handleResError(res, 403, "Unauthorized user");

    comment.content = content;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
