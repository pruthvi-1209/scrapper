# MarketVerse Architecture

> The Operating System for Market Intelligence

---

# High Level Architecture

```
                                User
                                 │
                                 ▼
                      React + TypeScript UI
                                 │
                      Workspace Engine
                                 │
        ┌──────────────┬──────────┬──────────────┐
        ▼              ▼          ▼              ▼
 Widget Engine   Chart Engine  Search Engine  Timeline Engine
        │              │          │              │
        └──────────────┴──────────┴──────────────┘
                         │
                  Dataset Engine
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
 Provider Engine   Cache Engine    Settings Engine
        │
        ├───────────────┐
        ▼               ▼
      NSE         Yahoo Finance
```

---

# Design Philosophy

Everything inside MarketVerse revolves around four concepts.

- Workspaces
- Widgets
- Datasets
- Providers

Nothing else.

If a feature cannot be expressed using these four concepts,
the architecture should be reconsidered.

---

# Layered Architecture

```
Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer
```

---

## Presentation Layer

Contains

- React
- Components
- Widgets
- Pages
- Layouts

Responsibilities

- Rendering
- User interaction
- Navigation

Must NEVER

- Call providers directly
- Parse API responses
- Contain business rules

---

## Application Layer

Coordinates workflows.

Examples

Search Stock

↓

Load Dataset

↓

Update Workspace

↓

Notify Widgets

This layer orchestrates everything.

---

## Domain Layer

This is the heart of MarketVerse.

Contains

- Ticker
- Workspace
- Dataset
- Widget
- Watchlist
- Timeline
- Layout
- Chart Definition

This layer knows nothing about

- React
- Express
- SQLite
- NSE
- Yahoo

It only understands business concepts.

---

## Infrastructure Layer

Contains

Providers

Persistence

HTTP

Logging

Configuration

Caching

External integrations

---

# Core Modules

```
Workspace Engine

Widget Engine

Provider Engine

Dataset Engine

Chart Engine

Timeline Engine

Search Engine

Document Engine

Watchlist Engine

Settings Engine
```

Every module has one responsibility.

---

# Workspace Engine

A Workspace represents the user's research environment.

A workspace contains

- Selected Stock
- Active Timeline
- Widgets
- Layout
- Filters
- Custom Charts

Workspaces can be saved.

Users can have multiple workspaces.

---

# Widget Engine

Everything on screen is a widget.

Examples

Price Chart

Revenue

EPS

News

Documents

Corporate Actions

Financial Summary

Custom Chart

Notes

Widgets should be

Independent.

Reusable.

Configurable.

Widgets NEVER communicate directly.

---

# Event Bus

Widgets communicate through events.

```
Stock Selected

↓

Timeline Changed

↓

Dataset Updated

↓

Chart Created

↓

Workspace Saved
```

A widget never imports another widget.

---

# Dataset Engine

The Dataset Engine is the central source of truth.

Every widget consumes datasets.

Widgets never fetch data.

Widgets never call providers.

Datasets are immutable.

---

# Provider Engine

Providers fetch external information.

Examples

Price Provider

Financial Provider

News Provider

Corporate Action Provider

Document Provider

Valuation Provider

Providers convert external data into canonical domain models.

The rest of the application never knows where data originated.

---

# Chart Engine

Charts consume datasets.

Charts never fetch data.

Charts never know about providers.

Supported chart types

- Line
- Bar
- Area
- Scatter
- Candlestick
- Heatmap
- Bubble
- Treemap

Future chart types should require no architecture changes.

---

# Search Engine

Search is universal.

Users can search

Stocks

Documents

News

Watchlists

Saved Charts

Layouts

Notes

Everything searchable implements the Searchable interface.

---

# Timeline Engine

There is exactly ONE active timeline.

Examples

1 Minute

5 Minutes

15 Minutes

30 Minutes

1 Hour

1 Day

1 Week

1 Month

3 Months

6 Months

1 Year

3 Years

5 Years

MAX

Changing the timeline updates every widget.

---

# Settings Engine

Responsible for

Theme

Providers

Layouts

Preferences

Cache

Workspace defaults

Nothing else.

---

# Mobile Architecture

Desktop and Mobile use the same business logic.

Only layouts change.

No duplicated functionality.

---

# State Management

Global state should remain small.

Global state contains

Current Workspace

Current Timeline

Selected Stock

Theme

Everything else should be local to the owning widget.

---

# Dependency Rules

Allowed

```
UI

↓

Application

↓

Domain

↓

Infrastructure
```

Forbidden

```
Infrastructure

↓

UI
```

Providers must never import UI.

Widgets must never import Providers.

---

# Error Handling

One provider failing should never crash the application.

Failures should be isolated.

Widgets display meaningful empty states.

---

# Performance Goals

Application startup

< 2 seconds

Workspace switch

< 300ms

Search

< 100ms

Chart updates

60 FPS

Lazy load expensive components.

Virtualize large datasets.

Cache only when necessary.

---

# Future Architecture

Future features should plug into existing modules.

Examples

AI

↓

New Module

Options

↓

New Provider

Broker

↓

New Provider

No existing business logic should require modification.

The architecture should grow by extension rather than modification.

(Open/Closed Principle)