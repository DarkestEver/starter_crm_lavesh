import ApiService from '../ApiService'

// BLOCK GUIDE
export async function apiGetBlockGuideData<T>() {
    return ApiService.fetchData<T>({
        url: '/extras/blockguide',
        method: 'get',
    })
}

export async function apiPostBlockGuideData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/extras/blockguide/save',
        method: 'post',
        data,
    })
}

export async function apiPutBlockGuideData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/extras/blockguide/edit',
        method: 'put',
        data,
    })
}

//  NEWSLETTER
export async function apiGetNewsletterData<T>() {
    return ApiService.fetchData<T>({
        url: '/extras/newsletter',
        method: 'get',
    })
}

export async function apiPostNewsletterData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/extras/newsletter/save',
        method: 'post',
        data,
    })
}

export async function apiPutNewsletterData<T>(data) {
    return ApiService.fetchData<T>({
        url: `/extras/newsletter/edit`,
        method: 'put',
        data,
    })
}

export async function apiDeleteNewsletter<T>(id) {
    return ApiService.fetchData<T>({
        url: `/extras/newsletter/delete/${id}`,
        method: 'delete',
    })
}

