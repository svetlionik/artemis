import React, { useState } from 'react';
import {
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  Offcanvas,
  Row,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import journeyLogo from '../../images/logo-mobile.svg';
import closeIcon from '../../images/close-icon.svg';
import menuButton from '../../images/menu-button.svg';

import { logout } from 'store/auth/actions';
import { userInformation } from 'store/auth/selector';

import styles from './Drawer.module.scss';

const HIDE_JOURNEY = process.env.REACT_APP_DISABLE_JOURNEY_PAGE;

const Drawer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(userInformation);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };
  const [show, setIsMobile] = useState(false);
  const handleShow = () => {
    setIsMobile(true);
  };
  const handleClose = () => {
    setIsMobile(false);
  };
  const handleNavigateHomepage = () => {
    history.push('/home');
  };

  return (
    <Navbar expand={false} className={styles.navbar} sticky="top">
      <Container className={styles.container}>
        <NavbarBrand>
          <img src={journeyLogo} alt="logo" onClick={handleNavigateHomepage} />
        </NavbarBrand>
        {!user ? null : (
          <>
            <img
              src={menuButton}
              className={styles.menuButton}
              alt="menu"
              onClick={handleShow}
            />
            <Offcanvas
              id={styles.offcanvasNavbar}
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              show={show}
              onHide={handleClose}>
              <Row className={`g-1 ${styles.firstRow}`}>
                <Col className="closeIconWrapper">
                  <p>
                    Close{' '}
                    <img
                      src={closeIcon}
                      alt="closeIcon"
                      className={styles.closeIcon}
                      onClick={handleClose}
                    />
                  </p>
                </Col>
              </Row>
              <Row className="g-1">
                <Col>
                  <Nav className={styles.nav}>
                    <Nav.Link className={styles.navLink}>
                      <Link
                        to="/home"
                        className={`text-decoration-none ${styles.links}`}
                        onClick={handleClose}>
                        {HIDE_JOURNEY === 'false'
                          ? 'Interview Journey'
                          : 'Home'}
                      </Link>
                    </Nav.Link>
                    {(user?.hasTestRequirement || user?.hasSkillRequirement) &&
                    HIDE_JOURNEY === 'false' ? (
                      <Nav.Link className={styles.navLink}>
                        <Link
                          to="/tech"
                          className={`text-decoration-none ${styles.links}`}
                          onClick={handleClose}>
                          Tech Evaluations
                        </Link>
                      </Nav.Link>
                    ) : null}
                    {user.hasSkillRequirement && HIDE_JOURNEY === 'true' ? (
                      <Nav.Link className={styles.navLink}>
                        <Link
                          to="/skills"
                          className={`text-decoration-none ${styles.links}`}
                          onClick={handleClose}>
                          Skill Matrix
                        </Link>
                      </Nav.Link>
                    ) : null}
                    {user?.hasTestRequirement && HIDE_JOURNEY === 'true' ? (
                      <Nav.Link className={styles.navLink}>
                        <Link
                          to="/tests"
                          className={`text-decoration-none ${styles.links}`}
                          onClick={handleClose}>
                          Tests
                        </Link>
                      </Nav.Link>
                    ) : null}
                  </Nav>
                </Col>
              </Row>
              <Row className={`g-1 ${styles.thirdRow}`}>
                <Col>
                  <p>{user?.username}</p>

                  <span>
                    <Link
                      to="/reset"
                      className={`text-decoration-none ${styles.reset}`}
                      onClick={handleClose}>
                      Change Password
                    </Link>
                  </span>
                  <h6 onClick={handleLogout}>Logout</h6>
                </Col>
              </Row>
              <Row className={`g-1 ${styles.fourthRow}`}>
                <Col>
                  <div className={styles.textBox}>
                    <p>© Musala Soft JSC 2023</p>
                    <br />
                    <span>
                      <Link
                        className={styles.links}
                        to={{
                          pathname: 'https://www.musala.com/policies/gdpr/',
                        }}
                        target="_blank">
                        Privacy Policy
                      </Link>
                      {/*
                        This is for future implementation
                        <a
                          href="mailto:artemis.support@musala.com?subject=Report a problem&body=Hi Artemis team,
                          %0A%0A%0AProblem description:
                          %0A%0A%0ANames:
                          %0A%0A%0AArtemis username:
                          %0A%0A%0AHR Representative Name:
                          %0A%0A%0AExtra information to help troubleshooting (e.g. screenshot, error message, etc.):
                          %0A%0A%0ABest regards"
                          className={styles.links}>
                          Report a problem
                        </a> */}
                    </span>
                  </div>
                </Col>
              </Row>
            </Offcanvas>
          </>
        )}
      </Container>
    </Navbar>
  );
};
export default Drawer;
