import Head from "next/head";
import {Modal, Table} from "antd";
import {useEffect, useState} from "react";
import {headers} from "../../utils/Auth";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Tooltip} from "@mui/material";
import {columns as col, handleDownloadInvoice} from "../invoices/index";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


const Clients = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState([]);

    const columns = [
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Mode of Delivery',
            dataIndex: 'modeOfDelivery',
            key: 'modeOfDelivery',
        },
        {
            title: 'Mode of Payment',
            dataIndex: 'modeOfPayment',
            key: 'modeOfPayment',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        }
    ]

    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/client/fetch-all-clients', {
                method: 'GET',
                headers: headers
            });
            const fetchedData = await res.json();
            console.log(fetchedData);
            fetchedData.clients.forEach((client, index) => {
                setData((prev) => [...prev, {
                    key: index,
                    client: client.firstName + " " + client.lastName,
                    phone: client.phone,
                    email: client.email ? client.email : "N/A",
                    address: client.address ? client.address : "N/A",
                    modeOfDelivery: client.modeOfDelivery,
                    modeOfPayment: client.modeOfPayment,
                    //View invoice button
                    action: <div className="flex w-min justify-center">
                        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 mr-2 cursor-pointer">
                            <Tooltip title={'View Invoices'}>
                                <RemoveRedEyeIcon onClick={() => {
                                    setIsModalVisible(true);
                                    setModalData(client.invoices.map((invoice, index) => {
                                        return {
                                            key: index,
                                            client: client.firstName + " " + client.lastName,
                                            date: invoice.date.split("T")[0].split("-").reverse().join("/"),
                                            amount: invoice.total,
                                            status: "Paid",
                                            //Two circular buttons for download and delete with icons
                                            action: <div className="flex w-min justify-center">
                                                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-200 mr-2 cursor-pointer">
                                                    <Tooltip title={'Download Invoice'}>
                                                        <CloudDownloadIcon className="text-gray-500" onClick={() => {
                                                            console.log(invoice);
                                                            handleDownloadInvoice(invoice)
                                                             }
                                                        }/>
                                                    </Tooltip>
                                                </div>
                                            </div>  ,
                                        }
                                    }));}
                                } className="text-gray-500"/>
                            </Tooltip>
                        </div>
                    </div>

                }]);
            });
        }
        fetchData();
    }, []);

    return (

        <div>
            <Head>
                <title>Clients</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div className={'container p-4 mt-10 rounded-lg border-2 border-neutral-200 shadow-2xl mx-auto'}>
                <Table columns={columns} dataSource={data.reverse()} loading={{
                    spinning: data.length === 0,
                    indicator: <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                }} scroll={{
                    x: 1000,
                }}/>
            </div>
            <Modal
                title="Invoices"
                open={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                width={"100%"}
            >
                <Table columns={col} dataSource={modalData} loading={{
                    spinning: data.length === 0,
                    indicator: <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                }} scroll={{
                    x: 1000,
                }}/>
            </Modal>
        </div>
    )
}

export default Clients;