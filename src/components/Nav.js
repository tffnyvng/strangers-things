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
`;

const navLinks = [
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
  {
    id: 4,
    name: "Logout",
    to: "/account/logout",
  },
];

const Nav = () => {
  return (
    <NavContainer>
      <NavLink id="logo" to="/">
        {"Stranger's Things"}
      </NavLink>
      <div>
        {navLinks.map(({ id, name, to }) => (
          <NavLink id={name} key={id} to={to}>
            {name}
          </NavLink>
        ))}
      </div>
    </NavContainer>
  );
};
//how to make it so clicking the Logout out link will instigate the logout out instead of the button
// // const logOut = document.getElementById("Logout");
// // console.dir(logOut);
// // logOut.addEventListener("click", () => {
// //   const { logout } = useAuth();
// //   logout();
// });
export default Nav;
