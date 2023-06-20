import {CircularProgress} from "@mui/material";

export const AuthButton = ({text, callback, isSubmitting}) => {
    return (
        <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={callback}
        >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
            {isSubmitting ? <CircularProgress size={20} sx={{
                color: "white",
            }}/> : text}
        </button>
    )
}