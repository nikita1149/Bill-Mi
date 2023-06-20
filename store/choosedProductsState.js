import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    products: [],
    total: 0,
    totalQuantity: 0,
}

export const choosedProductsState = createSlice({
    name: 'choosedProducts',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const index = state.products.findIndex(item => item.id === product.id);
            if(index === -1) {
                state.products.push({...product, quantity: 1});
            }
            else {
                state.products[index].quantity += 1;
            }
            state.total += product.price;
            state.totalQuantity += 1;
        },
        removeProduct: (state, action) => {
            const product = action.payload;
            const index = state.products.findIndex(item => item.id === product.id);
            if(index !== -1) {
                state.products[index].quantity -= 1;
                if(state.products[index].quantity === 0) {
                    state.products.splice(index, 1);
                }
                state.total -= product.price;
                state.totalQuantity -= 1;
            }
        },
        clearProducts: (state) => {
            state.products = [];
            state.total = 0;
            state.totalQuantity = 0;
        },

        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {...state, ...action.payload.choosedProductsState};
            }
        }

    }
})

export const {addProduct, removeProduct, clearProducts} = choosedProductsState.actions;



export const selectProducts = (state) => state.allReducers.choosedProductsState.products;

export const selectTotal = (state) => state.allReducers.choosedProductsState.total;
export const selectTotalQuantity = (state) => state.allReducers.choosedProductsState.totalQuantity;

export default choosedProductsState.reducer;
