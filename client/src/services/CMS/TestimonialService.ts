import ApiService from '../ApiService'

export async function apiGetAllTestimonials<T>() {
    return ApiService.fetchData<T>({
        url: '/testimonial',
        method: 'get',
    })
}

export async function apiPostTestimonialData<T>(data) {
    return ApiService.fetchData<T>({
        url: '/testimonial/save',
        method: 'post',
        data,
    })
}

export async function apiPutTestimonialData<T>(id,data) {
    return ApiService.fetchData<T>({
        url: `/testimonial/edit/${id}`,
        method: 'put',
        data
    })
}

export async function apiDeleteTestimonial<T>(params) {
    return ApiService.fetchData<T>({
        url: `/testimonial/delete/${params}`,
        method: 'delete',
    })
}

export async function apiGetTestimonialById<T>(id) {
    return ApiService.fetchData<T>({
        url: `/testimonial/${id}`,
        method: 'get',
    })
}







