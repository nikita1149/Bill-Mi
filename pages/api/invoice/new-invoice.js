import connectDB from "../../../utils/connectDB";
import Invoice from "../../../models/InvoiceModel";
import Clients from "../../../models/ClientModel";
import User from "../../../models/UserModel";
import Stats from "../../../models/statsModel";
import DateWiseRevenue from "../../../models/DateWiseRevenueModel";
import VerifyJWT from "../auth/verify-jwt";

export default async function NewInvoice(req, res) {
    await connectDB();
    const {method} = req;
    switch (method) {
        case "POST":
            await VerifyJWT(req, res, async () => {
                const {miId} = req.user;
                const user = await User.findOne({miId});
                const {products, total, totalQuantity, client} = req.body;
                let statsData = await Stats.findOne({id: '123'});
                if(!statsData) {
                    statsData = new Stats({
                        id: '123',
                        totalInvoices: 0,
                        totalClients: 0,
                        totalProductsSold: 0,
                        totalRevenue: 0,
                    });
                    await statsData.save();
                }
                let clientData = await Clients.findOne({phone: client.phone});
                if(!clientData) {
                    await Clients.create({
                        phone: client.phone,
                        firstName: client.firstName,
                        lastName: client.lastName,
                        email: client.email,
                        address: client.address,
                        modeOfDelivery: client.modeOfDelivery,
                        modeOfPayment: client.modeOfPayment,
                    });
                    statsData.totalClients += 1;
                    clientData = await Clients.findOne({phone: client.phone});
                }
                else {
                    clientData.firstName = client.firstName;
                    clientData.lastName = client.lastName;
                    clientData.email = client.email;
                    clientData.address = client.address;
                    clientData.modeOfDelivery = client.modeOfDelivery;
                    clientData.modeOfPayment = client.modeOfPayment;
                    await clientData.save();
                }
                let invoiceData = await Invoice.create({
                    client: clientData._id,
                    items: products,
                    total: total,
                    totalQuantity: totalQuantity,
                    createdBy: user._id,
                    date: new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),
                });
                await Clients.findOneAndUpdate({phone: client.phone}, {
                    $push: {
                        invoices: invoiceData._id
                    }
                });
                // Save and Update Revenue in date wise model
                let dateWiseRevenueData = await DateWiseRevenue.findOne({date: new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata'})});
                if(!dateWiseRevenueData) {
                    dateWiseRevenueData = new DateWiseRevenue({
                        date: new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata'}),
                        revenue: total,
                    });
                    await dateWiseRevenueData.save();
                }
                else {
                    dateWiseRevenueData.revenue += total;
                    await dateWiseRevenueData.save();
                }
                statsData.totalInvoices += 1;
                statsData.totalProductsSold += totalQuantity;
                statsData.totalRevenue += total;
                await statsData.save();
                res.status(200).json({
                    status: "success",
                    data: invoiceData
                });
            });
            break;
        default:
            res.status(400).json({
                status: "error",
                error: "Invalid request"
            });
    }
}