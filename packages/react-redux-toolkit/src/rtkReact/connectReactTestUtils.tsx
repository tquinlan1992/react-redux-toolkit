/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';

import { getPartialDeep, mockActions, mockTranslate } from './testUtilsBase';

export function createConnectReactTester<
  Options extends {
    extraArgsComponent?: Record<string, any>;
    actions?: Record<string, any>;
  },
>({
  extraArgsComponent,
  actions: optionsActions,
}: Options): <
  RRTKComponent extends {
    Component: (args: any) => any;
  },
>(
  componentName: string,
  rRTKComponent: RRTKComponent,
  {
    component,
  }: {
    component: (
      args: Options['extraArgsComponent'] & {
        shallow: ShallowRenderer;
        getPartialDeep: typeof getPartialDeep;
        testComponent: (props: React.ComponentProps<typeof rRTKComponent['Component']>) => void;
      },
    ) => void;
  },
) => void {
  return (componentName, { Component }, { component }) => {
    describe(componentName, () => {
      describe('renders', () => {
        const renderer = createRenderer();
        const testComponent = (props: any) => {
          renderer.render(
            <Component
              {...props}
              translate={mockTranslate}
              mockActions={mockActions(optionsActions)}
            />,
          );
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        };
        component({
          ...extraArgsComponent,
          shallow: renderer,
          testComponent,
          getPartialDeep,
        });
      });
    });
  };
}
