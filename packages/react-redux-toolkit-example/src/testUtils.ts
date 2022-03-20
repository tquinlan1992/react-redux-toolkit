import {
  createConnectHooksTester,
  createConnectReactTester,
  createConnectReduxTester,
  mockHooks,
} from '@tquinlan1992/react-redux-toolkit';
import { extraArgsConnectProps, mappedStoreActions } from './connectProps';

import { RootState } from './store';

const testUtilsExtraArgs = {
  ...extraArgsConnectProps,
  extraArgsMapHooks: {
    mockHooks: mockHooks(extraArgsConnectProps.extraArgsHooks.hooks),
  },
  actions: mappedStoreActions,
};

export const testComponent = createConnectReduxTester<RootState, typeof testUtilsExtraArgs>({
  ...testUtilsExtraArgs,
});

export const testConnectHooks =
  createConnectHooksTester<typeof testUtilsExtraArgs>(testUtilsExtraArgs);

export const testConnectReact =
  createConnectReactTester<typeof testUtilsExtraArgs>(testUtilsExtraArgs);
