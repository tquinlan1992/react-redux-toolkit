import { Button as MaterialButton } from '@mui/material';

export const Button: React.FC<Pick<Parameters<typeof MaterialButton>[0], 'onClick' | 'type'>> = (
  props,
) => <MaterialButton {...props} />;
