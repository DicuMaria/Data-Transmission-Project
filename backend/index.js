import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});


app.post('/register', (req, res) => {
    const {email, username, password } = req.body;

    // TODO: Implement validation for username and password

    // Check if the username already exists in the database
    db.query('SELECT * FROM utilizatori WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'An error occurred while checking email' });
        }

        if (result.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // TODO: Hash the password before storing it in the database

        // Insert the new user into the database
        const query = "INSERT INTO utilizatori (email,username, password) VALUES (?, ?, ?)";
        const values = [email,username, password];

        db.query(query, values, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Registration failed' });
            } else {
                res.status(200).json({ success: true, message: 'Registration successful' });
            }
            console.log("Response:", res);
        });
    });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // TODO: Implement validation for username and password

  // Check if the username and password match a user in the database
  db.query('SELECT * FROM utilizatori WHERE username = ? AND password = ?', [username, password], (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: 'An error occurred while logging in' });
      }

      if (result.length === 0) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      // TODO: Generate and return a JWT or session token for authentication

      return res.status(200).json({ message: 'Login successful' });
    });
});

app.get("/books", (req, res) => {
  const searchQuery = req.query.query; // Get the search query from the request query parameters

  let q = "SELECT * FROM books";

  if (searchQuery) {
    // If a search query is provided, update the query to include the filter
    q += " WHERE title LIKE ?";
    const searchValue = `%${searchQuery}%`;
    db.query(q, [searchValue, searchValue], (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: 'An error occurred while fetching books' });
      }
      return res.json(data);
    });
  } else {
    // If no search query is provided, fetch all books
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: 'An error occurred while fetching books' });
      }
      return res.json(data);
    });
  }
});


app.post('/logout', (req, res) => {
  // Implement your logout logic here
  // For example, clear session or JWT token, etc.
  
  res.json({ message: 'Logout successful' });
});


app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`,`rating`,`genre`,`summary`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    req.body.rating,
    req.body.genre,
    req.body.summary
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ error: 'An error occurred while fetching the book details' });
    }

    if (data.length === 0) {
      return res.json({ error: 'Book not found' });
    }

    return res.json(data[0]);
  });
});


app.get("/reviews/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const q = "SELECT * FROM reviews WHERE bookId = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ error: 'An error occurred while fetching the reviews' });
    }

    return res.json(data);
  });
});




app.listen(8800, () => {
  console.log("Connected to backend.");
});
