/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchMock from 'jest-fetch-mock';
import { mapValues } from 'lodash';

import { configureStore } from '@reduxjs/toolkit';
import { Api } from '@reduxjs/toolkit/dist/query';

fetchMock.mockResponse(JSON.stringify({}));

export const configureTestApiStore = ({
  api,
  initialState,
}: {
  api: Api<any, any, any, any, any>;
  initialState: Record<string, any>;
}) => {
  const apisReducer = {
    [api.reducerPath]: api.reducer,
  };
  const reducers = mapValues(initialState, (value) => () => value);
  const store = configureStore({
    reducer: { ...apisReducer, ...reducers },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
  const testApiCall = async (
    action: any,
    expected: {
      body?: Record<string, any>;
      path?: string;
      origin?: string;
      search?: string;
      method?: 'POST' | 'GET';
      headers?: Record<string, string>;
    },
  ) => {
    await store.dispatch<any>(action);
    const { method, headers, url, body } = fetchMock.mock.calls[0][0] as Request;

    if (expected.headers) {
      const headersObject = mapValues(expected.headers, (value, key) => headers.get(key));
      expect(headersObject).toMatchObject(expected.headers);
    }

    expect(fetchMock).toBeCalledTimes(1);

    const urlObject = new URL(url);
    expected.body && expect(JSON.parse(body?.toString() || '')).toMatchObject(expected.body);
    expected.path && expect(urlObject.pathname).toEqual(expected.path);
    expected.origin && expect(urlObject.origin).toEqual(expected.origin);
    expected.search && expect(urlObject.searchParams.toString()).toEqual(expected.search);
    expected.method && expect(method).toEqual(expected.method);
  };
  return testApiCall;
};
