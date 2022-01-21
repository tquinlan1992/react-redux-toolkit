import React from 'react';

import { TextField as MaterialTextField } from '@mui/material';

export interface Props {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  errorMessage?: string;
  required?: boolean;
}

export const TextField: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, ...props }, ref) => (
    <MaterialTextField
      error={!!errorMessage}
      helperText={errorMessage}
      {...props}
      ref={ref}
      variant="outlined"
    />
  ),
);
