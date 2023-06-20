import connectDB from "../../../utils/connectDB";
import Invoice from "../../../models/InvoiceModel";
import Stats from "../../../models/statsModel";
import DateWiseRevenue from "../../../models/DateWiseRevenueModel";
import Client from "../../../models/ClientModel";
import User from "../../../models/UserModel";
import VerifyJWT from "../auth/verify-jwt";

export default async function NewInvoice(req, res) {
    await connectDB();
    const {method} = req;
    switch (method) {
        case "GET":
            await VerifyJWT(req, res, async () => {
                const {miId} = req.user;
                const statsData = await Stats.findOne({id: '123'});
                const invoiceData = await Invoice.find().sort({date: -1}).limit(5).populate('client').populate('createdBy', 'name miId');
                const dateWiseRevenueData = await DateWiseRevenue.find().sort({date: -1}).limit(7);
                res.status(200).json({
                    status: "success",
                    statsData,
                    invoiceData,
                    dateWiseRevenueData,
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