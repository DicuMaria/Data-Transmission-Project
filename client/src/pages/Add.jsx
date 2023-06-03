import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Style/Add.module.css";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/books");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Add New Book</h1>
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
          <input className={styles.number}
          type="number"
          placeholder="Book rating"
          name="rating"
          onChange={handleChange}
        />
        <input className={styles.text}
          type="text"
          placeholder="Book genre"
          name="genre"
          onChange={handleChange}
        />
        <textarea className={styles.areatext}
          rows={5}
          type="text"
          placeholder="Book summary"
          name="summary"
          onChange={handleChange}
        />
        <button className={styles.button_login} onClick={handleClick}>Add</button>
        {error && "Something went wrong!"}
        <Link className={styles.link_button} to="/books">See all books</Link>
      </div>
    </div>
  );
};

export default Add;
