import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Style/Register.module.css";

const Register = () => {
       const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8800/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username,
                password,
            }),
        });

        const data = await response.json();

        if (data.success) {
            // Registration successful, perform necessary actions (e.g., redirect)
            navigate('/books');
        } else {
            // Registration failed, display error message
            console.log("Registration failed");
        }
    };

    const handleCancel = () => {
        // Clear the form fields
        setUsername('');
        setPassword('');
        window.location.href = "/";
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <form className={styles.form_register}>
            <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className={styles.register_button} type="button" onClick={handleRegister}>
                    Register
                </button>
                <button className={styles.cancel_button} type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default Register;
