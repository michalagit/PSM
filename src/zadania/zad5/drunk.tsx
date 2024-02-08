import React from "react";
import { Box, Button, TextField } from "@mui/material";

import { useDrunk, WIDTH, HEIGHT } from "./use-drunk";

export const Drunk = () => {
  const {
    canvasRef,
    handleStartStop,
    handleReset,
    isRunning,
    setStepsNumber,
    route,
  } = useDrunk();

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Button onClick={handleStartStop}>
          {isRunning ? "STOP" : "START"}
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </Box>
      <TextField
        id="outlined-basic"
        label="Liczba kroków"
        variant="outlined"
        type="number"
        onChange={(event) => setStepsNumber(parseInt(event.target.value, 10))}
      />
      <Box display="flex" justifyContent="center">
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
      </Box>
      <h3>Position y: {route}</h3>
    </Box>
  );
};
