import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    },
  },
}));

export default function Board({ name }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className="paperContent">
          <p>{name}</p>
        </div>
      </Paper>
    </div>
  )
}