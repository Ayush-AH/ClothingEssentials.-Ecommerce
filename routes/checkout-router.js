const express = require("express")
const router = express.Router()
const paymentModel = require("../model/payment-model")
const razorpay = require("../config/razorpay")
const {isLoggedIn} = require("../middlewear/isLoggedIn")
const {userModel} = require("../model/user-model")


router.post('/create/orderId', isLoggedIn, async (req, res) => {
    let user = await userModel.findById(req.user.id).populate("cart.product")   
    let totalPrice = 0
    user.cart.forEach(item => {
        totalPrice += item.product.price * item.quantity
    })
    const options = {
      amount: totalPrice * 100, // amount in smallest currency unit
      currency: "INR",
    };
    try {
      const order = await razorpay.orders.create(options);
      res.send(order);
  
      const newPayment = await paymentModel.create({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: 'pending',
      });
  
    } catch (error) {
      res.status(500).send('Error creating order');
    }
});


router.post('/payment/verify', isLoggedIn,async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET

  try {
    const { validatePaymentVerification } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js')

    const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
    if (result) {
      const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = 'completed';
      await payment.save();
      res.json({ status: 'success' });
    } else {
      res.status(400).send('Invalid signature');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error verifying payment');
  }
});





module.exports = router