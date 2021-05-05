import TextField from '@material-ui/core/TextField';

export default function Input({label, ...field}) {
  return(
    <TextField label={label} {...field} variant="outlined" fullWidth={true} />
  )
} 