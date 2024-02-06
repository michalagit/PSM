import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Main } from "./zadania/zad1";
import { GameOfLife } from "./zadania/zad2";
import { Pendulum } from "./zadania/zad3";

import "https://unpkg.com/@cortex-js/compute-engine?module";

import "./App.css";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Bisekcja</Link>
            <Link to="/game">Gra</Link>
            <Link to="/pendulum">Pendulum</Link>
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
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
