import {
  RTKAppThunkAction,
  configureSlices,
  createConnectHooks,
  createConnectProps,
  getApisReducer,
} from 'react-redux-toolkit';
import { example, thunkActions } from './features/example';

import { Components } from './reusableComponents';
import { configureStore } from '@reduxjs/toolkit';
import { exampleRTKApi } from './api/example';

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
    example: thunkActions,
  },
};

export const extraArgsMapDispatch = {
  storeActions,
};

const { apiReducer, middleware } = getApisReducer({ exampleRTKApi });

export const store = configureStore({
  reducer: { ...apiReducer, ...reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkAction = RTKAppThunkAction<RootState>;

const extraArgsMapState = {
  selectors: storeSelectors,
};

export const hook1 = (input: string) => 'hook value: ' + input;

export const extraArgsConnectProps = {
  extraArgsMapState,
  extraArgsMapDispatch,
  extraArgsHooks: {
    hooks: { hook1 },
  },
  extraArgsComponent: { Components },
};

export const connectProps = createConnectProps<RootState, typeof extraArgsConnectProps>(
  extraArgsConnectProps,
);

export function connectWithOwnProps<OwnProps>() {
  return createConnectProps<RootState, typeof extraArgsConnectProps, OwnProps>(
    extraArgsConnectProps,
  );
}

export const connectHooks = createConnectHooks<{
  extraArgsComponent: typeof extraArgsConnectProps.extraArgsComponent;
}>({
  extraArgsComponent: extraArgsConnectProps.extraArgsComponent,
});
