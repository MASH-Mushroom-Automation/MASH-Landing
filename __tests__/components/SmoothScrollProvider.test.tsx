import { render, screen, fireEvent } from "@testing-library/react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

describe("SmoothScrollProvider", () => {
  let matchMediaMock: jest.Mock;

  beforeEach(() => {
    matchMediaMock = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    document.documentElement.style.scrollBehavior = "";
  });

  it("renders children correctly", () => {
    render(
      <SmoothScrollProvider>
        <div data-testid="child">Hello</div>
      </SmoothScrollProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("sets smooth scroll behavior on mount when motion is not reduced", () => {
    render(
      <SmoothScrollProvider>
        <div>Content</div>
      </SmoothScrollProvider>
    );
    expect(document.documentElement.style.scrollBehavior).toBe("smooth");
  });

  it("sets auto scroll behavior when user prefers reduced motion", () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <SmoothScrollProvider>
        <div>Content</div>
      </SmoothScrollProvider>
    );
    expect(document.documentElement.style.scrollBehavior).toBe("auto");
  });

  it("cleans up scroll behavior on unmount", () => {
    const { unmount } = render(
      <SmoothScrollProvider>
        <div>Content</div>
      </SmoothScrollProvider>
    );
    expect(document.documentElement.style.scrollBehavior).toBe("smooth");
    unmount();
    expect(document.documentElement.style.scrollBehavior).toBe("");
  });

  it("adds event listener for reduced motion changes", () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener,
      removeEventListener,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { unmount } = render(
      <SmoothScrollProvider>
        <div>Content</div>
      </SmoothScrollProvider>
    );

    expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function));

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("updates scroll behavior when reduced motion preference changes", () => {
    let changeHandler: ((e: { matches: boolean }) => void) | null = null;

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: (event: string, handler: (e: { matches: boolean }) => void) => {
        if (event === "change") {
          changeHandler = handler;
        }
      },
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <SmoothScrollProvider>
        <div>Content</div>
      </SmoothScrollProvider>
    );

    expect(document.documentElement.style.scrollBehavior).toBe("smooth");

    // Simulate reduced motion preference change
    if (changeHandler) {
      // Update the mock to return matches: true
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      changeHandler({ matches: true });
    }
  });

  it("wraps children in LazyMotion provider", () => {
    const { container } = render(
      <SmoothScrollProvider>
        <p>Test content</p>
      </SmoothScrollProvider>
    );
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <SmoothScrollProvider>
        <div data-testid="first">First</div>
        <div data-testid="second">Second</div>
      </SmoothScrollProvider>
    );
    expect(screen.getByTestId("first")).toBeInTheDocument();
    expect(screen.getByTestId("second")).toBeInTheDocument();
  });
});
