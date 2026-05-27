<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# SOP — Datadog Java Application Monitoring Setup

---

# Project

Enterprise Java Application Observability using Datadog

---

# Service Provider

**Airowire Networks Pvt. Ltd.**

---

# 1. Objective

To configure end-to-end observability for Java applications using Datadog including:

- Real User Monitoring (RUM)
- Java APM
- JVM Monitoring
- Log Collection
- Kubernetes Monitoring
- Dashboards
- Alerting

---

# 2. Scope

This SOP supports:

- Java applications
- Spring Boot applications
- Microservices
- Kubernetes workloads
- Frontend + Backend monitoring

---

# 3. Architecture Overview

```text
Frontend Users
     ↓
Datadog RUM
     ↓
Java Application
     ↓
Datadog APM
     ↓
Infrastructure / Kubernetes
     ↓
Logs + Metrics + Traces
     ↓
Dashboards / Alerts
```

---

# 4. Prerequisites

| Requirement | Status |
|---|---|
| Datadog Account | Required |
| Datadog API Key | Required |
| Java Application Access | Required |
| Kubernetes Access (Optional) | Optional |
| Linux Server Access | Required |
| Internet Connectivity | Required |

---

# PART 1 — Create Datadog Account

## Step 1 — Login to Datadog

Open:

```text
Datadog Login
```

Purpose:

Datadog acts as the centralized observability platform for:

- metrics
- logs
- traces
- RUM data
- alerts

---

# PART 2 — Configure Real User Monitoring (RUM)

## Step 2 — Navigate to RUM

Navigation:

```text
Digital Experience
→ Real User Monitoring
→ New Application
```

Purpose:

RUM monitors:

- user activity
- browser errors
- frontend performance
- session behavior

---

## Step 3 — Select Application Type

Choose:

```text
JavaScript
```

Examples:

- React
- Angular
- Vue
- Next.js

---

## Step 4 — Select Instrumentation Type

Choose:

```text
Client-side (Browser SDK)
```

Purpose:

Installs monitoring directly inside user browsers.

---

## Step 5 — Select Installation Method

Choose:

```text
Package Manager
```

Examples:

- npm
- yarn
- pnpm

---

## Step 6 — Install Browser SDK

Run:

```bash
npm install @datadog/browser-rum
```

Purpose:

Installs Datadog frontend monitoring SDK.

---

## Step 7 — Initialize RUM

Add inside:

- main.js
- index.js
- app.js

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: 'APP_ID',
  clientToken: 'CLIENT_TOKEN',
  site: 'datadoghq.com',
  service: 'frontend-app',
  env: 'production',
  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackResources: true,
  trackUserInteractions: true,
  trackLongTasks: true,
});

datadogRum.startSessionReplayRecording();
```

---

## Why These Settings Matter

| Setting | Purpose |
|---|---|
| applicationId | Identifies application |
| clientToken | Browser SDK authentication |
| service | Service name |
| env | Environment |
| version | Application version |
| trackResources | Monitor APIs/files |
| trackUserInteractions | Track user actions |
| sessionReplay | Replay sessions |

---

## Step 8 — Validate RUM

Generate activity:

- login
- page navigation
- button clicks
- API requests

Return to Datadog and validate incoming sessions.

---

# PART 3 — Configure Java APM

## Step 9 — Navigate to APM

Navigation:

```text
APM
→ Getting Started
→ Java
```

Purpose:

APM monitors:

- API latency
- JVM metrics
- distributed tracing
- database calls
- backend errors

---

## Step 10 — Install Datadog Agent

Run on Linux server:

```bash
DD_API_KEY=<YOUR_API_KEY> \
bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

---

## Step 11 — Verify Agent Status

Run:

```bash
sudo datadog-agent status
```

Verify:

```text
Agent running successfully
```

---

## Step 12 — Download Java Tracer

Run:

```bash
wget https://dtdg.co/latest-java-tracer -O dd-java-agent.jar
```

Purpose:

Enables automatic Java tracing.

---

## Step 13 — Configure Java Application

Start application:

```bash
java -javaagent:/path/dd-java-agent.jar \
     -Ddd.service=my-java-app \
     -Ddd.env=production \
     -Ddd.version=1.0.0 \
     -jar app.jar
```

---

