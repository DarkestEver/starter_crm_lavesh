import reducers, { SLICE_NAME, TestimonialState } from './testimonialSlice'

import type { RootState } from '@/store'
import type { TypedUseSelectorHook } from 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: TestimonialState
        }
    }
> = useSelector

export * from './testimonialSlice'
export { useAppDispatch } from '@/store'
export default reducer
