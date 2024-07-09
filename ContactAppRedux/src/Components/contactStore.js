import { configureStore } from "@reduxjs/toolkit";
import contactReducer from './features/contactSlice'

const contactStore = configureStore({
    reducer: contactReducer
})

export default contactStore;