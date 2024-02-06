import { useRef, useState, useEffect } from "react";
export const CELL_SIZE = 10; // Size of the cell in pixels
export const WIDTH = 800;
export const HEIGHT = 600;

export const usePendulum = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);

  // Pendulum properties
  let length = 200; // Length of the pendulum
  let angle = Math.PI / 4; // Initial angle from the vertical
  let aVel = 0; // Angular velocity
  let aAcc = 0; // Angular acceleration
  const gravity = 0.98 / length; // Adjust gravity effect

  const drawPendulum = () => {
    // Pivot point
    const pivotX = canvasRef.current ? canvasRef.current.width / 2 : 0;
    const pivotY = 150;

    const posX = pivotX + length * Math.sin(angle);
    const posY = pivotY + length * Math.cos(angle);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(posX, posY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(posX, posY, 20, 0, Math.PI * 2); // Pendulum bob
        ctx.fill();
      }
    }
  };

  const updatePendulumPosition = () => {
    drawPendulum();
    aAcc = -gravity * Math.sin(angle); // Calculate acceleration (simple pendulum motion equation)
    angle += aVel; // Update angle
    aVel += aAcc; // Update velocity
    // aVel *= 0.99; // Damping effect
  };

  const movePendulum = () => {
    setTimeout(() => {
      console.log(requestRef.current);
      updatePendulumPosition();
      requestRef.current = requestAnimationFrame(movePendulum);
    }, speed);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    cancelAnimationFrame(requestRef.current);
  };

  const handleReset = () => {
    debugger;
    cancelAnimationFrame(requestRef.current);
    setIsRunning(false);

    drawPendulum();
  };

  useEffect(() => {
    if (canvasRef.current) drawPendulum();
  }, [canvasRef.current]);

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(movePendulum);
    } else cancelAnimationFrame(requestRef.current);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);

  return {
    canvasRef,
    handleStartStop,
    handleReset,
    isRunning,
  };
};
