import connectDB from "../../../utils/connectDB";
import Invoice from "../../../models/InvoiceModel";
import Client from "../../../models/ClientModel";
import User from "../../../models/UserModel";
import VerifyJWT from "../auth/verify-jwt";

export default async function FetchAllInvoices(req, res) {
    await connectDB();
    const {method} = req;
    switch (method) {
        case "GET":
            await VerifyJWT(req, res, async () => {
                const {miId} = req.user;
                const invoices = await Invoice.find().populate('client').populate('createdBy', 'name miId');
                res.status(200).json({
                    status: "success",
                    invoices,
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