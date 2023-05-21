import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

const Home = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Container className={` ${styles.home}`} fluid>
      <div className={styles.information}>
        <h1>Welcome!</h1>
        <p>
          Artemis allows you to share with Musala more about your level of
          expertise. During your interview process, you will receive email
          notifications (or get contacted by your HR representative) when more
          information is required of you. These topics will appear on the top
          menu.
        </p>
        <div className={styles.navigatorContainer}>
          {user?.hasSkillRequirement && (
            <p>
              Go to <Link to="/skills"> Skills</Link>
            </p>
          )}
          {user?.hasSkillRequirement && user?.hasTestRequirement && <p>|</p>}
          {user?.hasTestRequirement && (
            <p>
              Go to <Link to="/tests"> Tests</Link>
            </p>
          )}
        </div>
        <p>If you have any questions, please contact your HR representative.</p>
      </div>
    </Container>
  );
};
export default Home;
