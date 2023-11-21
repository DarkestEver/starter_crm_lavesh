import reducers, { FooterState, SLICE_NAME } from './footerSlice'

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
            data: FooterState
        }
    }
> = useSelector

export * from './footerSlice'
export { useAppDispatch } from '@/store'
export default reducer
