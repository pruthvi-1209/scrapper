# Widget Specification

> Widgets are the fundamental building blocks of MarketVerse.

---

# Philosophy

MarketVerse is **NOT** a page-based application.

It is a **workspace** composed of independent widgets.

Every visible component is a widget.

Examples

- Price Chart
- Revenue Chart
- EPS Chart
- Financial Summary
- Valuation
- News
- Documents
- Notes
- Corporate Actions
- Watchlist
- Market Overview
- Custom Chart

---

# Widget Goals

Widgets should be

- Independent
- Reusable
- Configurable
- Replaceable
- Lazy Loaded
- Responsive

Widgets must never depend on another widget.

---

# Widget Lifecycle

```

Created

↓

Initialized

↓

Waiting For Dataset

↓

Ready

↓

Updated

↓

Destroyed

```

Widgets should clean up all subscriptions when destroyed.

---

# Widget Structure

Every widget has

```

Widget

id

type

title

icon

version

configuration

state

permissions

```

---

# Widget State

```

Loading

Ready

Error

Empty

Disabled

```

Every widget must support every state.

---

# Widget Configuration

Each widget owns its configuration.

Example

Price Chart

```

Chart Type

Indicators

Theme

Timeframe

Comparison

```

Example

News Widget

```

Sources

Sort Order

Maximum Articles

Categories

```

Configuration must persist.

---

# Widget Communication

Widgets NEVER communicate directly.

Wrong

```

Price Widget

↓

News Widget

```

Correct

```

Price Widget

↓

Event Bus

↓

News Widget

```

---

# Widget Events

Supported events

```

StockChanged

TimelineChanged

DatasetUpdated

WidgetResized

WidgetCollapsed

WidgetExpanded

WidgetPinned

WidgetRemoved

WorkspaceLoaded

WorkspaceSaved

FilterChanged

ChartCreated

ChartDeleted

```

---

# Widget Data

Widgets consume datasets.

Never providers.

Example

```

Price Dataset

↓

Price Widget

```

NOT

```

NSE API

↓

Price Widget

```

---

# Widget Layout

Every widget supports

```

Move

Resize

Collapse

Expand

Fullscreen

Pin

Hide

Remove

Duplicate

```

---

# Widget Header

Every widget should have

```

Title

Refresh

Settings

Fullscreen

Collapse

Pin

More Menu

```

---

# Widget Footer

Optional

Can display

```

Last Updated

Provider

Errors

Warnings

Status

```

---

# Widget Permissions

Some widgets require

```

Price Dataset

Financial Dataset

News Dataset

Document Dataset

```

If unavailable

Show Empty State.

Never crash.

---

# Widget Categories

## Market

```

Price

Market Depth

Order Book

Volume

Market Summary

```

---

## Financial

```

Revenue

Profit

EPS

Balance Sheet

Cash Flow

Ratios

```

---

## Analytics

```

Custom Chart

Scatter Plot

Heatmap

Correlation

Comparison

```

---

## Research

```

News

Documents

Notes

Corporate Actions

```

---

## User

```

Watchlists

Layouts

Bookmarks

Recent Stocks

```

---

# Widget Sizing

Widgets support

```

XS

S

M

L

XL

```

Resizable.

---

# Responsive Behaviour

Desktop

Multiple columns

Tablet

Two columns

Mobile

Single column

No duplicated widgets.

Only layout changes.

---

# Widget Persistence

Persist

```

Position

Size

Visibility

Configuration

Pinned

Collapsed

```

Users should never lose layouts.

---

# Lazy Loading

Heavy widgets should lazy load.

Examples

```

Charts

Documents

Financials

Analytics

```

Small widgets load immediately.

---

# Error Handling

Widget errors must remain isolated.

One failing widget must never break

Workspace

Sidebar

Navigation

Other widgets

---

# Empty State

Every widget should explain

Why no data exists.

Example

```

No Financial Data Available

Try another provider.

```

Never show blank screens.

---

# Refresh Behaviour

Widgets should not poll individually.

Workspace triggers refresh.

Widgets react to updates.

---

# Custom Widgets

Future versions should allow plugins.

Example

```

Option Chain Widget

Insider Trading Widget

Mutual Fund Widget

```

without modifying existing code.

---

# Widget Registry

Every widget registers itself.

Example

```

Price Widget

↓

Widget Registry

↓

Available inside Workspace

```

The Workspace should discover widgets dynamically.

---

# Design Rules

Every widget should

Have one responsibility.

Be independently testable.

Be independently deployable.

Avoid duplicated logic.

Consume only canonical datasets.

Never know provider details.

---

# Future

Eventually third-party developers should be able to build widgets using a public Widget SDK.

This is outside MVP but the architecture should not prevent it.