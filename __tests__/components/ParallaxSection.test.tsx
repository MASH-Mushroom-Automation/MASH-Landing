import { render, screen } from "@testing-library/react";
import ParallaxSection from "@/components/ui/parallax-section";

describe("ParallaxSection", () => {
  it("renders children correctly", () => {
    render(
      <ParallaxSection>
        <div data-testid="child">Parallax Content</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Parallax Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ParallaxSection className="custom-class">
        <div>Content</div>
      </ParallaxSection>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with section id for anchor navigation", () => {
    const { container } = render(
      <ParallaxSection id="test-section">
        <div>Content</div>
      </ParallaxSection>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute("id", "test-section");
  });

  it("renders without id when not provided", () => {
    const { container } = render(
      <ParallaxSection>
        <div>Content</div>
      </ParallaxSection>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).not.toHaveAttribute("id");
  });

  it("uses default speed when not specified", () => {
    render(
      <ParallaxSection>
        <div data-testid="content">Content</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("accepts custom speed prop", () => {
    render(
      <ParallaxSection speed={0.5}>
        <div data-testid="fast-parallax">Fast parallax</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("fast-parallax")).toBeInTheDocument();
  });

  it("accepts negative speed for foreground effect", () => {
    render(
      <ParallaxSection speed={-0.3}>
        <div data-testid="foreground">Foreground</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("foreground")).toBeInTheDocument();
  });

  it("applies will-change style for GPU acceleration", () => {
    const { container } = render(
      <ParallaxSection>
        <div>Content</div>
      </ParallaxSection>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.willChange).toBe("transform, opacity");
  });

  it("renders with fadeOnScroll prop", () => {
    render(
      <ParallaxSection fadeOnScroll>
        <div data-testid="fading">Fading content</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("fading")).toBeInTheDocument();
  });

  it("renders with scaleOnScroll prop", () => {
    render(
      <ParallaxSection scaleOnScroll>
        <div data-testid="scaling">Scaling content</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("scaling")).toBeInTheDocument();
  });

  it("renders with both fadeOnScroll and scaleOnScroll", () => {
    render(
      <ParallaxSection fadeOnScroll scaleOnScroll speed={0.2}>
        <div data-testid="combined">Combined effects</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("combined")).toBeInTheDocument();
  });

  it("accepts custom offset prop", () => {
    render(
      <ParallaxSection offset={["start center", "end center"]}>
        <div data-testid="offset">Custom offset</div>
      </ParallaxSection>
    );
    expect(screen.getByTestId("offset")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <ParallaxSection>
        <h2>Title</h2>
        <p>Paragraph</p>
        <button>Button</button>
      </ParallaxSection>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
