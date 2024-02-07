import { useRef, useState, useEffect } from "react";
export const CELL_SIZE = 10; // Size of the cell in pixels
export const WIDTH = 800;
export const HEIGHT = 600;

export const useCrash = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [velocities, setFinalVelocities] = useState<number[]>([]);

  const point1 = { mass: 6, velocity: 5, position: 100, color: "red" };
  const point2 = { mass: 3, velocity: -4, position: 500, color: "blue" };

  const calculateCrash = (m1, v1, m2, v2) => {
    const finalVelocity1 =
      ((m1 - m2) / (m1 + m2)) * v1 + ((2 * m2) / (m1 + m2)) * v2;
    const finalVelocity2 =
      ((2 * m1) / (m1 + m2)) * v1 + ((m2 - m1) / (m1 + m2)) * v2;
    return [finalVelocity1, finalVelocity2];
  };
  const drawPoint = (point) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(point.position, canvas.height / 2, 10, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
      }
    }
  };

  const movement = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.abs(point1.position - point2.position) > 30) {
          point1.position += point1.velocity;
          point2.position += point2.velocity;
        } else {
          // Zastosowanie prędkości końcowych po zderzeniu, jeśli punkty są blisko siebie
          point1.velocity = velocities[0];
          point2.velocity = velocities[1];
          point1.position += point1.velocity;
          point2.position += point2.velocity;
        }
      }
    }
    drawPoint(point1);
    drawPoint(point2);
    requestRef.current = requestAnimationFrame(movement);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    cancelAnimationFrame(requestRef.current);
  };

  const handleReset = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    drawPoint(point1);
    drawPoint(point2);
  };

  useEffect(() => {
    const [finalVelocity1, finalVelocity2] = calculateCrash(
      point1.mass,
      point1.velocity,
      point2.mass,
      point2.velocity
    );
    console.log([finalVelocity1, finalVelocity2]);
    setFinalVelocities([finalVelocity1, finalVelocity2]);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      drawPoint(point1);
      drawPoint(point2);
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (isRunning) {
      movement();
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
