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
  };
};
