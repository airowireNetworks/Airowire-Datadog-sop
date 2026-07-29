<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Standard Operating Procedure (SOP)

# Datadog Dashboard Creation

---

# Purpose

This document provides a standardized procedure for creating dashboards in Datadog to monitor infrastructure, applications, Kubernetes workloads, logs, cloud resources, and custom metrics.

---

# Scope

## In Scope

- Infrastructure Dashboards
- Kubernetes Dashboards
- Application Dashboards
- Log Dashboards
- APM Dashboards
- Custom Dashboards

## Out of Scope

- Datadog Agent Installation
- Integration Setup
- Monitor Creation
- Alert Configuration

---

# Prerequisites

Before creating a dashboard, ensure the following:

- Datadog account with Editor/Admin access
- Required integrations are configured
- Metrics and logs are available
- Monitoring requirements are identified

---

# Dashboard Creation Workflow

```text
Login to Datadog
        ↓
Navigate to Dashboards
        ↓
Create New Dashboard
        ↓
Add Widgets
        ↓
Configure Queries
        ↓
Arrange Widgets
        ↓
Save Dashboard
        ↓
Validate Dashboard
```

---

# Step 1 – Navigate to Dashboards

Login to your Datadog account.

Navigate to:

```text
Dashboards
    ↓
New Dashboard
```

Click **New Dashboard**.

<p align="center">
    <img src="/images/dashboard-step1.png" width="900"/>
</p>

---

# Step 2 – Create a New Dashboard

Enter the following information:

| Field | Example |
|--------|---------|
| Dashboard Name | Infrastructure Overview |
| Description | Production Infrastructure Dashboard |

Click:

```text
Create Dashboard
```

After the dashboard is created, the dashboard editor opens.

<p align="center">
    <img src="/images/dashboard-step2.png" width="900"/>
</p>

---

# Step 3 – Add Widgets

Click:

```text
Add Widgets
```

Choose the required widget type.

Common widgets include:

- Timeseries
- Query Value
- Top List
- Table
- List
- Pie Chart
- Bar Chart
- Treemap
- Distribution
- Heatmap
- Geomap
- Host Map
- Service Map

<p align="center">
    <img src="/images/dashboard-step3.png" width="900"/>
</p>

---

# Step 4 – Configure Widget

After selecting a widget, configure:

- Metric
- Query
- Filters
- Aggregation
- Group By
- Visualization
- Time Range

Example query:

```text
avg:system.cpu.user{env:prod}
```

Click **Save** to add the widget to the dashboard.

---

# Step 5 – Arrange Dashboard

Drag and resize widgets as required.

Recommended layout:

```text
Infrastructure
--------------
CPU
Memory
Disk

Networking
----------
Bandwidth
Latency
Errors

Applications
------------
Requests
Response Time
Error Rate

Logs
----
Error Logs
Log Volume
```

---

# Step 6 – Save Dashboard

Click:

```text
Save Dashboard
```

Provide a meaningful dashboard name if prompted.

---

# Step 7 – Dashboard Settings

Click the dashboard options menu to access additional settings.

Available options include:

- TV Mode
- Auto Display Overlays
- Collapse All Groups
- Expand All Groups
- Duplicate to Screenboard
- Notifications
- Permissions
- Import Dashboard JSON
- Export Dashboard JSON
- Copy Dashboard JSON
- Export Kubernetes Manifest
- Copy Kubernetes Manifest
- Delete Dashboard

<p align="center">
    <img src="/images/dashboard-step4.png" width="900"/>
</p>

---

# Step 8 – Share Dashboard

Click **Share** to share the dashboard with users or teams.

Sharing options include:

- Team Access
- Read Only Access
- Editable Access
- Public Link (if enabled)

---

# Step 9 – Validate Dashboard

Verify the following:

- Widgets display data correctly.
- Queries execute successfully.
- Filters are applied correctly.
- Dashboard loads without errors.
- Time range is correct.

---

# Best Practices

- Use meaningful dashboard names.
- Group similar widgets together.
- Use template variables (Environment, Cluster, Namespace, Service).
- Maintain a consistent layout.
- Avoid duplicate widgets.
- Keep dashboards simple and easy to understand.

---

# Validation Checklist

| Validation | Status |
|------------|--------|
| Dashboard Created | ☐ |
| Widgets Added | ☐ |
| Queries Configured | ☐ |
| Dashboard Saved | ☐ |
| Dashboard Shared | ☐ |
| Dashboard Validated | ☐ |

---

# Final Outcome

The Datadog dashboard has been successfully created and configured. The dashboard provides centralized visibility into infrastructure, applications, Kubernetes resources, logs, and cloud services, enabling effective monitoring and troubleshooting.

---

# Contact

For any questions regarding this SOP, please contact the Observability Team.

Dr. Shivanand Poojara

shivanand@airowire.com


Aakanksha

Aakanksha@airowire.com
