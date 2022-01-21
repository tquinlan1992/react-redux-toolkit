/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultValues, Mode, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export function useReactFormToolkit<Schema extends Yup.AnyObjectSchema>(formOptions: {
  schema: Schema;
  defaultValues?: DefaultValues<Yup.InferType<Schema>>;
  mode?: Mode;
}) {
  return useForm<Yup.InferType<Schema>>({
    resolver: yupResolver(formOptions.schema) as any,
    defaultValues: formOptions.defaultValues as any,
    mode: formOptions.mode,
  });
}
