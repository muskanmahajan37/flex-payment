const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/PaymentController');

router.get('/', PaymentController.getAllPayments);
router.get('/:paymentId', PaymentController.getPaymentsByID);
router.post('/', PaymentController.makePayment);

module.exports = router;
