import { createSlice } from "@reduxjs/toolkit";
const initialState={
    list:[]
};
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setSavedCart(state,action){
            state.list=action.payload;
        },
        setCartItem(state,action)
        {
            const item=action.payload;
            item.cost = item.quantity * item.price;
            const existingItemIdx=state.list.findIndex(cItem=>cItem._id===item._id);
            if(existingItemIdx>-1)
            {
                state.list[existingItemIdx].quantity+=item.quantity;
            }
            else{
                state.list.push(item);
            }
        },
        removeCartItem(state,action)
        {
            const deltedId=action.payload;
            state.list=state.list.filter(item=>item._id!==deltedId);
        },
        clearCart(state)
        {
            state.list=[]
        },
        updateQuantity(state,action)
        {
            const product=action.payload
            const prodIndex=state.list.findIndex(cItem=>cItem._id===product._id);
            if(prodIndex>-1)
            {
                state.list[prodIndex].quantity=product.quantity;
                state.list[prodIndex].cost=product.price*product.quantity
            }
        }
    }

})
const cartActions=cartSlice.actions;
export {cartActions,cartSlice};
