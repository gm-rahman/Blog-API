import { handleResError } from "../../utils/ResError.js";
import { Comment } from "../../models/commentModel.js";

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const comment = await Comment.findById(id);

    if (userId !== comment.userId.toString())
      return handleResError(res, 403, "Unauthorized user");

    await Comment.findByIdAndDelete(id);
    return res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
