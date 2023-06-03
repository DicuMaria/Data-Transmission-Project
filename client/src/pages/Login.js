import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Style/Login.module.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Create a login request
        const loginRequest = {
            username,
            password,
        };

        // Send the login request to the server
        fetch('http://localhost:8800/login', { // Update the URL here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest),
        })

            .then((response) => {
                if (response.ok) {
                    // Successful login
                    return response.json().then((data) => {
                        // TODO: Handle the response from the server, e.g., store tokens, display success message, etc.
                        navigate('/books');
                    });
                } else {
                    // Error occurred or non-JSON response
                    throw new Error('Login failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // TODO: Display an error message to the user
            });
    };

    const handleCancel = () => {
        // Clear the form fields
        setUsername('');
        setPassword('');
        window.location.href = "/";
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.form_login}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className={styles.login_button} type="button" onClick={handleLogin}>
                    Login
                </button>
                <button className={styles.cancel_button} type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default Login;