import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("renders calculator component", () => {
    render(<App />);
    expect(screen.getByTestId("calculator")).toBeInTheDocument();
  });
});
