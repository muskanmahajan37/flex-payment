const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/PaymentController');

const checkAuth = require('../middlewares/check-auth');

router.get('/', PaymentController.getAllPayments);
router.get('/:paymentId', PaymentController.getPaymentsByID);
router.post('/', PaymentController.makePayment);
router.delete('/:paymentId', PaymentController.deletePayment);

module.exports = router;
