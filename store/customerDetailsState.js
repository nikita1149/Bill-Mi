import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    modeOfDelivery: 'pickup',
    modeOfPayment: 'cash',
}

export const customerDetailsState = createSlice({
    name: 'customerDetails',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setModeOfDelivery: (state, action) => {
            state.modeOfDelivery = action.payload;
        },
        setModeOfPayment: (state, action) => {
            state.modeOfPayment = action.payload;
        },
        clearDetails: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.phone = '';
            state.address = '';
        },

        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {...state, ...action.payload.customerDetailsState};
            }
        }
    }
});

export const {setFirstName, setLastName, setEmail, setPhone, setAddress, setModeOfPayment, setModeOfDelivery, clearDetails} = customerDetailsState.actions;

export const selectFirstName = (state) => state.allReducers.customerDetailsState.firstName;
export const selectLastName = (state) => state.allReducers.customerDetailsState.lastName;
export const selectEmail = (state) => state.allReducers.customerDetailsState.email;
export const selectPhone = (state) => state.allReducers.customerDetailsState.phone;
export const selectAddress = (state) => state.allReducers.customerDetailsState.address;
export const selectModeOfDelivery = (state) => state.allReducers.customerDetailsState.modeOfDelivery;
export const selectModeOfPayment = (state) => state.allReducers.customerDetailsState.modeOfPayment;

export default customerDetailsState.reducer;