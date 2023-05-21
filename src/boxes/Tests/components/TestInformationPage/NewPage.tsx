import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { InfoCard } from '../InfoCard/InfoCard';

import { RootState } from 'store/store';

import styles from './TestInformationPage.module.scss';

const NewPage = ({ handleStartForm }: any) => {
  const { questions } = useSelector((state: RootState) => state.tests);

  return (
    <Container className={`${styles.info}`}>
      <div className={styles.information}>
        <h1>{questions.title}</h1>
        <p>
          You can start the test by pressing the button below. Before that, here
          are some tips for better performance:
        </p>
      </div>
      <InfoCard />
      <div className={styles.beginButtonContainer}>
        <p>Ready?</p>
        <Button
          className={styles.beginBtn}
          onClick={handleStartForm}
          data-testid="beginButton">
          Let's Begin
        </Button>
      </div>
    </Container>
  );
};

export default NewPage;
