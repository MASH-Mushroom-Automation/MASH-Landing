import { render, screen } from "@testing-library/react";
import ScrollReveal from "@/components/ui/scroll-reveal";

describe("ScrollReveal", () => {
  it("renders children correctly", () => {
    render(
      <ScrollReveal>
        <div data-testid="child">Revealed Content</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Revealed Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ScrollReveal className="my-custom-class">
        <div>Content</div>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("my-custom-class");
  });

  it("renders with default direction (up)", () => {
    render(
      <ScrollReveal>
        <div data-testid="default-dir">Default direction</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("default-dir")).toBeInTheDocument();
  });

  it("renders with direction=down", () => {
    render(
      <ScrollReveal direction="down">
        <div data-testid="down-dir">Down</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("down-dir")).toBeInTheDocument();
  });

  it("renders with direction=left", () => {
    render(
      <ScrollReveal direction="left">
        <div data-testid="left-dir">Left</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("left-dir")).toBeInTheDocument();
  });

  it("renders with direction=right", () => {
    render(
      <ScrollReveal direction="right">
        <div data-testid="right-dir">Right</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("right-dir")).toBeInTheDocument();
  });

  it("accepts delay prop", () => {
    render(
      <ScrollReveal delay={0.5}>
        <div data-testid="delayed">Delayed content</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("delayed")).toBeInTheDocument();
  });

  it("accepts duration prop", () => {
    render(
      <ScrollReveal duration={1.2}>
        <div data-testid="slow">Slow animation</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("slow")).toBeInTheDocument();
  });

  it("renders with all props combined", () => {
    render(
      <ScrollReveal direction="left" delay={0.2} duration={0.8} className="test">
        <div data-testid="combined">All props</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId("combined")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <ScrollReveal>
        <h3>Title</h3>
        <p>Description</p>
      </ScrollReveal>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("uses default empty className when not provided", () => {
    const { container } = render(
      <ScrollReveal>
        <div>Content</div>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeDefined();
  });
});
