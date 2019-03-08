import cookies from "cookie";
import jwt from "jsonwebtoken";
import { appConfig } from "../../src/config";

export const checkCookie = cookie => {
  const token = cookies.parse(cookie || "")[process.env.SITE_NAME] || "";
  if (token) {
    const { iat, exp, ...user } = jwt.decode(token);
    return { user, token };
  }
  return { user: "", token: "" };
};
