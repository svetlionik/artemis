import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { logout } from 'store/auth/actions';

import userIcon from '../../images/user-icon-blue.svg';
import arrowIcon from '../../images/arrow-down-blue.svg';
import arrowUpIcon from '../../images/arrow-up-blue.svg';

import styles from './DropDownMenu.module.scss';
import { IDropdownMenu } from 'components/types';

const DropDownMenu = ({
  handleOpen,
  handleClose,
  open,
  currentUser,
}: IDropdownMenu) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <div className={styles.dropdownMenu} onMouseLeave={handleClose}>
      <p
        className={styles.dropdownButton}
        onMouseEnter={handleOpen}
        data-testid="userMenuButton">
        <span>
          <img src={userIcon} alt="" className={styles.userIcon} />
          {currentUser}
          {open ? (
            <img src={arrowUpIcon} alt="" className={styles.arrowIcon} />
          ) : (
            <img src={arrowIcon} alt="" className={styles.arrowIcon} />
          )}
        </span>
      </p>
      {open ? (
        <div className={styles.menu}>
          <Link
            to="/reset"
            className="text-decoration-none link"
            onClick={handleClose}>
            <p data-testid="changePasswordButton">Change Password</p>
          </Link>

          <NavDropdown.Divider className="my-auto" />

          <p
            className={styles.links}
            onClick={handleLogout}
            data-testid="logoutButton">
            Log out
          </p>

          <div className={styles.arrowMenu}></div>
        </div>
      ) : null}
    </div>
  );
};

export default DropDownMenu;
