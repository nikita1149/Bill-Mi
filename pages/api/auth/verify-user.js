import connectDB from "../../../utils/connectDB";
import User from "../../../models/UserModel";
import bcrypt from "bcrypt";

export default async function VerifyUser(req, res) {
    const { miId, password } = req.body;
    await connectDB();
    const user = await User.findOne({ miId });
    const hash = await bcrypt.hash(password, 10);
    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if(valid) {
            res.status(200).json({
                status: "success",
                message: "User verified successfully"
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