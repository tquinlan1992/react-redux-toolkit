/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mapValues, pick } from 'lodash';

import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  CaseReducer,
  CreateSliceOptions,
  Draft,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice as rtkCreateSlice,
} from '@reduxjs/toolkit';

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

type GetStateReducersReturnType<State> = {
  [P in keyof State as string]: ActionCreatorWithPayload<State[P]>;
};
function getStateReducers<State>(state: State): GetStateReducersReturnType<State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys(state).reduce<any>((result, key: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result[key] = (state: State, { payload }: any) => {
      return {
        ...state,
        [key]: payload,
      };
    };
    return result;
  }, {});
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type CreateSliceReturnType<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
> = Slice<State, CaseReducers, Name> & {
  actions: AddtionalActions<State>;
} & { initialState: State };

type GetCaseReducers<
  State,
  SliceReducers extends { [p: string]: (state: State, action: any) => void | any },
> = {
  [P in keyof SliceReducers]: CaseReducer<State, PayloadAction<Parameters<SliceReducers[P]>[1]>>;
};

export function createSlice<
  State,
  SliceReducers extends { [P: string]: (state: State, action: any) => void | State },
  Name extends string = string,
>(
  options: Omit<
    CreateSliceOptions<State, GetCaseReducers<State, SliceReducers>, Name>,
    'reducers'
  > & { reducers?: SliceReducers },
): CreateSliceReturnType<State, GetCaseReducers<State, SliceReducers>, Name> {
  const defaultReducers: ValidateSliceCaseReducers<
    State,
    GetCaseReducers<State, SliceReducers>
  > = (mapValues(
    options.reducers,
    (reducer) => (state: State, action: PayloadAction<any>) => reducer(state, action.payload),
  ) as any) || ({} as ValidateSliceCaseReducers<State, GetCaseReducers<State, SliceReducers>>);

  const resetAll = () => {
    return options.initialState;
  };

  const reset = (state: Draft<State>, { payload }: PayloadAction<ResetPayload<State>>) => {
    return {
      ...state,
      ...pick(options.initialState, payload),
    };
  };

  const set = (state: Draft<State>, { payload }: PayloadAction<SetPayload<State>>) => {
    return {
      ...state,
      ...payload,
    };
  };

  const setAll = (state: Draft<State>, { payload }: PayloadAction<State>) => {
    return payload;
  };
  const stateReducers = getStateReducers(options.initialState);

  const slice = rtkCreateSlice({
    ...options,
    reducers: {
      ...defaultReducers,
      resetAll,
      reset,
      set,
      setAll,
      ...stateReducers,
    },
  });

  return {
    ...slice,
    initialState: options.initialState,
  } as any;
}
