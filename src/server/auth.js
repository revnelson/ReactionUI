import cookies from "cookie";
import jwt from "jsonwebtoken";
import { appConfig } from "../shared/config";

export const checkCookie = cookie => {
  const token = cookies.parse(cookie || "")[appConfig.siteName] || "";
  if (token) {
    const { iat, exp, ...user } = jwt.decode(token);
    return { user, token };
  }
  return { user: "", token: "" };
};
