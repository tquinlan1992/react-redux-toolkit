import { createApi as rtkCreateApi } from '@reduxjs/toolkit/query/react';

export function createApi<Options extends Parameters<typeof rtkCreateApi>[0]>(
  options: Options,
): Options {
  return options as Options;
}