## Java Parameter Purpose

| Parameter | Purpose |
|---|---|
| -javaagent | Enable tracing |
| dd.service | Service name |
| dd.env | Environment |
| dd.version | Application version |

---

## Step 14 — Verify Traces

Navigation:

```text
APM
→ Services
```

Verify:

- latency
- throughput
- errors
- dependencies

---

# PART 4 — Enable Log Monitoring

## Step 15 — Enable Logs

Edit:

```text
/etc/datadog-agent/datadog.yaml
```

Set:

```yaml
logs_enabled: true
```

---

## Step 16 — Configure Java Logs

Create:

```text
/etc/datadog-agent/conf.d/java.d/conf.yaml
```

Add:

```yaml
logs:
  - type: file
    path: /var/log/myapp/application.log
    service: java-app
    source: java
```

Purpose:

Centralized Java log ingestion.

---

## Step 17 — Restart Datadog Agent

Run:

```bash
sudo systemctl restart datadog-agent
```

---

# PART 5 — Kubernetes Monitoring (Optional)

## Step 18 — Install Datadog on Kubernetes

Add Helm repository:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Install:

```bash
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<API_KEY>
```

---

## Step 19 — Verify Kubernetes Metrics

Navigation:

```text
Infrastructure
→ Kubernetes
```

Verify:

- pod CPU
- memory
- restarts
- cluster health

---

# PART 6 — Dashboards and Alerts

## Step 20 — Create Dashboard

Navigation:

```text
Dashboards
→ New Dashboard
```

Recommended widgets:

- JVM Memory
- API latency
- Error rate
- Pod CPU
- User sessions

---

## Step 21 — Create Alerts

Navigation:

```text
Monitors
→ New Monitor
```

Recommended alerts:

- CPU > 80%
- API latency spike
- Pod restart
- Memory leak
- Error spike

---

# 5. Operational Monitoring

Continuously monitor:

| Component | Monitoring Item |
|---|---|
| JVM | Heap usage |
| Java App | Request latency |
| Kubernetes | Pod health |
| Logs | Error spikes |
| RUM | User sessions |
| Datadog Agent | Connectivity |

---

# 6. Troubleshooting Guide

## Issue 1 — No Traces Visible

Verify:

- Datadog Agent running
- Java tracer attached
- Correct API key
- Network connectivity

---

## Issue 2 — No Logs Visible

Verify:

- logs_enabled: true
- correct log file path
- agent restart completed

---

## Issue 3 — Kubernetes Metrics Missing

Verify:

- Helm deployment successful
- Datadog pod status
- Cluster permissions

---

## Issue 4 — RUM Data Missing

Verify:

- Browser SDK loaded
- Correct client token
- Frontend deployed correctly

---

# 7. Rollback Procedure

To disable monitoring:

1. Remove Datadog Java agent
2. Remove Browser SDK
3. Stop Datadog Agent
4. Remove Helm deployment
5. Verify ingestion stops

---

# 8. Validation Checklist

| Validation Item | Status |
|---|---|
| Datadog Agent Running | ☐ |
| Java Traces Visible | ☐ |
| JVM Metrics Visible | ☐ |
| Logs Visible | ☐ |
| RUM Sessions Visible | ☐ |
| Kubernetes Metrics Visible | ☐ |
| Dashboards Created | ☐ |
| Alerts Configured | ☐ |

---

# 9. Expected Outcome

After successful implementation:

- Full-stack observability enabled
- Java APM operational
- Frontend RUM enabled
- Logs centralized
- Kubernetes visibility enabled
- Dashboards operational
- Alerting configured

---

# 10. References

- [Datadog RUM Documentation](https://docs.datadoghq.com/real_user_monitoring/)
- [Datadog Java APM Documentation](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/)
- [Datadog Agent Documentation](https://docs.datadoghq.com/agent/)
- [Datadog Kubernetes Monitoring](https://docs.datadoghq.com/containers/kubernetes/)
- [Datadog Dashboard Documentation](https://docs.datadoghq.com/dashboards/)

---

# Contact

For more information about this document and its contents please contact Airowire Solutions:

- Dr. Shivanand Poojara — shivanand@airowire.com
- Anil Kumar - Anil@airowire.com
- Mohammed Saqlain - Mohammed@airowire.com
