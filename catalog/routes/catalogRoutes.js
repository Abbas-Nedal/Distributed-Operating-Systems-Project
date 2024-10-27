// catalog/routes/catalogRoutes.js
const express = require('express');
const { search, BookInfo, addBook, updateBookStock } = require('../controllers/catalogController');
const router = express.Router();

router.get('/search/:topic', search);

router.get('/info/:id', BookInfo);

router.post('/add', addBook);

router.put('/update/:id', updateBookStock);

module.exports = router;
