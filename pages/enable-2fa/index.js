import Head from "next/head";
import {useRouter} from "next/router";
import {AuthButton} from "../../components/Buttons";
import Image from "next/image";

const Enable2fa = () => {
    const router = useRouter();
    const {secret, qr, miId} = router.query;

    return (
        <div className="flex flex-col  items-center justify-center min-h-screen py-2  px-14 text-center">
            <Head>
                <title>Login</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <img
                className="w-20"
                src="/logo.svg"
                alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Enable 2FA
            </h2>
            <div className="mt-2 flex flex-col">
                <span>MI ID: {miId}</span>
                {/*<Image src={qr} alt="QR Code" width={200} height={200}/>*/}
                <img src={qr} alt="qr code" />
                <span>Secret: {secret}</span>
            </div>
            <div className={'w-80 mt-10'}>
                <AuthButton
                    text={'I had scanned the QR code'}
                    callback={() => router.push('/login')}
                />
            </div>


        </div>
    )
}

export default Enable2fa