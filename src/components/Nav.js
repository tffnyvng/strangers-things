import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../custom-hooks";

const NavContainer = styled.nav`
& {
  display: flex; 
  align-items: center;
  justify-content space-between;
  padding: 1rem 0;
  margin-bottom: 1rem;
}

a {
  padding: 0.5 rem;
  margin-left: 0.5rem;
}

button {
  margin-left: 0.5rem;
  border-radius: 25%;
  padding: 0.2rem;
  font-size: 15px;
}
`;

const loggedInLinks = [
  {
    id: 1,
    name: "Home",
    to: "/home",
  },
  {
    id: 2,
    name: "New Post",
    to: "/posts/new",
  },
  {
    id: 3,
    name: "Profile",
    to: "/profile",
  },
];

const loggedOutLinks = [
  {
    id: 1,
    name: "Home",
    to: "/home",
  },
  {
    id: 2,
    name: "Login",
    to: "/login",
  },
  {
    id: 3,
    name: "Register",
    to: "/register",
  },
];

const Nav = () => {
  const { isLoggedIn, logout } = useAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;
  return (
    <NavContainer>
      <NavLink id="logo" to="/home">
        {"Stranger's Things"}
      </NavLink>
      <div>
        {navLinks.map(({ id, name, to }) => (
          <NavLink id={name} key={id} to={to}>
            {name}
          </NavLink>
        ))}
        {isLoggedIn && <button onClick={logout}>Logout</button>}
      </div>
    </NavContainer>
  );
};

export default Nav;
