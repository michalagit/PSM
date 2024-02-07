import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { MathfieldElement } from "mathlive";
//@ts-ignore
import numeric from "numeric";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
      math: React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

export const useMain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const mfe = useMemo(() => new MathfieldElement(), []);
  const [equation, setEquation] = useState("");
  const [bisectionRoot, setBisectionRoot] = useState("");
  const [falsiRoot, setFalsiRoot] = useState("");
  const [secantRoot, setSecantRoot] = useState("");

  const a = -200; // Start of interval
  const b = 300; // End of interval
  const tol = 0.001; // Tolerance
  const maxIterations = 150000; // Maximum number of iterations

  const bisection = (f, a, b, tol, maxIterations) => {
    if (f(a) * f(b) >= 0) {
      console.log("You have not assumed right a and b");
      setBisectionRoot(`X`);

      return;
    }
    let c = a;
    for (let i = 0; i < maxIterations; i++) {
      // Find middle point
      c = (a + b) / 2;

      // Check if middle point is root
      if (f(c) === 0.0 || (b - a) / 2 < tol) {
        console.log(`Found root at x = ${c}, after ${i + 1} iterations`);
        setBisectionRoot(`= ${c}`);
        return c;
      }

      // Decide the side to repeat the steps
      if (f(c) * f(a) < 0) {
        b = c;
      } else {
        a = c;
      }
    }
    console.log(`Reached maximum iterations. Approximate root at x = ${c}`);
    setBisectionRoot(`~ ${c}`);

    return c;
  };
  const regulaFalsi = (f, a, b, tol, maxIterations) => {
    if (f(a) * f(b) >= 0) {
      console.log("You have not assumed right a and b");
      setFalsiRoot(`X`);

      return;
    }

    let c = a; // Initial approximation of the root
    for (let i = 0; i < maxIterations; i++) {
      // Linear interpolation
      c = (a * f(b) - b * f(a)) / (f(b) - f(a));

      // Check if the approximation is close enough to the root
      if (Math.abs(f(c)) <= tol) {
        console.log(`Found root at x = ${c}, after ${i + 1} iterations`);
        setFalsiRoot(`= ${c}`);

        return c;
      }

      // Update the interval for the next iteration
      if (f(c) * f(a) < 0) {
        b = c;
      } else {
        a = c;
      }
    }

    console.log(`Reached maximum iterations. Approximate root at x = ${c}`);
    setFalsiRoot(`~ ${c}`);

    return c;
  };

  const secantMethod = (f, a, b, tol, maxIterations) => {
    let c;
    for (let i = 0; i < maxIterations; i++) {
      // Obliczenie kolejnego przybliżenia korzenia
      c = a - (f(a) * (b - a)) / (f(b) - f(a));

      // Sprawdzenie, czy osiągnięto pożądaną dokładność
      if (Math.abs(f(c)) < tol) {
        console.log(`Found root at c = ${c} after ${i + 1} iterations`);
        setSecantRoot(`= ${c}`);
        return c;
      }

      // Aktualizacja wartości dla kolejnej iteracji
      a = b;
      b = c;
    }

    console.log(`Reached maximum iterations. Last approximation at x = ${c}`);
    setSecantRoot(`~ ${c}`);

    return c;
  };

  // Example usage:
  // Define the function for which we're finding the root
  const f = (x) => {
    return x * x * x - x * x + 2; // Example function: x^3 - x^2 + 2
  };

  const callBisectionMethod = () => {
    bisection(f, a, b, tol, maxIterations);
  };
  const callFalsiMethod = () => {
    regulaFalsi(f, a, b, tol, maxIterations);
  };
  const callSecantMethod = () => {
    secantMethod(f, a, b, tol, maxIterations);
  };

  useEffect(() => {
    const container = containerRef?.current;

    if (container) {
      container.innerHTML = "";
      mfe.classList.add("equation-field");
      container.appendChild(mfe);

      mfe.addEventListener("input", ({ target }) => {
        const value = (target as HTMLInputElement).value || "";
        setEquation(value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findFunctionZeros = useCallback(() => {
    const compiledEquation = mfe.expression.compile();
    console.log(compiledEquation);
    // console.log(mfe.expression.solve("x"));
    // const;
  }, []);

  return {
    containerRef,
    equation,
    setEquation,
    valueRef,
    onButtonClick: findFunctionZeros,
    callBisectionMethod,
    bisectionRoot,
    callFalsiMethod,
    falsiRoot,
    callSecantMethod,
    secantRoot,
  };
};
