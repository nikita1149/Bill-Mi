import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    email: false,
    whatsApp: false,
}

export const sendingOptionsState = createSlice({
    name: 'sendingOptions',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setWhatsApp: (state, action) => {
            state.whatsApp = action.payload;
        },

        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {...state, ...action.payload.sendingOptionsState};
            }
        }
    }
});

export const {setEmail, setWhatsApp} = sendingOptionsState.actions;

export const sendEmail = (state) => state.allReducers.sendingOptionsState.email;
export const selectWhatsApp = (state) => state.allReducers.sendingOptionsState.whatsApp;

export default sendingOptionsState.reducer;