// catalog/routes/catalogRoutes.js
const express = require('express');
const { search, BookInfo, addBook, updateBookStock  , deleteBook} = require('../controllers/catalogController');
const router = express.Router();

router.get('/search/:topic', search);

router.get('/info/:id', BookInfo);

router.post('/add', addBook);

router.put('/update/:id', updateBookStock);

router.delete('/delete/:id', deleteBook);





module.exports = router;
