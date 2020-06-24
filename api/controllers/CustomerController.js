require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getAllStripeCustomers = (req, res) => {
  stripe.customers.list((err, customers) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong' });
    } else {
      res.status(200).json(customers.data);
    }
  });
};

exports.createStripeCustomer = (req, res) => {
  stripe.customers.create(
    {
      email: req.body.email,
      name: req.body.email,
    },
    (err, customer) => {
      if (err) {
        res.status(500).json({ error: 'Something went wrong' });
      } else {
        res.status(200).json(customer);
      }
    }
  );
};
