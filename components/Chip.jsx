import WidgetsIcon from '@mui/icons-material/Widgets';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Skeleton} from "@mui/material";

export const InvoicesChip = ({invoices, loading}) => {
    return (
        <div className={'bg-purple-box bg-contain lg:w-44 bg-no-repeat flex p-1 lg:p-5'}>
            <div className={'rounded-xl bg-[#6B34FE] w-8 h-8 lg:w-10 lg:h-10 items-center flex justify-center'}>
                <WidgetsIcon fontSize={'inherit'} className={'text-white'}/>
            </div>
            <div className={'flex flex-col w-[53%] ml-1 lg:ml-5'}>
                <h1 className={'text-xxs lg:text-xs '}>Invoices</h1>
                {loading ? <Skeleton height={30}/> : <h1 className={'mt-1 lg:text-xl text-xs font-bold '}>{invoices}</h1>}
            </div>
        </div>
    )
}

export const ClientsChip = ({clients, loading}) => {
    return (
        <div className={'bg-blue-box bg-contain lg:w-44 bg-no-repeat flex p-1 lg:p-5'}>
            <div className={'rounded-xl bg-[#00B6FB] w-8 h-8 lg:w-10 lg:h-10 items-center flex justify-center'}>
                <PeopleAltIcon fontSize={'inherit'} className={'text-white'}/>
            </div>
            <div className={'flex flex-col w-[53%] ml-1 lg:ml-5'}>
                <h1 className={'text-xxs lg:text-xs '}>Clients</h1>
                {loading ? <Skeleton height={30}/> : <h1 className={'mt-1 lg:text-xl text-xs font-bold '}>{clients}</h1>}
            </div>
        </div>
    )
}

export const RevenueChip = ({revenue, loading}) => {
    return (
        <div className={'bg-orange-box bg-contain lg:w-44 bg-no-repeat flex p-1 lg:p-5'}>
            <div className={'rounded-xl bg-[#FE5B2E] w-8 h-8 lg:w-10 lg:h-10 items-center flex justify-center'}>
                <PaidIcon fontSize={'inherit'} className={'text-white'}/>
            </div>
            <div className={'flex flex-col w-[53%] ml-1 lg:ml-5'}>
                <h1 className={'text-xxs lg:text-xs '}>Revenue</h1>
                {loading ? <Skeleton height={30}/> : <h1 className={'mt-1 lg:text-xl text-xs font-bold '}>₹{revenue}</h1>}
            </div>
        </div>
    )
}

export const ProductSoldChip = ({productsSold, loading}) => {
    return (
        <div className={'bg-gray-box bg-contain lg:w-44 bg-no-repeat flex p-1 lg:p-5'}>
            <div className={'rounded-xl bg-[#DCDCDC] w-8 h-8 lg:w-10 lg:h-10 items-center flex justify-center'}>
                <ShoppingCartIcon fontSize={'inherit'} className={'text-white'}/>
            </div>
            <div className={'flex flex-col w-[53%] ml-1 lg:ml-5'}>
                <h1 className={'text-xxs lg:text-xs '}>Sold Items</h1>
                {loading ? <Skeleton height={30}/> : <h1 className={'mt-1 lg:text-xl text-xs font-bold '}>{productsSold}</h1>}
            </div>
        </div>
    )
}
