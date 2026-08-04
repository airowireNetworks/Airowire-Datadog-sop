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

## 6. Processing Pipelines

### Purpose

Parse and enrich logs.

### Common Processors

- Grok Parser
- Date Remapper
- Status Remapper
- Attribute Remapper
- Category Processor
- Lookup Processor
- URL Parser
- User-Agent Parser
- GeoIP Parser

---

## 7. Index Routing

### Purpose

Store different logs in different indexes.

Examples:

- Production Logs
- Development Logs
- Security Logs

---

## 8. Exclusion Filters

### Purpose

Reduce indexed log volume.

### Important

Use only when earlier filtering is not possible.

---

## 9. Sampling

### Purpose

Store only a percentage of high-volume logs.

Example

100,000 logs

↓

Store 10%

↓

Discard 90%

---

## 10. Sensitive Data Scanner

### Purpose

Mask confidential information.

Supported Examples

- Password
- JWT
- API Keys
- Credit Card
- PAN
- OAuth Token

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
