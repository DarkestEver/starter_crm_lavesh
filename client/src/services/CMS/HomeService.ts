import ApiService from '../ApiService'

export async function apiGetHome<T>() {
    return ApiService.fetchData<T>({
        url: '/home',
        method: 'get'
    })
}

// HERO SECTION
export async function apiEditHeroSection<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/home/heroSection/${id}`,
        method: 'put',
        data: data
    })
}

// MIDDLE SECTION
export async function apiEditMiddleSection<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/home/middleSection/${id}`,
        method: 'put',
        data: data
    })
}

//  EXTRAS
export async function apiEditExtras<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/home/extras/${id}`,
        method: 'put',
        data: data
    })
}

// SEO
export async function apiEditSeoData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/home/seo/${id}`,
        method: 'put',
        data
    })
}