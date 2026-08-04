<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Solution Document for Datadog Log Filtering & Optimization

**(Datadog Log Processing, Pipeline Processors & Cost Optimization)**

---

# Purpose of the Document

This Standard Operating Procedure (SOP) defines the standardized methodology for processing, filtering, enriching, and optimizing logs within Datadog.

The document provides engineering guidance for selecting the appropriate Datadog pipeline processor, determining the correct filtering layer, and applying best practices for log optimization while maintaining operational visibility.

The objectives of this document are to:

- Standardize log onboarding
- Improve log searchability
- Reduce unnecessary log ingestion
- Preserve critical operational events
- Improve dashboard quality
- Improve monitor accuracy
- Reduce Datadog logging costs

---

# Scope

## In Scope

- Datadog Processing Pipelines
- Pipeline Processors
- Agent-side Log Filtering
- Vector Log Filtering
- Fluent Bit Log Filtering
- Log Enrichment
- Sensitive Data Masking
- Log Routing
- Log Optimization
- Log Cost Reduction

## Out of Scope

- Infrastructure Monitoring
- Application Performance Monitoring (APM)
- Real User Monitoring (RUM)
- Synthetic Monitoring
- Cloud SIEM

---

# Processing Architecture

```text
Application

↓

Datadog Agent

↓

Vector / Fluent Bit (Optional)

↓

Datadog Pipelines

↓

Pipeline Processors

↓

Indexes

↓

Exclusion Filters

↓

Archives

↓

Log Explorer
```

---

# Pipeline Processor Decision Matrix

| Observation | Recommended Processor |
|-------------|-----------------------|
| Plain Text Log | Grok Parser |
| JSON Log | No Parser Required |
| Custom Timestamp | Date Remapper |
| SUCCESS / FAILED | Status Remapper |
| Different Field Names | Attribute Remapper |
| URL Parsing | URL Parser |
| Browser Information | User-Agent Parser |
| IP Geolocation | GeoIP Parser |
| Country Codes | Lookup Processor |
| Sensitive Information | Sensitive Data Scanner |

---

# Pipeline Processor Catalog

---

# Processor 01 — Grok Parser

## Objective

Convert unstructured log messages into searchable Datadog attributes.

---

## Problem Statement

Application logs are received as plain text.

Example

```text
192.168.10.5 GET /login HTTP/1.1 200 145ms
```

Datadog stores the complete log as a single message.

Searching individual values such as:

- HTTP Status
- URL
- Method
- Client IP

is not possible.

---

## Recommended Solution

Use **Grok Parser** to extract structured attributes.

---

## Typical Use Cases

- Apache
- NGINX
- HAProxy
- Legacy Applications
- Custom Plain Text Logs

---

## Do Not Use

- JSON Logs
- Structured Logs

---

## Navigation

```text
Logs

↓

Configuration

↓

Pipelines

↓

Select Pipeline

↓

Add Processor

↓

Grok Parser
```

---

## Before Processing

```text
192.168.10.5 GET /login HTTP/1.1 200 145ms
```

---

## After Processing

| Attribute | Value |
|------------|------|
| network.client.ip | 192.168.10.5 |
| http.method | GET |
| http.url | /login |
| http.status_code | 200 |
| duration | 145ms |

---

## Validation

Search

```text
@http.status_code:200
```

Expected Result

Matching logs are returned.

---

## Best Practices

- Use only for plain text logs.
- Avoid using on JSON logs.
- Validate extracted attributes before deployment.

---

# Processor 02 — Status Remapper

## Objective

Normalize custom application statuses into Datadog standard statuses.

---

## Sample Log

```json
{
  "status":"FAILED"
}
```

---

## Problem Statement

Datadog cannot automatically classify custom status values.

---

## Recommended Mapping

| Source | Datadog Status |
|---------|----------------|
| SUCCESS | INFO |
| FAILED | ERROR |
| WARNING | WARN |
| CRITICAL | ERROR |

---

## Navigation

