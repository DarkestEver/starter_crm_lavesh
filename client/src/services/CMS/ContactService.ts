import ApiService from '../ApiService'

export async function apiGetContactData<T>() {
    return ApiService.fetchData<T>({
        url: '/contact',
        method: 'get',
    })
}

export async function apiPostContactData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/contact/save',
        method: 'post',
        data,
    })
}

export async function apiPutContactData<T>(data) {
    return ApiService.fetchData<T>({
        url: `/contact/edit`,
        method: 'put',
        data
    })
}

// Seo
export async function apiEditSeoData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/contact/seo/${id}`,
        method: 'put',
        data
    })
}



