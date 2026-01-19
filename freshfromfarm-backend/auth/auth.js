import jwt from "jsonwebtoken";
import conf from "../config/config.js";

const auth = {
  createAccessToken: (payload, secret) => {
    // return jwt.sign(payload, secret, { expiresIn: "15m" });
    return jwt.sign(payload, secret, { expiresIn: "15m" });
  },

  createRefreshToken: (payload, secret) => {
    return jwt.sign(payload, secret, { expiresIn: "7d" });
    // return jwt.sign(payload, secret, { expiresIn: "10s" });
  },

  verifyToken: (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return error;
    }
  },

  fetchUser: (req, res, next) => {
    try {
      const authHeader = req.headers.Authorization || req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
          status: 0,
          notificationsType: "error",
          message:
            "Please authenticate using valid credentials || Unauthorized 1",
        });
      }

      const accessToken = authHeader.split(" ")[1];
      if (!accessToken) {
        return res.status(401).json({
          status: 0,
          notificationsType: "error",
          message:
            "Please authenticate using valid credentials || Unauthorized",
        });
      }
      const user = auth.verifyToken(accessToken, conf.ACCESS_TOKEN_SECRET);
      if (!user) {
        return res.status(401).json({
          status: 0,
          notificationsType: "error",
          message: "Please authenticate using valid credentials",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in fetchUser middleware:", error);
      res
        .status(500)
        .send({ error: "Please authenticate using valid credentials" });
    }
  },
};

export default auth;
