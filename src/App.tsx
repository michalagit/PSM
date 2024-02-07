import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Main } from "./zadania/zad1";
import { GameOfLife } from "./zadania/zad2";
import { Pendulum } from "./zadania/zad3";
import { Crash } from "./zadania/zad4";

import "https://unpkg.com/@cortex-js/compute-engine?module";

import "./App.css";

const StyledLink = styled(Link)`
  color: white;
  opcacity: 0.7;

  margin-right: 20px;
  text-decoration: none;
`;

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">Bisekcja</StyledLink>
            <StyledLink to="/game">Gra</StyledLink>
            <StyledLink to="/pendulum">Pendulum</StyledLink>
            <StyledLink to="/crash">Crash</StyledLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ backgroundColor: "#000" }}>
        <Container className="main" maxWidth="md">
          <Box sx={{ backgroundColor: "#dcdcdc" }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/game" element={<GameOfLife />} />
              <Route path="/pendulum" element={<Pendulum />} />
              <Route path="/crash" element={<Crash />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
