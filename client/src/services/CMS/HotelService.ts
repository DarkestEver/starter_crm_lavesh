import ApiService from '../ApiService'

export async function apiGetAllHotels<T>() {
    return ApiService.fetchData<T>({
        url: '/hotel',
        method: 'get',
    })
}

export async function apiPostHotelData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/hotel/save',
        method: 'post',
        data,
    })
}

export async function apiDeleteHotel<T>(id) {
    return ApiService.fetchData<T>({
        url: `/hotel/delete/${id}`,
        method: 'delete',
    })
}

export async function apiGetHotelById<T>(id) {
    return ApiService.fetchData<T>({
        url: `hotel/${id}`,
        method: 'get',
    })
}

export async function apiPutHotelData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `hotel/edit/${id}`,
        method: 'put',
        data
    })
}

export async function apiEditSeoData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `hotel/seo/${id}`,
        method: 'put',
        data
    })
}

