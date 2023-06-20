import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AddIcon from '@mui/icons-material/Add';
import FaceIcon from '@mui/icons-material/Face';
import {getMiId, getName, logout} from "../utils/Auth";
import {Skeleton, Zoom} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {Tooltip} from "@mui/material";
import {motion} from "framer-motion";

const Navbar = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [miId, setMiId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getName().then((res) => {
            setName(res);
            setMiId(getMiId());
            setLoading(false);
        })
    }, [router.pathname])

    return (
        <div className={'flex justify-between p-2 mt-5'}>
            <div className={'flex -mt-1 items-center md:mr-0 mr-2 md:ml-5 cursor-pointer hover:scale-105 duration-200'}>
                <Image src={'/logo.svg'} width={30} height={30}/>
                <h1 className={'ml-2 mt-1 md:inline hidden cursor-pointer md:text-md text-xs'}>Bill Mi</h1>
            </div>

            <div className={'flex flex-wrap items-center justify-center'}>
                <Link href={'/'}><motion.a whileHover={{scale:1.05}} className={`mr-2 md:text-md text-xs md:mr-5 hover:scale-105 duration-500 ${router.pathname === '/' ? 'text-primary hover:text-primary' : 'text-gray-400 hover:text-secondaryLight duration-300'}`}><DashboardIcon fontSize={'small'} className={'mb-1 mr-1'}/>Dashboard</motion.a></Link>
                <Link href={'/invoices'}><motion.a whileHover={{scale:1.05}} className={`mr-2 md:text-md text-xs md:mr-5 hover:scale-105 duration-200 ${router.pathname === '/invoices' ? 'text-primary hover:text-primary' : 'text-gray-400 hover:text-secondaryLight duration-300'}`}><ReceiptIcon fontSize={'small'} className={'mb-1 mr-1'}/>Invoices</motion.a></Link>
                <Link href={'/clients'}><motion.a whileHover={{scale:1.05}} className={`mr-2 md:text-md text-xs md:mr-5 hover:scale-105 duration-200 ${router.pathname === '/clients' ? 'text-primary hover:text-primary' : 'text-gray-400 hover:text-secondaryLight duration-300'}`}><PeopleOutlineIcon fontSize={'small'} className={'mb-1 mr-1'}/>Clients</motion.a></Link>
                <Link href={'/new-invoice'}><motion.a whileHover={{scale:1.05}} className={`mr-2 md:text-md text-xs md:mr-5 hover:scale-105 duration-200 ${router.pathname === '/new-invoice' ? 'text-primary hover:text-primary' : 'text-gray-400 hover:text-secondaryLight duration-300'}`}><AddIcon fontSize={'small'} className={'mb-1 mr-1'}/>New invoice</motion.a></Link>
            </div>

            <div className={'flex md:mr-5'}>
                <Tooltip title={'Profile'} TransitionComponent={Zoom} disableInteractive enterDelay={1000}>
                    <div className={`flex
                    cursor-pointer
                    hover:scale-105
                    duration-200
                    items-center
                    -mt-2
                    ${router.pathname === '/profile' ? 'scale-105' : ''}`} onClick={() => {
                        router.push('/profile')
                            .then(() => {
                                window.scrollTo(0, 0)
                            })
                    }}>
                            <FaceIcon fontSize={'small'} className={'md:mb-1 md:mt-0 mt-1 mr-2 md:mr-1'}/>
                        <div className={'flex md:inline hidden flex-col'}>
                            <h1 className={'md:mr-5 md:text-base text-xxs cursor-pointer'}>{loading ? <Skeleton width={70} sx={{
                                marginTop: '-0.2rem',
                            }}/> : name}</h1>
                            <h1 className={'md:mr-5 md:text-md text-xxs -mt-1 text-[10px] cursor-pointer text-gray-400'}>{loading ? <Skeleton width={70} sx={{
                                marginTop: '-0.2rem',
                            }}/> : `Mi id: ${miId}`}</h1>
                        </div>
                    </div>
                </Tooltip>
                <Tooltip title={'Logout'} TransitionComponent={Zoom} disableInteractive enterDelay={1000}>
                    <div className={'flex cursor-pointer hover:scale-110 duration-200 items-center'}>
                            <LogoutIcon fontSize={'small'} className={'mb-1 mr-1'} onClick={() => {
                                logout();
                                router.push('/login');
                            }}/>
                    </div>
                </Tooltip>

            </div>
        </div>
    )
}

export default Navbar