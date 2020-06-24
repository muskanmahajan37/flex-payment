require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require('uuid');

const Payment = require('../models/Payment');
const mongoose = require('mongoose');

exports.getAllPayments = (req, res) => {
  Payment.find()
    .select('_id user serviceID serviceName price description')
    .exec()
    .then((payments) => {
      return res.status(200).json({
        count: payments.length,
        payments,
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.getPaymentsByID = (req, res) => {
  Payment.findById({ _id: req.params.paymentId })
    .select('_id user serviceID serviceName price description')
    .exec()
    .then((payment) => {
      return res.status(200).json(payment);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.makePayment = (req, res) => {
  const { service, token } = req.body;
  const idempotencyKey = uuid();

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: service.price * 100,
          currency: 'eur',
          customer: customer.id,
          description: `Purchase of ${service.name}`,
        },
        {
          idempotencyKey,
        }
      );

      const newPayment = new Payment({
        _id: new mongoose.Types.ObjectId(),
        user: customer.id,
        serviceID: service.id,
        serviceName: service.name,
        price: service.price,
        description: service.description,
      });

      newPayment.save().then((order) => {
        return res.status(200).json({
          order: {
            _id: order.id,
            user: order.email,
            serviceID: order.id,
            serviceName: order.name,
            price: order.price,
            description: order.description,
          },
        });
      });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

exports.deletePayment = (req, res) => {
  Payment.remove({ _id: req.params.paymentId })
    .exec()
    .then(() => {
      return res
        .status(200)
        .json(`Payment ${req.params.paymentId} Payment deleted`);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
