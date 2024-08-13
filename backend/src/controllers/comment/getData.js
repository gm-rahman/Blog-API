import { handleResError } from "../../utils/ResError.js";
import { Comment } from "../../models/commentModel.js";

export const getData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const comments = await Comment.find({ userId }).populate(
      "userId",
      "firstName email"
    );
    return res.status(200).json({ count: comments.length, data: comments });
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
