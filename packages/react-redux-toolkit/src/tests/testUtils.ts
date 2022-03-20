import { createConnectReduxTester } from '../';
import { mockHooks } from '../testUtils';
import { RootState, extraArgsConnectProps, mappedStoreActions, storeSelectors } from './store';

const extraArgs = {
  extraArgsMapState: {
    selectors: storeSelectors,
  },
  extraArgsComponent: { actions: mappedStoreActions },
  extraArgsMapHooks: {
    mockHooks: mockHooks(extraArgsConnectProps.extraArgsHooks.hooks),
  },
  actions: mappedStoreActions,
};

export const testComponent = createConnectReduxTester<RootState, typeof extraArgs>(extraArgs);
