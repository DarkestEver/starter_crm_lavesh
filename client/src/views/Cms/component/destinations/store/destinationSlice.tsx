import { apiDeleteDestination, apiEditSeoData, apiGetDestinationById, apiGetDestinations, apiPostDestination, apiPutDestination } from '@/services/CMS/DestinationService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { DestinationFormModel } from '../DestinationContent';

export const SLICE_NAME = 'destination'

type PostDestinationData = DestinationFormModel;

type Destination = {
    id?: string,
    country: string,
    param: string,
    thumbnail: string,
    hoverText: string,
    slideImg: {
        id: string
        name: string
        img: string
    }[],
    description: string,
    properties: string,
    timeZone: string,
    timeBehind: string,
    currency: string,
    exchange: string,
    bestTimeToVisit: string,
    city: {
        img: string;
        cityName: string;
        routePath: string;
    }[];
};

export const fetchDestinations = createAsyncThunk( SLICE_NAME + '/fetchDestinations', async () => {
    const response = await apiGetDestinations<Destination[]>()
    return response.data;
})

export const fetchDestinationById = createAsyncThunk( SLICE_NAME + '/fetchDestinationById', async (id: string) => {
    const response = await apiGetDestinationById<Destination>(id)
    return response.data;
})

export const postDestination = createAsyncThunk( SLICE_NAME + '/postDestination', async (data: PostDestinationData) => {
    const response = await apiPostDestination(data)
    return response.data;
})

export const putDestination = createAsyncThunk( SLICE_NAME + '/putDestination', async ({ id, values }: { id: string; values: Destination }) => {
      const response = await apiPutDestination<Destination[]>(id, values);
      return response.data;
    }
  );

export const deleteDestination = createAsyncThunk( SLICE_NAME + '/deleteDestinaion', async (params: {id: string}) => {
    const response = await apiDeleteDestination<Destination[]>(params)
    return response.data;
})

export const editSeo = createAsyncThunk('about/data/editSeo', async ({id,values} : {id: string; values: Seo}) => {
    const response = await apiEditSeoData(id,values)
    return response.data;
})


export type DestinationState = {
    loading: boolean
    destinationData: Destination[],
    destination: Destination,
    isError: boolean
}

const initialState: DestinationState = {
    loading: true,
    destinationData: [],
    isError: false
}


const destinationSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.loading = false;
                state.destinationData = action.payload;
            })
            .addCase(fetchDestinations.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDestinations.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
            .addCase(putDestination.fulfilled, (state, action) => {
                state.loading = false;
                state.destinationData = action.payload;
            })
            .addCase(deleteDestination.fulfilled, (state, action) => {
                state.loading = false;
                state.destinationData = action.payload;
            })
    },
})

export default destinationSlice.reducer;