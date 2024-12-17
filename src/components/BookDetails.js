import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            const response = await axios.get(`/api/books/${id}`);
            setBook(response.data);
        };

        fetchBookDetails();
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div>
            <h1>{book.Title}</h1>
            <p><strong>Author:</strong> {book.Author}</p>
            <p><strong>Genre:</strong> {book.Genre}</p>
            <p><strong>Pages:</strong> {book.Pages}</p>
            <p><strong>Published Date:</strong> {book.PublishedDate}</p>
        </div>
    );
};

export default BookDetails;
