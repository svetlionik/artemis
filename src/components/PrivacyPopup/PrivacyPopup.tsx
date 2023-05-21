import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { logout, updatePrivacy } from 'store/auth/actions';
import { userInformation } from 'store/auth/selector';
import styles from './PrivacyPopup.module.scss';
import './PrivacyPopup.scss';

const PrivacyPopup: React.FC = () => {
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userInformation);
  const handleClose = () => false;
  const setPrivacy = () => setAgree(!agree);

  const handleSubmit = async () => {
    if (agree) {
      dispatch(updatePrivacy({ privacyChecked: true }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  useEffect(() => {
    if (user && !user.privacyChecked) {
      setShow(true);
    }
  }, [user]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className={styles.privacy}>
        <Modal.Header className={styles.header}>
          <h4>Privacy Policy</h4>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          <Row className={`${styles.rowMessage} ps-2 pe-2`}>
            <Col>
              Please read the <strong>Privacy policy</strong> of{' '}
              <strong>Musala Soft</strong> before continuing:
            </Col>
          </Row>
          <Row className={styles.rowMessage}>
            <Col xs={1}>
              <Form.Check onChange={setPrivacy} checked={agree} />
            </Col>
            <Col xs={11}>
              <h6>
                I have <span className={styles.shortMessage}>read and </span>
                agree to the
                <Link
                  className={`${styles.agreeLink} ms-1`}
                  target="_blank"
                  to={{ pathname: 'https://www.musala.com/policies/gdpr/' }}>
                  Privacy Policy
                </Link>
              </h6>
            </Col>
          </Row>
          <Row className={styles.rowMessage}>
            <Col className={'ps-0 pe-4'}>
              <p>
                Please make sure you have read and checked the{' '}
                <strong>Privacy Policy</strong> checkbox before clicking the{' '}
                <strong>"Agree"</strong> button. If you do not agree to the{' '}
                <strong>Privacy Policy</strong>, please select the{' '}
                <strong>"Logout"</strong> button and contact your HR
                representative.
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <Button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </Button>
            </Col>
            <Col xs={12} sm={6}>
              <Button
                className={styles.agreeBtn}
                disabled={!agree}
                onClick={handleSubmit}>
                Agree
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default PrivacyPopup;
