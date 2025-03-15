const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth'); // Import auth middleware

// ✅ Get Logged-in User Data (Protected Route)
router.get("/me", authMiddleware, async (req, res) => {
    try {
        res.json({
            user: req.user,
            stats: { enrolledCourses: 5, completedCourses: 2, rating: 4.5, coins: 100 }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Signup Route: For students, educators, and admins
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({ name, email, password, role });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // ✅ Return user and token (Frontend will handle redirection)
        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // ✅ Return user and token (Frontend will handle redirection)
        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
