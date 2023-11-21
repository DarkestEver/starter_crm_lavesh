import ApiService from '../ApiService'

export async function apiGetDestinations<T>() {
    return ApiService.fetchData<T>({
        url: '/destination',
        method: 'get',
    })
}

export async function apiPostDestination<T>(data) {
    return ApiService.fetchData<T>({
        url: '/destination/save',
        method: 'post',
        data,
    })
}

export async function apiPutDestination<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/destination/edit/${id}`,
        method: 'put',
        data,
    })
}

export async function apiEditSeoData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/destination/seo/${id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteDestination<T>(params) {
    return ApiService.fetchData<T>({
        url: `/destination/delete/${params}`,
        method: 'delete',
    })
}

export async function apiGetDestinationById<T>(id) {
    return ApiService.fetchData<T>({
        url: `/destination/${id}`,
        method: 'get',
    })
}

