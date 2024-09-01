const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    // Here you would typically save the user to a database
    console.log('User signed up:', { username, email, password });
    res.status(200).send('Signup successful');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
