const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

const checkAuth = require('../middlewares/check-auth');

router.get('/', CustomerController.getAllStripeCustomers);
// router.get('/:paymentId', checkAuth, CustomerController.getPaymentsByID);
// router.post('/', checkAuth, CustomerController.makePayment);
// router.delete('/:paymentId', checkAuth, CustomerController.deletePayment);

module.exports = router;
