export default function ScopeSection() {
  const scopeItems = [
    {
      category: "Hardware Components",
      items: [
        "Industrial-grade sensors for temperature, humidity, CO2, and light",
        "Relay control boards for climate equipment",
        "Raspberry Pi or compatible microcontroller",
        "Power management system with backup battery",
        "Network connectivity (WiFi/Ethernet)",
      ],
    },
    {
      category: "Software Capabilities",
      items: [
        "Real-time environmental monitoring and data logging",
        "Automated climate control with PID algorithms",
        "Web-based dashboard for system management",
        "Mobile application for iOS and Android",
        "Cloud data synchronization and backup",
        "Multi-user access with role-based permissions",
      ],
    },
    {
      category: "Automation Features",
      items: [
        "Temperature regulation within 0.5 degrees C",
        "Humidity control with precision misting",
        "CO2 injection and ventilation management",
        "Light cycle automation for different growth phases",
        "Automated irrigation scheduling",
        "Custom growing recipes for different mushroom species",
      ],
    },
    {
      category: "Monitoring & Analytics",
      items: [
        "Historical data visualization with charts and graphs",
        "Trend analysis and predictive alerts",
        "Environmental condition logging for compliance",
        "Yield tracking and harvest records",
        "Energy consumption monitoring",
        "System health diagnostics",
      ],
    },
    {
      category: "Integration Options",
      items: [
        "REST API for third-party integrations",
        "WebSocket support for real-time updates",
        "Export data in CSV, JSON formats",
        "MQTT protocol support for IoT devices",
        "Webhook notifications for external systems",
      ],
    },
    {
      category: "Scalability",
      items: [
        "Support for multiple growing chambers",
        "Expandable sensor network",
        "Cloud-based multi-site management",
        "Modular architecture for custom additions",
        "Commercial-scale operations ready",
      ],
    },
  ];

  return (
    <section id="scope" className="py-20 bg-scope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Project Scope & Capabilities
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            A comprehensive overview of what MASH can do for your mushroom cultivation operation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scopeItems.map((scope, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                  {index + 1}
                </span>
                {scope.category}
              </h3>
              <ul className="space-y-3">
                {scope.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">
            System Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-2 border-green-200 dark:border-green-800 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">Layer 1</div>
              <div className="text-secondary">Sensors & Actuators</div>
            </div>
            <div className="p-4 border-2 border-green-300 dark:border-green-700 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">Layer 2</div>
              <div className="text-secondary">Control Hardware</div>
            </div>
            <div className="p-4 border-2 border-green-400 dark:border-green-600 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">Layer 3</div>
              <div className="text-secondary">Software & Cloud</div>
            </div>
            <div className="p-4 border-2 border-green-500 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">Layer 4</div>
              <div className="text-secondary">User Interface</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
