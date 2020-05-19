const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
    // validate the data before we make a user
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    
    // checking if the user already in database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exist')

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router