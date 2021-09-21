import express from "express";
import env from "dotenv";
import cors from "cors";
import path from "path";
import colors from "colors";
import productRoutes from "./Routes/ProductRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import couponRoutes from "./Routes/couponRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import pdf from "html-pdf";

import { notFound, errorPageHandler } from "./middleware/errorMiddleware.js";

env.config();

connectDB();
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/products", productRoutes);

app.use("/api/user", userRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/contact-us", contactRoutes);

app.use("/api/coupon", couponRoutes);

app.use("/api/order", orderRoutes);

const __dirname = path.resolve();

import { pdfTemp } from "./utils/html-pdf/pdfTemp.js";

app.post("/api/pdf", (req, res) => {
  pdf.create(pdfTemp(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      return Promise.reject();
    }
    return Promise.resolve();
  });
});

app.get("/api/pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);

app.use(errorPageHandler);

const PORT = process.env.NODE_ENV || 5000;

app.listen(PORT, () => {
  console.log(path.resolve());
  console.log("server is running at 5000");
});
