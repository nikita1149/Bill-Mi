import connectDB from "../../../utils/connectDB";
import User from "../../../models/UserModel";
import VerifyJWT from "../auth/verify-jwt";

export default async function Fetch2FAQR(req, res) {
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
                    const secret = user.secret2FA;
                    const qr = `https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/Bill%20Mi:${user.miId}%3Fsecret=${secret}%26issuer=Bill%20Mi`
                    res.status(200).json({
                        status: "success",
                        data: qr
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