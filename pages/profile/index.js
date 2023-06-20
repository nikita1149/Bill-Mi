import Head from 'next/head'
import FaceIcon from '@mui/icons-material/Face';
import {useEffect, useState} from "react";
import {get2FAQrCode, get2FAStatus, getMiId, getName, update2FAStatus} from "../../utils/Auth";
import {Button, CircularProgress, Skeleton, Snackbar, Switch} from "@mui/material";


const Profile = () => {
    const [name, setName] = useState("");
    const [miId, setMiId] = useState("");
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [isQRCodeLoading, setIsQRCodeLoading] = useState(true);
    const [qr, setQr] = useState("");

    useEffect(() => {
        getName().then((res) => {
            setName(res);
            setMiId(getMiId());
        })
        get2FAStatus().then((res) => {
            setIs2FAEnabled(res);
        })
        get2FAQrCode().then((res) => {
            setQr(res);
            setIsQRCodeLoading(false);
        })
    }, [is2FAEnabled]);

    const handle2FASwitch = (event) => {
        setIsUpdating(true);
        update2FAStatus(event.target.checked).then((res) => {
            setIsUpdating(false);
            setIs2FAEnabled(!is2FAEnabled);
            setIsSnackbarOpen(true);
        })
    }

    return (
        <div>
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div className={'flex py-5 flex-col mx-auto lg:w-1/2 mt-10 items-center container rounded-2xl shadow-2xl border-neutral-200 border-2'}>
                <h1 className={'text-3xl'}>Profile</h1>
                <div className={'flex w-full mt-5'}>
                    <div className={'pl-20 absolute hidden md:inline'}>
                        <FaceIcon sx={{
                            fontSize: 120,
                        }}/>
                    </div>
                    <div className={'flex flex-col mx-auto justify-around h-28'}>
                        <div className={'flex'}>
                            <h1 className={'text-lg w-32'}>Name:</h1>
                            <h1 className={'text-lg ml-5'}>{name}</h1>
                        </div>
                        <div className={'flex'}>
                            <h1 className={'text-lg w-32'}>Mi id:</h1>
                            <h1 className={'text-lg ml-5'}>{miId}</h1>
                        </div>

                    </div>

                </div>
                <div className={'mt-10 mx-auto flex flex-col'}>
                    <h1 className={'text-3xl mx-auto'}>2FA Settings</h1>
                    <div className={'mt-5'}>
                        <div className={'flex items-center'}>
                            <h1 className={'text-lg w-32'}>Enable 2FA</h1>
                            <Switch
                                className={'ml-10 -mt-1'}
                                checked={is2FAEnabled}
                                onChange={handle2FASwitch}

                            />
                            <div className={'w-10 mt-1'}>
                                {
                                    isUpdating && <CircularProgress
                                        disableShrink={true}
                                        size={20}
                                        sx={{
                                            animationDuration: '550ms',
                                        }}
                                    />
                                }
                            </div>
                            <Snackbar
                                open={isSnackbarOpen}
                                message="Updated 2FA status successfully"
                                autoHideDuration={2000}
                                onClose={() => setIsSnackbarOpen(false)}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            />

                        </div>
                    </div>
                    {/*<Button className={'mt-5'}>*/}
                    {/*    Show 2FA QR Code*/}
                    {/*    <CircularProgress*/}
                    {/*        disableShrink={true}*/}
                    {/*        size={20}*/}
                    {/*        sx={{*/}
                    {/*            animationDuration: '550ms',*/}
                    {/*            marginLeft: '10px'*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</Button>*/}
                    <div className={'mt-5 flex flex-col'}>
                        <h1 className={'mx-auto'}>2FA QR Code</h1>
                        {
                            isQRCodeLoading ? <Skeleton
                                height={250}
                                width={150}
                                className={'mx-auto -mt-10 -mb-10'}
                            /> : <img src={qr} alt={'qr'} className={'mx-auto'}/>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;