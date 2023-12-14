import b2bDmcData from "../data/programmaticSeo"
import blogs from "../data/blogs"
import { destinations } from "../data/desinations"
import { hotelsData } from "../data/hotels"

export const getBlogsUrl = () => {
    const blogUrl = blogs.map(blog => `${process.env.BASE_URL}/blog/${blog.param}`)
    return blogUrl
}

export const getDestinationUrl = () => {
    const destinationUrl = destinations.map(destination => `${process.env.BASE_URL}/destination/${destination.param}`)
    return destinationUrl
}

export const getHotelUrl = () => {
    const hotelsUrl = hotelsData.map(hotel => `${process.env.BASE_URL}/hotel/${hotel.param}`)
    return hotelsUrl
}

export const getB2bDmcUrl = () => {
    const b2bDmcUrl = b2bDmcData.map(b2bDmc => `${process.env.BASE_URL}/b2bDmc/${b2bDmc.slug}`)
    return b2bDmcUrl
}

export const getB2bDmcTitle = () => {
    return b2bDmcData.map(b2bDmc => {
        return { title : b2bDmc.title , slug: b2bDmc.slug }
    })
}

