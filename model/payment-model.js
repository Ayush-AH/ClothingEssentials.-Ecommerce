const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  signature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
}, { timestamps: true });

const paymentModel = mongoose.model('Payment', paymentSchema);

module.exports = paymentModel;



