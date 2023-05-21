import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

import NavbarToggle from 'react-bootstrap/NavbarToggle';
import DropDownMenu from '../Dropdown/DropDownMenu';

import { RootState } from 'store/store';

import styles from './Header.module.scss';

import journeyLogo from '../../images/logo new.svg';

const HIDE_JOURNEY = process.env.REACT_APP_DISABLE_JOURNEY_PAGE;

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNavigateHomepage = () => {
    history.push('/home');
  };

  const possibleRoutes = [
    '/skills',
    '/tech',
    '/tests',
    '/tests/information',
    '/tests/questions',
    '/tests/success',
  ];

  return (
    <Navbar className={styles.navbar} sticky="top">
      <div className={styles.navbarDiv}>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <NavbarBrand className="text_primary">
            <img
              src={journeyLogo}
              alt="logo"
              className={styles.logo}
              onClick={handleNavigateHomepage}
            />
          </NavbarBrand>
          {!user ? null : (
            <Nav className={styles.nav}>
              <Nav.Link className="my-auto">
                <Link
                  to="/home"
                  className={`${
                    location.pathname === '/home'
                      ? styles.textUnderline
                      : styles.navText
                  }`}>
                  {HIDE_JOURNEY === 'true' ? 'Home' : 'Interview Journey'}
                </Link>
              </Nav.Link>
              {(user.hasSkillRequirement || user.hasTestRequirement) &&
              HIDE_JOURNEY === 'false' ? (
                <>
                  <Nav.Link className="my-auto">
                    <Link
                      to="/tech"
                      className={`${
                        possibleRoutes.includes(location.pathname)
                          ? styles.textUnderline
                          : styles.navText
                      }`}>
                      Tech Evaluations
                    </Link>
                  </Nav.Link>
                </>
              ) : null}
              {user.hasSkillRequirement && HIDE_JOURNEY === 'true' ? (
                <Nav.Link className="my-auto">
                  <Link
                    to="/skills"
                    className={`${
                      location.pathname.includes('/skills')
                        ? styles.textUnderline
                        : styles.navText
                    }`}>
                    Skill Matrix
                  </Link>
                </Nav.Link>
              ) : null}
              {user.hasTestRequirement && HIDE_JOURNEY === 'true' ? (
                <Nav.Link className="my-auto">
                  <Link
                    to="/tests"
                    className={`${
                      location.pathname.includes('/tests')
                        ? styles.textUnderline
                        : styles.navText
                    }`}>
                    Tests
                  </Link>
                </Nav.Link>
              ) : null}
            </Nav>
          )}
        </NavbarCollapse>
        {!user ? null : (
          <span className="my-auto">
            <DropDownMenu
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              currentUser={!user ? '' : user.username}
            />
          </span>
        )}
      </div>
    </Navbar>
  );
};
export default Header;
