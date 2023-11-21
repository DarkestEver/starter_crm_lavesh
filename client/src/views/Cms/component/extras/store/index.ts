import reducers, { ExtrasState, SLICE_NAME } from './extrasSlice'

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
            data: ExtrasState
        }
    }
> = useSelector

export * from './extrasSlice'
export { useAppDispatch } from '@/store'
export default reducer
