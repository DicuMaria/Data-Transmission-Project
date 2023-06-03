import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../Style/Update.module.css";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/books");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Update the Book</h1>
        <input className={styles.text}
          type="text"
          placeholder="Book title"
          name="title"
          onChange={handleChange}
        />
        <textarea className={styles.areatext}
          rows={5}
          type="text"
          placeholder="Book desc"
          name="desc"
          onChange={handleChange}
        />
        <input className={styles.number}
          type="number"
          placeholder="Book price"
          name="price"
          onChange={handleChange}
        />
        <input className={styles.text}
          type="text"
          placeholder="Book cover"
          name="cover"
          onChange={handleChange}
        />
        <button className={styles.button_update} onClick={handleClick}>Update</button>
        {error && "Something went wrong!"}
        <Link className={styles.link_button} to="/books">See all books</Link>
      </div>
    </div>
  );
};

export default Update;
