// catalog/controllers/catalogController.js
const Book = require('../models/book');

// Fetch books by topic
const search = async (req, res) => {
    try {
        const topic = req.params.topic;
        const books = await Book.findAll({ where: { topic } });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch book info by item number (ID)
const BookInfo = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addBook = async (req, res) => {
    try {
        const { title, topic, quantity, price } = req.body;
        if (!title || !topic || !quantity || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newBook = await Book.create({ title, topic, quantity, price });
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateBookStock = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { quantity } = req.body;

        const book = await Book.findByPk(bookId);
        if (book) {
            book.quantity = quantity;
            await book.save();
            res.json({ message: 'Book stock updated successfully', book });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findByPk(bookId);
        if (book) {
            await book.destroy();
            res.json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    search,
    BookInfo,
    addBook,
    updateBookStock,
    deleteBook,
};
