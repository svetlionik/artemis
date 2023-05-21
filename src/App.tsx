import React, { useEffect, useState } from 'react';

import { Route, Switch, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'layouts/NormalLayout/Layout';
import { Loader, ProtectedRoute } from 'components';
import { DARK, LIGHT } from '../src/shared/constants/constants';
import { SkillMatrix } from 'boxes/SkillMatrix';
import { ErrorPage } from 'boxes/ErrorPage';
import MarksMobile from 'components/Marks/MarksMobile';
import Success from 'components/Success/Success';
import SkillMatrixAnnonymous from 'boxes/SkillMatrix/SkillMatrixAnonymous ';
import { Login, ResetPassword } from 'boxes/Auth';
import TestsInformationPage from 'boxes/Tests/components/TestInformationPage/TestsInformationPage';
import TestsLayout from 'boxes/Tests/TestsLayout';
import TestList from 'boxes/Tests/components/TestList/TestList';
import TimeUpPage from 'components/TimeUpPage/TimeUpPage';
import styles from './App.module.scss';
import Home from 'boxes/Home/Home';
import TestsAnonymous from 'boxes/Tests/components/TestsAnonymousPage/TestsAnonymous';
import { AppJourney } from 'boxes/AppJourney';
import PracticalTask from 'boxes/PracticalTask/PracticalTask';
import TechEval from 'boxes/TechEval/TechEval';
import { Relocation } from 'boxes/Relocation';

import { health } from './shared/services/health.service';

import { authStatusSelector } from 'store/auth/selector';
import { profile } from 'store/auth/actions';

import gitSha from './generatedGitInfo.json';
import { Benefits } from 'boxes/Benefits';
import PrivacyPopup from 'components/PrivacyPopup/PrivacyPopup';

const HIDE_JOURNEY = process.env.REACT_APP_DISABLE_JOURNEY_PAGE;

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? DARK
      : LIGHT,
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const prevURL = window.location.pathname;

  const authSelector = useSelector(authStatusSelector);

  useEffect(() => {
    console.clear();
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        setCurrentTheme(e.matches ? DARK : LIGHT);
      });
    console.log(
      '%cWelcome to ARTEMIS!',
      `font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen; padding: 10px 0px ; font-size:30px;color:${
        currentTheme === DARK ? '#fff' : '#2b4591'
      };text-shadow:0 1px 0 #000,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 2px 0 #b9b9b9,0 2px 0 #aaa,0 2px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);`,
    );
    console.log(
      '%cDoes this page need fixes or improvements? Report them to your HR representative so we can make Artemis better together.',
      `font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen; padding: 10px 0px ; font-size:16px; color:${
        currentTheme === DARK ? '#fff' : '#2b4591'
      };`,
    );
  }, [currentTheme]);

  useEffect(() => {
    health();
  }, []);

  useEffect(() => {
    switch (authSelector) {
      case 'idle':
        dispatch(profile());
        break;
      case 'success':
        if (
          history.location.pathname === '/' ||
          history.location.pathname === '/login'
        ) {
          history.push('/home', { from: '/login' });
        } else {
          history.push(history.location.pathname);
        }
        break;
      case 'rejected':
        if (
          !history.location.pathname.startsWith('/anonymous') &&
          history.location.pathname !== '/login'
        ) {
          history.push('/login');
        }
        break;
    }
  }, [dispatch, authSelector, history]);

  return authSelector === 'idle' || authSelector === 'loading' ? (
    <Container>
      <Loader />
    </Container>
  ) : (
    <Container
      fluid
      className={`w-100 vh-100 px-0 bg-light ${styles.app} sha=${gitSha?.gitCommitHash}`}
      id="app">
      <PrivacyPopup />
      <Layout>
        <Switch>
          <Route
            exact
            path="/login"
            component={(props: any) => <Login {...props} prevURL={prevURL} />}
          />
          <Route
            exact
            path="/anonymous/skills/:id"
            component={SkillMatrixAnnonymous}
          />
          <ProtectedRoute exact path="/tests" component={TestList} />
          <ProtectedRoute exact path="/skills" component={SkillMatrix} />
          <ProtectedRoute
            exact
            path="/home"
            component={HIDE_JOURNEY === 'true' ? Home : AppJourney}
          />
          <ProtectedRoute exact path="/tech" component={TechEval} />
          <ProtectedRoute exact path="/practical" component={PracticalTask} />
          <ProtectedRoute exact path="/practical/success" component={Success} />
          <ProtectedRoute
            exact
            path="/practical/timeup"
            component={TimeUpPage}
          />
          <ProtectedRoute exact path="/skills/marks" component={MarksMobile} />
          <ProtectedRoute exact path="/skills/success" component={Success} />
          <ProtectedRoute exact path="/relocation" component={Relocation} />
          <ProtectedRoute
            exact
            path="/tests/questions"
            component={TestsLayout}
          />
          <ProtectedRoute
            exact
            path="/tests/information"
            component={TestsInformationPage}
          />
          <ProtectedRoute exact path="/tests/success" component={Success} />
          <ProtectedRoute exact path="/tests/timeup" component={TimeUpPage} />
          <Route
            exact
            path="/anonymous/tests/:subId_id"
            component={TestsAnonymous}
          />
          <ProtectedRoute exact path="/reset" component={ResetPassword} />
          <ProtectedRoute exact path="/benefits" component={Benefits} />
          <Route exact path="/error-page" component={ErrorPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Layout>
    </Container>
  );
};

export default App;
