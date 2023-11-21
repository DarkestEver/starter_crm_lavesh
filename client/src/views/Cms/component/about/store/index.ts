import reducers, { AboutState, SLICE_NAME } from './aboutSlice'

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
            data: AboutState
        }
    }
> = useSelector

export * from './aboutSlice'
export { useAppDispatch } from '@/store'
export default reducer
