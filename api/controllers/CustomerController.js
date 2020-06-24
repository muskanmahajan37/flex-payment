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

exports.getStripeCustomerByID = (req, res) => {
  stripe.customers.retrieve(req.params.userId, (err, customer) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong' });
    } else {
      res.status(200).json(customer);
    }
  });
};

exports.createStripeCustomer = (req, res) => {
  stripe.customers.create(
    // Field for creating a customer are optional
    {
      description: req.body.description,
    },
    (err, customer) => {
      if (err) {
        res.status(500).json({ error: 'Something went wrong' });
      } else {
        res.status(200).json({
          message: 'Customer created successfully',
          createdCustomer: customer,
        });
      }
    }
  );
};

exports.deleteStripeCustomer = (req, res) => {
  stripe.customers.del(req.params.userId, (err, customer) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong' });
    } else {
      res.status(200).json({ message: 'Customer deleted successfully' });
    }
  });
};
