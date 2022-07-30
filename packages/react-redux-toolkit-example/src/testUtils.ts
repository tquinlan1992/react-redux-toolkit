import { extraArgsConnectProps, mappedStoreActions } from './connectProps';

import { RootState } from './store';
import { createConnectHooksTester } from '@tquinlan1992/react-redux-toolkit/rtkReact/connectHooksTestUtils';
import { createConnectReactTester } from '@tquinlan1992/react-redux-toolkit/rtkReact/connectReactTestUtils';
import { createConnectReduxTester } from '@tquinlan1992/react-redux-toolkit/rtkReact/connectReduxTestUtils';
import { mockHooks } from '@tquinlan1992/react-redux-toolkit/rtkReact/testUtilsBase';

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
