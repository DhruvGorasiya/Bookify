const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const UserModel = require('./models/User');
app.use(express.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URL);
const secret = 'asdfasdgasdfgasdfhgaisdh';

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    console.log('User Registration Data:', { name, email, password, role });


        try{
            const user = await UserModel.create({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                role: role
            });
            res.json(user);
        } catch (e) {
            console.log("Error in registration: ", e);
            return res.status(400).json({error: "Registration failed. Please try again."});
            
        }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) return res.status(404).json({ error: 'User not found' });



    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
        jwt.sign({role: user.role , email: user.email, id: user._id}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user);
        });    
    }
    else res.status(400).json({error: "Invalid credentials"});
});

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
