import connectDB from '../../../utils/connectDB';
import User from '../../../models/UserModel';
import VerifyJWT from "./verify-jwt";

export default async (req, res) => {
    await connectDB();
    const updatedStatus = req.body.status;
    await VerifyJWT(req, res, async () => {
        const {miId} = req.user;
        const user = await User.findOne({miId});
        if(user) {
            user.has2FA = updatedStatus;
            await user.save();
            res.status(200).json({
                status: "success",
                message: "2FA status updated successfully"
            });
        }
        else {
            res.status(404).json({
                status: "error",
                error: "User not found"
            });
        }
    });
}