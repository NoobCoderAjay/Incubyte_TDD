import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders calculator component", () => {
    render(<App />);
    expect(screen.getByTestId("calculator")).toBeInTheDocument();
  });
  it("renders calculator with numeric buttons and operators", () => {
    render(<App />);

    for (let i = 0; i <= 9; i++) {
      const button = screen.getByRole("button", { name: i.toString() });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("number-button");
    }

    const operators = ["+", "-", "×"];
    operators.forEach((op) => {
      const button = screen.getByRole("button", { name: op });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("operator-button");
    });

    expect(screen.getByRole("button", { name: "=" })).toHaveClass(
      "equals-button"
    );
    expect(screen.getByRole("button", { name: "C" })).toHaveClass(
      "clear-button"
    );

    expect(screen.getByTestId("display")).toHaveTextContent("0");
  });
  it("performs addition correctly", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "2" }));
    userEvent.click(screen.getByRole("button", { name: "+" }));
    userEvent.click(screen.getByRole("button", { name: "3" }));
    userEvent.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByTestId("display")).toHaveTextContent("5");
  });
  it("performs subtraction correctly", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "5" }));
    userEvent.click(screen.getByRole("button", { name: "-" }));
    userEvent.click(screen.getByRole("button", { name: "3" }));
    userEvent.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByTestId("display")).toHaveTextContent("2");
  });
});
