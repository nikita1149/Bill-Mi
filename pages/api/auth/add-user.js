import connectDB from "../../../utils/connectDB";
import User from "../../../models/UserModel";
import bcrypt from "bcrypt";
const twoFactor = require("node-2fa");

export default async function AddUser(req, res) {
    const { miId, name, password, has2FA } = req.body;
    await connectDB();
    const user = await User.findOne({ miId });
    if (user) {
        res.status(400).json({ error: "User already exists" });
    }
    else {
        const hash = await bcrypt.hash(password, 10);
        const newSecret = twoFactor.generateSecret({ name: "Bill Mi", account: miId });
        const newUser = new User({
            miId,
            name,
            password: hash,
            has2FA,
            secret2FA: newSecret.secret,
        });
        await newUser.save();
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            secret: newSecret.secret,
            qr: newSecret.qr,
        });
    }

}