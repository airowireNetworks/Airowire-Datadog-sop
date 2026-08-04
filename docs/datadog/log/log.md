<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Solution Document for Datadog Log Filtering & Optimization

**(Datadog Log Processing, Pipeline Processors & Cost Optimization)**

---

# Purpose of the Document

This Standard Operating Procedure (SOP) defines the standardized methodology for processing, filtering, enriching, and optimizing logs within Datadog.

The purpose of this document is to provide a consistent engineering approach for selecting the correct log filtering method, pipeline processor, and optimization strategy while maintaining operational visibility and reducing log ingestion costs.

The objectives of this document are:

- Standardize log onboarding
- Improve log searchability
- Reduce unnecessary log ingestion
- Improve dashboard quality
- Improve monitor accuracy
- Protect sensitive information
- Reduce Datadog logging costs

---

# Scope

## In Scope

- Datadog Processing Pipelines
- Pipeline Processors
- Log Filtering
- Agent-side Filtering
- Vector Filtering
- Fluent Bit Filtering
- Sensitive Data Masking
- Index Routing
- Exclusion Filters
- Log Optimization
- Cost Optimization

## Out of Scope

- Infrastructure Monitoring
- APM
- RUM
- Synthetic Monitoring
- Cloud SIEM

---

# Prerequisites

## Access Requirements

- Datadog Administrator Access
- Log Management Enabled
- Access to Pipelines
- Access to Index Configuration
- Access to Agent Configuration

## Technical Knowledge

- Linux
- Docker
- Kubernetes
- JSON
- YAML
- Basic Regular Expressions

---

# Log Processing Architecture

```text
Application
      │
      ▼
Datadog Agent
      │
      ▼
Vector / Fluent Bit (Optional)
      │
      ▼
Datadog Processing Pipelines
      │
      ▼
Pipeline Processors
      │
      ▼
Indexes
      │
      ▼
Exclusion Filters
      │
      ▼
Archives
      │
      ▼
Log Explorer
      │
      ▼
Dashboards
      │
      ▼
Monitors
```

---

# Log Processing Workflow

```text
Receive Application Logs
        │
        ▼
Identify Log Format
        │
        ▼
JSON?
   │            │
 YES           NO
   │            │
No Grok     Grok Parser
        │
        ▼
Need Timestamp Correction?
        │
        ▼
Date Remapper
        │
        ▼
Need Status Mapping?
        │
        ▼
Status Remapper
        │
        ▼
Need Standard Attributes?
        │
        ▼
Attribute Remapper
        │
        ▼
Need URL Parsing?
        │
        ▼
URL Parser
        │
        ▼
Need Browser Information?
        │
        ▼
User-Agent Parser
        │
        ▼
Need Geo Information?
        │
        ▼
GeoIP Parser
        │
        ▼
Need Sensitive Data Protection?
        │
        ▼
Sensitive Data Scanner
        │
        ▼
Validate
        │
        ▼
Production
```

---

# Log Filtering Strategy

Filtering should always occur as early as possible.

| Layer | Purpose | Recommendation |
|---------|----------|---------------|
| Application | Stop unnecessary logs | ⭐⭐⭐⭐⭐ |
| Datadog Agent | Drop logs before ingestion | ⭐⭐⭐⭐ |
| Vector | Centralized filtering | ⭐⭐⭐⭐ |
| Fluent Bit | Centralized filtering | ⭐⭐⭐⭐ |
| Pipeline | Parse and enrich logs | ⭐⭐ |
| Index | Organize storage | ⭐ |
| Exclusion Filter | Reduce indexed logs | ⭐⭐ |

---

# Filtering Approaches

## 1. Application Filtering

### Purpose

Prevent unnecessary logs from being generated.

### Recommended For

- DEBUG logs
- TRACE logs
- Development logs
- Test logs

### Advantages

- Zero ingestion cost
- Zero network traffic
- Zero Agent processing

---

## 2. Log Level Filtering

### Keep

- INFO
- WARN
- ERROR
- CRITICAL

### Drop

- DEBUG
- TRACE
- VERBOSE

### Best Practice

Enable DEBUG logging only during troubleshooting.

---

## 3. Datadog Agent Filtering

### Purpose

Drop logs before sending them to Datadog.

### Recommended For

- Health checks
- Kubernetes probes
- Repeated INFO logs
- Debug logs

### Navigation

```
Helm Values
    ↓
datadog-values.yaml
    ↓
logs
    ↓
log_processing_rules
```

---

## 4. Vector Filtering

### Purpose

Filter logs centrally before Datadog.

### Recommended For

- Kubernetes
- Docker
- Multi-cluster environments

---

## 5. Fluent Bit Filtering

### Purpose

Filter logs before forwarding to Datadog.

### Recommended For

- AKS
- EKS
- GKE
- OpenShift

