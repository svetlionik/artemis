import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoaderWrapper } from 'components';
import ContinuePage from './ContinuePage';
import NewPage from './NewPage';

import { startTest, testStatus } from 'store/tests/actions';
import { LocationState } from 'components/types';
import { RootState } from 'store/store';
import { IRequirement } from 'boxes/AppJourney/types';

const TestsInformationPage = () => {
  const { questions, requirements, testInfoStatus, status } = useSelector(
    (state: RootState) => state.tests,
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const handleStartForm = () => {
    let newCode = questions.code;
    dispatch(testStatus(newCode.replace('#', '%23')));
    // request to start test
    if (
      requirements.find(
        (test: IRequirement) =>
          (test.status === 'IN_PROGRESS' && test.code !== newCode) ||
          test.status === 'SUBMITTED',
      )
    ) {
      history.push('/tests');
    } else {
      if (status === 'IN_PROGRESS') {
        history.push('/tests/questions', { from: '/tests/information' });
      } else {
        dispatch(startTest(newCode.replace('#', '%23')));
        history.push('/tests/questions', { from: '/tests/information' });
      }
    }
  };

  return location?.state?.from === '/tech' ||
    location?.state?.from === '/home' ||
    location?.state?.from === '/tests' ? (
    testInfoStatus === 'loading' || testInfoStatus === 'rejected' ? (
      <LoaderWrapper loading={true} />
    ) : status === 'IN_PROGRESS' ? (
      <ContinuePage handleStartForm={handleStartForm} />
    ) : (
      <NewPage handleStartForm={handleStartForm} />
    )
  ) : (
    <Redirect to="/tests" />
  );
};

export default TestsInformationPage;
