import React from 'react';
import { signIn } from 'fbase/api';

import Button from 'components/Button/Button';
import classes from './SignIn.scss';

const SignInView = () => (
  <main className={classes.signIn}>
    <h1>Planning Poker</h1>
    <span>Plan your sprints easily!</span>
    <Button onClick={signIn}>Sign in</Button>
    <span>to get started!</span>
  </main>
);

export default SignInView;
