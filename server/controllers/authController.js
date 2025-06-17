const User= require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            username: user.username,
            status: user.status
        },
        process.env.JWTPRIVATEKEY,
        { expiresIn: '7d' }
    );
};

exports.register = async (req, res) => {
    const {username, fullname, email, password} = req.body
    console.log("Register received:", {username, fullname, email, password})
    try {
        const user = await User.register(username, fullname, email, password);
        res.status(201).json({message: "Zarejestrowano"})
    } catch (error) {
        res.status(409).json({error: error.message})
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.login(username, password)
        const token = createToken(user)
        const status = user.status
        res.status(200).json({username, status, token})
    } catch (error) {
        res.status(409).json({error: error.message})
    }
};

