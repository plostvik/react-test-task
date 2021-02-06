import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  shadows: ['none'],
});

const useStyles = makeStyles({
  booksList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  listItem: {
    width: 350,
    height: '100%',
    margin: '10px',
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
  button: {
    marginTop: 15,
  },
  card: {
    marginTop: 20,
  },
  loader: {
    marginTop: 10,
  },
  regular: {
    fontWeight: 400,
  },
  bold: {
    fontWeight: 700,
  },
});

export { theme, useStyles };
