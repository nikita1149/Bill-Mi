import Image from "next/image";
import {addProduct, removeProduct} from "../store/choosedProductsState";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useDispatch} from "react-redux";

const CheckoutItemCard = ({ item }) => {
    const dispatch = useDispatch();

    const { name, price, quantity, image } = item;
    return (
        <div className={'flex items-center w-96 m-2 border-2 border-neutral-200 rounded-lg p-2'}>
            <Image src={image} width={120} height={120} alt={name} />
            <div className={'flex ml-2 flex-col'}>
                <h1>{name}</h1>
                <h1>₹ {price}</h1>
                <div className={'flex'}>
                    <button
                        className={'border-2 border-neutral-200 rounded-full w-6 h-6 flex justify-center items-center'}
                        onClick={() => {
                            dispatch(removeProduct(item))
                        }}
                    >
                        {quantity > 1 ? '-' : <DeleteOutlineIcon fontSize={'inherit'}/>}
                    </button>
                    <h1 className={'text-sm font-bold mx-2'}>{quantity}</h1>
                    <button
                        className={'border-2 border-neutral-200 rounded-full w-6 h-6 flex justify-center items-center'}
                        onClick={() => {
                            dispatch(addProduct(item))
                        }}
                    >
                        +
                    </button>
                </div>

                <h1 className={'mt-auto'}>₹ {price * quantity}</h1>
            </div>
        </div>
    );
}

export default CheckoutItemCard;