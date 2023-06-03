import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../Style/BookDetails.module.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await axios.get(`http://localhost:8800/books/${id}`);
        setBook(bookResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`http://localhost:8800/reviews/${id}`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookDetails();
    fetchReviews();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>; // or any loading state component
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{book.title}</h2>
     <img src={`/${book.cover}`} alt="" style={{ width: "200px", height: "auto" }} />

      <p className={styles.paragraph}>Genre: {book.genre}</p>
      <p className={styles.paragraph}>Summary: {book.summary}</p>

      <h3>Reviews:</h3>
      {reviews.map((review) => (
        <div key={review.id}>
          <p className={styles.paragraph}>{review.review}</p>
        </div>
      ))}
      <Link className={styles.link_button} to="/books">See all books</Link>
    </div>
  );
};

export default BookDetails;
