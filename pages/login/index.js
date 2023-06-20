import Head from "next/head";
import {AuthButton} from "../../components/Buttons";
import {useRouter} from "next/router";
import {useState, useRef} from "react";
import axios from "axios";
import {login} from "../../utils/Auth";

const Login = () => {


    const router = useRouter();

    const [miId, setMiId] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        await axios.post(`/api/auth/login`, {
            miId,
            password,
            rememberMe,
        })
            .then((res) => {
                if(res.status === 200) {
                    if(res.data.has2FA) {
                        router.push({
                            pathname: "/2fa",
                            query: {
                                miId: miId,
                                rememberMe: rememberMe,
                            }
                        });
                    }
                    else {
                        login(miId, res.data.token);
                        router.push("/fill-details");
                    }
                }
                else {
                    setError(res.data.error);
                    setIsSubmitting(false);
                }
            })
            .catch((err) => {
                if(err.response.status === 400) {
                    setError(err.response.data.error);
                    setIsSubmitting(false);
                }
                else
                    setError("Error logging in");
                    setIsSubmitting(false);
            })
    }

    return (
    //Login screen using Tailwind CSS
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
                Sign in to your account
            </h2>

            <div className="mt-8">
                <div className="mt-6 space-y-3">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm w-60 -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="mi-id"
                                    name="mi-id"
                                    type="text"
                                    autoComplete="mi-id"
                           //         required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Mi ID"
                                    onChange={(e) => setMiId(e.target.value)}

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
                                    autoComplete="current-password"
                                  //  required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    onChange={(e) => setRememberMe(e.target.checked)}

                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me for 7 days
                                </label>
                            </div>

                        </div>
                        </div>
                            <span className={'text-red-500 font-sans text-xs'}>{error}</span>

                        <div className={'mt-4'}>
                            <AuthButton text={'Sign in'} callback={handleSubmit} isSubmitting={isSubmitting}/>
                        </div>

            </div>
        </div>

  );
}

export default Login;