/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { map, mapValues, omit, reduce } from 'lodash';

import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  AnyAction,
  ConfigureStoreOptions,
  Middleware,
  Slice,
  SliceCaseReducers,
  ThunkAction,
  configureStore as rtkConfigureStore,
} from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/dist/query';

type RootState<Slices extends { [key: string]: any }> = {
  [P in keyof Slices]: Slices[P]['initialState'];
};

type ResetPayload<State> = (keyof State)[];
type SetPayload<State> = Partial<State>;

type StateActions<State> = {
  [P in keyof State]: ActionCreatorWithPayload<State[P]>;
};

type AddtionalActions<State> = StateActions<State> & {
  resetAll: ActionCreatorWithoutPayload;
  reset: ActionCreatorWithPayload<ResetPayload<State>>;
  set: ActionCreatorWithPayload<SetPayload<State>>;
  setAll: ActionCreatorWithPayload<State>;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type CreateSliceReturnType<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
> = Slice<State, CaseReducers, Name> & {
  actions: AddtionalActions<State>;
} & { initialState: State };

type NestedStatePick<State extends { [key: string]: any }> = {
  [C in keyof State]: State[C]['initalState'];
};

type Selectors<State> = {
  [P in keyof State]: {
    [A in keyof State[P]]: (state: NestedStatePick<State>) => State[P][A];
  };
};

function getSelectorsFromState<State>(state: State): Selectors<State> {
  return mapValues(state as any, (stateDepth1, stateDepth1Key) => {
    return mapValues(stateDepth1, (stateDepth2Value, stateDepth2Key) => {
      return (selectorState: any) => {
        return selectorState[stateDepth1Key][stateDepth2Key];
      };
    });
  }) as any;
}

function getInitialState<Slices extends { [key: string]: any }>(
  slices: Slices,
): { [P in keyof Slices]: Slices[P]['initialState'] } {
  return mapValues(slices, (slice) => slice.initialState);
}

function getReducer<Slices extends { [key: string]: any }>(
  slices: Slices,
): { [P in keyof Slices]: Slices[P]['reducer'] } {
  return mapValues(slices, (slice) => slice.reducer);
}

function getActions<Slices extends { [key: string]: any }>(
  slices: Slices,
): { [P in keyof Slices]: Slices[P]['actions'] } {
  return mapValues(slices, (slice) => slice.actions);
}

type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;

function mapApisReducer<Apis extends { [key: string]: any }>(
  apis: Apis,
): { [P in keyof Apis]: Apis[P]['reducer'] } {
  return reduce(
    apis,
    (result, api) => {
      result[api.reducerPath] = api.reducer;
      return result;
    },
    {} as any,
  );
}

export function getApisReducer<
  Apis extends { [key: string]: Omit<Parameters<typeof createApi>[0], 'reducerPath'> },
>(apis: Apis) {
  const createdApis = mapValues(apis, (api, reducerPath) => createApi({ ...api, reducerPath }));
  const apiReducer = mapApisReducer(createdApis);
  const middleware = map(createdApis, (api) => api.middleware) as Middlewares<any>;
  return { apiReducer, middleware };
}

export function configureSlices<Slices extends { [key: string]: any }>(slices: Slices) {
  const initialState = getInitialState(slices);
  const reducer = getReducer(slices);
  return {
    storeSelectors: getSelectorsFromState(initialState),
    storeActions: getActions(slices),
    reducer,
  };
}

export function configureStore<
  Slices extends {
    [P in keyof Slices]: CreateSliceReturnType<RootState<Slices>[P], any, any>;
  },
  Apis extends { [P in keyof Apis]: Omit<Parameters<typeof createApi>[0], 'reducerPath'> },
>(
  options: {
    slices: Slices;
    apis: Apis;
    middleware?: Middlewares<RootState<Slices>>;
  } & Omit<
    ConfigureStoreOptions<RootState<Slices>, AnyAction, Middlewares<RootState<Slices>>>,
    'reducer' | 'middleware'
  >,
) {
  const { reducer, storeSelectors, storeActions } = configureSlices(options.slices);
  const { apiReducer, middleware } = getApisReducer(options.apis);
  const store = rtkConfigureStore({
    ...omit(options, 'slices', 'middleware', 'apis'),
    reducer: { ...apiReducer, ...reducer },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      ...middleware,
      ...(options.middleware || []),
    ],
  });
  return {
    storeSelectors,
    storeActions,
    store,
  };
}

export type RTKAppThunkAction<RootState extends unknown> = ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
>;
