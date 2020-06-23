require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require('uuid');

const Payment = require('../models/Payment');
const mongoose = require('mongoose');

exports.getAllPayments = (req, res) => {
  Payment.find()
    .select('user serviceID serviceName price description')
    .exec()
    .then((payments) => {
      return res.status(200).json({
        count: payments.length,
        payments,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.getPaymentsByID = (req, res) => {
  Payment.findById({ _id: req.params.paymentId })
    .select('user serviceID serviceName price description')
    .exec()
    .then((payment) => {
      return res.status(200).json(payment);
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
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
    })
    .then(() => {
      const newPayment = new Payment({
        _id: new mongoose.Types.ObjectId(),
        user: token.email,
        serviceID: service.id,
        serviceName: service.name,
        price: service.price,
        description: service.description,
      });

      newPayment.save().then((order) => {
        console.log({
          order: {
            _id: order.id,
            user: order.email,
            serviceID: order.id,
            serviceName: order.name,
            price: order.price,
            description: order.description,
          },
        });
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
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
