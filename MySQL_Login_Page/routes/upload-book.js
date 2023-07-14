const express = require('express');
const multer = require('multer');
const mysql = require('mysql');

const app = express();
const upload = multer();

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'booknook'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Handle the form submission
app.post('/upload-book', upload.single('bookImage'), (req, res) => {
    const bookTitle = req.body.bookTitle;
    const bookImage = req.file.buffer; // File data is available as a Buffer
    const author = req.body.author;
    const bookCondition = req.body.bookCondition;
    const tradeCondition = req.body.tradeCondition;
    const price = req.body.price;

    // Insert the data into the database
    const sql = 'INSERT INTO books (title, image, author, book_condition, trade_condition, price) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [bookTitle, bookImage, author, bookCondition, tradeCondition, price], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).json({ error: 'Error inserting data into the database' });
        } else {
            console.log('Data inserted successfully');
            res.json({ success: true });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
