import React from "react";
import { Box, Button } from "@mui/material";

import { useCrash, WIDTH, HEIGHT } from "./use-crash";

export const Crash = () => {
  const { canvasRef, handleStartStop, handleReset, isRunning } = useCrash();

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
