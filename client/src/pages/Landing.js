import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../Style/Landing.module.css";

const Landing = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to The Bookshelf!</h1>
            <p className={styles.description}>Whether you're an avid reader, a casual bookworm, or a literary connoisseur, our user-friendly interface allows you to
                    navigate through a vast collection of titles, conveniently explore genres, and effortlessly add or remove books from your virtual library. 
                    One of the standout features of the application is the ability to stay connected with the global community of readers. By integrating real-time 
                    reviews and opinions from people around the world, you can gain valuable insights and discover new perspectives before making your reading choices.
</p>
            <p className={styles.heading}>It's time to log in and let the stories unfold.</p>
            <div>
                <Link to="/login" className={styles.button_login}>Login</Link>
                <div className={styles.container_register}>
                <p className={styles.question}>Don't you have an account?</p>
                <Link to="/register" className={styles.button_register}>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;