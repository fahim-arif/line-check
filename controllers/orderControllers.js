import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import pdf from "html-pdf";
import { pdfTemp } from "../utils/html-pdf/pdfTemp.js";

export const addOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
    paymentCharge,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else if (paymentCharge) {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentCharge,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);

    console.log(createOrder);
    console.log("Hiiiiiiiiiii");

    pdf
      .create(pdfTemp(req.body, createOrder._id), {})
      .toFile("result.pdf", (err) => {
        if (err) {
          return Promise.reject();
        }
        return Promise.resolve();
      });
  }
});

export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

export const getMyOrder = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate("user", "name email");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "id name image email");
  res.json(orders);
});