---
# Pipeline Processor Catalog

Pipeline Processors are used to parse, enrich, normalize, categorize, and standardize logs after they are ingested into Datadog.

Each processor solves a different problem. Selecting the correct processor improves searchability, dashboard accuracy, and monitoring capabilities.

---

# Processor 01 — Grok Parser

## Objective

Convert unstructured log messages into searchable Datadog attributes.

---

## Purpose

Many applications generate plain text logs that Datadog cannot automatically understand.

The Grok Parser extracts meaningful fields from plain text logs and converts them into searchable attributes.

---

## When to Use

- Apache Access Logs
- NGINX Access Logs
- HAProxy Logs
- Custom Application Logs
- Legacy Java Applications
- Syslog Messages
- Linux Service Logs

---

## When NOT to Use

- JSON Logs
- Structured Logs
- Logs already containing searchable attributes

---

## Sample Log

```text
192.168.10.5 GET /login HTTP/1.1 200 145ms
```

---

## Before Processing

Datadog sees only:

```text
message
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

## Navigation

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

---

## Validation

Search

```
@http.status_code:200
```

Expected Result

Matching logs should be returned.

---

## Best Practices

- Use Grok only for plain text logs.
- Prefer JSON logging whenever possible.
- Test patterns before production.

---

## Business Impact

- Improves search capability
- Enables dashboards
- Enables monitors

---

## Cost Impact

No reduction in ingestion cost.

---

# Processor 02 — Status Remapper

## Objective

Normalize custom application statuses into Datadog standard statuses.

---

## Purpose

Different applications use different status values.

Example

```
SUCCESS

FAILED

WARNING
```

Datadog expects

```
INFO

ERROR

WARN
```

Status Remapper converts custom values into Datadog standard status values.

---

## When to Use

- Java Applications
- Spring Boot
- Python
- Node.js
- .NET

---

## When NOT to Use

When applications already send

```
INFO

WARN

ERROR
```

---

## Sample Log

```json
{
  "status":"FAILED"
}
```

---

## Recommended Mapping

| Source | Datadog |
|---------|----------|
| SUCCESS | INFO |
| FAILED | ERROR |
| WARNING | WARN |
| CRITICAL | ERROR |

---

## Navigation

Logs

↓

Configuration

↓

Pipelines

↓

Status Remapper

---

## Validation

Verify

```
status:error
```

instead of

```
FAILED
```

---

## Best Practices

Normalize all applications to common status values.

---

## Business Impact

Consistent dashboards and alerts.

---

# Processor 03 — Date Remapper

## Objective

Use the application timestamp instead of the Datadog ingestion timestamp.

---

## Purpose

Applications sometimes write timestamps different from when Datadog receives the logs.

Without Date Remapper, logs may appear out of order.

---

## When to Use

- Legacy Applications
- Java
- Windows Logs
- Custom Log Formats

---

## When NOT to Use

ISO-8601 formatted logs already parsed correctly.

---

## Sample Log

```
05-Aug-2026 10:15:25 Login Successful
```

---

## Navigation

Logs

↓

Configuration

↓

Pipelines

↓

Date Remapper

---

## Validation

Verify the event timestamp matches the application timestamp.

---

## Best Practices

Always verify timezone.

---

## Business Impact

Correct log timeline.

---

# Processor 04 — Attribute Remapper

## Objective

Rename attributes into standard Datadog naming.

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

Application C

```json
{
"source_ip":"10.10.10.5"
}
```

Convert all to

```
network.client.ip
```

---

## When to Use

Multiple applications use different field names.

---

## Business Impact

Standard dashboards across applications.

---

# Processor 05 — Category Processor

## Objective

Group similar values.

---

## Example

| Value | Category |
|--------|----------|
| 200 | Success |
| 201 | Success |
| 204 | Success |
| 400 | Client Error |
| 404 | Client Error |
| 500 | Server Error |
| 503 | Server Error |

---

## Business Impact

Simplified reporting.

---

# Processor 06 — Lookup Processor

## Purpose

Replace coded values with readable values.

Example

Before

```
country=91
```

After

```
India
```

---

# Processor 07 — URL Parser

Before

```
https://company.com/login?id=10
```

After

| Field | Value |
|--------|------|
| Host | company.com |
| Path | /login |
| Query | id=10 |

---

# Processor 08 — User-Agent Parser

Before

```
Mozilla/5.0 Chrome Windows
```

After

| Browser | Chrome |
|----------|--------|
| OS | Windows |
| Device | Desktop |

---

# Processor 09 — GeoIP Parser

Before

```
103.xxx.xxx.xxx
```

After

| Country | India |
|----------|-------|
| City | Bangalore |

---

# Processor 10 — Arithmetic Processor

Purpose

Perform numeric calculations.

Example

Before

```
duration=2500
```

After

```
2.5 Seconds
```

---

# Processor 11 — String Builder

Purpose

Combine multiple attributes.

Example

```
first_name

