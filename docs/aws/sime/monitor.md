<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Standard Operating Procedure (SOP)

# Datadog Metric Monitor Configuration

---

# Purpose

This document provides the standardized procedure for creating and configuring Metric Monitors in Datadog. Metric Monitors continuously evaluate infrastructure and application metrics and generate alerts whenever predefined threshold values are exceeded.

---

# Scope

## In Scope

- Metric Monitor Creation
- Alert Threshold Configuration
- Notification Configuration
- Monitor Validation
- Monitor Testing

## Out of Scope

- Dashboard Creation
- Datadog Agent Installation
- Integration Configuration

---

# Prerequisites

Before creating a monitor, ensure the following:

- Datadog account with Editor or Admin permissions.
- Datadog Agent is successfully reporting metrics.
- Required cloud or infrastructure integrations are configured.
- Notification channels (Email, Slack, Microsoft Teams, PagerDuty, etc.) are available.

---

# Monitor Configuration Workflow

```text
Login to Datadog
        ↓
Monitoring
        ↓
Monitors
        ↓
New Monitor
        ↓
Select Metric Monitor
        ↓
Configure Query
        ↓
Configure Thresholds
        ↓
Configure Notifications
        ↓
Review Monitor
        ↓
Save Monitor
        ↓
Validate Monitor
```

---

# Step 1 – Login to Datadog

## Objective

Access the Datadog Portal.

## Procedure

1. Open the Datadog URL.
2. Login using your credentials.

## Expected Result

The Datadog home page is displayed.

---

# Step 2 – Navigate to Monitors

Navigate to:

```text
Monitoring

↓

Monitors
```

Click

```text
New Monitor
```

## Expected Result

The **Select Monitor Type** page appears.

<p align="center"><img src="/images/m1.png" width="600"/></p>


---

# Step 3 – Select Monitor Type

Select

```text
Metric
```

Datadog provides multiple monitor types:

- Metric
- Log
- Process
- APM
- Service Check
- Composite
- Network
- SLO
- Synthetic

For this SOP, select **Metric**.

<p align="center"><img src="/images/m2.png" width="600"/></p>


---

# Step 4 – Configure Metric Query

Search for the required metric.

Example

```text
system.cpu.user
```

Configure:

- Metric
- Aggregation
- Time Window
- Scope

Example query

```text
avg(last_5m):avg:system.cpu.user{env:prod}
```

## Note

If the metric is not visible, verify that the Datadog Agent is sending metrics.



---

# Step 5 – Apply Scope

Filter the monitor using tags.

Examples

```text
env:prod

service:web

cluster:production

host:web01
```

Using tags limits the monitor to specific resources.


---

# Step 6 – Configure Alert Thresholds

Configure the threshold values.

| Status | Example |
|---------|---------|
| Warning | 70 |
| Critical | 90 |

Configure:

- Warning Threshold
- Critical Threshold
- Trigger Condition

## Example

CPU > 70%

Warning

CPU > 90%

Critical


---

# Step 7 – Configure Evaluation

Configure:

- Evaluation Window
- Evaluation Delay
- Require Full Window
- New Group Delay

Recommended evaluation window

```text
Last 5 Minutes
```


---

# Step 8 – Configure Notifications

Enter the monitor details.

Example Monitor Name

```text
Production CPU Utilization
```

Example Alert Message

```text
High CPU utilization detected.

Host : {{host.name}}

Current Value : {{value}}

Please investigate immediately.

@slack-devops

admin@example.com
```

Configure notification recipients.

- Email
- Slack
- Microsoft Teams
- PagerDuty
- Webhook

<p align="center"><img src="/images/m3.png" width="600"/></p>

---

# Step 9 – Configure Advanced Options

Review the advanced settings.

- Notify No Data
- Auto Resolve
- Renotify
- Timeout
- Include Tags

Enable only the options required for your environment.



---

# Step 10 – Preview Monitor

Review:

- Query
- Thresholds
- Trigger Preview
- Notification Message

Ensure there are no validation errors.

---

# Step 11 – Save Monitor

Click

```text
Save
```

The monitor starts evaluating data immediately.


---

# Step 12 – Validate Monitor

Navigate to

```text
Monitoring

↓

Manage Monitors
```

Verify:

- Monitor Status
- Last Triggered
- Trigger History
- Notifications

<p align="center"><img src="/images/m4.png" width="600"/></p>

---

# Step 13 – Test Monitor

Generate a condition that exceeds the configured threshold.

Examples

- Generate CPU load
- Increase Memory usage
- Simulate Application Traffic

Verify:

- Monitor changes to **Alert**
- Notification is received
- Recovery notification is generated


---

# Best Practices

- Use meaningful monitor names.
- Configure realistic thresholds.
- Scope monitors using tags.
- Avoid duplicate monitors.
- Include remediation steps in alert messages.
- Test monitors before production deployment.
- Review thresholds periodically.

---

# Troubleshooting

## Metric Not Found

Verify:

- Datadog Agent is running.
- Metric exists.
- Integration is healthy.

---

## Monitor Never Triggers

Verify:

- Query syntax.
- Threshold values.
- Evaluation window.
- Tags and filters.

---

## Notification Not Received

Verify:

- Notification integration is configured.
- Recipient is correct.
- Monitor entered the Alert state.

---

---

# Final Outcome

The Datadog Metric Monitor has been successfully configured and validated. The monitor continuously evaluates the selected metric and automatically generates alerts when configured thresholds are met.

---

# Contact

For questions regarding this SOP, please contact the Observability Team.

Dr. Shivanand Poojara

shivanand@airowire.com


Aakanksha

Aakanksha@airowire.com

