import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

    name : 'auth',
    initialState:{
        user:null,
        error:null,
        message:null,
        loading:false,
    },

    reducers:{

        setUser: (state,action)=>{
            state.user = action.payload
        },

        setLoading: (state,action)=>{
            state.loading = action.payload
        },

        setMessage: (state,action)=>{
            state.message = action.payload
        },

        setError: (state,action)=>{
            state.error = action.payload
        },

        clearAuthState: (state)=>{
            state.error=null;
            state.message=null;
        }
    }
});

export const {setUser,setLoading,setMessage,setError,clearAuthState} = authSlice.actions;

export default authSlice.reducer