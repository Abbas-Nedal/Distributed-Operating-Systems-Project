const Order = require('../models/order');
const axios = require('axios');

// Purchase a book
const purchaseBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        // Check if the book is in stock
        const bookResponse = await axios.get(`http://localhost:3001/catalog/info/${bookId}`);
        const book = bookResponse.data;



        if (book.quantity > 0) {



            const order = await Order.create({ bookId, quantity: 1 });
+
            await updateBookStockHelper(bookId, book.quantity - 1);

            res.json({ message: 'Book purchased successfully', order });
        } else {
            res.status(400).json({ error: 'Book out of stock' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update book stock
const updateBookStock = async (req, res) => {
    const bookId = req.params.id;
    const { quantity } = req.body;

    try {
        // Use helper to update (book stock)
        await updateBookStockHelper(bookId, quantity);

        res.json({ message: 'Book stock updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updateBookStockHelper = async (bookId, quantity) => {
    await axios.put(`http://localhost:3001/catalog/update/${bookId}`, { quantity });
};

module.exports = {
    purchaseBook,
    updateBookStock,
};
