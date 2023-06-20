import connectDB from "../../../utils/connectDB";
import Client from "../../../models/ClientModel";
import VerifyJWT from "../auth/verify-jwt";

export default async function FetchClient(req, res) {
    await connectDB();
    const {method} = req;
    switch (method) {
        case "POST":
            await VerifyJWT(req, res, async () => {
                const {miId} = req.user;
                const {phone} = req.body;
                const client = await Client.findOne({phone});
                if(client) {
                    res.status(200).json({
                        status: "success",
                        client,
                    });
                }
                else {
                    res.status(200).json({
                        status: "error",
                        message: "No client found",
                    });
                }
            });
            break;
        default:
            res.status(400).json({
                status: "error",
                message: "Invalid request method",
            });
            break;
    }
}
