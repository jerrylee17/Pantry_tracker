import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Avatar,
  Grid,
  Paper,
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import PantryCard from './PantryCard';
import { useQuery } from '@apollo/react-hooks';
import { USER_QUERY } from '../../APIFunctions/queries';
import { currentUser } from '../../APIFunctions/auth';

const useStyles = makeStyles((theme) => ({
  profileText: {
    textAlign: 'center'
  },
  paper: {
    margin: '7vh 10vw 5vh 10vw',
    height: 'auto',
    minHeight: '70vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.typography.fontFamily
  },
  avatarWrapper: {
    order: 1,
    paddingBottom: 'min(5vh, 4vw)'
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[300]),
    backgroundColor: deepPurple[300],
    height: 'min(10vh, 8vw)',
    width: 'min(10vh, 8vw)',
    margin: 'max(-5vh, -4vw) auto'
  },
  welcomeText: {
    order: 2,
  },
  viewPantryText: {
    order: 3,
  },
  pantryDisplayWrapper: {
    paddingTop: '20px',
    order: 4,
    justifyContent: 'flex-start',
  },
  pantryGrid: {
    padding: '7vh',
    flexGrow: 1,
  },
}));


export default function Profile(props) {
  const classes = useStyles();
  const [userID, setUserID] = useState('')
  const [loadingPage, setIsLoading] = useState(true)
  const userInfo = useQuery(USER_QUERY, {
    variables: { userID }
  });
  async function onLoad() {
    let currUser = await currentUser()
    setUserID(currUser)
    setIsLoading(false)
  }
  useEffect(() => {
    onLoad()
  }, [])
  if (userInfo.loading) {
    return (
      <p>Loading...</p>
    );
  }
  if (userInfo.error) {
    return (
      <p>Error</p>
    );
  }
  const user = userInfo.data.userOne;
  return !loadingPage && (
    <>
      <h1 className={clsx(classes.profileText)}>Profile</h1>
      <Paper
        elevation={10}
        className={classes.paper}
      >
        <div className={classes.avatarWrapper}>
          <Avatar className={classes.avatar}>JL</Avatar>
        </div>
        <div className={classes.welcomeText}>
          <h1>Welcome, {user.name.split(' ')[0]}</h1>
        </div>
        <div className={classes.viewPantryText}>
          <i>
            {/* You have {user.pantries.length} pantries. */}
          </i>
        </div>
        <Grid
          container
          justify='center'
          className={classes.pantryDisplayWrapper}
        >
          {/* {user.pantries.map((pantry, index) => (
            <Grid item className={classes.pantryGrid} sm={12} lg={6}>
              <PantryCard key={index} {...pantry} />
            </Grid>
          ))} */}
        </Grid>
      </Paper>
    </>
  );
}

