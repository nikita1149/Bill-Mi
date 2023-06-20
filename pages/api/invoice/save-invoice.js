//Function to save base64 encoded PDF file to invoices folder
import * as fs from "fs";
import * as path from "path";

export default async function SaveInvoice(req, res) {
    const {method} = req;
    switch (method) {
        case "POST":
            const {pdf, invoiceId} = req.body;
            const data = Buffer.from(pdf, 'base64');
            const filePath = path.join(process.cwd(), 'public/invoices', invoiceId + '.pdf');
            fs.writeFileSync(filePath, data);
            res.status(200).json({
                status: "success",
                message: "Invoice saved successfully",
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