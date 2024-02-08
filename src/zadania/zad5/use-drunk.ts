import { useRef, useState, useEffect } from "react";
export const CELL_SIZE = 10; // Size of the cell in pixels
export const WIDTH = 800;
export const HEIGHT = 600;

export const useDrunk = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [stepsNumber, setStepsNumber] = useState(100);
  const [stepsDone, setStepsDone] = useState(0);

  const pointRef = useRef({
    x: 100,
    y: 290,
  });

  const stepLength = 5;

  const steps = [
    {
      name: "left",
      probability: 0.2,
    },
    {
      name: "right",
      probability: 0.8,
    },
  ];

  const drawPoint = (point) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    }
  };

  const pickRandomByProbability = (items) => {
    let total = 0;
    const cumulativeProbabilities = items.map((item) => {
      total += item.probability;
      return total;
    });
    const random = Math.random() * total;

    for (let i = 0; i < items.length; i++) {
      debugger;
      if (random <= cumulativeProbabilities[i]) {
        return items[i].name;
      }
    }
    return null; // na wypadek, gdyby coś poszło nie tak
  };
  let numberOfSteps = 0;
  const movement = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (numberOfSteps <= stepsNumber) {
          setStepsDone((steps) => (steps += 1));
          const step = pickRandomByProbability(steps);
          pointRef.current.x += 5;
          pointRef.current.y += step === "left" ? -stepLength : stepLength;
          numberOfSteps += 1;
        } else {
          cancelAnimationFrame(requestRef.current);
        }
      }
    }
    drawPoint(pointRef.current);
    requestRef.current = requestAnimationFrame(movement);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    pointRef.current = {
      x: 100,
      y: 290,
    };
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPoint(pointRef.current);
      }
    }
  };

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
    route: 290 - pointRef.current.y,
    setStepsNumber,
  };
};
