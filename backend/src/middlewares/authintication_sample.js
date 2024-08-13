import { JWT_SECRET } from "../config.js";
import { handleResError } from "../utils/ResError.js";
import jwt from "jsonwebtoken";

export const authintication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log("Authorization header:", authHeader);
  if (!authHeader)
    return handleResError(res, 403, "Access denied authToken not found");
  const token = authHeader.split(" ")[1];
  if (!token) {
    return handleResError(res, 403, "Access denied. Token not found.");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return handleResError(res, 403, "Invalid token");
    // console.log("this is printed by user", user);
    req.user = user;
    next();
  });
};
