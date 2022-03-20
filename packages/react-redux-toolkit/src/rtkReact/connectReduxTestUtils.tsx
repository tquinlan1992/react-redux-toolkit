import { omit } from 'lodash';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import * as Yup from 'yup';

import {
  DeepPartial,
  getMockApiMutations,
  getMockApiQueries,
  getMockForm,
  getPartialDeep,
  mockActions,
  mockTranslate,
} from './testUtilsBase';

/* eslint-disable @typescript-eslint/no-explicit-any */

export function createConnectReduxTester<
  AppState,
  Options extends {
    extraArgsMapState?: Record<string, any>;
    extraArgsComponent?: Record<string, any>;
    extraArgsMapHooks?: Record<string, any>;
    actions?: Record<string, any>;
  },
>({
  extraArgsMapState,
  extraArgsComponent,
  extraArgsMapHooks,
  actions: optionsActions,
}: Options): <
  RRTKComponent extends {
    mapStateToProps: (
      args: { state: AppState; ownProps: any } & Options['extraArgsMapState'],
    ) => any;
    Component: <
      Args extends {
        actions: any;
        state: any;
        hooks: any;
        form: any;
        apiQueries: any;
        apiMutations: any;
        ownProps: any;
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
    mapState,
    mapDispatch,
    component,
  }: {
    mapState: (
      args: {
        testMapState: (
          given: {
            ownProps?: Parameters<RRTKComponent['mapStateToProps']>[0]['ownProps'];
          } & DeepPartial<AppState>,
          expect: ReturnType<typeof rRTKComponent['mapStateToProps']>,
        ) => void;
      } & Options['extraArgsMapState'],
    ) => void;
    mapDispatch?: () => void;
    mapHooks: (
      args: Options['extraArgsMapHooks'] & {
        testMapHooks: (args: {
          given: Omit<
            Parameters<RRTKComponent['mapHooks']>[0],
            'actions' | 'Yup' | 'ownProps' | 'translate'
          > & {
            ownProps?: Parameters<RRTKComponent['mapHooks']>[0]['ownProps'];
          };
          expect: {
            formDefaultValues?: ReturnType<RRTKComponent['mapHooks']>['defaultValues'];
          } & Omit<
            ReturnType<RRTKComponent['mapHooks']>,
            'hooks' | 'form' | 'actions' | 'apiQueries' | 'apiMutations'
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
              'actions' | 'form' | 'apiQueries' | 'apiMutations' | 'ownProps'
            >
          > &
            React.ComponentProps<typeof rRTKComponent['Component']>['ownProps'],
        ) => void;
      },
    ) => void;
  },
) => void {
  return (
    componentName,
    { mapStateToProps, mapHooks, Component },
    { mapState, mapDispatch, mapHooks: mapHooksTestProp, component },
  ) => {
    describe(componentName, () => {
      describe('mapState', () => {
        const testMapState = (given: any, expectValue: any) => {
          expect(
            mapStateToProps({
              state: omit(given, 'ownProps'),
              ownProps: given.ownProps,
              ...extraArgsMapState,
            }),
          ).toEqual(expectValue);
        };
        mapState({ testMapState });
      });
      describe('mapDispatch', () => {
        mapDispatch && mapDispatch();
      });
      describe('mapHooks', () => {
        const actions = { actions: mockActions(optionsActions) };
        const testMapHooks = ({
          given,
          expect: expectValue = {},
          calledWith,
        }: {
          given: any;
          expect: any;
          calledWith: any;
        }) => {
          const mapHooksReturn = mapHooks({
            ...given,
            ...extraArgsMapState,
            Yup,
            actions: mockActions(optionsActions),
            translate: mockTranslate,
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
            ...actions,
          });
      });
      describe('renders', () => {
        const renderer = createRenderer();
        const testComponent = (props: any) => {
          renderer.render(
            <Component
              {...props}
              form={getMockForm()}
              mockActions={mockActions(optionsActions)}
              apiQueries={getMockApiQueries()}
              apiMutations={getMockApiMutations()}
              translate={mockTranslate}
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
