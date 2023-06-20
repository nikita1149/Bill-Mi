//Function to download base64 encoded PDF file
export default function DownloadInvoice(req, res) {
    const {method} = req;
    switch (method) {
        case "POST":
            const {pdf} = req.body;
            const data = Buffer.from(pdf, 'base64');
            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Length': data.length,
                'Content-Disposition': 'attachment; filename=invoice.pdf'
            });
            res.end(data);
            break;
        default:
            res.status(400).json({
                status: "error",
                message: "Invalid request method",
            });
            break;
    }
}