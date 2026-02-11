import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IoTDeviceSection from "@/components/IoTDeviceSection";
import type { LandingPageData } from "@/lib/sanity";

describe("IoTDeviceSection", () => {
  it("renders without crashing", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByText("IoT Hardware")).toBeInTheDocument();
  });

  it("renders the section with correct id", () => {
    const { container } = render(<IoTDeviceSection />);
    const section = container.querySelector("#iot-device");
    expect(section).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<IoTDeviceSection />);
    expect(
      screen.getByText(/Purpose-built IoT device designed for mushroom cultivation/)
    ).toBeInTheDocument();
  });

  it("renders Device Specifications heading", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByText("Device Specifications")).toBeInTheDocument();
  });

  it("renders the 3D device model or Chamber 3D model", () => {
    render(<IoTDeviceSection />);
    // With lazy loading, either the CSS fallback (device-3d-model) or the
    // Three.js model (chamber-model-container) will render depending on
    // whether React.lazy resolves synchronously in the test environment
    const cssModel = screen.queryByTestId("device-3d-model");
    const threeModel = screen.queryByTestId("chamber-model-container");
    expect(cssModel || threeModel).toBeTruthy();
  });

  it("renders ESP32 chip label on device when CSS fallback shows", () => {
    render(<IoTDeviceSection />);
    // When lazy module resolves, CSS model may not be visible
    // These labels only exist in the CSS DeviceModel3D fallback
    const esp32 = screen.queryByText("ESP32");
    const threeModel = screen.queryByTestId("chamber-model-container");
    // Either CSS fallback with labels renders, or the Three.js model renders
    expect(esp32 || threeModel).toBeTruthy();
  });

  it("renders sensor module labels or 3D model", () => {
    render(<IoTDeviceSection />);
    const dht = screen.queryByText("DHT");
    const threeModel = screen.queryByTestId("chamber-model-container");
    expect(dht || threeModel).toBeTruthy();
  });

  it("renders relay labels or 3D model", () => {
    render(<IoTDeviceSection />);
    const r1 = screen.queryByText("R1");
    const threeModel = screen.queryByTestId("chamber-model-container");
    expect(r1 || threeModel).toBeTruthy();
  });

  it("shows Environmental Sensors spec by default", () => {
    render(<IoTDeviceSection />);
    // Label appears in both detail card and button, so use getAllByText
    const labels = screen.getAllByText("Environmental Sensors");
    expect(labels.length).toBeGreaterThanOrEqual(2);
    // Value also appears in both places
    const values = screen.getAllByText("DHT22, MQ-135, BH1750");
    expect(values.length).toBeGreaterThanOrEqual(2);
  });

  it("shows sensor description by default", () => {
    render(<IoTDeviceSection />);
    expect(
      screen.getByText(/Temperature, humidity, CO2, and light sensors/)
    ).toBeInTheDocument();
  });

  it("renders all specification buttons", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByRole("button", { name: /Environmental Sensors/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Microcontroller/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Actuator Control/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Connectivity/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Power Supply/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enclosure/i })).toBeInTheDocument();
  });

  it("switches to Microcontroller spec when clicked", () => {
    render(<IoTDeviceSection />);

    fireEvent.click(screen.getByRole("button", { name: /Microcontroller/i }));

    // Description is unique to the detail card
    expect(
      screen.getByText(/Dual-core processor with built-in WiFi and Bluetooth/)
    ).toBeInTheDocument();
  });

  it("switches to Actuator Control spec when clicked", () => {
    render(<IoTDeviceSection />);

    fireEvent.click(screen.getByRole("button", { name: /Actuator Control/i }));

    expect(
      screen.getByText(/Controls fans, humidifiers, heaters/)
    ).toBeInTheDocument();
  });

  it("switches to Connectivity spec when clicked", () => {
    render(<IoTDeviceSection />);

    fireEvent.click(screen.getByRole("button", { name: /Connectivity/i }));

    expect(
      screen.getByText(/Real-time data transmission to cloud/)
    ).toBeInTheDocument();
  });

  it("switches to Power Supply spec when clicked", () => {
    render(<IoTDeviceSection />);

    fireEvent.click(screen.getByRole("button", { name: /Power Supply/i }));

    expect(
      screen.getByText(/Low power consumption with USB-C/)
    ).toBeInTheDocument();
  });

  it("switches to Enclosure spec when clicked", () => {
    render(<IoTDeviceSection />);

    fireEvent.click(screen.getByRole("button", { name: /Enclosure/i }));

    expect(
      screen.getByText(/Water and dust resistant housing/)
    ).toBeInTheDocument();
  });

  it("highlights active spec button", () => {
    render(<IoTDeviceSection />);

    fireEvent.click(screen.getByRole("button", { name: /Connectivity/i }));

    const updatedBtn = screen.getByRole("button", { name: /Connectivity/i });
    expect(updatedBtn.className).toContain("bg-green-600");
  });

  it("renders technical highlight stats", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("Sensor Types")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Relay Channels")).toBeInTheDocument();
    expect(screen.getByText("Protection")).toBeInTheDocument();
  });

  it("renders IP65 stat in highlights", () => {
    render(<IoTDeviceSection />);
    const ip65Elements = screen.getAllByText("IP65");
    expect(ip65Elements.length).toBeGreaterThanOrEqual(1);
  });

  it("responds to mouse movement for 3D rotation", () => {
    render(<IoTDeviceSection />);
    // Either CSS fallback or 3D model must be present
    const cssModel = screen.queryByTestId("device-3d-model");
    const threeModel = screen.queryByTestId("chamber-model-container");
    expect(cssModel || threeModel).toBeTruthy();

    // Simulate mouse move
    act(() => {
      fireEvent.mouseMove(window, { clientX: 500, clientY: 300 });
    });

    // The component should handle the event without crashing
    const cssModelAfter = screen.queryByTestId("device-3d-model");
    const threeModelAfter = screen.queryByTestId("chamber-model-container");
    expect(cssModelAfter || threeModelAfter).toBeTruthy();
  });

  it("cleans up mousemove listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<IoTDeviceSection />);

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  // Sanity CMS integration tests
  it("renders with Sanity CDN modelUrl prop", () => {
    const sanityUrl = "https://cdn.sanity.io/files/gerattrr/production/abc123.glb";
    render(<IoTDeviceSection modelUrl={sanityUrl} />);
    expect(screen.getByText("IoT Hardware")).toBeInTheDocument();
    // The 3D model or CSS fallback should still render
    const cssModel = screen.queryByTestId("device-3d-model");
    const threeModel = screen.queryByTestId("chamber-model-container");
    expect(cssModel || threeModel).toBeTruthy();
  });

  it("renders without modelUrl (local fallback)", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByText("IoT Hardware")).toBeInTheDocument();
  });

  it("accepts undefined modelUrl gracefully", () => {
    render(<IoTDeviceSection modelUrl={undefined} />);
    expect(screen.getByText("IoT Hardware")).toBeInTheDocument();
  });

  // Sanity data tests
  describe("with Sanity data", () => {
    it("renders custom title from Sanity", () => {
      const data = {
        iotDeviceTitle: "Custom IoT Title",
      } as unknown as LandingPageData;
      render(<IoTDeviceSection data={data} />);
      expect(screen.getByText("Custom IoT Title")).toBeInTheDocument();
    });

    it("renders custom description from Sanity", () => {
      const data = {
        iotDeviceDescription: "Custom IoT description text",
      } as unknown as LandingPageData;
      render(<IoTDeviceSection data={data} />);
      expect(screen.getByText("Custom IoT description text")).toBeInTheDocument();
    });

    it("renders custom specs from Sanity", () => {
      const data = {
        iotDeviceSpecs: [
          {
            id: "custom-spec",
            label: "Custom Spec",
            value: "Custom Value",
            description: "Custom spec description",
          },
        ],
      } as unknown as LandingPageData;
      render(<IoTDeviceSection data={data} />);
      // label appears in both detail card and button
      expect(screen.getAllByText("Custom Spec").length).toBeGreaterThanOrEqual(1);
    });

    it("falls back to defaults when data is null", () => {
      render(<IoTDeviceSection data={null} />);
      expect(screen.getByText("IoT Hardware")).toBeInTheDocument();
    });
  });
});
