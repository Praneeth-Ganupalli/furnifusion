import { createSlice } from "@reduxjs/toolkit";
const initialState={
    data:[],
    defaultPath:{
        name:"Home",
        path:"/home"
    }
}
const breadCrumbSlice=createSlice({
    name:"breadcrumb",
    initialState,
    reducers:{
        setBreadCrumbs(state,action)
        {
            state.data=JSON.parse(JSON.stringify([state.defaultPath,action.payload]));
        },
        updateBreadcrumbs(state,action)
        {
            state.data=JSON.parse(JSON.stringify([state.defaultPath,...action.payload]));
        }
    }
})
const breadCrumbActions=breadCrumbSlice.actions;
export {breadCrumbActions,breadCrumbSlice};