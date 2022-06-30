const express = require("express");
const multer = require("multer");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const categoryRoute = require("./routes/categoryRoutes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/images`);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/category", categoryRoute);
module.exports = app;
