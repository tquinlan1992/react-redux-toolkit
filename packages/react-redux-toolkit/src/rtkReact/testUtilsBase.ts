import { UseFormReturn } from 'react-hook-form';

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

export const getMockForm = () =>
  ({
    register: jest.fn((name: string) => ({ name, id: name })),
    handleSubmit: jest.fn(),
    formState: {
      errors: new Proxy({}, errorsHandler),
    },
  } as any as UseFormReturn<any>);

export const mockTranslate = jest.fn((key: string) => key);

export function mockActionsHandler(key: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const get: any = (target: any, prop: string) => {
    if (typeof target[prop] === 'object') {
      const handler = mockActionsHandler(`${key}.${prop}`);
      return new Proxy(target[prop], handler);
    }
    if (typeof target[prop] === 'function') {
      // return `${key}.${prop}`;
      return jest.fn();
    }
  };
  return {
    get,
  };
}

export const mockActions = (actions: Record<string, any> = {}) =>
  new Proxy(actions, mockActionsHandler('actions'));

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

export const getMockApiQueries = () =>
  new Proxy(
    {},
    {
      get: (target: Record<string, any>, prop: string) => getMockApiResult(`apiQueries.${prop}`),
    },
  ) as any;

export const getMockQueryMutation = (rootProp: string) => {
  const mutationTrigger = `${rootProp}.mutationTrigger` as any as MutationTrigger<any>;
  return [mutationTrigger, getMockApiResult(rootProp)];
};

export const getMockApiMutations = () =>
  new Proxy(
    {},
    {
      get: (target: Record<string, any>, prop: string) =>
        getMockQueryMutation(`apiMutations.${prop}`),
    },
  ) as any;
