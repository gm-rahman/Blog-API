import { Blog } from "../../models/blogModel.js";
import { handleResError } from "../../utils/ResError.js";

export const getAllData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const blogs = await Blog.find({ userId });
    console.log("chk blog userId", blogs);

    return res.status(200).json({ count: blogs.length, data: blogs });
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
