import Head from "next/head";
import {CircularProgress, Fab, Snackbar, ThemeProvider} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import theme from '../../utils/theme';
import {useEffect, useState} from "react";
import {Tabs} from 'antd';
import AddProducts from "../../components/AddProducts";
import FillCustomerDetails from "../../components/FillCustomerDetails";
import Checkout from "../../components/Checkout";
import {selectProducts, selectTotal, selectTotalQuantity, clearProducts} from "../../store/choosedProductsState";
import {useSelector, useDispatch} from "react-redux";
import { selectLastName, clearDetails, selectAddress, selectEmail, selectPhone, selectFirstName, selectModeOfDelivery, selectModeOfPayment} from "../../store/customerDetailsState";
import axios from "axios";
import {selectWhatsApp, sendEmail} from "../../store/sendingOptionsState";
import {getStoreDetails, headers} from "../../utils/Auth";
import easyinvoice from "easyinvoice";


const uploadInvoice = (invoice) => {
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

        const res = await fetch('/api/invoice/save-invoice', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({pdf: result.pdf, invoiceId: invoice.invoiceNumber})
        });
        const data = await res.json();
        console.log("Upload log here",data);

    });
}

const NewInvoice = () => {
    const dispatch = useDispatch();
    const Products = useSelector(selectProducts);
    const Total = useSelector(selectTotal);
    const FirstName = useSelector(selectFirstName);
    const LastName = useSelector(selectLastName);
    const Address = useSelector(selectAddress);
    const Email = useSelector(selectEmail);
    const Phone = useSelector(selectPhone);
    const ModeOfDelivery = useSelector(selectModeOfDelivery);
    const ModeOfPayment = useSelector(selectModeOfPayment);
    const TotalQuantity = useSelector(selectTotalQuantity);
    const WhatsApp = useSelector(selectWhatsApp);
    const SendEmail = useSelector(sendEmail);

    const [activeTab, setActiveTab] = useState(0);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const renderTab = () => {
        switch (activeTab) {
            case 0:
                return <AddProducts />
            case 1:
                return <FillCustomerDetails/>
            case 2:
                return <Checkout/>
            default:
                return <div>1</div>
        }
    }

    const handleCreateInvoice = async () => {
        setLoading(true);
        await axios.post("/api/invoice/new-invoice", {
            products: Products,
            totalQuantity: TotalQuantity,
            total: Total,
            client: {
                firstName: FirstName,
                lastName: LastName,
                address: Address,
                email: Email,
                phone: Phone,
                modeOfDelivery: ModeOfDelivery,
                modeOfPayment: ModeOfPayment,
            }
        }, {
            headers: headers
        })
        .then(res => {
            console.log(res);
            uploadInvoice(res.data.data);
            setSnackbarMessage("Invoice created successfully");
            setShowSnackbar(true);
            setLoading(false);
            //open new tab with whatsapp api key
            if(WhatsApp) {
                window.open(`https://wa.me/91${Phone}?text=Your%20invoice%20is%20ready%20at%20https://bill-mi.vercel.app/invoices/${res.data.data.invoiceNumber}.pdf`, "_blank");
            }
            //send email to client using api
            if(SendEmail) {
                fetch('/api/send-invoice', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({email: Email, invoiceId: res.data.data.invoiceNumber})
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
            }
        })
        .catch(err => {
            console.log(err);
            setSnackbarMessage("Error creating invoice");
            setShowSnackbar(true);
            setLoading(false);
        })
    }

    return (
        <div>
            <Head>
                <title>New Invoice</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div className={'flex flex-col items-center'}>
                <div className={'flex flex-row justify-center mt-10'}>
                    <h1 className={'text-3xl'}>Create New Invoice</h1>
                </div>

                <div className={'fixed right-10 top-1/2 bottom-1/2'} onClick={() => {
                    if(activeTab < 2) {
                        setActiveTab(activeTab + 1)
                    }
                    if(Products.length === 0) {
                        setActiveTab(0)
                        setShowSnackbar(true);
                        setSnackbarMessage("Please add products to the invoice");
                    }
                    if(activeTab === 1) {
                        if((FirstName === "" || LastName === ""   || Phone === ""  || ModeOfPayment === "") || (ModeOfDelivery === "delivery" && Address === "")) {
                            setShowSnackbar(true);
                            setActiveTab(1)
                            setSnackbarMessage("Please fill the required fields");
                            //regex for email validation
                        } else if(Email !== "" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(Email)) {
                            setShowSnackbar(true);
                            setActiveTab(1)
                            setSnackbarMessage("Please enter a valid email");
                        }
                        //regex for phone validation
                        else if(!/^[0-9]{10}$/.test(Phone)) {
                            setShowSnackbar(true);
                            setActiveTab(1)
                            setSnackbarMessage("Please enter a valid phone number");
                        }
                    }
                    if(activeTab === 2) {
                        if(Products.length === 0) {
                            setShowSnackbar(true);
                            setActiveTab(0)
                            setSnackbarMessage("Please add products to the invoice");
                        }
                        else {
                            console.log("Sending request");
                            handleCreateInvoice()
                                .then(() => {
                                    setActiveTab(0)
                                    dispatch(clearProducts())
                                    dispatch(clearDetails())
                                })
                        }
                    }
                }}>
                    {/*<ThemeProvider theme={theme}>*/}
                        <Fab sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            ":hover": {
                                backgroundColor: 'black',
                            },
                            zIndex: 1000
                        }} className={'hover:text-white z-50 text-black duration-200 '} variant={activeTab === 2 && !loading ? 'extended' : 'circular'} color="primary" aria-label="add">
                            {activeTab === 2 && !loading ? 'Create Invoice' : ''}
                            {loading ? <CircularProgress/> : <ArrowForwardIosIcon/>}
                        </Fab>
                    {/*</ThemeProvider>*/}
                </div>

                {activeTab === 0 ? null : <div className={'fixed left-10 top-1/2 bottom-1/2'} onClick={() => setActiveTab(activeTab - 1)}>
                    {/*<ThemeProvider theme={theme}>*/}
                        <Fab sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            ":hover": {
                                backgroundColor: 'black',
                            },
                            zIndex: 1000
                        }} className={'hover:text-white text-black duration-200 '} color="primary" aria-label="add">
                            <ArrowBackIosNewIcon/>
                        </Fab>
                    {/*</ThemeProvider>*/}

                </div>}
                {renderTab()}
            </div>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </div>
    )
}

export default NewInvoice;