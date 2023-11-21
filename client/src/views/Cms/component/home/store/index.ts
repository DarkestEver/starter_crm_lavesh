import reducers, { HomeState, SLICE_NAME } from './homeSlice'

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
            data: HomeState
        }
    }
> = useSelector

export * from './homeSlice'
export { useAppDispatch } from '@/store'
export default reducer
