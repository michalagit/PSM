import React from "react";
import { Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import "./main.css";

import { useMain } from "./use-main";

const StyledBox = styled(Box)`
  width: 100%;
  padding-bottom: 20px;
`;
const StyledButton = styled(Button)`
  background-color: #6ba46b;
  color: white;
  opcacity: 0.7;
  &:hover {
    background-color: #298829;
  }
`;

export const Main = () => {
  const { containerRef, onButtonClick } = useMain();

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" width="50%">
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={2}>
            <h3>f(x) = </h3>
          </Grid>
          <Grid item xs={10}>
            <StyledBox ref={containerRef} />
          </Grid>
        </Grid>
        <StyledButton fullWidth onClick={onButtonClick}>
          Calculate
        </StyledButton>
      </Box>
    </Box>
  );
};
