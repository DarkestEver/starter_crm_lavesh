import { apiDeleteNewsletter, apiGetBlockGuideData, apiGetNewsletterData, apiPostBlockGuideData, apiPostNewsletterData, apiPutBlockGuideData, apiPutNewsletterData } from '@/services/CMS/ExtrasService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BlockGuideModel } from '../BlockGuide';
import { NewsletterForm } from '../Newsletter';

export const SLICE_NAME = 'extras'

type PostBlockGuideData = BlockGuideModel;
type PostNewsletterData = NewsletterForm;

type ExtrasBlockGuide = {
    id: string;
    icon: string;
    title: string;
    text: string;
    delayAnimation: string;
};
type ExtrasNewsletter = {
    id: string;
    heading: string;
    subHeading: string;
    inputPlaceholder: string;
    btnText: string;
};


export const fetchBlockGuide = createAsyncThunk(SLICE_NAME + '/fetchBlockGuide', async () => {
    const response = await apiGetBlockGuideData<ExtrasBlockGuide[]>()
    return response.data;
})

export const fetchNewsletter = createAsyncThunk(SLICE_NAME + '/fetchNewsletter', async () => {
    const response = await apiGetNewsletterData<ExtrasNewsletter[]>()
    return response.data;
})


export const postBlockGuide = createAsyncThunk(SLICE_NAME + '/postBlockGuide', async (data: PostBlockGuideData) => {
    const response = await apiPostBlockGuideData(data)
    return response.data;
})

export const putBlockGuide = createAsyncThunk(SLICE_NAME + '/putBlockGuide', async ( data : ExtrasNewsletter) => {
    const response = await apiPutBlockGuideData(data)
    return response.data;
})

export const postNewsletter = createAsyncThunk(SLICE_NAME + '/postNewsletter', async (data: PostNewsletterData) => {
    const response = await apiPostNewsletterData(data)
    return response.data;
})

export const putNewsletter = createAsyncThunk(SLICE_NAME + '/putNewsletter', async (data: PostNewsletterData ) => {
    const response = await apiPutNewsletterData(data)
    return response.data;
})

export const deleteNewsletter = createAsyncThunk(SLICE_NAME + '/deleteNewsletter', async (id : { id: string }) => {
    const response = await apiDeleteNewsletter(id)
    return response.data;
})


export type ExtrasState = {
    loading: boolean
    extrasBlockGuideData: ExtrasBlockGuide[],
    extrasNewsletterData: ExtrasNewsletter[],
    isError: boolean
}

const initialState: ExtrasState = {
    loading: true,
    extrasBlockGuideData: [],
    extrasNewsletterData: [],
    isError: false
}


const extrasSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsletter.fulfilled, (state, action) => {
                state.loading = false
                state.extrasNewsletterData = action.payload
            })
            .addCase(fetchBlockGuide.fulfilled, (state, action) => {
                state.loading = false
                state.extrasBlockGuideData = action.payload
            })
            .addCase(fetchNewsletter.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchNewsletter.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
    },
})

export default extrasSlice.reducer;