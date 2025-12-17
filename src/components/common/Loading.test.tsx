import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loading from "./Loading";

describe("Loading component", () => {
  // TEST 1: kiểm tra xem có hiện lên không
  it("should render the circular progress", () => {
    render(<Loading />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  //TEST 2: Kiểm tra Props(Height)
  it("should apply custom height to the container", () => {
    render(<Loading height={"100px"} data-testid="Loading-container" />);
    const container = screen.getByTestId("Loading-container");
    expect(container).toHaveStyle({ height: "100px" });
  });

  //TEST 3: Kiểm tra Props(size)
  it("shoult apply custom size to the container", () => {
    render(<Loading size={60} />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveStyle({ size: "60px", height: "60px" });
  });
});
