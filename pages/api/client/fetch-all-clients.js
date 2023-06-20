import connectDB from "../../../utils/connectDB";
import Client from "../../../models/ClientModel";
import Invoice from "../../../models/InvoiceModel";
import VerifyJWT from "../auth/verify-jwt";

export default async function FetchAllClients(req, res) {
    await connectDB();
    const {method} = req;
    switch (method) {
        case "GET":
            await VerifyJWT(req, res, async () => {
                const {miId} = req.user;
                const clients = await Client.find().populate('invoices');
                res.status(200).json({
                    status: "success",
                    clients,
                });
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