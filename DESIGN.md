# MASH Design Direction (DESIGN.md)

> This document defines the identity, voice, color hierarchy, and visual direction for the MASH (Mushroom Automation System Hub) platform.
> anti-slop acts as the filter; this document supplies the direction and soul.

---

## 1. Product Identity

- **Product**: MASH (Mushroom Automation System Hub)
- **Domain**: Automated precision climate engineering and telemetry for mushroom cultivation (commercial facilities, craft growers, and research institutions).
- **Core Mission**: Replace manual guesswork, mold-prone humidity swings, and CO2 suffocation with reliable closed-loop environmental automation, cloud monitoring, and rugged IoT hardware.
- **Audience**: Professional mushroom cultivators, gourmet and medicinal growers, agricultural engineers, and farm managers who care about yield consistency, contamination prevention, and data logging.

---

## 2. Brand Personality & Tone of Voice

- **Character**: Grounded, scientific, reliable, craft-focused, engineered.
- **Voice Guidelines**:
  - Speak like an agricultural engineer who grows mushrooms, not a silicon valley SaaS pitch deck.
  - Use genuine mycological and environmental terminology: *fruiting chamber*, *colonization*, *relative humidity (RH)*, *fresh air exchange (FAE)*, *CO2 parts per million (ppm)*, *photoperiod induction*, *flushes*, *ultrasonic humidification*, *pinning triggers*.
  - **Zero generic AI buzzwords**: No "revolutionary", "cutting edge", "seamless", "next-gen AI", "unlock the power".
  - **Zero em dashes (—)** in user-facing copy.
  - **Zero emojis** anywhere in the code, comments, or UI.
  - **Evidence over claims**: State what the hardware and software actually monitor, actuate, and report.

---

## 3. Liveliness Dials

- **ENERGY: 2 (Confident & Grounded)**
  - Measured, authoritative presence. High-contrast typography with clear hierarchy. Visual weight anchored by real cultivation metrics and hardware schematics.
- **RHYTHM: 2 (Structured Variation)**
  - Deliberate shifts between interactive software previews (phone mockup), industrial hardware 3D inspection (fruiting chamber), technical specifications, and consultation scheduling.
- **MOTION: 2 (Purposeful & Functional)**
  - Micro-interactions that clarify user actions (smooth tab switching in mobile showcase, responsive 3D model rotation with mouse tracking, smooth section reveals). Respects prefers-reduced-motion.

---

## 4. Color Hierarchy & Design Tokens

MASH uses a disciplined slate neutral palette grounded by an earthy, vibrant botanical green brand accent. No gradient soup, no generic purple/blue AI meshes.

### Base Neutrals (Dark Mode Default)
- **Background**: Slate-900 (#0f172a / 15 23 42)
- **Card / Surface**: Slate-800 (#1e293b / 30 41 59)
- **Borders**: Slate-700 (#334155 / 51 65 85)
- **Text Primary**: Slate-50 (#f8fafc / 248 250 252)
- **Text Secondary**: Slate-300 (#cbd5e1 / 203 213 225)
- **Text Muted**: Slate-400 (#94a3b8 / 148 163 184)

### Light Mode Adaptation
- **Background**: Slate-50 (#f8fafc / 248 250 252)
- **Card / Surface**: Pure White (#ffffff / 255 255 255)
- **Borders**: Slate-200 (#e2e8f0 / 226 232 240)
- **Text Primary**: Slate-900 (#0f172a / 15 23 42)
- **Text Secondary**: Slate-600 (#475569 / 71 85 105)

### Brand & Telemetry Accents
- **Primary Brand**: Forest / Emerald Green (#16a34a in light; #22c55e in dark)
- **Telemetry Indicators**:
  - Optimal / Online: Emerald Green
  - Warning / Drift: Amber (#f59e0b)
  - Critical / Contamination Risk: Rose / Red (#dc2626)
- **Rule on Accents**: The green accent is reserved for primary CTAs, active status indicators, and key metrics. Never applied to every card border, icon, and background simultaneously.

---

## 5. UI Architecture Rules

1. **Button Integrity**: All buttons must render through @/components/ui/button using either solid brand fill or crisp bordered outline.
2. **Card Restraint**: Solid card backgrounds (bg-card), clean borders (border-default), and soft hover elevation without neon border glows or diffuse colored shadows.
3. **Hardware Truth**: The 3D chamber model represents real sensor placements (air intake, exhaust fan, ultrasonic mist port, LED grow bar, DHT22 temp/RH probe, MQ-135 CO2 sensor).
4. **Resilience**: Every interactive element has keyboard focus rings, touch targets >= 44px, and adheres to WCAG AA contrast standards.
