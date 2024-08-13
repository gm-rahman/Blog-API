import { JWT_SECRET } from "../config.js";
import { handleResError } from "../utils/ResError.js";
import jwt from "jsonwebtoken";

export const authintication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return handleResError(res, 404, "Auth header not found");
  const token = authHeader.split(" ")[1];
  if (!token) return handleResError(res, 404, "Token not found");
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return handleResError(res, 400, err.message);
    req.user = user;
    // console.log("type of the user", typeof user);
    next();
  });
};
