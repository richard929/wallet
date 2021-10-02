import {
  AnyAction,
  combineReducers,
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
} from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'

import { kavaApi } from '../services/kava'

export function setupApiStore<
  A extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducer: Reducer<any, any>
    reducerPath: string
    middleware: Middleware
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    util: { resetApiState(): any }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R extends Record<string, Reducer<any, any>> = Record<never, never>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(api: A, extraReducers?: R): { api: any; store: EnhancedStore } {
  /*
   * Modified version of RTK Query's helper function:
   * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
   */
  const getStore = (): EnhancedStore =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware,
        ),
    })

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A['reducer']>
    } & {
      [K in keyof R]: ReturnType<R[K]>
    },
    AnyAction,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
      ? M
      : never
  >

  const initialStore = getStore() as StoreType
  const refObj = {
    api,
    store: initialStore,
  }
  const store = getStore() as StoreType
  refObj.store = store

  return refObj
}

export * from '@testing-library/react'

const wrapper: React.FC = ({ children }) => {
  const storeRef = setupApiStore(kavaApi, {})
  return <Provider store={storeRef.store}>{children}</Provider>
}

export const render = (element: ReactElement) => rtlRender(element, { wrapper })

export const waitForSeconds = async (duration: number) =>
  new Promise((r) => setTimeout(r, 1000 * duration))
