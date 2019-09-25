import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { Fab, Paper, TextField, Box } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    header: {
      top: 0
    },
    footer: {
      top: 'auto',
      bottom: 0
    },
    sent: {
      padding: theme.spacing(1),
      margin: theme.spacing(2),
      backgroundColor: '#f5f5f5',
      maxWidth: '70%',
      width: 'fit-content',
    },
    received: {
      padding: theme.spacing(1),
      margin: theme.spacing(2),
      backgroundColor: 'blue',
      color: '#fff',
      width: 'fit-content',
      maxWidth: '70%',
    },
    messageBox: {
      position: 'absolute',
      bottom: '12px'
    },
    textField: {
      width: '-webkit-fill-available',
      borderRadius: '3px',
      backgroundColor: '#f5f5f5',
    },
    sendIcon: {
      position: 'absolute',
      top: '17px',
      right: '15px'
    }
  }),
);

function Header(props: any) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.header}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Messages
          </Typography>
        <Button color="inherit" onClick={props.onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}
function Messagebar(props: any) {

  const [message, setMessage] = React.useState('');
  const classes = useStyles();

  const handleChange = (message: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  function clearText() {
    setMessage('')
  }
  return (
    <AppBar position="fixed" color="primary" className={classes.footer}>
      <Toolbar>
        <TextField
          id="outlined-bare"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          inputProps={{ 'aria-label': 'bare' }}
          onChange={handleChange('message')}
          value={message}
          autoFocus
        />
        <IconButton className={classes.sendIcon} onClick={() => {clearText(); props.addMessage(message)}}>
          <SendIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

function Messages(props: any) {
  const classes = useStyles();
  return (
    <div>
      {props.messages.map((message: any, index: number) => (
        <Paper color="secondary" className={message.type == 'sent' ? classes.sent : classes.received}>
          <Typography >{message.message}</Typography>
        </Paper>
      ))}
    </div>
  )
}

interface State {
  message: string,
  recMessage: string,
  messages: Array<any>
  connection: any
}
export default function Home(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState<State>({
    message: '',
    messages: JSON.parse(localStorage.getItem('messages') || "[]"),
    recMessage: '',
    connection: new WebSocket('wss://echo.websocket.org')
  })

  useEffect(() => {
    value.connection.onmessage = (evt: any) => {
      console.log('eventData', evt.data);
      add(evt.data, 'receive');
    };
  })

  function add(message: string, type: string) {
    let messages = value.messages;
    messages.push({ message: message, type: type })
    setValue({ ...value, ['messages']: messages })
    localStorage.setItem('messages',JSON.stringify(messages))
  }
  function onLogout() {
    localStorage.removeItem('user');
    props.history.push('/login');
  }

  function addMessage(data: string) {
    if (data) {
      value.connection.send(data);
      add(data, 'sent');
      //console.log(messages);
    }
  };

  return (
    <div className={classes.root}>
      <Box my={10} className={classes.messageBox}>
        {value.messages.length ?
          <Messages messages={value.messages} /> : null
        }
      </Box>
      <Header onLogout={onLogout} />
      <Messagebar addMessage={addMessage} />
    </div>
  );
}