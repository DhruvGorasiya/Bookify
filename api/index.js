const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const PlaceModel = require('./models/Place');
require('dotenv').config();
const UserModel = require('./models/User');
app.use(express.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

mongoose.connect(process.env.MONGO_URL);
const secret = 'asdfasdgasdfgasdfhgaisdh';

app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));



app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    let { role } = req.body;

    console.log('User Registration Data:', { name, email, password, role });

    if (email === 'z@gmail.com' || email === 'x@gmail.com') {
        role = 'admin';
    }

    try {
        const user = await UserModel.create({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            role: role
        });
        res.json(user);
    } catch (e) {
        console.log("Error in registration: ", e);
        return res.status(400).json({ error: "Registration failed. Please try again." });

    }
});

app.post('/updateProfile', async (req, res) => {
    const { email, name, oldPassword, newPassword } = req.body;

    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const userData = jwt.verify(token, secret);
        const user = await UserModel.findById(userData.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        if (newPassword) {
            user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error in updating profile:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) return res.status(404).json({ error: 'User not found' });



    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
        jwt.sign({ role: user.role, email: user.email, id: user._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user);
        });
    }
    else res.status(400).json({ error: "Invalid credentials" });
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, userData) => {
            UserModel.findById(userData.id).then(({ name, email, role, _id }) => {
                res.json({ name, email, role, _id });
            });
        });
    }
    else res.json(null);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json({ message: 'Logged out' });
});

const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace(/uploads[\\/]/, ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;
    if (token) {
        jwt.verify(token, secret, {}, async (err, userData) => {
            if (err) throw err;
            const placeDoc = await PlaceModel.create({
                owner: userData.id,
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            });
            res.json(placeDoc);
        });
    }
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await PlaceModel.find({ owner: id }));
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await PlaceModel.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, secret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await PlaceModel.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places', async (req, res) => {
    res.json(await PlaceModel.find());
})

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
