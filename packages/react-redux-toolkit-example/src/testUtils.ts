import { RootState, extraArgsConnectProps } from './store';
import { createTestComponent, mockHooks } from 'react-redux-toolkit/testUtils';

const testUtilsExtraArgs = {
  ...extraArgsConnectProps,
  extraArgsMapHooks: {
    mockHooks: mockHooks(extraArgsConnectProps.extraArgsHooks.hooks),
  },
};

export const testComponent = createTestComponent<RootState, typeof testUtilsExtraArgs>(
  testUtilsExtraArgs,
);
