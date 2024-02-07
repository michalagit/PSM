import React from "react";
import { Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import "./main.css";

import { useMain } from "./use-main";

const StyledButton = styled(Button)`
  background-color: #6ba46b;
  color: white;
  opcacity: 0.7;
  &:hover {
    background-color: #298829;
  }
`;

export const Main = () => {
  const {
    bisectionRoot,
    callFalsiMethod,
    falsiRoot,
    callBisectionMethod,
    callSecantMethod,
    secantRoot,
  } = useMain();

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        textAlign="center"
      >
        <h3>f(x) = x^3 - x^2 + 2</h3>

        <Grid container gap={1} alignItems="baseline">
          <Grid item xs={4}>
            <StyledButton fullWidth onClick={callBisectionMethod}>
              Bisection
            </StyledButton>
          </Grid>
          <Grid item xs={6}>
            <span>{bisectionRoot}</span>
          </Grid>
        </Grid>
        <Grid container gap={1} alignItems="baseline">
          <Grid item xs={4}>
            <StyledButton fullWidth onClick={callFalsiMethod}>
              Falsi
            </StyledButton>
          </Grid>
          <Grid item xs={6}>
            <span>{falsiRoot}</span>
          </Grid>
        </Grid>
        <Grid container gap={1} alignItems="baseline">
          <Grid item xs={4}>
            <StyledButton fullWidth onClick={callSecantMethod}>
              Secant
            </StyledButton>
          </Grid>
          <Grid item xs={6}>
            <span>{secantRoot}</span>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
