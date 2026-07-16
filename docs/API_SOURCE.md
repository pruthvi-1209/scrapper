# API Sources

> Every external data source is accessed through a Provider.

The rest of MarketVerse never communicates directly with external APIs.

---

# Design Philosophy

```
NSE

↓

NSE Provider

↓

Canonical Models

↓

Datasets

↓

Widgets
```

NOT

```
React

↓

NSE API
```

---

# Current Providers

Version 1

- NSE
- Yahoo Finance

Future

- MoneyControl
- Tickertape
- Screener
- Trendlyne
- BSE

---

# Provider Categories

Every provider implements one or more capabilities.

```
Price Provider

Financial Provider

News Provider

Corporate Action Provider

Document Provider

Search Provider

Valuation Provider
```

---

# NSE Provider

Purpose

- Live Quotes
- Market Status
- Corporate Announcements
- Indices
- Market Movers

---

## Base URL

```
https://www.nseindia.com
```

---

## Required Session

Before making API requests

```
GET /

↓

Receive Cookies

↓

Reuse Session
```

Never make API calls without an initialized session.

---

## Default Headers

```
User-Agent

Accept

Accept-Language

Referer

Connection
```

Centralize these in one HTTP client.

---

## Endpoints

### Homepage

Purpose

Initialize session.

```
GET /
```

---

### Market Status

```
GET /api/marketStatus
```

---

### All Indices

```
GET /api/allIndices
```

---

### Quote

```
GET /api/quote-equity?symbol=RELIANCE
```

---

### Trade Information

```
GET /api/quote-equity?symbol=RELIANCE&section=trade_info
```

---

### Corporate Announcements

```
GET /api/corporate-announcements?index=equities
```

---

### Option Chain

Future

```
GET /api/option-chain-indices

GET /api/option-chain-equities
```

---

# Yahoo Finance Provider

Purpose

- Historical Price
- Financial Statements
- Company Profile

Yahoo will primarily provide historical datasets.

---

# Provider Responsibilities

Providers

Must

- Fetch data
- Retry requests
- Parse responses
- Validate responses
- Map to canonical models

Providers

Must NOT

- Render UI
- Calculate indicators
- Generate charts
- Store layouts
- Perform business logic

---

# Canonical Mapping

Example

```
NSE JSON

↓

Quote Mapper

↓

Quote Model

↓

Price Dataset
```

Widgets only consume Price Dataset.

---

# Refresh Strategy

Market Status

Every 5 minutes

Quotes

On demand

Corporate Actions

Every 30 minutes

Financial Statements

Daily

Documents

Daily

Settings should remain configurable.

---

# HTTP Client

There should be exactly ONE HTTP client.

Responsibilities

- Headers
- Cookies
- Retry
- Timeout
- Logging

Providers should never create HTTP clients.

---

# Retry Strategy

Retry

403

429

500

502

503

Use exponential backoff.

Maximum retries

3

---

# Rate Limiting

Throttle requests.

Avoid duplicate requests.

Reuse cached responses.

Never spam providers.

---

# Caching

Cache only when useful.

Examples

Market Status

5 minutes

Financial Statements

24 hours

Company Profile

24 hours

Corporate Actions

30 minutes

Historical Data

Permanent unless refreshed

---

# Validation

Every response should be validated.

Invalid data should never reach the Dataset Engine.

---

# Error Handling

Provider failures

↓

Logged

↓

Reported

↓

Ignored

Application continues.

---

# Logging

Log

Provider

Endpoint

Duration

Status

Retries

Errors

Never log sensitive data.

---

# Search

Searching should use the Provider.

Example

```
"Reli"

↓

Search Provider

↓

Ticker List

↓

Canonical Ticker
```

---

# Future Providers

Every provider should implement

```
Provider

↓

Capabilities

↓

Mapper

↓

Datasets
```

No provider should expose raw JSON.

---

# Important Rule

Changing providers should never require changing

- Widgets
- Charts
- Workspace
- Search
- Notes

Only the Provider layer changes.