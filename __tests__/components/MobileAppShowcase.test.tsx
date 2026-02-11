import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileAppShowcase from "@/components/MobileAppShowcase";
import type { LandingPageData } from "@/lib/sanity";

jest.mock("@/lib/sanity", () => ({
  getSanityImageUrl: jest.fn((source: unknown) => source ? "https://cdn.sanity.io/images/test/production/test-image.png" : ""),
}));

const mockSanityData = {
  mobileAppTitle: "Custom Mobile Title",
  mobileAppSubtitle: "Custom mobile subtitle text",
  mobileAppScreens: [
    {
      id: "screen1",
      title: "Screen One",
      subtitle: "Screen one description",
      icon: "dashboard",
      color: "bg-green-600",
      features: ["Feature A", "Feature B"],
    },
    {
      id: "screen2",
      title: "Screen Two",
      subtitle: "Screen two description",
      icon: "controls",
      color: "bg-blue-600",
      features: ["Feature C"],
    },
  ],
} as unknown as LandingPageData;

const mockSanityDataWithScreenshots = {
  mobileAppTitle: "Screenshot Title",
  mobileAppSubtitle: "Screenshot subtitle",
  mobileAppScreens: [
    {
      id: "dash",
      title: "Dashboard",
      subtitle: "Dashboard desc",
      icon: "dashboard",
      color: "bg-green-600",
      features: ["Live data"],
      screenshot: { asset: { _ref: "image-abc123-560x1120-png", _type: "reference" } },
    },
    {
      id: "ctrl",
      title: "Controls",
      subtitle: "Controls desc",
      icon: "controls",
      color: "bg-blue-600",
      features: ["Fan control"],
    },
  ],
} as unknown as LandingPageData;

describe("MobileAppShowcase", () => {
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
    const user = userEvent.setup();
    render(<MobileAppShowcase />);

    await user.click(screen.getByRole("button", { name: /Smart Controls/i }));

    expect(screen.getByText("Temperature set points")).toBeInTheDocument();
    expect(screen.getByText("Humidity control")).toBeInTheDocument();
    expect(screen.getByText("Fan & misting schedules")).toBeInTheDocument();
  });

  it("switches to alerts screen when button is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileAppShowcase />);

    await user.click(screen.getByRole("button", { name: /Alerts & Notifications/i }));

    expect(screen.getByText("Push notifications")).toBeInTheDocument();
    expect(screen.getByText("SMS alerts")).toBeInTheDocument();
    expect(screen.getByText("Email reports")).toBeInTheDocument();
  });

  it("switches to analytics screen when button is clicked", async () => {
    const user = userEvent.setup();
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
    const user = userEvent.setup();
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
    const user = userEvent.setup();
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

  // Sanity data integration tests
  describe("with Sanity data", () => {
    it("renders custom title and subtitle from Sanity", () => {
      render(<MobileAppShowcase data={mockSanityData} />);
      expect(screen.getByText("Custom Mobile Title")).toBeInTheDocument();
      expect(screen.getByText("Custom mobile subtitle text")).toBeInTheDocument();
    });

    it("renders Sanity screens instead of defaults", () => {
      render(<MobileAppShowcase data={mockSanityData} />);
      expect(screen.getByRole("button", { name: /Screen One/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Screen Two/i })).toBeInTheDocument();
      // Default screens should NOT show
      expect(screen.queryByRole("button", { name: /Smart Controls/i })).not.toBeInTheDocument();
    });

    it("renders Sanity screen features", () => {
      render(<MobileAppShowcase data={mockSanityData} />);
      expect(screen.getByText("Feature A")).toBeInTheDocument();
      expect(screen.getByText("Feature B")).toBeInTheDocument();
    });

    it("switches between Sanity screens", async () => {
      const user = userEvent.setup();
      render(<MobileAppShowcase data={mockSanityData} />);

      await user.click(screen.getByRole("button", { name: /Screen Two/i }));

      await waitFor(() => {
        expect(screen.getByText("Feature C")).toBeInTheDocument();
      });
    });

    it("uses default screens when data is null", () => {
      render(<MobileAppShowcase data={null} />);
      expect(screen.getByText("Control From Anywhere")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Smart Controls/i })).toBeInTheDocument();
    });

    it("uses default screens when data has no mobileAppScreens", () => {
      const partialData = { heroTitle: "Test" } as unknown as LandingPageData;
      render(<MobileAppShowcase data={partialData} />);
      expect(screen.getByRole("button", { name: /Smart Controls/i })).toBeInTheDocument();
    });
  });

  // Screenshot rendering tests
  describe("with Sanity screenshots", () => {
    it("renders screenshot image when available", () => {
      render(<MobileAppShowcase data={mockSanityDataWithScreenshots} />);
      const img = screen.getByAltText("Dashboard screen");
      expect(img).toBeInTheDocument();
      expect(img.getAttribute("src")).toBeTruthy();
    });

    it("renders CSS mockup for screens without screenshots", async () => {
      const user = userEvent.setup();
      render(<MobileAppShowcase data={mockSanityDataWithScreenshots} />);

      // Switch to Controls which has no screenshot
      await user.click(screen.getByRole("button", { name: /Controls/i }));

      await waitFor(() => {
        // Should show CSS fallback elements
        expect(screen.getByText("Fan control")).toBeInTheDocument();
        expect(screen.getByText("MASH App")).toBeInTheDocument();
      });
    });

    it("falls back to CSS mockup icon when icon key is unknown", () => {
      const dataWithUnknownIcon = {
        mobileAppScreens: [
          {
            id: "custom",
            title: "Unknown Icon Screen",
            subtitle: "Unknown desc",
            icon: "nonexistent-icon",
            color: "bg-red-600",
            features: ["Test feature"],
          },
        ],
      } as unknown as LandingPageData;
      render(<MobileAppShowcase data={dataWithUnknownIcon} />);
      // Should render without crashing, using dashboard fallback icon
      expect(screen.getAllByText("Unknown Icon Screen").length).toBeGreaterThanOrEqual(1);
    });
  });
});
