import ApiService from '../ApiService'

export async function apiGetAboutData<T>() {
    return ApiService.fetchData<T>({
        url: '/about',
        method: 'get',
    })
}

export async function apiPostAboutData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/about/save',
        method: 'post',
        data,
    })
}

export async function apiPutAboutData<T>(data) {
    return ApiService.fetchData<T>({
        url: `/about/edit`,
        method: 'put',
        data
    })
}

// Seo
export async function apiEditSeoData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/about/seo/${id}`,
        method: 'put',
        data
    })
}
