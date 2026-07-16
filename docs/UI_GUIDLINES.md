# MarketVerse UI Guidelines

> Premium. Fast. Data Dense.

---

# Design Philosophy

MarketVerse should feel like

- VS Code
- Bloomberg Terminal
- TradingView
- Grafana

Avoid

- Large empty spaces
- Card-heavy dashboards
- Consumer app aesthetics

Target

Professional users.

---

# Theme

Dark First.

Primary Background

#0B0F19

Secondary Background

#141B2D

Accent

#3B82F6

Success

#22C55E

Danger

#EF4444

Warning

#F59E0B

---

# Typography

Primary

Inter

Monospace

JetBrains Mono

Numbers should always use

Tabular Numbers.

---

# Icons

Lucide React

Single icon library only.

---

# Layout

Desktop

12-column grid

Tablet

6-column grid

Mobile

Single column

---

# Navigation

Desktop

Left Sidebar

Top Toolbar

Workspace Tabs

Mobile

Bottom Navigation

---

# Workspace

Everything is a widget.

Users should

Move

Resize

Collapse

Pin

Fullscreen

Duplicate

Save

---

# Widget Style

Rounded corners

8px

Minimal shadows

Borders preferred over shadows.

---

# Charts

Library

Apache ECharts

Charts must support

- Zoom
- Pan
- Crosshair
- Tooltip
- Export Image
- Fullscreen
- Overlay Indicators

---

# Tables

Support

Sorting

Filtering

Column resize

Sticky headers

Virtual scrolling

---

# Search

Global search

Ctrl + K

Search should be instant.

---

# Animations

Framer Motion

Duration

150ms–250ms

Never animate large datasets.

Respect

prefers-reduced-motion

---

# Colors

Green

Positive

Red

Negative

Blue

Information

Yellow

Warnings

Gray

Disabled

Never rely only on color.

---

# Loading States

Skeletons

Not spinners.

---

# Empty States

Explain

Why

How to fix

Next step

---

# Error States

Friendly.

Actionable.

Never expose stack traces.

---

# Mobile

Touch targets

Minimum

44px

Pinch zoom

Charts

Long press

Context menu

Swipe

Workspace tabs

---

# Accessibility

Keyboard navigation

ARIA labels

Focus indicators

High contrast

Screen readers

---

# Responsive Rules

Desktop is richer.

Mobile is simplified.

Business logic must remain identical.

---

# Performance

Lazy load

Charts

Documents

Analytics

Code split

Heavy modules.

---

# Future Design

Eventually support

- Light Theme
- AMOLED Theme
- Custom Themes

No hardcoded colors.

Everything should come from theme tokens.