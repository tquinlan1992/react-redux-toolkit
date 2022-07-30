/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { useReactFormToolkit } from '../react-form-toolkit';

export type ConnectHooksReturn<MapHooks extends (...args: any) => any> = {
  // To make sure these are the only keys returned
  [P in keyof Omit<
    ReturnType<MapHooks>,
    'state' | 'form' | 'hooks' | 'apiQueries' | 'apiMutations'
  >]: any;
} & {
  form?: Parameters<typeof useReactFormToolkit>[0];
  hooks?: any;
  apiQueries?: Record<
    string,
    {
      isLoading: boolean;
      error?: FetchBaseQueryError | SerializedError | undefined;
      data?: any;
    }
  >;
  apiMutations?: Record<string, readonly [MutationTrigger<any>, ...any]>;
};

export type MapHooksReturnBase<MapHooks extends (...args: any) => any> = {
  // To make sure these are the only keys returned
  [P in keyof Omit<
    ReturnType<MapHooks>,
    'state' | 'form' | 'hooks' | 'apiQueries' | 'apiMutations'
  >]: never;
} & {
  form?: Parameters<typeof useReactFormToolkit>[0];
  hooks?: any;
  apiQueries?: Record<
    string,
    {
      isLoading: boolean;
      error?: FetchBaseQueryError | SerializedError | undefined;
      data?: any;
    }
  >;
  apiMutations?: Record<string, readonly [MutationTrigger<any>, ...any]>;
};

export type OwnPropsGeneric = Record<string, any>;
