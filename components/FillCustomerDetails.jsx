import {CircularProgress, Snackbar} from "@mui/material";
import {useState} from "react";
import {
    setFirstName,
    setLastName,
    setPhone,
    selectModeOfDelivery,
    setEmail,
    setAddress,
    selectPhone,
    selectFirstName,
    selectAddress,
    selectEmail,
    selectLastName,
    setModeOfDelivery,
    setModeOfPayment,
    clearDetails,
    selectModeOfPayment
} from "../store/customerDetailsState";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import axios from "axios";
import {headers} from "../utils/Auth";

const FillCustomerDetails = () => {
    const dispatch = useDispatch();
    const FirstName = useSelector(selectFirstName);
    const LastName = useSelector(selectLastName);
    const Email = useSelector(selectEmail);
    const Phone = useSelector(selectPhone);
    const Address = useSelector(selectAddress);
    const ModeOfDelivery = useSelector(selectModeOfDelivery);
    const ModeOfPayment = useSelector(selectModeOfPayment);


    const [isFetching, setIsFetching] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const fetchCustomerDetails = async (phone) => {
        setIsFetching(true);
        const response = await axios.post('/api/client/fetch-client', {
            phone: phone
        }, {
            headers: headers
        })
            .then(response => {
                if (response.data.status === 'success') {
                    setShowSnackbar(true);
                    setSnackbarMessage('Customer Found. Details fetched successfully :)');
                    dispatch(setFirstName(response.data.client.firstName));
                    dispatch(setLastName(response.data.client.lastName));
                    dispatch(setPhone(response.data.client.phone));
                    dispatch(setEmail(response.data.client.email));
                    dispatch(setAddress(response.data.client.address));
                    dispatch(setModeOfDelivery(response.data.client.modeOfDelivery));
                    dispatch(setModeOfPayment(response.data.client.modeOfPayment));
                    setIsFetching(false);
                } else {
                    setIsFetching(false);
                    setSnackbarMessage("New Customer :)");
                    setShowSnackbar(true);
                }
            })

    }


    return (
        <div>
            <div className={'flex flex-col items-center'}>
                <div className={'flex flex-row relative justify-center mt-10'}>
                    <h1 className={'text-xl'}>Fill Customer Details</h1>
                    <Button onClick={() => {
                        dispatch(clearDetails());
                    }} type={'danger'} className={'absolute -right-80 text-black'}>
                        Clear Details
                    </Button>
                </div>

            {/*    A form to enter customer details for invoice*/}
                <div className={'flex flex-col relative w-full'}>
                    <label htmlFor={'phone'} className={'mt-10'}>Phone Number</label>
                    <input value={Phone} onChange={(event) => {
                        dispatch(setPhone(event.target.value))
                        if(event.target.value.length === 10) {
                            fetchCustomerDetails(event.target.value).then(r => r)
                        }
                    }} type={'text'} id={'phone'} placeholder={'10 digit Phone'} className={'w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm p-2 border-2 border-primaryLight'}/>
                    <div className={'flex absolute bottom-2 -right-8  items-center'}>
                        {isFetching && <CircularProgress
                            disableShrink={true}
                            size={25}
                            sx={{
                                animationDuration: '550ms',
                                color: 'black',
                            }}
                        />}
                    </div>
                </div>
                <div className={'flex mt-10 space-x-10'}>
                    <div className={'flex flex-col'}>
                        <label htmlFor={'firstName'}>First Name</label>
                        <input value={FirstName} onChange={(event) => {
                            dispatch(setFirstName(event.target.value))
                        }} className={'w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm p-2 border-2 border-primaryLight'} type={'text'} id={'firstName'} name={'firstName'} placeholder={'First Name'}/>
                    </div>
                    <div className={'flex flex-col'}>
                        <label htmlFor={'lastName'}>Last Name</label>
                        <input value={LastName} onChange={(event) => {
                            dispatch(setLastName(event.target.value))
                        }} className={'w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm p-2 border-2 border-primaryLight'} type={'text'} id={'lastName'} name={'lastName'} placeholder={'Last Name'}/>
                    </div>
                </div>

                <div className={'flex flex-col w-full'}>
                    <label htmlFor={'email'} className={'mt-10'}>Email (optional)</label>
                    <input value={Email} onChange={(event) => {
                        dispatch(setEmail(event.target.value))
                    }} type={'text'} id={'email'} placeholder={'Email'} className={'w-full mr-2 mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm p-2 border-2 border-primaryLight'}/>
                </div>

                <div className={'flex flex-col w-full'}>
                    <label htmlFor={'modeOfDelivery'} className={'mt-10'}>Mode of Delivery:</label>
                    <select defaultValue={'pickup'} value={ModeOfDelivery} name={'modeOfDelivery'} id={'modeOfDelivery'} className={'w-full mr-2 mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm p-2 border-2 border-primaryLight'} onChange={(e) => {
                        dispatch(setModeOfDelivery(e.target.value))
                    }}>
                        <option value={'pickup'}>In Store Pickup</option>
                        <option value={'delivery'}>Home Delivery</option>
                    </select>
                </div>

                {ModeOfDelivery === 'delivery' && <div className={'flex flex-col w-full'}>
                    <label htmlFor={'address'} className={'mt-10'}>Address</label>
                    <input value={Address} onChange={(event) => {
                        dispatch(setAddress(event.target.value))
                    }} type={'text'} id={'address'} placeholder={'Address'} className={'w-full mr-2 mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm p-2 border-2 border-primaryLight'}/>
                </div>}

                <div className={'flex flex-col w-full'}>
                    <label htmlFor={'modeOfPayment'} className={'mt-10'}>Mode of Payment:</label>
                    <select defaultValue={'cash'} value={ModeOfPayment} onChange={(event) => {
                        dispatch(setModeOfPayment(event.target.value))
                    }} name={'modeOfPayment'} id={'modeOfPayment'} className={'w-full mr-2 mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm p-2 border-2 border-primaryLight'}>
                        <option value={'cash'}>Cash</option>
                        <option value={'card'}>Card</option>
                        <option value={'upi'}>UPI</option>
                        <option value={'wallet'}>Wallet</option>
                        <option value={'other'}>Other</option>
                    </select>
                </div>

                <div className={'flex flex-col h-40 w-full'}>
                {/*    dummy container*/}
                </div>

            </div>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                message={snackbarMessage}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                />

        </div>

    )
}

export default FillCustomerDetails