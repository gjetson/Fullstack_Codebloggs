import React from "react"
import styled from "styled-components"
import { useUserActions } from "../util/user_actions"

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: #8d88ea;
  color: #fff;
  padding: 0 20px;
`

const Dropdown = styled.div`
  display: none;
  position: absolute;
  border-radius: 10px;
  top: 100%;
  right: 0;
  background-color: #333333;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 20px;

  /* Remove default list styles */
  list-style-type: none;
  margin: 0;
  padding: 0;

  a {
    display: block;
    padding: 8px 10px;
    color: #fff;
    text-decoration: none;
    transition: background-color 0.3s ease;

  }
`

const NavItem = styled.div`
  margin-right: 30px;
  position: absolute;
  right: 0%;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover,
    &:focus {
      color: #3572b0;
    }
  }

  /* Show dropdown when hovering over nav item */
  &:hover ${Dropdown} {
    display: block;
  }
`

const Arrow = styled.span`
  margin-left: 5px;
  font-size: 0.8em;
`

const DropdownButton = () => {
  const userActions = useUserActions()
  return (
    <Nav>
      <NavItem>
        <a href="#">
          Account <Arrow>&#x25BC;</Arrow>
        </a>
        <Dropdown>
          <a href="#">Account Settings</a>
          <a onClick={userActions.logout} style={{ cursor: "pointer" }}>Logout</a>
        </Dropdown>
      </NavItem>
    </Nav>
  )
}

export default DropdownButton
