import { omit } from 'lodash';
import { UseFormReturn } from 'react-hook-form';
import ShallowRenderer from 'react-test-renderer/shallow';
import * as Yup from 'yup';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

const isTestProp = (prop: string) =>
  [
    '$$typeof',
    'nodeType',
    'tagName',
    'hasAttribute',
    '@@__IMMUTABLE_ITERABLE__@@',
    '@@__IMMUTABLE_RECORD__@@',
    '_isMockFunction',
    'Symbol(Symbol.toStringTag)',
    'toJSON',
    '@@__IMMUTABLE_ITERABLE__@@',
    '',
  ].includes(prop);

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export function getPartialDeep<Value>(value: DeepPartial<Value>): Value {
  return value as any;
}

const errorsHandler = {
  get: function (target: Record<string, any>, prop: string) {
    return {
      message: `${prop} errors`,
    };
  },
};

const mockForm = {
  register: jest.fn((name: string) => ({ name, id: name })),
  handleSubmit: jest.fn(),
  formState: {
    errors: new Proxy({}, errorsHandler),
  },
} as any as UseFormReturn<any>;

const mockActions = new Proxy(
  {},
  {
    get: function (target: Record<string, any>, prop: string) {
      return `actions.${prop}`;
    },
  },
);

const hookReturnProxy = (hookName: string) =>
  new Proxy(
    {},
    {
      get: function (target: Record<string, any>, prop: string) {
        return `${hookName}.${prop}`;
      },
    },
  );

export function mockHooks<Hooks extends Record<string, any>>(hooks: Hooks): Hooks {
  const cache: Record<string, any> = {};
  return new Proxy(
    {},
    {
      get: function (target: Record<string, any>, prop: string) {
        const cached = cache[prop];
        if (cached) {
          return cached;
        } else {
          cache[prop] = jest.fn(() => hookReturnProxy(prop));
          return cache[prop];
        }
      },
    },
  ) as any;
}

const proxyData = () =>
  new Proxy(
    { data: 'apiQueries.data' },
    {
      get: function (target: Record<string, any>, prop: string) {
        if (target[prop] === undefined && !isTestProp(prop)) {
          try {
            return `data.${prop}`;
          } catch {
            return target[prop];
          }
        } else {
          return target[prop];
        }
      },
    },
  );

export const getMockApiResult = (rootProp: string) => {
  const error = { error: { name: `${rootProp}.error` } };
  const data = true;
  const isLoading = `${rootProp}.isLoading`;
  const initialValue: any = { isLoading };
  if (error) {
    initialValue.error = error;
  }
  if (data) {
    initialValue.data = proxyData();
  }
  return new Proxy(initialValue, {
    get: (target: Record<string, any>, prop: string) => {
      if (prop === 'isLoading') {
        return isLoading;
      }
      if (prop === 'error' && error) {
        return error;
      }
      if (!isTestProp(prop)) {
        try {
          if (prop.startsWith('data') && data) {
            return target[prop];
          }
          if (prop.startsWith('data') && !data) {
            return undefined;
          }
          if (prop === 'isLoading') {
            return false;
          }
          return `apiQueries.${prop}`;
        } catch {
          return target[prop];
        }
      }
    },
  });
};

const getMockApiQueries = () =>
  new Proxy(
    {},
    { get: (target: Record<string, any>, prop: string) => getMockApiResult(`apiQueries.${prop}`) },
  ) as any;

export const getMockQueryMutation = (rootProp: string) => {
  const mutationTrigger = `${rootProp}.mutationTrigger` as any as MutationTrigger<any>;
  return [mutationTrigger, getMockApiResult(rootProp)];
};

const getMockApiMutations = () =>
  new Proxy(
    {},
    {
      get: (target: Record<string, any>, prop: string) =>
        getMockQueryMutation(`apiMutations.${prop}`),
    },
  ) as any;

export function createTestComponent<
  AppState,
  Options extends {
    extraArgsMapState?: Record<string, any>;
    extraArgsComponent?: Record<string, any>;
    extraArgsMapHooks?: Record<string, any>;
  },
>({
  extraArgsMapState,
  extraArgsComponent,
  extraArgsMapHooks,
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
          given: Omit<Parameters<RRTKComponent['mapHooks']>[0], 'actions' | 'Yup'>;
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
      },
    ) => void;
    component: (
      args: Options['extraArgsComponent'] & {
        shallow: ShallowRenderer.ShallowRenderer;
        getPartialDeep: typeof getPartialDeep;
        testComponent: (
          props: DeepPartial<
            Omit<
              React.ComponentProps<typeof rRTKComponent['Component']>,
              'actions' | 'form' | 'apiQueries' | 'apiMutations'
            >
          >,
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
        const actions = { actions: mockActions };
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
            actions: mockActions,
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
        mapHooksTestProp &&
          mapHooksTestProp({
            testMapHooks,
            testHookCalled: (hook, ...args) => {
              expect(hook).toHaveBeenCalledTimes(1);
              expect(hook).toHaveBeenCalledWith(...args);
            },
            ...extraArgsMapHooks,
            ...actions,
          });
      });
      describe('renders', () => {
        const renderer = ShallowRenderer.createRenderer();
        const testComponent = (props: any) => {
          renderer.render(
            <Component
              {...props}
              form={mockForm}
              actions={mockActions}
              apiQueries={getMockApiQueries()}
              apiMutations={getMockApiMutations()}
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
