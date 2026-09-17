import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

jest.mock("@/components/Footer", () => () => <footer data-testid="footer">Footer</footer>);

describe("NotFound Page", () => {
  it("renders without crashing", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the Page Not Found heading", () => {
    render(<NotFound />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders explanation text", () => {
    render(<NotFound />);
    expect(
      screen.getByText(/The page you are looking for does not exist/)
    ).toBeInTheDocument();
  });

  it("renders a link back to homepage", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /Back to Homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("uses PageLayout wrapper", () => {
    const { container } = render(<NotFound />);
    const main = container.querySelector("#main-content");
    expect(main).toBeInTheDocument();
  });

  it("renders footer via PageLayout", () => {
    render(<NotFound />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
