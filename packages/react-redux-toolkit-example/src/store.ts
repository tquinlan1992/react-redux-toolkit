import { configureSlices, getApisReducer } from '@tquinlan1992/react-redux-toolkit';
import { example, thunkActions } from './features/example';

import { exampleRTKApi } from './api/example';
import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';

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

export const store = rtkConfigureStore({
  reducer: { ...apiReducer, ...reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkAction = typeof store.dispatch;
