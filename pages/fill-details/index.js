import Head from "next/head";
import {useEffect, useState} from "react";
import {storeData} from "../../utils/storeData";
import StoreChip from "../../components/StoreChip";
import {Dropdown, Menu} from "antd";
import {AuthButton} from "../../components/Buttons";
import {useRouter} from "next/router";

const FillDetails = () => {
    const router = useRouter();
    const [storeType, setStoreType] = useState("MI Home");
    const [nearestStoreName, setNearestStoreName] = useState("Auto Detecting Location...");
    const [nearestStoreCity, setNearestStoreCity] = useState("Please allow permission to detect location");
    const [nearestStoreState, setNearestStoreState] = useState("");
    const [posId, setPosId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const menu = (
        <Menu
            items= {storeData.map((store, index) => ({ key: index, label: <StoreChip store={store} callback={() => {
                setNearestStoreName(store.name);
                setNearestStoreCity(store.city);
                setNearestStoreState(store.state);
                }} /> }))}
        />
    );


    useEffect(() => {
     //  if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                let nearestStoreName = '';
                let nearestStoreCity = '';
                let nearestStoreState = '';
                let nearestDistance = Number.MAX_VALUE;
                storeData.map((item) => {
                    let distance = Math.sqrt((item.lat - lat) ** 2 + (item.lon - long) ** 2);
                    if(distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestStoreName = item.name;
                        nearestStoreCity = item.city;
                        nearestStoreState = item.state;
                    }
                })
                setNearestStoreName(nearestStoreName);
                setNearestStoreCity(nearestStoreCity);
                setNearestStoreState(nearestStoreState);
            }, (err) => {
                console.log(err);
                setNearestStoreName("Couldn't detect location");
                setNearestStoreCity("Please Select a Store Manually");
                setNearestStoreState("");
            })

     //   }
        // else {
        //     setNearestStoreName("Couldn't detect location");
        //     setNearestStoreCity("Please select a store");
        // }

    }, [])

    const handleSubmit = () => {
        setIsSubmitting(true);
        if(nearestStoreName === "Couldn't detect location" || nearestStoreName === "Auto Detecting Location...") {
            setError("Please select a store");
            setIsSubmitting(false);
        }
        else if(posId === "") {
            setError("Please enter a POS ID");
            setIsSubmitting(false);
        }
        else {
            localStorage.setItem("posId", posId);
            localStorage.setItem("storeName", nearestStoreName);
            localStorage.setItem("storeCity", nearestStoreCity);
            localStorage.setItem("storeState", nearestStoreState);
            localStorage.setItem("storeType", storeType);
            router.push("/");
        }

    }

    return (
        <div className="flex flex-col  items-center justify-center min-h-screen py-2  px-14 text-center">
            <Head>
                <title>Details</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <img
                className="w-20"
                src="/logo.svg"
                alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Enter Details
            </h2>
            <div className={'flex items-center mt-10'}>
                <h1 className={'mr-4 '}>Choose Store Type:</h1>

                <select onChange={(e) => {
                    setStoreType(e.target.value);
                }} className={''} name="storeType" id="storeType">
                    <option value="MI Home">Mi Home</option>
                    <option value="MI Store">Mi Store</option>
                </select>
            </div>
            <div>
                <h1 className={'mt-4'}>Select Store:</h1>
                {/*<StoreChip name={nearestStoreName} city={nearestStoreCity} state={nearestStoreState}/>*/}
                <Dropdown overlay={menu} trigger={['click']}>
                    <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="flex flex-row items-center">
                            <img
                                className="w-10 h-10 rounded-full"
                                src="/logo.svg"
                                alt="Workflow"
                            />
                            <div className="flex flex-col ml-2">
                                <span className="text-sm font-medium text-gray-900">
                                    {nearestStoreName}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {nearestStoreCity}, {nearestStoreState}
                                </span>
                            </div>
                        </span>
                    </button>
                </Dropdown>
            </div>
            <div className={'flex flex-col mt-10 w-60'}>
                <h1 className={'text-left'}>Enter POS ID:</h1>
                <input type="text"
                       name="posId"
                       id="posId"
                       className={'border-secondaryLight border-2 rounded-lg p-1 outline-primaryDark'}
                       onChange={(e) => setPosId(e.target.value)}
                />
            </div>
            <div className={'w-60 mt-5 text-red-500'}>
                {error}
            </div>
            <div className={'w-60 mt-5'}>
                <AuthButton text={'Continue'} isSubmitting={isSubmitting} callback={handleSubmit} />
            </div>

        </div>
    )
}

export default FillDetails;