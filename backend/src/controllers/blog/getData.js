import { Blog } from "../../models/blogModel.js";
import { handleResError } from "../../utils/ResError.js";

export const getData = async (req, res) => {
  try {
    const { category_id } = req.params;
    const userId = req.user.userId;
    // const blogs = await Blog.find({ userId });

    const filterBLogs = await Blog.find({
      userId,
      categoryId: category_id,
    });

    // const filterBLogs = blogs.filter(
    //   (blog) => blog.categoryId.toString() === category_id
    // );
    return res
      .status(200)
      .json({ count: filterBLogs.length, data: filterBLogs });
  } catch (error) {
    console.error(error);
    return handleResError(res, 500, error.message);
  }
};
