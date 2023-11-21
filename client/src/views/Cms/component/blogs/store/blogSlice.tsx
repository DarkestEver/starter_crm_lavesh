import { apiDeleteBlog, apiGetAllBlogs, apiEditSeoData,apiGetBlogData, apiPostBlogData, apiPutBlogData } from '@/services/CMS/BlogService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BlogFormModel } from '../BlogContent';

type PostBlogData = BlogFormModel;

type Blog = {
    id: string;
    img: string;
    title: string;
    param: string;
    date: string;
    delayAnimation: string;
    details: string;
    tag: {
        label: string
        value: string
    }[];
};

export const SLICE_NAME = 'blog'

export const fetchAllBlogs = createAsyncThunk(SLICE_NAME + '/fetchBlogs', async () => {
    const response = await apiGetAllBlogs<Blog[]>()
    return response.data;
})

export const fetchBlogById = createAsyncThunk(SLICE_NAME + '/fetchBlogById', async (id: string) => {
    const response = await apiGetBlogData(id)
    return response.data;
})

export const postBlog = createAsyncThunk(SLICE_NAME + '/postBlog', async (data: PostBlogData) => {
    const response = await apiPostBlogData(data)
    return response.data;
})

export const putBlog = createAsyncThunk(SLICE_NAME + '/putBlog', async ({ id, values }: { id: string; values: Blog }) => {
    const response = await apiPutBlogData(id,values)
    return response.data;
})

export const deleteBlog = createAsyncThunk(SLICE_NAME + '/deleteBlog', async (id: string) => {
    const response = await apiDeleteBlog(id)
    return response.data;
})

export const editSeo = createAsyncThunk('about/data/editSeo', async ({id,values} : {id: string; values: Seo}) => {
    const response = await apiEditSeoData(id,values)
    return response.data;
  })
  


export type BlogState = {
    loading: boolean
    blogData: Blog[],
    isError: boolean
}

const initialState: BlogState = {
    loading: true,
    blogData: [],
    isError: false
}

const blogSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.loading = false
                state.blogData = action.payload
            })
            .addCase(fetchAllBlogs.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllBlogs.rejected, (state,action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
    },
})

export default blogSlice.reducer;