import { createSlice } from '@reduxjs/toolkit'

export const countrySlice = createSlice({
    name: 'country',
    initialState: {
        countries: [],
    },
    reducers: {
        getList: (state, action) => {
            state.countries = [...action.payload];
        },
        addToList: (state, action) => {
            state.countries.unshift(action.payload);
        },
        editToList: (state, action) => {
            const { body, rowIndex } = action.payload
            state.countries.splice(rowIndex, 1, body);
            console.log('action.payload', action)
        },
    },
})

// Action creators are generated for each case reducer function
export const { getList, addToList, editToList } = countrySlice.actions

export default countrySlice.reducer