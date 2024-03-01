import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
  // Get token from cookie if it exists or return response with status code of 40

  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    // verify token and get the user data out of it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized access- Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized access- No user found" });
    }
    // If no user is found send a response back with a message saying that there is no such user in our database
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in  protectedRoute middleware", error.message);
    return res.status(500).send({ error: "No token provided" });
  }
};

export default protectRoute;