<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# SOP — Datadog Entra ID SIEM Log Push using ARM Template

---

# Project

Microsoft Entra ID SIEM Integration with Datadog

---

# Service Provider

**Airowire Networks Pvt. Ltd.**

---

# Reference

Based on enterprise SIEM onboarding requirements.

---

# 1. Objective

To configure Microsoft Entra ID diagnostic log streaming into Datadog SIEM using:

- Azure Event Hub
- Azure ARM Template Deployment
- Datadog Azure Forwarder Function
- Event Hub Streaming Pipeline

This implementation enables centralized enterprise identity monitoring and DevSecOps observability.

---

# 2. Scope

This SOP covers:

- Microsoft Entra ID diagnostic log onboarding
- Azure Event Hub provisioning
- Datadog Azure Function deployment
- SIEM-grade identity telemetry streaming
- Enterprise identity risk monitoring
- Service Principal monitoring
- Managed Identity monitoring
- Risk event ingestion into Datadog SIEM

---

# 3. Prerequisites

Ensure the following prerequisites are completed before implementation:

| Requirement | Status |
|---|---|
| Azure Subscription Access | Required |
| Microsoft Entra Admin Access | Required |
| Datadog Account Access | Required |
| Datadog API Key | Required |
| Contributor Role on Resource Group | Required |
| Azure Event Hub Permissions | Required |
| Azure Function Deployment Permissions | Required |

---

# 4. Architecture Overview

```text
Microsoft Entra ID
        ↓
Diagnostic Settings
        ↓
Azure Event Hub
        ↓
Datadog Azure Forwarder Function
        ↓
Datadog SIEM
        ↓
Dashboards / Alerts / Detection Rules
```

---

# 5. Implementation Workflow

The implementation consists of:

- Provision Resource Group
- Deploy ARM Template
- Configure Event Hub Scaling
- Configure Least-Privilege SAS Policies
- Enable Entra ID Diagnostic Streaming
- Validate Datadog SIEM Ingestion

---

# Step 1 — Provision the Production Resource Container

Before launching the automated template deployment,
create the dedicated logical boundary for the monitoring infrastructure.

---

## Azure Portal Navigation

Open:

```text
portal.azure.com
```

Navigate:

```text
Azure Portal
→ Resource Groups
→ Create
```

---

## Configure Resource Group

Configure:

| Field | Description |
|---|---|
| Subscription | Target production subscription |
| Resource Group | Example: rg-monitoring-prod-001 |
| Region | Primary operational region |

Click:

```text
Review + Create
Create
```

---

# Step 2 — Launch and Configure the Production Datadog ARM Template

Deploy the official Datadog backend resources automatically into the resource group.

---

## Open ARM Template Deployment URL

Open:

```text
https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json
```

---

## Configure ARM Template Parameters

| Parameter | Example Value | Purpose |
|---|---|---|
| Subscription | Production Subscription | Billing scope |
| Resource Group | rg-monitoring-prod-001 | Resource container |
| Region | Auto-populated | Compliance boundary |
| Datadog Site | datadoghq.com | Datadog ingestion endpoint |
| API Key | Datadog API Key | Authentication |
| Send Activity Logs | false | Isolate identity logs |
| Datadog Tags | env:production,source:azure_active_directory,siem:true | Metadata tagging |
| EventHub Namespace | airowire-siem-prod-eh | Unique namespace |
| EventHub Name | datadog-entra-siem-stream | Streaming channel |
| EventHub Partition Count | 8 | High-volume throughput |

---

## Deploy Resources

Click:

```text
Review + Create
Create
```

Monitor deployment until status shows:

```text
Succeeded
```

Resources deployed:

- Azure Function
- Event Hub Namespace
- Event Hub Stream

---

# Step 3 — Enforce SIEM-Grade Throughput and Scale

Production environments require protection against authentication bursts and ingestion spikes.

---

## Configure Event Hub Auto Inflate

Navigate:

```text
Resource Group
→ Event Hub Namespace
→ Scale
```

Enable:

```text
Auto-Inflate
```

Recommended:

| Setting | Value |
|---|---|
| Auto Inflate | Enabled |
| Maximum Throughput Units | 4 or higher |

Purpose:

- Prevent throttling
- Prevent 403 Server Busy errors
- Handle large authentication bursts

Click:

```text
Save
```

---

# Step 4 — Configure Least-Privilege SAS Policies

Do NOT use root administrative keys for routing.

Use dedicated least-privilege streaming access.

---

## Configure Shared Access Policy

Navigate:

```text
Event Hub Namespace
→ Shared Access Policies
→ Add
```

Configure:

| Field | Value |
|---|---|
| Policy Name | sap-entra-siem-send-only |
| Permissions | Send Only |

Do NOT enable:

- Manage
- Listen

Purpose:

- Enforce least-privilege compliance
- Reduce security exposure

Click:

```text
Create
```

---

# Step 5 — Instrument Advanced DevSecOps Diagnostic Logs in Entra ID

