import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export interface ISingleNew {
    url: string;
    title: string;
    id:number;
    imageUrl: string;
    newsSite:string;
    summary: string;
    publishedAt: string;
    updatedAt:string;
    featured:boolean;
    filter? : string
}
interface IId {
    idI: number
}
export interface INews {
    news: ISingleNew[]
    singleNew: ISingleNew
}
export const getAllNews = createAsyncThunk(
    'getAllNews',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=100');
            if (response.ok) {
                const data = await response.json()
                if(data.length===0){
                    toast.error('Data do not found');
                    return;
                }
                else {
                    dispatch(getNewsReducer({data}))
                }
            }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
export const getSingleNew = createAsyncThunk(
    'getSingleNew',
    async (data:IId, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles/${data.idI}`);
            if (response.ok) {
                const data = await response.json()
                if(data.length===0){
                    toast.error('Data do not found');
                    return;
                }
                else {
                    dispatch(getSingleNewReducer({data}))
                }
            }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)
const initialState :INews  = {
    news: [],
    singleNew: {
        url: '',
        title: '',
        id:0,
        imageUrl: '',
        newsSite:'',
        summary: '',
        publishedAt: '',
        updatedAt:'',
        featured:false
    }
}

export const newsListSlice = createSlice({
    name: 'newsList',
    initialState,
    reducers:{
        getNewsReducer(state,action){
            state.news =action.payload.data
        },
        getSingleNewReducer(state,action){
            state.singleNew =action.payload.data
        }
    }
})

export const {getNewsReducer,getSingleNewReducer} =newsListSlice.actions;

export default newsListSlice.reducer
