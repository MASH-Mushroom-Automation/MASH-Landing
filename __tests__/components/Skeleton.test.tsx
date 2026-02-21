import React from "react";
import { render } from "@testing-library/react";
import Skeleton from "@/components/ui/skeleton";

describe("Skeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies animate-pulse class", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("applies rounded-md by default", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("rounded-md");
  });

  it("applies rounded-full when rounded prop is true", () => {
    const { container } = render(<Skeleton rounded />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });

  it("sets aria-hidden to true", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies custom width and height via style", () => {
    const { container } = render(<Skeleton width="100px" height="50px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("100px");
    expect(el.style.height).toBe("50px");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="my-custom-class" />);
    expect(container.firstChild).toHaveClass("my-custom-class");
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("passes additional HTML attributes", () => {
    const { container } = render(<Skeleton data-testid="skel" id="my-skel" />);
    expect(container.firstChild).toHaveAttribute("data-testid", "skel");
    expect(container.firstChild).toHaveAttribute("id", "my-skel");
  });

  it("merges custom style with width/height", () => {
    const { container } = render(
      <Skeleton width="80px" height="40px" style={{ opacity: 0.5 }} />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("80px");
    expect(el.style.height).toBe("40px");
    expect(el.style.opacity).toBe("0.5");
  });
});
