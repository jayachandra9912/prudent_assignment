import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import BookDetails from "./components/BookDetails";
import AddEditBook from "./components/AddEditBook";
import NavBar from "./components/Navbar";
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <NavBar />

        {/* Routes */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Search Results Page */}
          <Route path="/search" element={<SearchResults />} />

          {/* Book Details Page */}
          <Route path="/books/:id" element={<BookDetails />} />

          {/* Add New Book */}
          <Route path="/add-book" element={<AddEditBook onSave={() => alert("Book added successfully!")} />} />

          {/* Edit Book */}
          <Route
            path="/edit-book/:id"
            element={<AddEditBook onSave={() => alert("Book updated successfully!")} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
