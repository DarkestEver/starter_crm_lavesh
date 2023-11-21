import reducers, { ContactState, SLICE_NAME } from './contactSlice'

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
            data: ContactState
        }
    }
> = useSelector

export * from './contactSlice'
export { useAppDispatch } from '@/store'
export default reducer
