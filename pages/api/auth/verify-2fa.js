import connectDB from "../../../utils/connectDB";
import User from "../../../models/UserModel";
const twoFactor = require('node-2fa');
const jwt = require('jsonwebtoken');

export default async function Verify2FA(req, res) {
    const { miId, code, rememberMe } = req.body;
    await connectDB();
    const user = await User.findOne({ miId });
    if (user) {
        const verified = twoFactor.verifyToken(user.secret2FA, code);
        if(verified) {
            const token = jwt.sign({ miId }, process.env.JWT_SECRET, {
                expiresIn: rememberMe ? '7d' : '2h'
            });
            res.status(200).json({
                status: "success",
                message: "User verified successfully",
                token
            });
        }
        else {
            res.status(400).json({
                status: "error",
                error: "Incorrect code"
            });
        }
    }
    else
        res.status(400).json({
            status: "error",
            error: "User does not exist"
        });
}