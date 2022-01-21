import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';

import { exampleRTKApi } from './api';
import { example, exampleThunks } from './exampleSlice';
import { Components } from './reusableComponents';
import {
  RTKAppThunkAction,
  configureSlices,
  createConnectHooks,
  createConnectProps,
  getApisReducer,
} from '..';

const slices = {
  example,
};

const {
  storeSelectors,
  reducer,
  storeActions: storeActionsFromConfigured,
} = configureSlices(slices);

export { storeSelectors, reducer };

export const storeActions = {
  ...storeActionsFromConfigured,
  thunks: {
    example: exampleThunks,
  },
};

export const extraArgsMapDispatch = {
  storeActions,
};

const { apiReducer, middleware } = getApisReducer({ exampleRTKApi });

export const store = rtkConfigureStore({
  reducer: { ...apiReducer, ...reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkAction = RTKAppThunkAction<RootState>;

const extraArgsMapState = {
  selectors: storeSelectors,
};

export const extraArgsConnectProps = {
  extraArgsMapState,
  extraArgsMapDispatch,
  extraArgsHooks: {
    hooks: {
      hook1: () => ({ result: 'hook1 result' }),
    },
  },
  extraArgsComponent: { Components },
};

export const connectProps = createConnectProps<RootState, typeof extraArgsConnectProps>(
  extraArgsConnectProps,
);

export function createWithOwnProps<OwnProps>() {
  createConnectProps<RootState, typeof extraArgsConnectProps, OwnProps>(extraArgsConnectProps);
}

export const connectHooks = createConnectHooks<{
  extraArgsHooks: typeof extraArgsConnectProps.extraArgsHooks;
}>({
  extraArgsHooks: extraArgsConnectProps.extraArgsHooks,
});
