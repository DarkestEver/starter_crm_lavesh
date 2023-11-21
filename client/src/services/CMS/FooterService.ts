import ApiService from '../ApiService'

export async function apiGetFooterData<T>() {
    return ApiService.fetchData<T>({
        url: '/footer',
        method: 'get',
    })
}

export async function apiPostFooterData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/footer/save',
        method: 'post',
        data,
    })
}

export async function apiPutFooterData<T>(data) {
    return ApiService.fetchData<T>({
        url: `/footer/edit`,
        method: 'put',
        data
    })
}