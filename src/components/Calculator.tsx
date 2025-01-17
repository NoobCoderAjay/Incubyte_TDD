const CalculatorUI = () => {
  return (
    <div data-testid="calculator">
      <div data-testid="display">0</div>
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <button key={index} name={index.toString()} className="number-button">
            {index}
          </button>
        ))}

        {["+", "-", "×"].map((operator) => (
          <button key={operator} name={operator} className="operator-button">
            {operator}
          </button>
        ))}

        <button name="=" className="equals-button">
          =
        </button>
        <button name="C" className="clear-button">
          C
        </button>
      </div>
    </div>
  );
};

export default CalculatorUI;
