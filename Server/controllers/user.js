import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../model/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body // this is the only way of getting email and password from the frontend
    try {
        const existingUser = await User.findOne({ email});
        if (!existingUser) return res.status(404).json( {message: "User does not exist"});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials"});
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, "test", { expiresIn: "1h"});
        res.status(200).json({ result: existingUser, token: token });

    } catch (error) {
        res.status(500).json({ message: "oops! something went wrong." })
        
    }
}


export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body// from the client
    try {
        const existingUser = await User.findOne({ email});
        if (existingUser) return res.status(400).json( {message: "User already exist"});
        if (password !== confirmPassword) return res.status(400).json( { message: "password does not match"});
        const hashedPassword = await bcrypt.hash(password, 12); // hash password
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id}, "test", { expiresIn: "1h"});
        res.status(200).json({ result, token });

        
    } catch (error) {
        
    }
}