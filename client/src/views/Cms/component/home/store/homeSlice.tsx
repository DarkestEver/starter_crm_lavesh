import { apiEditExtras, apiEditHeroSection, apiEditMiddleSection, apiEditSeoData, apiGetHome } from '@/services/CMS/HomeService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ExtrasForm } from '../Extras';
import { HeroSectionForm } from '../HeroSection';
import { MiddleSectionForm } from '../MiddleSection';
import { SeoFormModel } from '../Seo';

export const fetchHome = createAsyncThunk('Home/data/fetchHome', async () => {
    const response = await apiGetHome<Home[]>()
    return response.data;
})

type HeroSection = HeroSectionForm;
type MiddleSection = MiddleSectionForm;
type Extras = ExtrasForm;
type Seo = SeoFormModel

interface Home {
  heroSection: HeroSection;
  middleSection: MiddleSection;
  extras: Extras;
  seo: Seo;
}

export const editHeroSection = createAsyncThunk('Home/data/editHeroSection', async ({id,values} : {id: string; values: HeroSection}) => {
    const response = await apiEditHeroSection(id,values)
    return response.data;
})

export const editMiddleSection = createAsyncThunk('Home/data/editMiddleSection', async ({id,values} : {id: string; values: MiddleSection}) => {
    const response = await apiEditMiddleSection(id,values)
    return response.data;
})

export const editExtras = createAsyncThunk('Home/data/editExtras', async ({id,values} : {id: string; values: Extras}) => {
    const response = await apiEditExtras(id,values)
    return response.data;
})

export const editSeo = createAsyncThunk('about/data/editSeo', async ({id,values} : {id: string; values: Seo}) => {
  const response = await apiEditSeoData(id,values)
  return response.data;
})

export type HomeState = {
    loading: boolean
    homeData: Home[]
    isError: boolean
}

const initialState: HomeState = {
    loading: true,
    homeData: [],
    isError: false
}

export const SLICE_NAME = 'home'

const HomeSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHome.fulfilled, (state, action) => {
                state.loading = false
                state.homeData = action.payload
            })
            .addCase(fetchHome.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchHome.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
    },
})

export default HomeSlice.reducer;