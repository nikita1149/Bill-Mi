import {useEffect, useState} from "react";
import Head from "next/head";
import {Button, Tabs} from "antd";
import {items} from "../utils/itemsData";
import ItemCard from "./ItemCard";
import {Fab, ThemeProvider} from "@mui/material";
import theme from "../utils/theme";
import MicNoneIcon from "@mui/icons-material/MicNone";
import {clearProducts, selectTotal, selectTotalQuantity} from "../store/choosedProductsState";
import {useDispatch, useSelector} from "react-redux";

const AddProducts = () => {
    const dispatch = useDispatch();
    const Total = useSelector(selectTotal);
    const TotalQuantity = useSelector(selectTotalQuantity);

    const [fabState, setFabState] = useState("hidden");
    const [addedItems, setAddedItems] = useState([]);

    const clearAddedItems = (
        <Button type={'danger'} className={'text-black'} onClick={() => {
            dispatch(clearProducts());
        }}>
            Clear Products
        </Button>
    )

    useEffect(() => {
        setTimeout(() => {
            setFabState("visible");
        }, 500);
    }, []);

    return (
        <div>
            <Head>
                <title>New Invoice</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div className={'flex flex-col items-center -z-50'}>
                <div className={'flex flex-row justify-center mt-5'}>
                    <h1 className={'text-xl'}>Select Products</h1>
                    <div className={'absolute flex flex-col right-0 md:right-40'}>
                        <h1 className={'text-xs md:text-lg'}>Total: ₹ {Total}</h1>
                        <h1 className={'text-xs md:text-lg'}>Total Products: {TotalQuantity}</h1>
                    </div>
                </div>
                <div className={'flex w-fit flex-wrap overflow-scroll mt-10'}>

                    <Tabs defaultActiveKey="1"
                          tabBarExtraContent={clearAddedItems}
                          scrollable={true}
                          className={'overflow-scroll'}
                          centered
                    >
                        <Tabs.TabPane tab="TV" key="1">
                            <div className={'flex flex-row flex-wrap justify-center w-2/3 mx-auto'}>
                                {
                                    items.TV.map((item, index) => {
                                        return <ItemCard key={index} item={item}/>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Smartphones" key="2">
                            <div className={'flex flex-row flex-wrap justify-center w-2/3 mx-auto'}>
                                {
                                    items.Smartphones.map((item, index) => {
                                        return <ItemCard key={index} item={item}/>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Laptops" key="3">
                            <div className={'flex flex-row flex-wrap justify-center w-2/3 mx-auto'}>
                                {
                                    items.Laptops.map((item, index) => {
                                        return <ItemCard key={index} item={item}/>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Smart Home" key="4">
                            <div className={'flex flex-row flex-wrap justify-center w-2/3 mx-auto'}>
                                {
                                    items["Smart Home"].map((item, index) => {
                                        return <ItemCard key={index} item={item}/>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={"Accessories"} key={"5"}>
                            <div className={'flex flex-row flex-wrap justify-center w-2/3 mx-auto'}>
                                {
                                    items.Accessories.map((item, index) => {
                                        return <ItemCard key={index} item={item}/>
                                    })
                                }
                            </div>
                        </Tabs.TabPane>
                    </Tabs>

                </div>
            </div>





            <div className={'fixed bottom-10 right-10'}>
                {/*<ThemeProvider theme={theme}>*/}
                    <Fab sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        ":hover": {
                            backgroundColor: 'black',
                        }
                    }} className={'hover:text-white text-black duration-200 ' + fabState} color="primary" aria-label="add">
                        <MicNoneIcon />
                    </Fab>
                {/*</ThemeProvider>*/}
            </div>
        </div>
    )
}

export default AddProducts;