import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../Style/Books.module.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/books?query=${searchQuery}`
        );
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.elements.search.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setSearchQuery("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToWishlist = (book) => {
    setWishlist((prevWishlist) => [...prevWishlist, book]);
  };

  const handleRemoveFromWishlist = (book) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== book.id)
    );
  };

  const renderRatingStars = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8800/logout");
      console.log("Logout successful");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className={styles.title}>The Bookshelf</h1>

      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search books..." />
        <button type="submit">Search</button>
      </form>

      <div className={styles.books}>
        {books.map((book) => (
          <div key={book.id} className={styles.book}>
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <h3>${book.price}</h3>
            <button className={styles.delete} onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className={styles.update}>
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
            <div className={styles.rating}>
              <span>Rating: </span>
              <span>{renderRatingStars(book.rating)}</span>
            </div>
            <button className={styles.details}>
              <Link
                to={`/books/${book.id}`}
                style={{ textDecoration: "none" }}
              >
                Details
              </Link>
            </button>
            <button
              className={styles.add_to_wishlist}
              onClick={() => handleAddToWishlist(book)}
            >
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>

      <button className={styles.add_book}>
        <Link to="/add">Add new book</Link>
      </button>

     <div className={styles.wishlist}>
        <h2>Wishlist</h2>
        {wishlist.map((book) => (
          <div key={book.id} className={styles.wishlist_item}>
            <div className={styles.wish_title_div}>
              <span className={styles.wishlist_title}>{book.title}</span>
            </div>
            <div className={styles.button_div}>
              <button
                className={styles.remove_from_wishlist}
                onClick={() => handleRemoveFromWishlist(book)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Books;
