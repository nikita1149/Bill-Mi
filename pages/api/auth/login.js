import connectDB from "../../../utils/connectDB";
import User from "../../../models/UserModel";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

export default async function Login(req, res) {
    const { miId, password, rememberMe } = req.body;
    await connectDB();
    const user = await User.findOne({ miId });
    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if(valid && user.has2FA) {
            res.status(200).json({
                status: "success",
                message: "User verified successfully",
                has2FA: true,
            });
        }
        else if(valid && !user.has2FA) {
            const token = jwt.sign({ miId }, process.env.JWT_SECRET, {
                expiresIn: rememberMe ? '7d' : '2h'
            });
            res.status(200).json({
                status: "success",
                message: "User verified successfully",
                has2FA: false,
                token
            });
        }
        else {
            res.status(400).json({
                status: "error",
                error: "Incorrect password"
            });
        }
    }
    else
        res.status(400).json({
            status: "error",
            error: "User does not exist"
        });
}