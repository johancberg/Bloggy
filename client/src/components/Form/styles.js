import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttons: {
    width: '97%',
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
  },
  fileInput: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.8em',
    alignItems: 'center',
  },
  squareButton: {
    fontSize: '0.2rem',
    minWidth: '40px !important',
    width: '40px',
    height: '34px',
    padding: '4px',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));