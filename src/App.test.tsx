import { fireEvent, render, screen } from "@testing-library/react";
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
      expect(button).toHaveClass("number-btn");
    }

    const operators = ["+", "-", "×"];
    operators.forEach((op) => {
      const button = screen.getByRole("button", { name: op });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("operator-btn");
    });

    expect(screen.getByRole("button", { name: "=" })).toHaveClass("equals-btn");
    expect(screen.getByRole("button", { name: "C" })).toHaveClass("clear-btn");

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
  it("performs multiplication correctly", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "4" }));
    userEvent.click(screen.getByRole("button", { name: "×" }));
    userEvent.click(screen.getByRole("button", { name: "3" }));
    userEvent.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByTestId("display")).toHaveTextContent("12");
  });
  it("handles consecutive operations", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "2" }));
    userEvent.click(screen.getByRole("button", { name: "+" }));
    userEvent.click(screen.getByRole("button", { name: "3" }));
    userEvent.click(screen.getByRole("button", { name: "=" }));

    userEvent.click(screen.getByRole("button", { name: "×" }));
    userEvent.click(screen.getByRole("button", { name: "2" }));
    userEvent.click(screen.getByRole("button", { name: "=" }));

    expect(screen.getByTestId("display")).toHaveTextContent("10");
  });
  it("clears the display when C button is clicked", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "5" }));
    userEvent.click(screen.getByRole("button", { name: "C" }));
    expect(screen.getByTestId("display")).toHaveTextContent("0");
  });
  it("maintains display value when operator is clicked", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "5" }));
    expect(screen.getByTestId("display")).toHaveTextContent("5");

    userEvent.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByTestId("display")).toHaveTextContent("5");

    userEvent.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByTestId("display")).toHaveTextContent("5");

    userEvent.click(screen.getByRole("button", { name: "×" }));
    expect(screen.getByTestId("display")).toHaveTextContent("5");
  });
  describe("Keyboard Input", () => {
    it("handles numeric keyboard input", () => {
      render(<App />);

      fireEvent.keyDown(document, { key: "2" });
      expect(screen.getByTestId("display")).toHaveTextContent("2");

      fireEvent.keyDown(document, { key: "5" });
      expect(screen.getByTestId("display")).toHaveTextContent("25");
    });

    it("handles operator keyboard input", () => {
      render(<App />);

      fireEvent.keyDown(document, { key: "5" });
      fireEvent.keyDown(document, { key: "+" });
      fireEvent.keyDown(document, { key: "3" });
      fireEvent.keyDown(document, { key: "Enter" });

      expect(screen.getByTestId("display")).toHaveTextContent("8");
    });

    it("handles multiplication using * key", () => {
      render(<App />);

      fireEvent.keyDown(document, { key: "4" });
      fireEvent.keyDown(document, { key: "*" });
      fireEvent.keyDown(document, { key: "3" });
      fireEvent.keyDown(document, { key: "Enter" });

      expect(screen.getByTestId("display")).toHaveTextContent("12");
    });

    it("handles clear using Escape key", () => {
      render(<App />);

      fireEvent.keyDown(document, { key: "5" });
      fireEvent.keyDown(document, { key: "Escape" });

      expect(screen.getByTestId("display")).toHaveTextContent("0");
    });

    it("handles multiple operations using keyboard", () => {
      render(<App />);

      fireEvent.keyDown(document, { key: "2" });
      fireEvent.keyDown(document, { key: "+" });
      fireEvent.keyDown(document, { key: "3" });
      fireEvent.keyDown(document, { key: "Enter" });
      fireEvent.keyDown(document, { key: "*" });
      fireEvent.keyDown(document, { key: "2" });
      fireEvent.keyDown(document, { key: "Enter" });

      expect(screen.getByTestId("display")).toHaveTextContent("10");
    });

    it("ignores non-numeric and non-operator keys", () => {
      render(<App />);

      fireEvent.keyDown(document, { key: "a" });
      fireEvent.keyDown(document, { key: "b" });
      fireEvent.keyDown(document, { key: "$" });

      expect(screen.getByTestId("display")).toHaveTextContent("0");
    });

    it("handles backspace key", () => {
      render(<App />);

      fireEvent.keyDown(document, { key: "1" });
      fireEvent.keyDown(document, { key: "2" });
      fireEvent.keyDown(document, { key: "3" });
      fireEvent.keyDown(document, { key: "Backspace" });

      expect(screen.getByTestId("display")).toHaveTextContent("12");
    });
  });
});
