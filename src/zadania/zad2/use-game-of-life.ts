import { useRef, useState, useEffect } from "react";
export const CELL_SIZE = 10; // Size of the cell in pixels
export const WIDTH = 800;
export const HEIGHT = 600;

export const useGameOfLife = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);

  const createEmptyGrid = () => {
    const cols = WIDTH / CELL_SIZE;
    const rows = HEIGHT / CELL_SIZE;
    const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(0));
    return grid;
  };

  const [grid, setGrid] = useState(createEmptyGrid());

  const initializeGrid = () => {
    const newGrid = grid.map((row) =>
      row.map(() => (Math.random() > 0.7 ? 1 : 0))
    );
    setGrid(newGrid);
  };

  const drawGrid = (ctx, grid) => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        ctx.beginPath();
        ctx.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fill();
        ctx.stroke();
      });
    });
  };

  const updateGame = () => {
    // Game logic to update the grid based on Conway's rules
    const newGrid = grid.map((row, y) =>
      row.map((cell, x) => {
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const x_check = x + i;
            const y_check = y + j;
            if (
              x_check >= 0 &&
              x_check < WIDTH / CELL_SIZE &&
              y_check >= 0 &&
              y_check < HEIGHT / CELL_SIZE
            ) {
              neighbors += grid[y_check][x_check];
            }
          }
        }
        if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
        if (cell === 0 && neighbors === 3) return 1;
        return cell;
      })
    );

    setGrid(newGrid);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      drawGrid(ctx, newGrid);
    }
  };

  const updateGameLoop = () => {
    setTimeout(() => {
      updateGame();
      requestRef.current = requestAnimationFrame(updateGameLoop);
    }, speed);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    initializeGrid();
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      drawGrid(ctx, grid);
    }
  }, [grid]);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateGameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, grid, speed]);

  return {
    canvasRef,
    handleStartStop,
    handleReset,
    isRunning,
  };
};
