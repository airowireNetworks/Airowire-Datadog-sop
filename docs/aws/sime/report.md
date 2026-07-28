<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Infrastructure Monitoring Report

**(Kubernetes Infrastructure Monitoring using Datadog)**

---

# Purpose of the Document

This document provides a standardized infrastructure monitoring report for the monitored Kubernetes environment. It summarizes the overall health of the Kubernetes infrastructure, including cluster status, pod health, host resource utilization, network activity, active monitoring alerts, Watchdog anomalies, and recommendations identified during the reporting period.

The report provides:

- Kubernetes Cluster Health Monitoring
- Host Resource Monitoring
- Pod Status Monitoring
- Container Restart Analysis
- Network Traffic Monitoring
- Active Monitor Alerts
- Watchdog Anomaly Detection
- Infrastructure Health Recommendations

---

# Scope

## In Scope

- Kubernetes Cluster Monitoring
- Host Resource Monitoring
- Pod Health Monitoring
- Container Restart Analysis
- CPU, Memory and Disk Monitoring
- Network Traffic Monitoring
- Datadog Infrastructure Dashboards
- Datadog Monitors
- Datadog Watchdog Analysis

## Out of Scope

- Application Code Debugging
- Application Performance Optimization
- Security Incident Investigation
- Functional Application Testing

---

# Monitoring Environment

| Component | Details |
|------------|----------|
| Report Date | 28 July 2026 |
| Monitoring Period | Last 24 Hours |
| Production Cluster | sw-production |
| Development Cluster | sw-development |
| Total Clusters | 2 |
| Total Worker Nodes | 12 |
| Datadog Agent Version | v7.67.0 |

---

# Overview of the Monitoring Solution

The Kubernetes infrastructure is monitored using Datadog Infrastructure Monitoring.

Datadog continuously collects infrastructure metrics, Kubernetes metrics, host metrics, container metrics, and monitoring alerts from all worker nodes.

The monitoring platform provides:

- Infrastructure Health Visibility
- Kubernetes Cluster Monitoring
- Resource Utilization Monitoring
- Alert Management
- Network Monitoring
- Automated Watchdog Anomaly Detection

---

# Architecture

```text
                    +----------------------+
                    | Kubernetes Clusters  |
                    | sw-production        |
                    | sw-development       |
                    +----------+-----------+
                               |
                        Datadog Agent
                               |
                               ▼
                  Infrastructure Metrics
                               |
             +-----------------+-----------------+
             |                 |                 |
             ▼                 ▼                 ▼
      Infrastructure      Dashboards       Monitors
        Monitoring
                               |
                               ▼
                    Datadog Watchdog
```

---

# Functional Components

| Component | Description |
|------------|-------------|
| Kubernetes Cluster | Hosts production and development workloads |
| Datadog Agent | Collects infrastructure metrics |
| Infrastructure Monitoring | CPU, Memory, Disk and Network Monitoring |
| Kubernetes Monitoring | Pod, Node and Cluster Health |
| Dashboards | Infrastructure Visualization |
| Monitors | Alert Generation |
| Watchdog | Automatic Anomaly Detection |

---

# Infrastructure Summary

| Cluster | Nodes | Memory per Node | Agent Version |
|----------|------:|----------------:|---------------|
| sw-production | 9 | ~128 GB | v7.67.0 |
| sw-development | 3 | ~64 GB | v7.67.0 |

Overall Environment

- Total Hosts : **12**
- Operating System : GNU/Linux
- Datadog Agent : v7.67.0

---

# Pod Status Overview

| Status | Count | Percentage |
|---------|------:|-----------:|
| Running | 967 | 86.0% |
| Completed | 156 | 13.9% |
| ContainerCreating | 1 | 0.1% |
| CrashLoopBackOff | 0 | 0% |
| Error / OOMKilled | 0 | 0% |

### Observation

No pods are currently in **CrashLoopBackOff**, **Error**, or **OOMKilled** state.

---

# Container Restart Analysis

Total Container Restarts : **183**

### Top Restarting Namespaces

