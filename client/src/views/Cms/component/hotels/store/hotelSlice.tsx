import { apiDeleteHotel, apiGetAllHotels,apiEditSeoData, apiGetHotelById, apiPostHotelData, apiPutHotelData } from '@/services/CMS/HotelService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { HotelFormModel } from '../HotelContent';

export const SLICE_NAME = 'hotel'

type PostHotelData = HotelFormModel;

type Hotel = {
    id: string;
    tag: string;
    slideImg: {
        id: string
        name: string
        img: string
    }[];
    img: string;
    param: string;
    title: string;
    btnHref: string;
    overview: string;
    location: string;
    ratings: string;
    numberOfReviews: string;
    delayAnimation: string;
    routePath: string;
};

export const fetchHotels = createAsyncThunk(SLICE_NAME + '/fetchHotels', async () => {
    const response = await apiGetAllHotels<Hotel[]>()
    return response.data;
})

export const fetchHotelById = createAsyncThunk(SLICE_NAME + '/fetchHotelById', async (id: string) => {
    const response = await apiGetHotelById<Hotel[]>(id)
    return response.data;
})


export const postHotel = createAsyncThunk(SLICE_NAME + '/postHotel', async (data: PostHotelData) => {
    const response = await apiPostHotelData(data)
    return response.data;
})

export const putHotel = createAsyncThunk(SLICE_NAME + '/putHotel', async ({ id, values }: { id: string, values: Hotel }) => {
    console.log(id,values)
    const response = await apiPutHotelData<Hotel[]>(id,values)
    return response.data;
})

export const deleteHotel = createAsyncThunk(SLICE_NAME + '/deleteHotel', async (id: string) => {
    const response = await apiDeleteHotel<Hotel[]>(id)
    return response.data;
})

export const editSeo = createAsyncThunk('about/data/editSeo', async ({id,values} : {id: string; values: Seo}) => {
    const response = await apiEditSeoData(id,values)
    return response.data;
  })
  

export type HotelState = {
    loading: boolean
    hotelData: Hotel[],
    isError: boolean
}

const initialState: HotelState = {
    loading: true,
    hotelData: [],
    isError: false
}


const hotelSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.loading = false
                state.hotelData = action.payload
            })
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true
            })
            .addCase(putHotel.fulfilled, (state,action) => {
                state.loading = false
                state.hotelData = action.payload
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                state.loading = false
                state.hotelData = action.payload
            })
    },
})

export default hotelSlice.reducer;