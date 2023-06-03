import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import BookDetails from "./pages/BookDetails";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/update/:id" element={<Update />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
