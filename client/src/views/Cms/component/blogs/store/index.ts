import reducers, { BlogState, SLICE_NAME } from './blogSlice'

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
            data: BlogState
        }
    }
> = useSelector

export * from './blogSlice'
export { useAppDispatch } from '@/store'
export default reducer
