import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileAppShowcase from "@/components/MobileAppShowcase";

describe("MobileAppShowcase", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without crashing", () => {
    render(<MobileAppShowcase />);
    expect(screen.getByText("Control From Anywhere")).toBeInTheDocument();
  });

  it("renders the section with correct id", () => {
    const { container } = render(<MobileAppShowcase />);
    const section = container.querySelector("#mobile-app");
    expect(section).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<MobileAppShowcase />);
    expect(
      screen.getByText(/The MASH mobile application puts your mushroom cultivation/)
    ).toBeInTheDocument();
  });

  it("renders App Features heading", () => {
    render(<MobileAppShowcase />);
    expect(screen.getByText("App Features")).toBeInTheDocument();
  });

  it("renders all four app screens as buttons", () => {
    render(<MobileAppShowcase />);
    const dashboardElements = screen.getAllByText("Dashboard");
    expect(dashboardElements.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("button", { name: /Smart Controls/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Alerts & Notifications/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Analytics & Reports/i })).toBeInTheDocument();
  });

  it("shows dashboard screen by default", () => {
    render(<MobileAppShowcase />);
    expect(
      screen.getByText("Real-time overview of all your growing chambers with live sensor data")
    ).toBeInTheDocument();
  });

  it("shows dashboard features by default", () => {
    render(<MobileAppShowcase />);
    expect(screen.getByText("Live temperature & humidity")).toBeInTheDocument();
    expect(screen.getByText("CO2 level monitoring")).toBeInTheDocument();
    expect(screen.getByText("Growth stage tracking")).toBeInTheDocument();
  });

  it("switches to controls screen when button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MobileAppShowcase />);

    await user.click(screen.getByRole("button", { name: /Smart Controls/i }));

    expect(screen.getByText("Temperature set points")).toBeInTheDocument();
    expect(screen.getByText("Humidity control")).toBeInTheDocument();
    expect(screen.getByText("Fan & misting schedules")).toBeInTheDocument();
  });

  it("switches to alerts screen when button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MobileAppShowcase />);

    await user.click(screen.getByRole("button", { name: /Alerts & Notifications/i }));

    expect(screen.getByText("Push notifications")).toBeInTheDocument();
    expect(screen.getByText("SMS alerts")).toBeInTheDocument();
    expect(screen.getByText("Email reports")).toBeInTheDocument();
  });

  it("switches to analytics screen when button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MobileAppShowcase />);

    await user.click(screen.getByRole("button", { name: /Analytics & Reports/i }));

    expect(screen.getByText("Growth charts")).toBeInTheDocument();
    expect(screen.getByText("Yield predictions")).toBeInTheDocument();
    expect(screen.getByText("Export to CSV")).toBeInTheDocument();
  });

  it("renders phone mockup elements", () => {
    render(<MobileAppShowcase />);
    expect(screen.getByText("9:41")).toBeInTheDocument();
    expect(screen.getByText("MASH App")).toBeInTheDocument();
  });

  it("renders bottom navigation tabs in phone mockup", () => {
    render(<MobileAppShowcase />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("highlights the active screen button", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MobileAppShowcase />);

    await user.click(screen.getByRole("button", { name: /Smart Controls/i }));

    await waitFor(() => {
      const updatedBtn = screen.getByRole("button", { name: /Smart Controls/i });
      expect(updatedBtn.className).toContain("bg-green-600");
    });
  });

  it("applies non-active styling to unselected buttons", () => {
    render(<MobileAppShowcase />);

    const controlsBtn = screen.getByRole("button", { name: /Smart Controls/i });
    expect(controlsBtn.className).toContain("bg-card");
  });

  it("renders the screen description for each screen", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MobileAppShowcase />);

    expect(
      screen.getByText("Real-time overview of all your growing chambers with live sensor data")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Smart Controls/i }));
    expect(
      screen.getByText("Adjust climate parameters and automation schedules from anywhere")
    ).toBeInTheDocument();
  });

  it("renders icons for each screen option", () => {
    render(<MobileAppShowcase />);
    const svgs = document.querySelectorAll("svg[aria-hidden='true']");
    expect(svgs.length).toBeGreaterThan(0);
  });

  // Auto-cycle tests
  it("auto-cycles to next screen after 5 seconds", () => {
    render(<MobileAppShowcase />);
    expect(screen.getByText("Live temperature & humidity")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Temperature set points")).toBeInTheDocument();
  });

  // Dot indicator tests
  it("renders dot indicators for each screen", () => {
    render(<MobileAppShowcase />);
    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(4);
  });

  it("marks the active screen dot", () => {
    render(<MobileAppShowcase />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  });
});
