import { createTestComponent, mockHooks } from '../testUtils';
import { RootState, extraArgsConnectProps, storeSelectors } from './store';

const extraArgs = {
  extraArgsMapState: {
    selectors: storeSelectors,
  },
  extraArgsComponent: {},
  extraArgsMapHooks: { mockHooks: mockHooks(extraArgsConnectProps.extraArgsHooks.hooks) },
};

export const testComponent = createTestComponent<RootState, typeof extraArgs>(extraArgs);
