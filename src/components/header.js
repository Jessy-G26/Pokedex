import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../header.css";
import styled from "styled-components";

const NavList = styled.a`
  text-decoration: none;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 1rem;
  position: relative;
  font-weight: bold;

  &:hover,
  &:focus {
    color: yellow;
  }
`;

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavList>
            <StyledLink to="/">Pokedex</StyledLink>
          </NavList>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
