import React, { useState } from 'react';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ genre: '', author: '' });

    const handleSearch = () => {
        // Redirect to search results
        window.location.href = `/search-results?query=${searchQuery}&genre=${filters.genre}&author=${filters.author}`;
    };

    return (
        <div>
            <h1>Welcome to the Book Management System</h1>
            <input
                type="text"
                placeholder="Search for books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
            </select>
            <select onChange={(e) => setFilters({ ...filters, author: e.target.value })}>
                <option value="">Select Author</option>
                <option value="Author1">Author1</option>
                <option value="Author2">Author2</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Home;
