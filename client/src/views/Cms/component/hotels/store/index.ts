import reducers, { HotelState, SLICE_NAME } from './hotelSlice'

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
            data: HotelState
        }
    }
> = useSelector

export * from './hotelSlice'
export { useAppDispatch } from '@/store'
export default reducer
