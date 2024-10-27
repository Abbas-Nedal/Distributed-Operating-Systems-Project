const express = require('express');
const { purchaseBook, updateBookStock } = require('../controllers/orderController');
const router = express.Router();

router.post('/purchase/:id', purchaseBook);

// Route for updating the book stock
router.put('/update-stock/:id', updateBookStock);

module.exports = router;
