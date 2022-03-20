import {
  RTKAppThunkAction,
  createConnectHooks,
  createConnectReact,
  createConnectReactFC,
  createConnectRedux,
  mapDispatchActions,
} from '@tquinlan1992/react-redux-toolkit';
import { RootState, store, storeActions, storeSelectors } from './store';

import { Components } from './reusableComponents';

const hook1 = (input: string) => 'hook value: ' + input;

export const mappedStoreActions = mapDispatchActions({
  actions: storeActions,
  dispatch: store.dispatch,
});

const extraArgsMapState = {
  selectors: storeSelectors,
};

export const extraArgsConnectProps = {
  extraArgsMapState,
  extraArgsHooks: {
    hooks: { hook1 },
  },
  extraArgsComponent: { Components, actions: mappedStoreActions },
};

/*
 * connect redux
 */
export const connectRedux = createConnectRedux<RootState, typeof extraArgsConnectProps>(
  extraArgsConnectProps,
);

export function connectReduxWithOwnProps<OwnProps>() {
  return createConnectRedux<RootState, typeof extraArgsConnectProps, OwnProps>(
    extraArgsConnectProps,
  );
}

/*
 * connect hooks
 */
export const connectHooks = createConnectHooks<{
  extraArgsComponent: typeof extraArgsConnectProps.extraArgsComponent;
  extraArgsHooks: typeof extraArgsConnectProps.extraArgsHooks;
}>({
  extraArgsComponent: extraArgsConnectProps.extraArgsComponent,
  extraArgsHooks: extraArgsConnectProps.extraArgsHooks,
});

export function connectHooksOwnProps<OwnProps>() {
  return createConnectHooks<
    {
      extraArgsComponent: typeof extraArgsConnectProps.extraArgsComponent;
      extraArgsHooks: typeof extraArgsConnectProps.extraArgsHooks;
    },
    OwnProps
  >({
    extraArgsComponent: extraArgsConnectProps.extraArgsComponent,
    extraArgsHooks: extraArgsConnectProps.extraArgsHooks,
  });
}

/*
 * connect react
 */

export const connectReact = createConnectReact<{
  extraArgsComponent: typeof extraArgsConnectProps.extraArgsComponent;
}>({
  extraArgsComponent: extraArgsConnectProps.extraArgsComponent,
});

export function connectReactOwnProps<OwnProps>() {
  return createConnectReact<
    {
      extraArgsComponent: typeof extraArgsConnectProps.extraArgsComponent;
    },
    OwnProps
  >({
    extraArgsComponent: extraArgsConnectProps.extraArgsComponent,
  });
}

/*
 * connect react fc
 */

export const connectReactFC = createConnectReactFC<{
  extraArgsComponent: typeof extraArgsConnectProps.extraArgsComponent;
}>({
  extraArgsComponent: extraArgsConnectProps.extraArgsComponent,
});

export function connectReactFCOwnProps<OwnProps>() {
  return createConnectReactFC<
    {
      extraArgsComponent: typeof extraArgsConnectProps.extraArgsComponent;
    },
    OwnProps
  >({
    extraArgsComponent: extraArgsConnectProps.extraArgsComponent,
  });
}

export type AppDispatch = typeof store.dispatch;

export type AppThunkAction = RTKAppThunkAction<RootState>;
