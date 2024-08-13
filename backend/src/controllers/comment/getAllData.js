import { handleResError } from "../../utils/ResError.js";
import { Comment } from "../../models/commentModel.js";

export const getAllData = async (req, res) => {
  try {
    const { blog_id } = req.params;
    console.log(`Searching for comments with blog_id: ${blog_id}`);

    // Adjust the field name if necessary
    const comments = await Comment.find({ blogId: blog_id }).populate(
      "userId",
      "firstName email"
    );

    if (!comments) return handleResError(res, 404, "Comments not found");

    console.log(comments);

    return res.status(200).json({ count: comments.length, data: comments });
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
