import Head from "next/head";
import {Table} from "antd";
import {useEffect, useState} from "react";
import {getStoreDetails, headers} from "../../utils/Auth";
import ClearIcon from '@mui/icons-material/Clear';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {Tooltip} from "@mui/material";
let easyinvoice = require('easyinvoice');

export const columns = [
    {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    }
]

export const handleDownloadInvoice = (invoice) => {
    const data = {
        "settings": {
            "currency": "INR",
        },
        "taxNotation": "gst", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "images": {
            "logo": "https://www.freepnglogos.com/uploads/xiaomi-png/xiaomi-logo-logos-marcas-8.png", //or base64

        },
        "sender": {
            "company": "Xiaomi",
            "address": getStoreDetails().storeName,
            "city": getStoreDetails().storeCity,
            "country": getStoreDetails().storeState,
            // "custom1": "custom value 1",
            // "custom2": "custom value 2",
            // "custom3": "custom value 3"
        },
        "client": {
            "company": invoice.client.firstName + " " + invoice.client.lastName,
            "address": invoice.client.address,
            "zip":"",
            "city":"",
            "country": ""
            // "custom1": "custom value 1",
            // "custom2": "custom value 2",
            // "custom3": "custom value 3"
        },
        "information": {
            "number": invoice.invoiceNumber.split("-")[1],
            "date": invoice.date.split("T")[0],
            "due-date": "Paid",
        },
        //build products array from invoice items
        "products": invoice.items.map((item) => {
            return {
                "quantity": item.quantity,
                "description": item.name,
                "tax-rate": 0,
                "price": item.price
            }}),
        "bottom-notice": "Thank you for shopping with us.",
        "translate": {
            "due-date": "Status",
        }
    };
    console.log(data);
    easyinvoice.createInvoice(data, async function (result) {
        //The response will contain a base64 encoded PDF file
        // console.log(result.pdf);
        // const res = await fetch('/api/invoice/download-invoice', {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify({pdf: result.pdf})
        // });
        // //Response contains pdf file
        // const file = await res.blob();
        // //Create a link to download the file
        // const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(file);
        // link.download = invoice.invoiceNumber + ".pdf";
        // link.click();
        easyinvoice.download(invoice.invoiceNumber + ".pdf", result.pdf);
    });
}

const Invoices = () => {


    const [data, setData] = useState([]);



    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/invoice/fetch-all-invoices', {
                method: 'GET',
                headers: headers
            });
            const fetchedData = await res.json();
            fetchedData.invoices.forEach((invoice, index) => {
                setData((prev) => [...prev, {
                    key: index,
                    client: invoice.client.firstName + " " + invoice.client.lastName,
                    date: invoice.date.split("T")[0].split("-").reverse().join("/"),
                    amount: invoice.total,
                    status: "Paid",
                    //Two circular buttons for download and delete with icons
                    action: <div className="flex w-min justify-center">
                        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 mr-2 cursor-pointer">
                            <Tooltip title={'Download Invoice'}>
                                <CloudDownloadIcon className="text-gray-500" onClick={() => {
                                    console.log(invoice);
                                    handleDownloadInvoice(invoice)}
                                }/>
                            </Tooltip>
                        </div>
                    </div>  ,

                }]);
            });
        }
        fetchData();
            }, []);

    return (
            <>
                <Head>
                    <title>Invoices</title>
                    <link rel="icon" href="/logo.svg" />
                </Head>

                <div className={'container p-4 mt-10 rounded-lg border-2 border-neutral-200 shadow-2xl mx-auto'}>
                    <Table columns={columns} dataSource={data.reverse()} loading={{
                        spinning: data.length === 0,
                        indicator: <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                        </div>
                    }} scroll={{
                        x: 500
                    }} />
                </div>
            </>

    );
}

export default Invoices;