Bridge the identity layer into Datadog SIEM.

---

## Open Microsoft Entra Admin Center

Open:

```text
entra.microsoft.com
```

Navigate:

```text
Identity
→ Monitoring & Health
→ Diagnostic Settings
```

Click:

```text
Add Diagnostic Setting
```

---

## Configure Diagnostic Settings

### Diagnostic Setting Name

```text
Datadog-SIEM-Log-Streaming-Prod
```

---

## Enable Required Log Categories

Enable:

- AuditLogs
- SignInLogs
- NonInteractiveUserSignInLogs
- ServicePrincipalSignInLogs
- ManagedIdentitySignInLogs
- UserRiskEvents
- RiskyUsers
- RiskyServicePrincipals
- ServicePrincipalRiskEvents

---

## Configure Event Hub Streaming

Enable:

```text
Stream to an Event Hub
```

Configure:

| Field | Value |
|---|---|
| Subscription | Production Subscription |
| Event Hub Namespace | airowire-siem-prod-eh |
| Event Hub Name | datadog-entra-siem-stream |
| Event Hub Policy | sap-entra-siem-send-only |

Click:

```text
Save
```

---

# Step 6 — SIEM Pipeline Verification

Confirm the telemetry pipeline is processing logs successfully.

---

## Install Datadog Entra ID Integration

Navigation:

```text
Datadog
→ Integrations
→ Integration Catalog
→ Microsoft Entra ID
```

Click:

```text
Install Integration
```

---

## Allow Warm-Up Time

Allow:

```text
10–15 minutes
```

for Azure Function runtime initialization.

---

## Trigger Test Events

Generate:

- Authentication activity
- Service Principal authentication
- CI/CD pipeline activity
- Azure Managed Identity activity

---

## Validate Logs in Datadog

Navigation:

```text
Datadog
→ Logs
→ Search
```

Use query:

```text
source:azure_active_directory env:production
```

Verify logs appear successfully.

---

# 7. Operational Monitoring

Monitor continuously:

| Component | Monitoring Item |
|---|---|
| Event Hub | Throughput |
| Event Hub | Throttling |
| Azure Function | Invocation failures |
| Azure Function | Runtime health |
| Datadog | SIEM ingestion |
| Datadog | Log indexing |
| Datadog | Parsing failures |

---

# 8. Troubleshooting Guide

## Issue 1 — Logs Not Visible in Datadog

Verify:

- Event Hub status
- Diagnostic settings
- Datadog API key
- Azure Function health
- Event Hub streaming configuration

---

## Issue 2 — Event Hub Throttling

Verify:

- Auto Inflate enabled
- Throughput units increased
- Partition count sufficient

---

## Issue 3 — Azure Function Failures

Verify:

- Function App runtime
- Application Insights logs
- Event Hub trigger configuration
- Datadog connectivity

---

## Issue 4 — SIEM Parsing Issues

Verify:

- Correct Datadog integration installed
- Proper source tagging
- Diagnostic categories enabled

---

# 9. Rollback Procedure

To disable SIEM streaming:

1. Remove Entra ID diagnostic settings
2. Disable Event Hub streaming
3. Disable Azure Function
4. Verify ingestion stops
5. Retain audit logs if required

---

# 10. Cost Considerations

The following services may incur additional cost:

| Service | Cost Driver |
|---|---|
| Azure Event Hub | Throughput Units |
| Azure Function | Executions |
| Datadog | Indexed log volume |
| Azure Diagnostic Logs | Streaming volume |
| Storage | Retention |

Validate retention and indexing strategies according to enterprise compliance requirements.

---

# 11. Validation Checklist

| Validation Item | Status |
|---|---|
| ARM Template Deployment Successful | ☐ |
| Event Hub Namespace Active | ☐ |
| Auto Inflate Enabled | ☐ |
| SAS Policy Created | ☐ |
| Entra Diagnostic Settings Active | ☐ |
| Azure Function Running | ☐ |
| Logs Visible in Datadog | ☐ |
| SIEM Parsing Successful | ☐ |

---

# 12. Deliverables

Upon successful completion:

- Entra ID SIEM streaming operational
- Azure Event Hub configured
- Datadog Azure Function deployed
- Identity telemetry visible in Datadog
- Enterprise SIEM ingestion validated
- DevSecOps identity monitoring enabled

---

# 13. References

- [Microsoft Entra Diagnostic Settings Documentation](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/)
- [Azure Event Hub Documentation](https://learn.microsoft.com/en-us/azure/event-hubs/)
- [Datadog Azure Integration Documentation](https://docs.datadoghq.com/integrations/azure/)
- [Datadog Azure Log Forwarding](https://docs.datadoghq.com/logs/guide/azure-logging-guide/)
- [Azure ARM Template Documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/)

---

# Contact

For more information about this document and its contents please contact Airowire Solutions:

- Patrick Schmidt — patrick@airowire.com
- Piyush Choudhary — piyush@airowire.com
- Dr. Shivanand Poojara — shivanand@airowire.com
