import React from "react";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: #8d88ea;
  color: #fff;
  padding: 0 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333333;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
`;

const NavItem = styled.div`
  margin-right: 10px;
  position: absolute;
  right: 0%;
  margin-right: 30px;

  &:hover ${Dropdown} {
    display: block;
  }
`;

const Arrow = styled.span`
  margin-left: 5px;
  font-size: 0.8em;
`;

const DropdownButton = () => {
  return (
    <Nav>
      <NavItem>
        <span>
          Dropdown <Arrow>&#x25BC;</Arrow>
        </span>
        <Dropdown>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </Dropdown>
      </NavItem>
    </Nav>
  );
};

export default DropdownButton;