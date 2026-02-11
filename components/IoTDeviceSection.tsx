"use client";

import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LandingPageData } from "@/lib/sanity";

// Lazy-load the 3D model component for code-splitting
const ChamberModel3D = lazy(() => import("@/components/ChamberModel3D"));

export interface IoTDeviceSectionProps {
  /**
   * URL to the 3D model from Sanity CMS.
   * If provided, takes priority over local /assets/Chamber.glb.
   */
  modelUrl?: string;
  /**
   * Landing page data from Sanity CMS.
   */
  data?: LandingPageData | null;
}

/**
 * IoT Device specifications for the MASH system.
 */
const DEFAULT_SPECS = [
  {
    id: "sensors",
    label: "Environmental Sensors",
    value: "DHT22, MQ-135, BH1750",
    description: "Temperature, humidity, CO2, and light sensors for comprehensive environmental monitoring",
  },
  {
    id: "controller",
    label: "Microcontroller",
    value: "ESP32-WROOM-32",
    description: "Dual-core processor with built-in WiFi and Bluetooth for reliable IoT connectivity",
  },
  {
    id: "actuators",
    label: "Actuator Control",
    value: "4-Channel Relay Module",
    description: "Controls fans, humidifiers, heaters, and lighting systems independently",
  },
  {
    id: "connectivity",
    label: "Connectivity",
    value: "WiFi 802.11 b/g/n",
    description: "Real-time data transmission to cloud with MQTT protocol support",
  },
  {
    id: "power",
    label: "Power Supply",
    value: "5V DC / USB-C",
    description: "Low power consumption with USB-C power delivery for easy installation",
  },
  {
    id: "enclosure",
    label: "Enclosure",
    value: "IP65 Rated",
    description: "Water and dust resistant housing designed for high-humidity mushroom growing environments",
  },
];

/**
 * IoTDeviceCanvas renders a 3D-like representation of the MASH IoT device
 * using CSS 3D transforms and framer-motion for parallax interaction.
 * Uses CSS-based 3D rather than Three.js Canvas for better SSR compatibility and testing.
 */
function DeviceModel3D({ rotateX, rotateY }: { rotateX: number; rotateY: number }) {
  return (
    <div
      className="relative w-64 h-80 mx-auto"
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="w-full h-full relative"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
        data-testid="device-3d-model"
      >
        {/* Front face - main board */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-green-500/30 shadow-2xl"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* PCB texture lines */}
          <div className="absolute inset-4 border border-green-500/10 rounded-lg">
            <div className="absolute top-3 left-3 right-3 h-px bg-green-500/20" />
            <div className="absolute top-8 left-3 right-3 h-px bg-green-500/10" />
            <div className="absolute top-13 left-3 right-3 h-px bg-green-500/20" />
          </div>

          {/* ESP32 chip */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-12 bg-gray-700 rounded-md border border-gray-600 flex items-center justify-center">
            <span className="text-[8px] text-green-400 font-mono">ESP32</span>
          </div>

          {/* Sensor modules */}
          <div className="absolute top-24 left-4 w-10 h-8 bg-blue-900/50 rounded border border-blue-500/30 flex items-center justify-center">
            <span className="text-[6px] text-blue-400 font-mono">DHT</span>
          </div>
          <div className="absolute top-24 right-4 w-10 h-8 bg-purple-900/50 rounded border border-purple-500/30 flex items-center justify-center">
            <span className="text-[6px] text-purple-400 font-mono">MQ</span>
          </div>

          {/* Status LEDs */}
          <div className="absolute top-40 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          </div>

          {/* Relay connectors */}
          <div className="absolute bottom-16 left-4 right-4 flex justify-between">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-8 h-6 bg-gray-700 rounded-sm border border-gray-600 flex items-center justify-center">
                <span className="text-[6px] text-gray-400 font-mono">R{n}</span>
              </div>
            ))}
          </div>

          {/* USB-C port */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-600 rounded-full border border-gray-500" />

          {/* MASH label */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <span className="text-xs font-bold text-green-400/80 tracking-wider">MASH</span>
          </div>
        </div>

        {/* Side face */}
        <div
          className="absolute top-0 right-0 w-10 h-full bg-gradient-to-b from-gray-700 to-gray-800 rounded-r-lg border-l border-green-500/10"
          style={{
            transform: "rotateY(90deg) translateZ(117px)",
            transformOrigin: "right",
          }}
        />

        {/* Top face */}
        <div
          className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-lg"
          style={{
            transform: "rotateX(90deg) translateZ(-10px)",
            transformOrigin: "top",
          }}
        />
      </div>
    </div>
  );
}

/**
 * IoTDeviceSection displays a 3D-rendered IoT device with parallax scrolling
 * and interactive specification panels.
 */
export default function IoTDeviceSection({ modelUrl, data }: IoTDeviceSectionProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSpec, setActiveSpec] = useState("sensors");
  const specs = data?.iotDeviceSpecs ?? DEFAULT_SPECS;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Enhanced parallax transforms for smoother experience
  const deviceY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const deviceScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const specsX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -60]);

  // Mouse-driven 3D rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: ((e.clientX / innerWidth) - 0.5) * 20,
        y: ((e.clientY / innerHeight) - 0.5) * -10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentSpec = specs.find((s) => s.id === activeSpec) || specs[0];

  return (
    <section
      ref={sectionRef}
      id="iot-device"
      className="py-24 bg-componentpage overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ opacity: contentOpacity }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {data?.iotDeviceTitle ?? "IoT Hardware"}
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            {data?.iotDeviceDescription ?? "Purpose-built IoT device designed for mushroom cultivation environments with professional-grade sensors and controls"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Device Model */}
          <motion.div
            style={{ y: deviceY, scale: deviceScale } as Record<string, unknown>}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow effect behind device */}
              <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full scale-150" />
              <Suspense fallback={<DeviceModel3D rotateX={mousePos.y} rotateY={mousePos.x} />}>
                <ChamberModel3D
                  height="420px"
                  className="w-[320px] md:w-[400px]"
                  autoRotate={true}
                  modelUrl={modelUrl}
                />
              </Suspense>
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div style={{ opacity: contentOpacity, x: specsX } as Record<string, unknown>}>
            <h3 className="text-2xl font-bold text-primary mb-6">
              Device Specifications
            </h3>

            {/* Active spec detail */}
            <div className="bg-card p-6 rounded-xl border border-border mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <h4 className="font-bold text-lg text-primary">{currentSpec.label}</h4>
              </div>
              <p className="text-green-600 dark:text-green-400 font-mono text-sm mb-2">
                {currentSpec.value}
              </p>
              <p className="text-secondary text-sm">{currentSpec.description}</p>
            </div>

            {/* Spec selector grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specs.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveSpec(spec.id)}
                  className={`p-3 rounded-lg text-left transition-all duration-200 ${
                    activeSpec === spec.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-card hover:bg-surface-hover border border-border"
                  }`}
                >
                  <p className="font-medium text-sm">{spec.label}</p>
                  <p
                    className={`text-xs mt-1 font-mono ${
                      activeSpec === spec.id ? "text-green-100" : "text-tertiary"
                    }`}
                  >
                    {spec.value}
                  </p>
                </button>
              ))}
            </div>

            {/* Technical highlights */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-card p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">6</div>
                <div className="text-xs text-secondary mt-1">Sensor Types</div>
              </div>
              <div className="bg-card p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
                <div className="text-xs text-secondary mt-1">Relay Channels</div>
              </div>
              <div className="bg-card p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">IP65</div>
                <div className="text-xs text-secondary mt-1">Protection</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
