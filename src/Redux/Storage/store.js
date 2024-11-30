import { configureStore } from "@reduxjs/toolkit";
import leadStatusReducer from "../Reducers/LeadStatusReducer"

const store = configureStore({
    reducer: {
        leadstatus: leadStatusReducer,
    }
})

export default store;