last_name
```

↓

```
full_name
```

---

# Processor 12 — Service Remapper

Purpose

Standardize service names.

Example

```
app=payment
```

↓

```
service=payment
```

---

# Processor 13 — Host Remapper

Purpose

Standardize host names.

Example

```
hostname=node01
```

↓

```
host=node01
```

---

# Processor 14 — Message Remapper

Purpose

Rename custom message fields.

Example

```
log_text
```

↓

```
message
```

---

# Processor 15 — Sensitive Data Scanner

Purpose

Mask confidential information.

Supported Data

- Password
- JWT
- API Keys
- OAuth Tokens
- Credit Cards
- PAN
- SSN
- Email Address

Before

```
Password=Admin123
```

After

```
Password=********
```

---

# Processor Selection Guide

| Requirement | Processor |
|-------------|-----------|
| Plain Text | Grok Parser |
| JSON | No Parser |
| Timestamp | Date Remapper |
| Status | Status Remapper |
| Rename Fields | Attribute Remapper |
| HTTP Status Group | Category Processor |
| Country Code | Lookup Processor |
| URL | URL Parser |
| Browser | User-Agent Parser |
| IP Location | GeoIP Parser |
| Numeric Conversion | Arithmetic Processor |
| Combine Fields | String Builder |
| Rename Service | Service Remapper |
| Rename Host | Host Remapper |
| Rename Message | Message Remapper |
| Mask Secrets | Sensitive Data Scanner |
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
| IP Address | GeoIP Parser |
| Country Code | Lookup Processor |
| Sensitive Data | Sensitive Data Scanner |

---

# Filtering Decision Matrix

| Scenario | Action | Recommended Layer |
|----------|--------|-------------------|
| DEBUG Logs | Drop | Application |
| TRACE Logs | Drop | Application |
| Health Checks | Drop | Agent |
| Kubernetes Readiness Probe | Drop | Agent |
| Kubernetes Liveness Probe | Drop | Agent |
| Kubernetes Startup Probe | Drop | Agent |
| Static Assets | Evaluate | Agent |
| HTTP 500 | Keep | Monitor |
| Login Failure | Keep | Monitor |
| Authentication Failure | Keep | Monitor |
| Payment Failure | Keep | Monitor |
| CrashLoopBackOff | Keep | Monitor |
| OOMKilled | Keep | Monitor |
| Agent Errors | Keep | Monitor |

---

# Processor Summary

| Processor | Purpose |
|------------|---------|
| Grok Parser | Parse unstructured logs |
| Status Remapper | Normalize status |
| Date Remapper | Correct timestamps |
| Attribute Remapper | Rename fields |
| Category Processor | Group values |
| Lookup Processor | Replace codes with values |
| URL Parser | Parse URLs |
| User-Agent Parser | Browser & OS detection |
| GeoIP Parser | IP location |
| Sensitive Data Scanner | Mask confidential data |

---

# Validation Checklist

- Verify logs are received.
- Verify parsed fields.
- Verify search queries.
- Verify dashboards.
- Verify monitors.
- Verify ingestion reduction.
- Verify sensitive information is masked.

---

# Rollback Procedure

If unexpected behavior occurs:

1. Disable the processor or filtering rule.
2. Save the configuration.
3. Restart the Datadog Agent if required.
4. Verify logs are visible.
5. Validate dashboards and monitors.

---

# Troubleshooting

| Problem | Possible Cause | Resolution |
|----------|---------------|------------|
| Missing Logs | Filter too broad | Review filter configuration |
| Missing Fields | Grok Parser issue | Update pattern |
| Wrong Timestamp | Date Remapper | Verify timestamp format |
| Status Not Parsed | Status Remapper | Update mapping |
| Duplicate Logs | Multiple collectors | Review Agent/Vector configuration |
| Sensitive Data Visible | Missing masking rule | Configure Sensitive Data Scanner |

---

# Best Practices

- Filter logs as early as possible.
- Prefer Application or Agent filtering over Exclusion Filters.
- Use JSON logging whenever possible.
- Never filter security events.
- Never filter payment failures.
- Never filter infrastructure failures.
- Validate every processor before production deployment.
- Document all custom parsing rules.

---

# Final Outcome

Following this SOP ensures that:

- Log processing is standardized.
- Pipeline processors are applied consistently.
- High-volume, low-value logs are filtered appropriately.
- Critical operational events are preserved.
- Sensitive information is protected.
- Datadog logging costs are optimized.
- Dashboards and monitors receive clean, high-quality log data.

---

# References

- Datadog Log Management Documentation
- Datadog Pipeline Processors Documentation
- Internal Observability Standards
- Platform Logging Guidelines
