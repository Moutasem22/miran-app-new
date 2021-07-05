import { configureStore } from '@reduxjs/toolkit'
import countrySlice from './store/countrySlice'

export default configureStore({
    reducer: {
        CountyList: countrySlice,
    },
})