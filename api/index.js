const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.get('/test', (req, res) => {
  res.json('Hello World');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    console.log('User Registration Data:', { name, email, password });

    res.json({ message: 'User registered successfully!' });
});

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
