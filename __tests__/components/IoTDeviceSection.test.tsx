import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IoTDeviceSection from "@/components/IoTDeviceSection";

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

  it("renders the 3D device model", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByTestId("device-3d-model")).toBeInTheDocument();
  });

  it("renders ESP32 chip label on device", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByText("ESP32")).toBeInTheDocument();
  });

  it("renders sensor module labels on device", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByText("DHT")).toBeInTheDocument();
    expect(screen.getByText("MQ")).toBeInTheDocument();
  });

  it("renders relay labels on device", () => {
    render(<IoTDeviceSection />);
    expect(screen.getByText("R1")).toBeInTheDocument();
    expect(screen.getByText("R2")).toBeInTheDocument();
    expect(screen.getByText("R3")).toBeInTheDocument();
    expect(screen.getByText("R4")).toBeInTheDocument();
  });

  it("renders MASH label on device", () => {
    render(<IoTDeviceSection />);
    const mashLabels = screen.getAllByText("MASH");
    expect(mashLabels.length).toBeGreaterThanOrEqual(1);
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
    expect(screen.getByTestId("device-3d-model")).toBeInTheDocument();

    // Simulate mouse move
    act(() => {
      fireEvent.mouseMove(window, { clientX: 500, clientY: 300 });
    });

    // The component should handle the event without crashing
    expect(screen.getByTestId("device-3d-model")).toBeInTheDocument();
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
});
