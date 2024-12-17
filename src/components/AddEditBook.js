import React, { useState, useEffect } from "react";

const AddEditBook = ({ bookId, onSave }) => {
    const [book, setBook] = useState({
        Title: "",
        AuthorID: "",
        GenreID: "",
        Pages: "",
        PublishedDate: "",
    });
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch authors and genres for dropdowns
        fetch("http://localhost:5000/api/authors")
            .then((res) => res.json())
            .then((data) => setAuthors(data));
        fetch("http://localhost:5000/api/genres")
            .then((res) => res.json())
            .then((data) => setGenres(data));

        // If editing, fetch book details
        if (bookId) {
            fetch(`http://localhost:5000/api/books/${bookId}`)
                .then((res) => res.json())
                .then((data) => setBook(data));
        }
    }, [bookId]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const method = bookId ? "PUT" : "POST";
        const url = bookId
            ? `http://localhost:5000/api/books/${bookId}`
            : `http://localhost:5000/api/books`;

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        })
            .then((res) => res.json())
            .then(() => {
                alert(`Book ${bookId ? "updated" : "added"} successfully!`);
                onSave();
            });
    };

    return (
        <div>
            <h2>{bookId ? "Edit Book" : "Add New Book"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="Title"
                    value={book.Title}
                    onChange={handleChange}
                    required
                />

                <label>Author:</label>
                <select
                    name="AuthorID"
                    value={book.AuthorID}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Author</option>
                    {authors.map((author) => (
                        <option key={author.AuthorID} value={author.AuthorID}>
                            {author.Name}
                        </option>
                    ))}
                </select>

                <label>Genre:</label>
                <select
                    name="GenreID"
                    value={book.GenreID}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Genre</option>
                    {genres.map((genre) => (
                        <option key={genre.GenreID} value={genre.GenreID}>
                            {genre.Name}
                        </option>
                    ))}
                </select>

                <label>Pages:</label>
                <input
                    type="number"
                    name="Pages"
                    value={book.Pages}
                    onChange={handleChange}
                    required
                />

                <label>Published Date:</label>
                <input
                    type="date"
                    name="PublishedDate"
                    value={book.PublishedDate}
                    onChange={handleChange}
                    required
                />

                <button type="submit">{bookId ? "Update" : "Add"} Book</button>
            </form>
        </div>
    );
};

export default AddEditBook;
