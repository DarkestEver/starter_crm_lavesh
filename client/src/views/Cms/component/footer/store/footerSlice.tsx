import { apiGetFooterData, apiPostFooterData, apiPutFooterData } from '@/services/CMS/FooterService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFooterData = createAsyncThunk('footer/data/fetchFooterData', async () => {
    const response = await apiGetFooterData<Footer[]>()
    return response.data;
})

export type FooterFormModel = {
    footerColumn: Number,
    title: string;
    menuList: Array<{ name: string; routerPath: string }>;
    published: Boolean
};
type PostFooterData = FooterFormModel
  

export const postFooterData = createAsyncThunk('footer/data/postFooterData', async (data: PostFooterData) => {
    const response = await apiPostFooterData(data)
    return response.data;
})

export const putFooterData = createAsyncThunk('footer/data/postFooterData', async ( data: PostFooterData) => {
    const response = await apiPutFooterData(data)
    return response.data;
})

type Footer = {
    id: string,
    footerColumn: string,
    title: string;
    menuList: Array<{ name: string; routerPath: string }>;
    published: Boolean
};

export type FooterState = {
    loading: boolean
    footerData: Footer[],
    isError: boolean
}

const initialState: FooterState = {
    loading: true,
    footerData: [],
    isError: false
}

export const SLICE_NAME = 'footer'

const footerSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFooterData.fulfilled, (state, action) => {
                state.loading = false
                state.footerData = action.payload
            })
            .addCase(fetchFooterData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchFooterData.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
    },
})

export default footerSlice.reducer;