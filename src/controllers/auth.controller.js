const usermodel = require('../models/auth.model');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { username, email, password, role } = req.body;

        const isuseralreadycreated = await usermodel.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (isuseralreadycreated) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = usermodel.create({
            username,
            email,
            password,
            role
        });

        const token = jwt.sign({
            id: newUser._id,
            role: newUser.role,
        }, process.env.JWT_SECRET);

        res.cookie('token', token);

        res.status(201).json({ message: 'User registered successfully', username, email, role });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}

module.exports = { register };
