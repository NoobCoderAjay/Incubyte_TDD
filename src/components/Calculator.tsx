import { useState } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleClick = (value: string) => {
    if (value === "C") {
      setDisplay("0");
      setPrevValue(null);
      setOperator(null);
      setNewNumber(true);
    } else if (value === "=") {
      if (prevValue !== null && operator !== null) {
        const currentValue = Number(display);
        const result = performOperation(prevValue!, currentValue, operator);
        setDisplay(result.toString());
        setPrevValue(result.toString());
        setOperator(null);
        setNewNumber(true);
      }
    } else if (["+", "-", "×"].includes(value)) {
      if (prevValue === null) {
        setPrevValue(display);
      } else if (!newNumber) {
        const currentValue = Number(display);
        const result = performOperation(prevValue, currentValue, operator!);
        setDisplay(result.toString());
        setPrevValue(result.toString());
      }
      setOperator(value);
      setNewNumber(true);
    } else {
      if (newNumber) {
        setDisplay(value);
        setNewNumber(false);
      } else {
        setDisplay((prev) => (prev === "0" ? value : prev + value));
      }
    }
  };

  const performOperation = (a: string, b: number, operator: string) => {
    const numA = Number(a);
    switch (operator) {
      case "+":
        return numA + b;
      case "-":
        return numA - b;
      case "×":
        return numA * b;
      default:
        return b;
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator" data-testid="calculator">
        <div className="display" data-testid="display">
          {display}
        </div>
        <div className="keypad">
          <div className="numbers">
            {Array.from({ length: 10 }).map((_, index) => (
              <button
                key={index}
                name={index.toString()}
                className="btn number-btn"
                onClick={() => handleClick(index.toString())}
              >
                {index}
              </button>
            ))}
          </div>
          <div className="operators">
            {["+", "-", "×"].map((op) => (
              <button
                key={op}
                name={op}
                className={`btn operator-btn ${
                  operator === op ? "active" : ""
                }`}
                onClick={() => handleClick(op)}
              >
                {op}
              </button>
            ))}
            <button
              name="="
              className="btn equals-btn"
              onClick={() => handleClick("=")}
            >
              =
            </button>
            <button
              name="C"
              className="btn clear-btn"
              onClick={() => handleClick("C")}
            >
              C
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
