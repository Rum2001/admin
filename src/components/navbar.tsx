/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Button, DarkThemeToggle, Navbar, Dropdown, Avatar } from "flowbite-react";
import Logo from '../../public/images/authentication/logo.png'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlide";
import { RootState } from '../redux/store';
const ExampleNavbar: FC = function () {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img alt="" src={Logo} className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Admin
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Dropdown
                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                arrowIcon={false}
                inline={true}
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    Welcome, {user.name}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
