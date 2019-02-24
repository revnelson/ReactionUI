import React from "react";
import styled from "styled-components";
import { appConfig } from "../config";
import { NavLink } from "react-router-dom";
import { Mutation } from "react-apollo";
import { loginUserMutation, logoutUserMutation } from "../api";
import { mutations, withAuthStore } from "../store/Auth";

const HeaderEl = styled.header`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  max-width: 90vw;
  margin: 0 auto;
  padding: 1em 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.h1`
  font-size: var(--step-up-1);
`;

const Menu = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50vw;
`;

const MenuLink = styled.li`
  margin-left: 2em;
  text-decoration: none;
`;

const HeaderShell = ({ auth }) => (
  <HeaderEl>
    <Brand>{appConfig.siteName}</Brand>
    <Menu>
      <MenuLink>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
      </MenuLink>
      <MenuLink>
        <NavLink to="/about" exact activeClassName="active">
          About
        </NavLink>
      </MenuLink>
      {!auth.id && (
        <MenuLink>
          <Mutation mutation={loginUserMutation}>
            {(loginUser, { client, loading }) => {
              return (
                <NavLink
                  onClick={e => {
                    loginUser({
                      variables: { username: "michael", password: "nelson" }
                    })
                      .then(({ data }) => {
                        const { user } = data.loginUser;
                        console.log(user);
                        client.mutate({
                          mutation: mutations.setUserMutation,
                          variables: { user }
                        });
                      })
                      .catch(e => console.log(e));
                  }}
                  to=""
                >
                  {loading ? "Logging in..." : "Log In"}
                </NavLink>
              );
            }}
          </Mutation>
        </MenuLink>
      )}
      {auth.id && (
        <MenuLink>
          <Mutation mutation={logoutUserMutation}>
            {(logoutUser, { client }) => {
              return (
                <NavLink
                  onClick={e => {
                    logoutUser();
                    client.mutate({ mutation: mutations.clearUserMutation });
                    client.resetStore();
                  }}
                  to=""
                >
                  Log Out
                </NavLink>
              );
            }}
          </Mutation>
        </MenuLink>
      )}
    </Menu>
  </HeaderEl>
);

export const Header = withAuthStore(HeaderShell);
