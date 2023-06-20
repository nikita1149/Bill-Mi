import Head from "next/head";
import OtpInput from "react-otp-input";
import {AuthButton} from "../../components/Buttons";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {login} from "../../utils/Auth";

const TwoFactorAuth = () => {
    const router = useRouter();
    const { miId, rememberMe } = router.query;
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (otpp) => {
        setIsSubmitting(true);
        await axios.post(`/api/auth/verify-2fa`, {
            miId,
            code: otp.length === 6 ? otp : otpp,
            rememberMe,
        })
            .then((res) => {
                if(res.status === 200) {
                    login(miId, res.data.token);
                    router.push("/fill-details");
                }
                else {
                    setError(res.data.error);
                    setIsSubmitting(false);
                }
            })
            .catch((err) => {
                console.log(err);
              if(err.response.status === 400) {
                  setError(err.response.data.error);
                  setIsSubmitting(false);
              }
                else
              {
                    setError("Error logging in");
                    setIsSubmitting(false);
              }
            })
    }

    return (
        //Google Authenticator code goes here using Tailwind CSS
        <div className="flex flex-col  items-center justify-center min-h-screen py-2  px-14 text-center">
            <Head>
                <title>Two Factor Authentication</title>
                <link rel="icon" href="/logo.svg" />
            </Head>
            <img
                className="w-20"
                src="/logo.svg"
                alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Two Factor Authentication
            </h2>
            <h2 className={'mt-2 text-secondaryLight'}>
                Enter the code from your authenticator app
            </h2>
            <div className="mt-2">
                <div className="mt-6 space-y-6">
                        <OtpInput
                            value={otp}
                            onChange={otp => {
                                setOtp(otp);
                                if(otp.length === 6) {
                                    handleSubmit(otp);
                                }

                            }

                            }
                            numInputs={6}
                            separator={<span>-</span>}
                            inputStyle={{
                                width: "2rem",
                                height: "3rem",
                                margin: "0.2rem",
                                borderRadius: 4,
                                border: "2px solid rgba(0,0,0,0.3)",
                                text: "black",
                            }}
                            shouldAutoFocus={true}
                        />
                    <span className={'text-red-500 font-sans text-xs'}>{error}</span>

                    <AuthButton
                        callback={handleSubmit}
                        text={"Verify"}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>


    )
}

export default TwoFactorAuth;