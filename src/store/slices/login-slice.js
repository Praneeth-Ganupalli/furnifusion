import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLoggedIn:false,
    user:null
}
const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setLoginStatus(state,action)
        {
            state.isLoggedIn=action.payload;
        },
        setUserInfo(state,action)
        {
            state.user = action.payload;
        }
    }
})
const loginActions=loginSlice.actions;
export {loginActions,loginSlice};