import React, { useState } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { logoutUserMutation } from "../../api";
import { useQuery, useMutation, useApolloClient } from "react-apollo-hooks";
import { authQuery } from "../../store/Auth/queries";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export const MainMenu = () => {
  const client = useApolloClient();

  const {
    loading,
    error,
    data: { auth }
  } = useQuery(authQuery);

  const logout = () => {
    useMutation(logoutUserMutation);
    client.resetStore();
  };

  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <NavLink to="/">
          <Icon type="mail" />
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item key="app" disabled>
        <NavLink to="/about">
          <Icon type="appstore" />
          About
        </NavLink>
      </Menu.Item>
      {!auth.id && (
        <Menu.Item>
          <NavLink to="/login">Log In</NavLink>
        </Menu.Item>
      )}
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            Navigation Three - Submenu
          </span>
        }
      >
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      {auth.id && (
        <Menu.Item>
          <NavLink onClick={logout} to="/">
            Log Out
          </NavLink>
        </Menu.Item>
      )}
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  );
};
