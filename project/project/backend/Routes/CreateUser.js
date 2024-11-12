const express = require('express')
const router = express.Router()
// here we are creating router instance -> some middle frameworkd
// This is similar to extracting class Schema from express and the creating it's instance
// We cannot do that because Router isn't a class in Js but a function.
const User = require('../models/User')
// importing Schema
const {body, validationResult} = require('express-validator')
// similary create instances of functions body and validationResult functions from express-validator
// import json we token library, used for security reasons
const jwt = require('jsonwebtoken')

const bcrypt = require("bcryptjs")
const { emit } = require('nodemon')
const jwtSecret = "xkdnfiardhsyfgeikdtyahvijsyfthgw"
//  for password encryption

// when user hits the endpoint createuser, this will be done
router.post("/createuser", 
    body('email').isEmail(),
    body('name').isLength({min: 5}),
    body('password', 'incorrect password').isLength({min: 5}),
    // putting some conditional checks, for arguments that are passed
    // now finally write what you want to do, what to fetch and what to do with the fetched data
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            // send data
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    }
)

router.post("/loginuser", body('email').isEmail(), body('password', 'incorrect password').isLength({ min: 5 }), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }

        const pwdcompare = await bcrypt.compare(req.body.password, userData.password)

        if (!pwdcompare) {
            return res.status(400).json({ errors: "Try logging in with correct credentials(password)" });
        }

        const data = {
            user:{
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)
        return res.json({ success: true, authToken: authToken, name: userData.name});
        // res.json({ success: true });
    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})

module.exports = router;