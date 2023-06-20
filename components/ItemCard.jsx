import Image from "next/image";
import {useState} from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {addProduct, removeProduct, selectProducts} from "../store/choosedProductsState";
import {useDispatch, useSelector} from "react-redux";

const ItemCard = ({ item }) => {
    const Products = useSelector(selectProducts);
    const dispatch = useDispatch();


    const quantity = Products.filter((product) => product.id === item.id).length === 0 ? 0 : Products.filter((product) => product.id === item.id)[0].quantity;

    return (
        <div className={'w-60 flex flex-col rounded-lg border-2 border-neutral-200 px-2 m-2'}>
            <Image src={item.image} width={300} height={300}/>
            <div className={'flex flex-col p-2'}>
                <h1 className={'text-sm font-bold'}>{item.name}</h1>
                <h1 className={'text-sm text-neutral-500'}>₹ {item.price}</h1>
                {quantity!==0 ? (
                    <div className={'flex flex-row justify-between items-center mt-2'}>
                        <div className={'flex flex-row items-center'}>
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
                    </div>
                ) : (
                <button className={'bg-yellow-100 w-20 mt-2 hover:bg-yellow-500 duration-500 p-1'} onClick={() => {
                    dispatch(addProduct(item))
                }}>
                    Select
                </button>
                    )}
            </div>

        </div>
    );
}

export default ItemCard;