import TextField from '@material-ui/core/TextField';

export default function Input({label}) {
  return(
    <TextField  label={label} variant="outlined" fullWidth={true} />
  )
} 