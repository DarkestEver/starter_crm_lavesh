import { apiGetContactData,apiEditSeoData, apiPostContactData, apiPutContactData } from '@/services/CMS/ContactService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ContactFormModel } from '../ContactContent';
import { SeoFormModel } from '../Seo';

type PostContactData = ContactFormModel;
type Seo = SeoFormModel;

export const fetchContact = createAsyncThunk('contact/data/fetchContact', async () => {
    const response = await apiGetContactData<Contact[]>()
    return response.data;
})

export const postContact = createAsyncThunk('contact/data/postContact', async (data: PostContactData) => {
    const response = await apiPostContactData(data)
    return response.data;
})

export const putContact = createAsyncThunk('contact/data/putContact', async (data : Contact) => {
    const response = await apiPutContactData(data)
    return response.data;
})


export const editSeo = createAsyncThunk('about/data/editSeo', async ({id,values} : {id: string; values: Seo}) => {
    const response = await apiEditSeoData(id,values)
    return response.data;
})

type Contact = {
    id: string;
    address: string;
    phone: string;
    email: string;
    socialMediaLinksFacebook: string;
    socialMediaLinksTwitter: string;
    socialMediaLinksInstagram: string;
    socialMediaLinksLinkedin: string;
};

export type ContactState = {
    loading: boolean
    contactData: Contact[],
    isError: boolean
}

const initialState: ContactState = {
    loading: true,
    contactData: [],
    isError: false
}

export const SLICE_NAME = 'contact'

const contactSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.loading = false
                state.contactData = action.payload
            })
            .addCase(fetchContact.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchContact.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
    },
})

export default contactSlice.reducer;