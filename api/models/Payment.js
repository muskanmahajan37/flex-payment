const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    user: { type: String, required: true },
    serviceID: { type: Number, required: true },
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
