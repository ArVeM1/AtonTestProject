import {usersRedusers} from "./slices/users";
import {authRedusers} from "./slices/auth";
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        users: usersRedusers,
        auth: authRedusers,
    }
});

export default store;