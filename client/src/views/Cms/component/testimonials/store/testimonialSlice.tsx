import { apiDeleteTestimonial, apiGetAllTestimonials, apiGetTestimonialById, apiPostTestimonialData, apiPutTestimonialData } from '@/services/CMS/TestimonialService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TestimonialFormModel } from '../TestimonialContent';

export const SLICE_NAME = 'testimonial'

type PostTestimonialData = TestimonialFormModel;

type Testimonial = {
    id: string;
    name: string
    avatar: string;
    designation: string;
    text: string;
    delayAnimation: string;
    published: Boolean;
};

export const fetchTestimonials = createAsyncThunk(SLICE_NAME + '/fetchTestimonials', async () => {
    const response = await apiGetAllTestimonials<Testimonial[]>()
    return response.data;
})

export const fetchTestimonialById = createAsyncThunk(SLICE_NAME + '/fetchTestimonialById', async (id: string) => {
    const response = await apiGetTestimonialById<Testimonial[]>(id)
    return response.data;
})


export const postTestimonial = createAsyncThunk(SLICE_NAME + '/postTestimonial', async (data: PostTestimonialData) => {
    const response = await apiPostTestimonialData(data)
    return response.data;
})

export const putTestimonial = createAsyncThunk(SLICE_NAME + '/putTestimonial', async ({ id, values }: { id: string; values: Testimonial }) => {
    const response = await apiPutTestimonialData<Testimonial[]>(id,values)
    return response.data;
})

export const deleteTestimonial = createAsyncThunk(SLICE_NAME + '/deleteTestimonial', async (id: {id: string}) => {
    const response = await apiDeleteTestimonial<Testimonial[]>(id)
    return response.data;
})

export type TestimonialState = {
    loading: boolean
    testimonialData: Testimonial[],
    testimonial: Testimonial[],
    isError: boolean
}

const initialState: TestimonialState = {
    loading: true,
    testimonialData: [],
    testimonial: [],
    isError: false
}

const testimonialSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.loading = false
                state.testimonialData = action.payload
            })
            .addCase(fetchTestimonials.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTestimonials.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
            .addCase(putTestimonial.fulfilled, (state, action) => {
                state.loading = false
                state.testimonialData = action.payload
            })
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.loading = false
                state.testimonialData = action.payload
            })
    },
})

export default testimonialSlice.reducer;