import reducers, { DestinationState, SLICE_NAME } from './destinationSlice'

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
            data: DestinationState
        }
    }
> = useSelector

export * from './destinationSlice'
export { useAppDispatch } from '@/store'
export default reducer
