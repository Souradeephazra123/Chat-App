import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongodb from "./db/connectToMongodb.js";

// Allow requests from all origins
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

dotenv.config();
//first middleware
app.use(express.json());//to parse incoming request with json payloads
//parse cookie before middleware
app.use(cookieParser()); // to handle cookies in requests and responses

// routes
//second middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users",
 userRoutes
 );

// app.get("/", (req, res) => {
//   res.send("Welcome to homepage");
// });

app.listen(PORT, () => {
  connectToMongodb();
  console.log(`Server is running at port ${PORT} `);
});
