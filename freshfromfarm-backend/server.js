import express from "express";
import cors from "cors";
import conf from "./config/config.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// routes
import user from "./routes/User.js";
import produce from "./routes/Produce.js";
import order from "./routes/Order.js";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8080",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

const app = express();

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/auth", user);
app.use("/api/produce", produce);
app.use("/api/order", order);

app.get("/", async (req, res, next) => {
  try {
    // throw new Error('This is Test Error')
    res.json({ message: "Hello from server!" });
  } catch (error) {
    next(error);
  }
});

mongoose
  .connect(conf.MONGO_URI)
  .then(() => {
    console.log(`✅ DB connected successfully`);
    app.listen(conf.PORT, () => {
      console.log(`✅ Server is running on http://localhost:${conf.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to DB:", error);
  });
