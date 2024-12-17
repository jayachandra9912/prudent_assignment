import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const params = new URLSearchParams(window.location.search);
            const query = params.get('query') || '';
            const genre = params.get('genre') || '';
            const author = params.get('author') || '';

            const response = await axios.get('/api/books', {
                params: { query, genre, author },
            });
            setBooks(response.data);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Search Results</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.BookID}>
                        {book.Title} - <button onClick={() => window.location.href = `/book-details/${book.BookID}`}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
