import {selectProducts, selectTotal} from "../store/choosedProductsState";
import {useSelector, useDispatch} from "react-redux";
import CheckoutItemCard from "./CheckoutItemCard";
import {selectFirstName, selectLastName, selectModeOfDelivery, selectAddress, selectModeOfPayment, selectEmail, selectPhone} from "../store/customerDetailsState";
import {setWhatsApp, setEmail, sendEmail, selectWhatsApp} from "../store/sendingOptionsState";

const Checkout = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const total = useSelector(selectTotal);
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const modeOfDelivery = useSelector(selectModeOfDelivery);
    const address = useSelector(selectAddress);
    const modeOfPayment = useSelector(selectModeOfPayment);
    const email = useSelector(selectEmail);
    const phone = useSelector(selectPhone);
    const SendEmail = useSelector(sendEmail);
    const SendWhatsApp = useSelector(selectWhatsApp);

    return (
        <>
        <div>
            <div className={'mt-5 justify-center flex'}>
                <h1 className={'text-xl'}>Final Checkout</h1>
                <div className={'absolute right-80 font-sans font-bold text-xl'}>
                    <h1>Total: ₹ {total}</h1>
                </div>
            </div>
            <div className={'flex-col flex mt-10'}>
                <h1 className={'text-xl mx-auto'}>Selected Products</h1>
                <div className={'flex flex-wrap mx-auto pb-5 w-11/12 justify-center border-b-2 border-neutral-200'}>
                    {
                        products.map((product, index) => <CheckoutItemCard key={index} item={product}/>)
                    }
                </div>


            </div>

        </div>
    <h1 className={'text-xl mx-auto mt-10'}>Customer Details</h1>
    <div className={'flex flex-col font-sans text-xl w-auto ml-40'}>
        <div className={'flex my-2 flex-row justify-center'}>
            <h1 className={'w-40'}>Name:</h1>
            <h1 className={'w-80 font-bold ml-2'}>{`${firstName} ${lastName}`}</h1>
        </div>
        <div className={'flex my-2 flex-row justify-center'}>
            <h1 className={'w-40'}>Phone:</h1>
            <h1 className={'w-80 font-bold ml-2'}>{phone}</h1>
        </div>
        {email && <div className={'flex my-2 flex-row justify-center'}>
            <h1 className={'w-40'}>Email:</h1>
            <h1 className={'w-80 font-bold ml-2'}>{email}</h1>
        </div>}
        <div className={'flex my-2 flex-row justify-center'}>
            <h1 className={'w-40'}>Mode of Delivery:</h1>
            <h1 className={'w-80 font-bold ml-2'}>{modeOfDelivery}</h1>
        </div>
        {address && <div className={'flex my-2 flex-row justify-center'}>
            <h1 className={'w-40'}>Address:</h1>
            <h1 className={'w-80 font-bold ml-2'}>{address}</h1>
        </div>}
        <div className={'flex my-2 flex-row justify-center'}>
            <h1 className={'w-40'}>Mode of Payment:</h1>
            <h1 className={'w-80 font-bold ml-2'}>{modeOfPayment}</h1>
        </div>


    </div>
        {/*    checkbox for sending invoice on email and whatsapp*/}
        {/*<div className={'flex items-center flex-col mb-40 w-1/2 mx-auto mt-10'}>*/}
        {/*    <div className={'flex w-96 flex-row'}>*/}
        {/*        <input type={'checkbox'} checked={!email ? false : null} disabled={email ? false : true} className={'w-5 h-5'} onChange={(e) => {*/}
        {/*            dispatch(setEmail(e.target.checked))*/}
        {/*        }}/>*/}
        {/*        <h1 className={'ml-2'}>Send Invoice on Email</h1>*/}
        {/*        {!email && <h1 className={'ml-2 text-red-500'}>(email required)</h1>}*/}
        {/*    </div>*/}
        {/*    <div className={'flex w-96 flex-row'} >*/}
        {/*        <input type={'checkbox'} onChange={(e) => {*/}
        {/*            dispatch(setWhatsApp(e.target.checked))*/}
        {/*        }} className={'w-5 h-5'}/>*/}
        {/*        <h1 className={'ml-2'}>Send Invoice on Whatsapp</h1>*/}
        {/*    </div>*/}
        {/*</div>*/}

        </>

    )
}

export default Checkout;