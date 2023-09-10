import { createSlice } from "@reduxjs/toolkit";
import { dataList } from "./Data";

const itemSlice = createSlice({
    name:'items',
    initialState: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : dataList,
    reducers:{
        addItem: (state,action) =>{
            state.push(action.payload)
            localStorage.setItem("items", JSON.stringify(state))
        },
        updateItem: (state,action) => {
            const { id, name ,parent_id} = action.payload
            const iu = state.find(user => user.id == id);
            if(iu){
                iu.name = name;
                iu.parent_id = Number(parent_id);
            }
            localStorage.setItem("items", JSON.stringify(state))  
        },
        deleteItem: (state ,action) => {
            const {id} = action.payload
            const iu = state.find(user => user.id == id);
            if(iu){
             const filtered = state.filter(f => f.id !== id);
            localStorage.setItem("items", JSON.stringify(filtered))
            return filtered

            }
        }
    }
})

export const {addItem,updateItem,deleteItem} =itemSlice.actions;
export default itemSlice.reducer;