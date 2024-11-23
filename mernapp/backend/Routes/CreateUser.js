const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = "MyEndToEndChannelIs#";

// Create user route
router.post("/createuser", [
   body('email').isEmail(),
   body('name').isLength({ min: 5 }),
   body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            password: secpassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Login user route
router.post("/loginuser", [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        let userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({ error: "Try logging in with correct credentials" });
        }

        // Compare password with hashed password
        const pwdCompare = await bcrypt.compare(password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ error: "Try logging in with correct credentials" });
        }

        // Create JWT token
        const data = {
            user: {
                id: userData.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret);

        res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

module.exports = router;
