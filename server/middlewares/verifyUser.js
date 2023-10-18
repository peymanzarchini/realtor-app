import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // const token = req.cookies.access_token;
  const token = req.cookies.access_token;
  try {
    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        throw error;
      }

      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};
