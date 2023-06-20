import {AuthButton} from "../../components/Buttons";
import Head from "next/head";
import {useState, useRef} from "react";
import axios from "axios";
import {useRouter} from "next/router";


const Register = () => {
    const router = useRouter();
    const miIdref = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const has2FARef = useRef();

    const [miId, setMiId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [has2FA, setHas2FA] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        setMiId(miIdref.current.value);
        setName(nameRef.current.value);
        setPassword(passwordRef.current.value);
        setHas2FA(has2FARef.current.checked);
        setIsSubmitting(true);
        await axios.post(`/api/auth/add-user`, {
            miId,
            name,
            password,
            has2FA,
        })
            .then((res) => {
                if(res.status === 201) {
                    if(has2FA) {
                        router.push({
                            pathname: "/enable-2fa",
                            query: {
                                secret: res.data.secret,
                                qr: res.data.qr,
                                miId: miId,
                            }
                        });
                    }
                    else {
                        router.push("/login");
                    }
                }
                else {
                    setError(res.data.error);
                }
                setIsSubmitting(false);
            })
            .catch((err) => {
                if(err.response.status === 400) {
                    setError(err.response.data.error);
                }
                else
                    setError("Error registering user");
                setIsSubmitting(false);
            })
    }

    return (
        //A register page with 2fa using Tailwind CSS
        <div className="flex flex-col  items-center justify-center min-h-screen py-2  px-14 text-center">
            <Head>
                <title>Register</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <img
                className="w-20"
                src="/logo.svg"
                alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Register
            </h2>
            <div className="mt-2">
                <div className="mt-6 space-y-6">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px w-60">
                            <div>
                                <label htmlFor="miId" className="sr-only">
                                    miId
                                </label>
                                <input
                                    id="miId"
                                    name="miId"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Mi ID"
                                    onChange={(e) => setMiId(e.target.value)}
                                    ref={miIdref}
                                />
                            </div>
                            <div>
                                <label htmlFor="miId" className="sr-only">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    ref={nameRef}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Create Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    ref={passwordRef}
                                />
                            </div>

                        </div>
                        <div className={'mt-2'}>
                            <input
                                type={'checkbox'}
                                className={'mr-2'}
                                name={'2fa'}
                                id={'2fa'}
                                onChange={(e) => setHas2FA(e.target.checked)}
                                ref={has2FARef}
                            />
                            <label htmlFor="2fa" className="text-xs">
                                Enable Two Factor Authentication
                            </label>

                        </div>
                             <span className={'text-red-500 font-sans text-xs'}>{error}</span>
                        <div>
                            <AuthButton
                                text={'Register'}
                                callback={handleSubmit}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                </div>
            </div>
        </div>

    )
}

export default Register