```text
Logs

↓

Configuration

↓

Pipelines

↓

Add Processor

↓

Status Remapper
```

---

## Validation

Verify that the Log Explorer displays:

```
status:error
```

instead of

```
FAILED
```

---

# Processor 03 — Date Remapper

## Objective

Use the application timestamp instead of the Datadog ingestion timestamp.

---

## Sample Log

```text
05-Aug-2026 10:15:25 User Login Successful
```

---

## Problem Statement

Logs appear out of chronological order because Datadog uses the ingestion timestamp.

---

## Recommended Solution

Use Date Remapper.

---

## Navigation

```text
Logs

↓

Configuration

↓

Pipelines

↓

Date Remapper
```

---

## Validation

Verify that the event time matches the application timestamp.

---

# Processor 04 — Attribute Remapper

## Objective

Rename attributes to follow a standard naming convention.

---

## Example

Application A

```json
{
"client_ip":"10.10.10.5"
}
```

Application B

```json
{
"ip":"10.10.10.5"
}
```

---

## Standardized Output

```
network.client.ip
```

---

# Processor 05 — Category Processor

## Objective

Group similar values into categories.

---

## Example

| Input | Category |
|--------|----------|
| 200 | Success |
| 201 | Success |
| 404 | Client Error |
| 500 | Server Error |

---

# Processor 06 — URL Parser

## Example

Before

```
https://company.com/login?id=123
```

After

| Field | Value |
|--------|------|
| Host | company.com |
| Path | /login |
| Query | id=123 |

---

# Processor 07 — User-Agent Parser

Before

```
Mozilla/5.0 Chrome Windows
```

After

| Field | Value |
|--------|------|
| Browser | Chrome |
| Operating System | Windows |
| Device | Desktop |

---

# Processor 08 — GeoIP Parser

Before

```
103.xxx.xxx.xxx
```

After

| Field | Value |
|--------|------|
| Country | India |
| City | Bangalore |

---

# Processor 09 — Lookup Processor

Before

```
country=91
```

After

```
India
```

---

# Processor 10 — Sensitive Data Scanner

Before

```
Password=admin123
JWT=eyJhbGc...
CreditCard=4111111111111111
```

After

```
Password=********
JWT=********
CreditCard=********
```

---

# Log Filtering Strategy

| Layer | Recommendation |
|---------|---------------|
| Application | Best Practice |
| Datadog Agent | Recommended |
| Vector | Recommended |
| Fluent Bit | Recommended |
| Pipeline | Processing Only |
| Exclusion Filter | Last Option |

---

# Common Filtering Scenarios

| Log Type | Action | Recommended Layer |
|-----------|--------|-------------------|
| Health Checks | Drop | Agent |
| Kubernetes Probes | Drop | Agent |
| Static Assets | Evaluate | Agent |
| Debug Logs | Drop (Production) | Application |
| Login Failure | Keep | Monitor |
| HTTP 500 | Keep | Monitor |
| CrashLoopBackOff | Keep | Monitor |
| OOMKilled | Keep | Monitor |
| Payment Failure | Keep | Monitor |
| Database Errors | Keep | Monitor |

---

# Validation Checklist

- [ ] Parsed fields are visible
- [ ] Search queries return expected results
- [ ] Sensitive information is masked
- [ ] Dashboards display correct data
- [ ] Monitors continue functioning
- [ ] Log ingestion reduced (if filtering applied)

---

# Best Practices

- Filter logs as early as possible.
- Use Grok only for unstructured logs.
- Prefer JSON logging whenever possible.
- Never filter security events.
- Never filter payment failures.
- Never filter infrastructure failures.
- Validate every pipeline before production deployment.
- Document every custom processor.

---

# Final Outcome

Following this SOP ensures that Datadog log pipelines are standardized, searchable, secure, and optimized for operational visibility and cost efficiency.

---

# References

- Datadog Pipeline Documentation
- Internal Observability Standards
- Platform Logging Guidelines

