import connectDB from "../../../utils/connectDB";
import User from '../../../models/UserModel';
import VerifyJWT from "../auth/verify-jwt";

export default async function FetchUserDetails(req, res) {
    await connectDB();
    const {method} = req;
    switch (method) {
        case "GET":
            await VerifyJWT(req, res, async () => {
                const {miId} = req.user;
                const user = await User.findOne({miId});
                if(!user) {
                    res.status(404).json({
                        status: "error",
                        error: "User not found"
                    });
                }
                else {
                    user.password = undefined;
                    res.status(200).json({
                        status: "success",
                        data: user
                    });
                }
            });
            break;
        default:
            res.status(400).json({
                status: "error",
                error: "Invalid request"
            });
    }
}