| Namespace | Restarts | Description |
|------------|----------:|------------|
| ceph-csi-cephfs | 43 | Storage Plugins |
| kube-system | 22 | Kubernetes Components |
| sysdig-agent | 14 | Monitoring Agent |
| argocd | 13 | GitOps Controller |
| meinewand-pimcore | 10 | Application Workload |
| meinewand-shopware | 10 | Application Workload |
| elastic-blackbit | 10 | Elasticsearch |
| hewi | 9 | Application Workload |

### Observation

Most container restarts belong to long-running infrastructure workloads. No active crash loops are currently detected.

---

# Host Resource Utilization

### CPU Utilization

| Host | Average CPU |
|------|------------:|
| k8s-prod-worker-5 | 43.7% |
| k8s-dev-worker-1 | 27.7% |
| k8s-dev-worker-2 | 27.6% |

### Memory Utilization

| Host | Free Memory |
|------|------------:|
| k8s-dev-worker-1 | 16.6% |
| k8s-prod-worker-3 | 21.2% |
| k8s-prod-worker-1 | 22.7% |

### Disk Utilization

| Host | Root Disk Usage |
|------|----------------:|
| k8s-dev-worker-1 | 75.4% |
| k8s-prod-worker-5 | 74.0% |
| k8s-prod-worker-8 | 73.7% |

---

# Network Monitoring

The monitoring platform identified elevated inbound and outbound network traffic during the reporting period.

The traffic should be reviewed to determine whether it represents expected workload behavior or abnormal network activity.

---

# Active Monitor Alerts

| Severity | Monitor | Status |
|-----------|---------|--------|
| Critical | High Network Traffic (Received) | Alert |
| Critical | High Network Traffic (Sent) | Alert |
| Critical | Disk Usage Forecast | Alert |
| Critical | Persistent Daily Container Crashes | Alert |

---

# Watchdog Analysis

Datadog Watchdog detected the following anomalies.

| Type | Count |
|------|------:|
| Log Pattern Anomalies | 308 |
| OOM Forecasts | 12 |

Additional Watchdog Findings

- Redis OOM Kill Forecast
- Redis Connection Timeouts
- Elasticsearch Authentication Failures
- SSL Certificate CN Mismatch
- Duplicate Ingress Hostnames
- Services Without Active Endpoints

---

# Infrastructure Findings

| Finding | Risk |
|-----------|------|
| No pods in CrashLoopBackOff | Low |
| High Disk Usage | Medium |
| High CPU Utilization | Medium |
| Low Free Memory | Medium |
| High Network Traffic | Medium |
| Persistent Container Restarts | High |

---

# Operational Validation Checklist

| Validation | Status |
|------------|--------|
| Kubernetes Cluster Healthy | ✅ |
| Infrastructure Metrics Available | ✅ |
| Node Monitoring Active | ✅ |
| Pod Monitoring Active | ✅ |
| Network Monitoring Active | ✅ |
| Watchdog Active | ✅ |
| Alerts Configured | ✅ |

---

# Recommendations

- Review disk utilization on worker nodes.
- Remove unused images and volumes.
- Investigate Redis memory pressure.
- Review workload distribution across worker nodes.
- Resolve Elasticsearch authentication issues.
- Correct SSL certificate configuration.
- Investigate persistent restart alerts.
- Continue proactive infrastructure monitoring.

---

# Observations

During the monitoring period, the following observations were made.

- Kubernetes clusters remained operational.
- No active pod failures were detected.
- Infrastructure monitoring is functioning correctly.
- Active alerts require operational review.
- Watchdog successfully identified infrastructure anomalies.

---

# Benefits

The monitoring solution provides

- Centralized Infrastructure Monitoring
- Kubernetes Health Monitoring
- Host Resource Visibility
- Automated Alerting
- Capacity Planning
- Faster Incident Detection
- Improved Platform Reliability

---

# Final Outcome

The Kubernetes infrastructure remains healthy and operational.

No active pod failures or crash loops were identified during the reporting period.

The primary recommendations include improving disk utilization, reviewing memory allocation, investigating high network activity, resolving Redis memory pressure, and addressing persistent infrastructure alerts to ensure continued platform reliability.

---

# Contact

For more information regarding this report, please contact Airowire Solutions.

Patrick Schmidt

patrick@airowire.com

Piyush Choudhary

piyush@airowire.com

Dr. Shivanand Poojara

shivanand@airowire.com
