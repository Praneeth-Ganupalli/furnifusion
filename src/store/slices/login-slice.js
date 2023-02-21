import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLoggedIn:false
}
const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setLoginStatus(state,action)
        {
            state.isLoggedIn=action.payload;
        }
    }
})
const loginActions=loginSlice.actions;
export {loginActions,loginSlice};