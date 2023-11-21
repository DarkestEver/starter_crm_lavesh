import { apiEditSeoData, apiGetAboutData, apiPostAboutData, apiPutAboutData } from '@/services/CMS/AboutService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AboutFormModel } from '../AboutContent';
import { SeoFormModel } from '../Seo';

export const fetchAbout = createAsyncThunk('about/data/fetchAbout', async () => {
    const response = await apiGetAboutData<About[]>()
    return response.data;
})

type PostAboutData = AboutFormModel;
type Seo = SeoFormModel;

type About = {
    id: string;
    topHeader: {
      heading: string;
      subHeading: string;
    };
    blockGuide: {
      heading: string;
      subHeading: string;
    };
    mainHeader: {
      heading: string;
      subHeading: string;
      description: string;
      image: string;
      counter: Boolean;
    };
    testimonial: {
      heading: string;
      subHeading: string;
    };
};

export const postAbout = createAsyncThunk('about/data/postAbout', async (data: PostAboutData) => {
    const response = await apiPostAboutData(data)
    return response.data;
})

export const editAbout = createAsyncThunk('about/data/putAbout', async (data: About) => {
    const response = await apiPutAboutData(data)
    return response.data;
})

export const editSeo = createAsyncThunk('about/data/editSeo', async ({id,values} : {id: string; values: Seo}) => {
    const response = await apiEditSeoData(id,values)
    return response.data;
})

export type AboutState = {
    loading: boolean
    aboutData: About[],
    isError: boolean
}

const initialState: AboutState = {
    loading: true,
    aboutData: [],
    isError: false
}

export const SLICE_NAME = 'about'

const aboutSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAbout.fulfilled, (state, action) => {
                state.loading = false
                state.aboutData = action.payload
            })
            .addCase(fetchAbout.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAbout.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
    },
})

export default aboutSlice.reducer;