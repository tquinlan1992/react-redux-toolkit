import {
  createConnectHooksTester,
  createConnectReactTester,
  createConnectReduxTester,
  mockHooks,
} from '@tquinlan1992/react-redux-toolkit';

import { RootState } from './store';
import { extraArgsConnectProps } from './connectProps';

const testUtilsExtraArgs = {
  ...extraArgsConnectProps,
  extraArgsMapHooks: {
    mockHooks: mockHooks(extraArgsConnectProps.extraArgsHooks.hooks),
  },
};

export const testComponent = createConnectReduxTester<RootState, typeof testUtilsExtraArgs>(
  testUtilsExtraArgs,
);

export const testConnectHooks =
  createConnectHooksTester<typeof testUtilsExtraArgs>(testUtilsExtraArgs);

export const testConnectReact =
  createConnectReactTester<typeof testUtilsExtraArgs>(testUtilsExtraArgs);
