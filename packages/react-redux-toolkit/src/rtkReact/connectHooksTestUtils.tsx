/* eslint-disable @typescript-eslint/no-explicit-any */
import { omit } from 'lodash';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import * as Yup from 'yup';

import {
  DeepPartial,
  getMockApiMutations,
  getMockApiQueries,
  getMockForm,
  getMockTranslate,
  getPartialDeep,
} from './testUtilsBase';

export function createConnectHooksTester<
  Options extends {
    extraArgsComponent?: Record<string, any>;
    extraArgsMapHooks?: Record<string, any>;
  },
>({
  extraArgsComponent,
  extraArgsMapHooks,
}: Options): <
  RRTKComponent extends {
    Component: <
      Args extends {
        hooks: any;
        form: any;
        apiQueries: any;
        apiMutations: any;
      },
    >(
      args: Args,
    ) => any;
    mapHooks: (args: any) => any;
  },
>(
  componentName: string,
  rRTKComponent: RRTKComponent,
  {
    mapDispatch,
    component,
  }: {
    mapDispatch?: () => void;
    mapHooks: (
      args: Options['extraArgsMapHooks'] & {
        testMapHooks: (args: {
          given: Omit<Parameters<RRTKComponent['mapHooks']>[0], 'Yup'>;
          expect?: {
            formDefaultValues?: ReturnType<RRTKComponent['mapHooks']>['defaultValues'];
          } & Omit<
            ReturnType<RRTKComponent['mapHooks']>,
            'hooks' | 'form' | 'apiQueries' | 'apiMutations'
          >;
          calledWith: () => {
            hooks?: {
              [P in keyof ReturnType<RRTKComponent['mapHooks']>['hooks']]: void;
            };
            apiQueries?: {
              [P in keyof ReturnType<RRTKComponent['mapHooks']>['apiQueries']]: void;
            };
            apiMutations?: {
              [P in keyof ReturnType<RRTKComponent['mapHooks']>['apiMutations']]: void;
            };
          };
        }) => void;
        testHookCalled: <Hook extends (args: any) => any>(
          hook: Hook,
          ...args: Parameters<Hook>
        ) => void;
        testHookCalledAnyArgs: <Hook extends (args: any) => any>(hook: Hook, args: any) => void;
      },
    ) => void;
    component: (
      args: Options['extraArgsComponent'] & {
        shallow: ShallowRenderer;
        getPartialDeep: typeof getPartialDeep;
        testComponent: (
          props: DeepPartial<
            Omit<
              React.ComponentProps<typeof rRTKComponent['Component']>,
              'form' | 'apiQueries' | 'apiMutations'
            >
          >,
        ) => void;
      },
    ) => void;
  },
) => void {
  return (
    componentName,
    { mapHooks, Component },
    { mapDispatch, mapHooks: mapHooksTestProp, component },
  ) => {
    describe(componentName, () => {
      describe('mapHooks', () => {
        const testMapHooks = ({
          given,
          expect: expectValue = {},
          calledWith,
        }: {
          given: any;
          expect?: any;
          calledWith: any;
        }) => {
          const mapHooksReturn = mapHooks({
            ...given,
            Yup,
          });
          const returnWithoutForm = omit(
            mapHooksReturn,
            'hooks',
            'form',
            'apiQueries',
            'apiMutations',
          );
          expect({
            ...returnWithoutForm,
            ...(mapHooksReturn.form
              ? { formDefaultValues: mapHooksReturn.form.defaultValues }
              : {}),
          }).toEqual(expectValue);
          calledWith();
        };
        const testHookCalled = (hook: any, ...args: any) => {
          expect(hook).toHaveBeenCalledTimes(1);
          expect(hook).toHaveBeenCalledWith(...args);
        };
        mapHooksTestProp &&
          mapHooksTestProp({
            testMapHooks,
            testHookCalled,
            testHookCalledAnyArgs: testHookCalled,
            ...extraArgsMapHooks,
          });
      });
      describe('renders', () => {
        const renderer = createRenderer();
        const testComponent = (props: any) => {
          renderer.render(
            <Component
              {...props}
              form={getMockForm()}
              apiQueries={getMockApiQueries()}
              apiMutations={getMockApiMutations()}
              translate={getMockTranslate()}
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
