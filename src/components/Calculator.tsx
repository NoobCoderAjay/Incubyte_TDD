import { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleClick = (value: string) => {
    if (value === "C") {
      setDisplay("0");
      setPrevValue(null);
      setOperator(null);
    } else if (value === "=") {
      if (prevValue !== null && operator !== null) {
        const currentValue = Number(display);
        const result = performOperation(prevValue, currentValue, operator);
        setDisplay(result.toString());
        setPrevValue(null);
        setOperator(null);
      }
    } else if (["+", "-", "×"].includes(value)) {
      if (prevValue === null) {
        setPrevValue(display);
      }
      setOperator(value);
      setDisplay("0");
    } else {
      setDisplay((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const performOperation = (a: string, b: number, operator: string) => {
    const numA = Number(a);
    switch (operator) {
      case "+":
        return numA + b;
      default:
        return b;
    }
  };

  return (
    <div data-testid="calculator">
      <div data-testid="display">{display}</div>
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            key={index}
            name={index.toString()}
            className="number-button"
            onClick={() => handleClick(index.toString())}
          >
            {index}
          </button>
        ))}

        {["+", "-", "×"].map((op) => (
          <button
            key={op}
            name={op}
            className="operator-button"
            onClick={() => handleClick(op)}
          >
            {op}
          </button>
        ))}

        <button
          name="="
          className="equals-button"
          onClick={() => handleClick("=")}
        >
          =
        </button>
        <button
          name="C"
          className="clear-button"
          onClick={() => handleClick("C")}
        >
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
