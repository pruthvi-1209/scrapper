# MarketVerse Coding Standards

> Write code for the next developer, not the current one.

---

# Engineering Principles

Every line of code must follow:

- SOLID
- DRY
- KISS
- YAGNI

If a design violates one of these principles, reconsider it before implementing.

---

# General Rules

## Rule 1

Write code that is easy to delete.

Complex code should only exist when complexity is required.

---

## Rule 2

Prefer readability over cleverness.

---

## Rule 3

Small commits.

One feature per commit.

---

## Rule 4

Never mix unrelated changes.

---

## Rule 5

If something feels generic but is only used once...

Do NOT abstract it.

(YAGNI)

---

# Naming

## Files

Good

```
PriceChartWidget.tsx

WorkspaceGrid.tsx

NSEProvider.ts

PriceDataset.ts
```

Bad

```
utils.ts

helper.ts

common.ts

temp.ts
```

---

## Components

PascalCase

```
PriceChart

WorkspaceGrid

TimelineSelector
```

---

## Hooks

```
useWorkspace()

useTimeline()

usePriceHistory()
```

---

## Interfaces

Never prefix with I

Good

```
Provider

Widget

Dataset
```

Bad

```
IProvider

IWidget
```

---

## Types

PascalCase

```
Ticker

Quote

Workspace
```

---

## Variables

camelCase

```
selectedTicker

priceHistory

currentWorkspace
```

---

## Constants

UPPER_CASE

```
DEFAULT_TIMEOUT

MAX_RETRIES
```

---

# Folder Structure

Every feature follows

```
feature/

components/

hooks/

types/

services/

utils/

tests/
```

Avoid dumping files into one folder.

---

# Imports

Order

```
Node Modules

↓

Internal Packages

↓

Components

↓

Hooks

↓

Types

↓

Styles
```

Never use relative imports that go multiple levels up.

Prefer aliases.

---

# React

Prefer

Functional Components

Hooks

Composition

Avoid

Class Components

Inheritance

---

# Components

A component should have

One responsibility.

If a component exceeds ~250 lines, consider splitting it.

---

# Props

Prefer

```
PriceChartProps
```

Avoid

```
any
```

---

# State

Local first.

Global only when necessary.

---

# Business Logic

Business logic NEVER belongs inside React components.

React components should only

Render

Handle UI interaction

Dispatch actions

---

# Services

Services contain

Business logic

Providers

Transformations

Never render UI.

---

# Providers

Providers only

Fetch

Retry

Validate

Map

Never

Calculate indicators

Never

Render

Never

Store UI state

---

# Error Handling

Never swallow errors.

Always

Log

Wrap

Explain

---

# Logging

Use structured logs.

Never

console.log()

inside production code.

---

# Testing

Every business rule

Must have tests.

React components

Test only behaviour.

Not implementation.

---

# Comments

Avoid

```
Increment i
```

Prefer explaining

WHY

not

WHAT

---

# Functions

Prefer

20–40 lines.

Split long functions.

---

# Dependencies

Before adding a dependency ask

Do we really need it?

Can we implement it ourselves?

Will we maintain it?

---

# Styling

Tailwind only.

No inline styles.

No CSS frameworks.

---

# Git

Commit format

```
feat:

fix:

refactor:

docs:

test:

style:

chore:
```

Examples

```
feat: add workspace engine

fix: resolve timeline synchronization

docs: update provider architecture
```

---

# Pull Requests

Checklist

- Builds successfully
- Tests pass
- No lint errors
- Documentation updated
- No dead code
- No console logs

---

# Performance

Measure before optimizing.

Never optimize based on assumptions.

---

# Architecture

Always ask

Does this belong in

UI

Application

Domain

Infrastructure

before writing code.

---

# Final Rule

Every new feature should feel like

"Just another plugin."

Never special-case features.

Design for consistency.

Not exceptions.