const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = new sqlite3.Database('./books.db', (err) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the SQLite database');
    }
});

// API Routes
// 1. Get all books
app.get('/api/books', (req, res) => {
    const sql = `SELECT b.BookID, b.Title, a.Name as Author, g.Name as Genre, b.Pages, b.PublishedDate 
               FROM Books b
               JOIN Authors a ON b.AuthorID = a.AuthorID
               JOIN Genres g ON b.GenreID = g.GenreID`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// 2. Get a single book by ID
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Books WHERE BookID = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

// 3. Add a new book
app.post('/api/books', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    const sql = `INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate)
               VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [Title, AuthorID, GenreID, Pages, PublishedDate], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ BookID: this.lastID });
        }
    });
});

// 4. Update an existing book
app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    const sql = `UPDATE Books 
               SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?
               WHERE BookID = ?`;
    db.run(sql, [Title, AuthorID, GenreID, Pages, PublishedDate, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ updatedRows: this.changes });
        }
    });
});

// 5. Delete a book
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Books WHERE BookID = ?`;
    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ deletedRows: this.changes });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
