import type { Routes } from '@/@types/routes'
import authRoute from './authRoute'
import { lazy } from 'react'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'blog',
        path: '/blog',
        component: lazy(() => import('@/views/Blog/Blog')),
        authority: [],
    },
    {
        key: 'cms',
        path: '/cms',
        component: lazy(() => import('@/views/Cms')),
        authority: [],
    },
    {
        key: 'destination',
        path: '/cms/destinations',
        component: lazy(() => import('@/views/Cms/component/Destinations')),
        authority: [],
    },
    {
        key: 'destination',
        path: '/cms/destinations/edit',
        component: lazy(() => import('@/views/Cms/component/destinations/DestinationEdit')),
        authority: [],
    },
    {
        key: 'home',
        path: '/cms/home',
        component: lazy(() => import('@/views/Cms/component/Home')),
        authority: [],
    },
    {
        key: 'testimonials',
        path: '/cms/testimonials',
        component: lazy(() => import('@/views/Cms/component/Testimonials')),
        authority: [],
    },
    {
        key: 'testimonials',
        path: '/cms/testimonials/edit',
        component: lazy(() => import('@/views/Cms/component/testimonials/TestimonialsEdit')),
        authority: [],
    },
    {
        key: 'blogs',
        path: '/cms/blogs',
        component: lazy(() => import('@/views/Cms/component/Blogs')),
        authority: [],
    },
    {
        key: 'blogs',
        path: '/cms/blogs/edit',
        component: lazy(() => import('@/views/Cms/component/blogs/BlogEdit')),
        authority: [],
    },
    {
        key: 'extras',
        path: '/cms/extras',
        component: lazy(() => import('@/views/Cms/component/Extras')),
        authority: [],
    },
    {
        key: 'about',
        path: '/cms/about',
        component: lazy(() => import('@/views/Cms/component/about')),
        authority: [],
    },
    {
        key: 'contact',
        path: '/cms/contact',
        component: lazy(() => import('@/views/Cms/component/contact')),
        authority: [],
    },
    {
        key: 'footer',
        path: '/cms/footer',
        component: lazy(() => import('@/views/Cms/component/Footer')),
        authority: [],
    },
    {
        key: 'hotels',
        path: '/cms/hotels',
        component: lazy(() => import('@/views/Cms/component/Hotels')),
        authority: [],
    },
    {
        key: 'hotels',
        path: '/cms/hotels/edit',
        component: lazy(() => import('@/views/Cms/component/hotels/HotelEdit')),
        authority: [],
    },
    
]