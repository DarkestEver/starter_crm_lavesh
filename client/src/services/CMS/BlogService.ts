import ApiService from '../ApiService'

export async function apiGetAllBlogs<T>() {
    return ApiService.fetchData<T>({
        url: '/blog',
        method: 'get',
    })
}

export async function apiGetBlogData<T>(id) {
    return ApiService.fetchData<T>({
        url: `/blog/${id}`,
        method: 'get',
    })
}

export async function apiPostBlogData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/blog/save',
        method: 'post',
        data,
    })
}

export async function apiDeleteBlog<T>(id) {
    return ApiService.fetchData<T>({
        url: `/blog/delete/${id}`,
        method: 'delete',
    })
}

export async function apiPutBlogData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/blog/edit/${id}`,
        method: 'put',
        data
    })
}

export async function apiEditSeoData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/blog/seo/${id}`,
        method: 'put',
        data
    })
}

