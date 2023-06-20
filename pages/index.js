import Head from "next/head";
import NewInvoice from "../components/NewInvoice";
import {ClientsChip, InvoicesChip, ProductSoldChip, RevenueChip} from "../components/Chip";
import HomePageTable from "../components/HomePageTable";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {headers, isAuthenticated, isDetailsFilled, isLoggedIn} from "../utils/Auth";
import axios from "axios";
import millify from "millify";


const Home = () => {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [revenue, setRevenue] = useState(0);
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [totalClients, setTotalClients] = useState(0);
    const [totalProductsSold, setTotalProductsSold] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        setIsLogged(isLoggedIn());
        if(!isLoggedIn()) {
            router.push("/login")
                .then(() => window.scrollTo(0, 0));
        }
        isAuthenticated()
            .then((res) => {
                if(!res) {
                    router.push("/login")
                        .then(() => window.scrollTo(0, 0));
                }
                else if(!isDetailsFilled()) {
                    router.push("/fill-details")
                }
            })
        async function fetchData() {
            await axios.get("/api/dashboard/dashboard-data", {
                headers: headers
            })
                .then((res) => {
                    setRevenue(millify(res.data.statsData.totalRevenue));
                    setTotalInvoices(res.data.statsData.totalInvoices);
                    setTotalClients(res.data.statsData.totalClients);
                    setTotalProductsSold(res.data.statsData.totalProductsSold);
                    if(tableData.length === 0) {
                        res.data.invoiceData.forEach((invoice) => {
                            setTableData((prev) => [...prev, {
                                client: invoice.client.firstName + " " + invoice.client.lastName,
                                date: invoice.date.split("T")[0].split("-").reverse().join("/"),
                                amount: invoice.total,
                                status: "Paid",
                            }]);
                        });
                    }
                    if(graphData.length === 0) {
                        res.data.dateWiseRevenueData.forEach((data) => {
                            setGraphData((prev) => [...prev, {
                                name: data.date.split("T")[0].split("-").reverse()[0] + '-' + data.date.split("T")[0].split("-").reverse()[1],
                                amount: data.revenue,
                            }]);
                        });
                    }
                    setIsLoading(false);
                })
        }
        fetchData().then(() => {
            // setTableData(tableData.slice(0, tableData.length/2));

        });

    }, []);
    const columns = [
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
        }
    ]

    const data = [
        {
            client: 'John Brown',
            date: '12/12/2020',
            amount: '1000',
            status: 'Paid'
        },
        {
            client: 'Jim Green',
            date: '12/12/2020',
            amount: '1000',
            status: 'Paid'
        },
        {
            client: 'Joe Black',
            date: '12/12/2020',
            amount: '1000',
            status: 'Paid'
        },
        {
            client: 'Jim Red',
            date: '12/12/2020',
            amount: '1000',
            status: 'Paid'
        },
        {
            client: 'Jim Blue',
            date: '12/12/2020',
            amount: '1000',
            status: 'Paid'
        }
    ]


  return isLogged ? (
    <div className={'flex md:flex-row flex-col mt-10 md:mt-20 lg:px-20'}>
        <Head>
            <title>Bill Mi</title>
            <link rel="icon" href="/logo.svg" />
        </Head>
        <h1 className={'text-2xl ml-5 md:hidden font-bold'}>Dashboard</h1>
        <NewInvoice graph={graphData}/>
        <div className={'flex flex-col md:ml-12 w-full'}>
            <div>
                <h1 className={'text-2xl hidden md:inline font-bold'}>Dashboard</h1>
            </div>
            <div className={'flex justify-between w-full mt-10'}>
                <InvoicesChip loading={isLoading} invoices={totalInvoices}/>
                <ClientsChip loading={isLoading} clients={totalClients}/>
                <RevenueChip loading={isLoading} revenue={revenue}/>
                <ProductSoldChip loading={isLoading} productsSold={totalProductsSold}/>
            </div>
            <div className={'bg-[#FDFDFD] w-full md:p-10'}>
                <div className={'bg-white rounded-3xl md:mt-0 mt-5 px-2 py-4 md:p-10  shadow-sm'}>
                    <h1 className={'text-xl'}>Recent invoices</h1>
                    <HomePageTable columns={columns} data={tableData}/>
                    <div className={'flex justify-between mt-4'}>
                        {/*<span className={'text-secondaryLight'}>Showing 5 out of 1200</span>*/}
                        <Link href={'/invoices'}><span className={'mr-16 ml-auto cursor-pointer hover:translate-x-3 duration-300'}>See all &#8594;</span></Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
  ): null;
}

export default Home;