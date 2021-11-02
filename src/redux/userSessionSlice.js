import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    session:null,
    token:null
}

export const userSessionSlice = createSlice({
    name:'session',
    initialState,
    reducers:{
        Session:(state, action)=>{
            state.session = action.payload
        },
        Token:(state, action)=>{
            state.token = action.payload
        },
        reset:state=>initialState
    }
})

export const {Session, Token, reset} = userSessionSlice.actions

export default userSessionSlice.reducer