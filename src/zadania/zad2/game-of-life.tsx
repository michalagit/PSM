import React from "react";
import { Box, Button } from "@mui/material";

import { useGameOfLife, WIDTH, HEIGHT } from "./use-game-of-life";

export const GameOfLife = () => {
  const { canvasRef, handleStartStop, handleReset, isRunning } =
    useGameOfLife();

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Button onClick={handleStartStop}>
          {isRunning ? "STOP" : "START"}
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
      </Box>
    </Box>
  );
};
