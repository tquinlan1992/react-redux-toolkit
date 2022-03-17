import { UseFormReturn } from 'react-hook-form';
import { UseTranslationResponse } from 'react-i18next';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { useReactFormToolkit } from '../react-form-toolkit';

export type BaseMapHooks = {
  form?: UseFormReturn<any>;
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
  translate?: UseTranslationResponse<'ns1'>[0];
};

export type MapHooksReturn = {
  form?: Parameters<typeof useReactFormToolkit>[0];
  hooks?: any;
  apiQueries?: Record<string, { isLoading: boolean; error?: any; data?: any }>;
  apiMutations?: Record<string, readonly [MutationTrigger<any>, ...any]>;
};
