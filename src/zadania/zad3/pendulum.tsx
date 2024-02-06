import React from "react";
import { Box, Button } from "@mui/material";

import { usePendulum, WIDTH, HEIGHT } from "./use-pendulum";

export const Pendulum = () => {
  const { canvasRef, handleStartStop, handleReset, isRunning } = usePendulum();

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
