import * as connectReduxTestUtils from './rtkReact/connectReduxTestUtils';
export { mockHooks } from './rtkReact/testUtilsBase';
/**
 * @deprecated Use createConnectReduxTester
 */
export const createTestComponent = connectReduxTestUtils.createConnectReduxTester;

export * from './rtkReact/connectReduxTestUtils';
export * from './rtkReact/connectHooksTestUtils';
export * from './rtkReact/connectReactTestUtils';
