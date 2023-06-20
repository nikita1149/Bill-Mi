import '../styles/style.scss'
import Navbar from "../components/Navbar";
import {useRouter} from "next/router";
import PageTransition from "../components/PageTransition";
import {isLoggedIn} from "../utils/Auth";
import {useEffect, useState} from "react";
import {wrapper} from "../store/store";


function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        setIsLogged(isLoggedIn());
    }, [isLogged, router.pathname]);

    return (
        <>
            {(router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/2fa' || router.pathname === '/enable-2fa' || router.pathname === '/fill-details' || !isLogged ) ? null : <Navbar/>}
            <PageTransition>
                    <Component {...pageProps} />
            </PageTransition>
        </>

    )
}

export default wrapper.withRedux(MyApp);
