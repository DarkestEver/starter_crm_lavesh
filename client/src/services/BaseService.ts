import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from '@/constants/api.constant'
import store, { signOutSuccess } from '../store'

import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'
import axios from 'axios'
import deepParseJson from '@/utils/deepParseJson'

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 60000,
    // baseURL: appConfig.apiPrefix,
    baseURL: "http://localhost:3000/api",
})

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let accessToken = (persistData as any).auth.session.token

        if (!accessToken) {
            const { auth } = store.getState()
            accessToken = auth.session.token
        }

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService
