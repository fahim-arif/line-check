import express from "express";
const router = express.Router();
import Coupon from "../models/couponModel.js";
import { admin } from "../middleware/authMiddleware.js";

router.post("/", async (req, res, next) => {
  const { coupon } = req.body;

  const couponExist = await Coupon.findOne({ coupon });
  if (couponExist) {
    res.status(200);
    res.json({ status: true });
  } else {
    res.status(404);
    throw new Erorr("Coupon did not matched");
  }
});

router.get("/create", (req, res, next) => {
  res.send("Success");
});

router.post("/create", admin, async (req, res, next) => {
  const { coupon } = req.body;
  const couponExist = await Coupon.findOne({ coupon: coupon });
  if (couponExist) {
    res.status(400);
    throw new Error("Coupon Already exist");
  }

  const createCoupon = await Coupon.create({
    coupon: coupon,
  });

  if (createCoupon) {
    res.status(201).json({
      status: "Coupon was created ",
    });
  } else {
    res.status(400);
    throw new Erorr("Invalid Coupon");
  }
});

export default router;
