import { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';

export const Input = forwardRef(({label, ...field}, ref) => (
  <TextField ref={ref} label={label} {...field} variant="outlined" fullWidth={true} />
));
