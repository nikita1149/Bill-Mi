import Face2Icon from '@mui/icons-material/Face2';
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getStoreDetails} from "../utils/Auth";

const Graph = dynamic(() => import('./Graph'), {ssr: false})

const NewInvoice = ({graph}) => {
    const [storeType, setStoreType] = useState('');
    const [storeCity, setStoreCity] = useState('');
    const [storeState, setStoreState] = useState('');

    const data = [
        {
            name: '04-05',
            amount: 0,
        },
        {
            name: '05-05',
            amount: 0,
        },
        {
            name: '06-05',
            amount: 0,
        },
        {
            name: '07-05',
            amount: 0,
        },
        {
            name: '08-05',
            amount: 0,
        },
        {
            name: '09-05',
            amount: 0,
        },
        {
            name: '10-05',
            amount: 3490,
        }
    ]

    useEffect(() => {
        setStoreType(getStoreDetails().storeType);
        setStoreCity(getStoreDetails().storeCity);
        setStoreState(getStoreDetails().storeState);
    }, [])


    return (
        <div className={'flex flex-col rounded-3xl bg-primary p-10 md:w-[33.33vw] text-white'}>
            <div className={'flex items-center justify-between border-b-1 pb-10 border-neutral-600'}>
                <h1 className={'text-xl w-1/2 text-white'}>Create New Invoice</h1>
                <Link href={'/new-invoice'}>
                    <button className={`
                    bg-white
                    text-primary
                    hover:scale-105
                    duration-200
                    hover:shadow-xl
                    hover:shadow-gray-600
                    rounded-full
                    shadow-gray-600
                    shadow-lg
                    w-40
                    h-12
                    `}>Get started</button>
                </Link>
            </div>

            <div className={'flex flex-col mt-10 border-b-1 border-neutral-600 pb-10'}>
                <h1 className={'text-lg font text-white'}>Store Details</h1>
                <div className={'flex hover:scale-105 duration-200 items-center rounded-full bg-secondary mx-0 lg:mx-5 p-1 lg:p-5 mt-2 cursor-pointer'}>
                    <div className={'p-4 flex bg-primary rounded-full'}>
                        {/*<Face2Icon fontSize={'large'} className={'text-white'}/>*/}
                        <Image src={'/logo.svg'} className={'my-auto'} width={50} height={50}/>
                    </div>
                    <div className={'flex flex-col ml-5'}>
                        <h1 className={'text-lg text-white'}>{storeType}</h1>
                        <span className={'text-xxs lg:text-xs font-thin'}>{storeCity}</span>
                        <span className={'text-xxs lg:text-xs font-thin'}>{storeState}</span>
                    </div>
                </div>
            </div>

            <div className={'flex flex-col mt-10 my-auto'}>
                <span className={'text-2xl'}>Earning Graph</span>
                <div className={'mt-10'}>
                    <Graph data={graph}/>
                </div>

            </div>

        </div>
    )
}

export default NewInvoice;