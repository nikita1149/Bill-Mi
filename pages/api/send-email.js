import {SMTPClient} from "emailjs";

export default async (req, res) => {
    const {Email, invoiceNumber} = req.body;
    const client = new SMTPClient({
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        host: "smtp.gmail.com",
        ssl: true,
    });
    client.send({
        text: "Your invoice is ready at https://bill-mi.vercel.app/invoices/" + invoiceNumber + ".pdf",
        from: "billmi@gmail.com",
        to: Email,
        subject: "Invoice from BillMi",
    })
    await client.close();
    res.status(200).json({message: "Email sent successfully"});
}