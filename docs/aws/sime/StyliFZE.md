<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Datadog Account – Current Environment Understanding & Usage Assessment

---

## Account Overview

| Field | Details |
|---|---|
| **Monitoring Platform** | Datadog |
| **Account / Environment** | StyliFZE |
| **Review Date** | 04 November 2026 |
| **Primary Scope** | Subscription, Infrastructure, Kubernetes, Monitoring, Dashboards and Log Management |
| **Assessment Type** | Current Environment Understanding |

---

# 1. Executive Summary

This report documents our current understanding of the Datadog environment, including the existing subscription, infrastructure utilization, Kubernetes resources, monitoring configuration, dashboards and log-management activity.

The key observations are:

- Existing Infra Enterprise commitment: **50 hosts**.
- Existing APM Enterprise commitment: **18 hosts**.
- Current reported Infra Host usage: **18 hosts**.
- Containers Explorer inventory: **583 containers**.
- Kubernetes Overview: **1 cluster, 20 nodes, 399 pods and 613 containers**.
- November container usage: **23.1K container-hours**.
- Total monitors: **21**.
- Total dashboards: **10**.
- Log Management dashboard: **5.1G ingested and 5.1G indexed logs**.
- Overall exclusion ratio: **0.00%**.

The differences in container and node counts require further validation. The relationship between the 50-host commitment and container entitlement also needs confirmation.

---

# 2. Existing Subscription Commitments

| Service / Feature | Committed Quantity |
|---|---:|
| Infra Enterprise | 50 hosts |
| APM Enterprise | 18 hosts |
| Ingested Logs | 12,750 GB |
| Flex Logs Stored (Starter) | 6,600 M |

---

# 3. Infrastructure and Container Utilization

## 3.1 Infrastructure Usage

| Metric | Quantity |
|---|---:|
| Committed Infra Enterprise Hosts | 50 |
| Current Infra Hosts | 18 |
| Difference | 32 |

Current reported infrastructure usage represents **36% of the 50-host commitment**.

The remaining 32 hosts represent the difference between committed quantity and reported usage. This does not automatically establish additional available container entitlement.

## 3.2 Container Inventory

| Resource | Count |
|---|---:|
| Containers Explorer | 583 |
| Kubernetes Overview | 613 |

The two views currently report different container counts. This requires validation using a consistent time range and resource scope.

## 3.3 Points Requiring Clarification

1. Do we have additional hosts running containers beyond the 18 reported Infra Hosts?
2. Are there other environments or Kubernetes clusters contributing to container usage?
3. Is the container entitlement calculated against all 50 committed hosts or actual hosts in use?
4. Are the reported containers within the existing subscription entitlement?

---

# 4. November 2026 Usage Overview

| Billing Dimension | Current Usage |
|---|---:|
| AI Credits | 68 AI credits |
| Containers | 23.1K container-hours |
| Custom Metrics | 4 |
| Flex Logs Stored (Starter) | 10.5B logs |
| Infra Hosts | 18 |
| Ingested Logs | 878 GB |

---

# 5. Kubernetes Environment Overview

| Kubernetes Resource | Quantity |
|---|---:|
| Clusters | 1 |
| Namespaces | 48 |
| Nodes | 20 |
| Deployments | 88 |
| Pods | 399 |
| Containers | 613 |
| Replica Sets | 155 |
| Services | 174 |

## 5.1 Cluster Inventory

**Cluster Name:** `stylishopprod`

The cluster inventory reports 19 nodes, whereas the Kubernetes Overview reports 20 nodes.

This difference requires validation.

## 5.2 Recommended Actions

- Validate the current Kubernetes node count.
- Review node readiness and workload health.
- Review failed or unhealthy pods.
- Reconcile Kubernetes and Containers Explorer counts.
- Confirm whether additional clusters exist.

---

# 6. Monitoring and Alerting

The monitor inventory includes:

| Monitor Pack | Count |
|---|---:|
| Kubernetes Monitors | 8 |
| Host Monitors | 7 |
| Custom Monitors | 6 |
| **Total** | **21** |

## 6.1 Monitor Status

| Status | Count |
|---|---:|
| Triggered | 5 |
| OK | 16 |
| Warn | 0 |
| No Data | 0 |

## 6.2 Muted Monitor Status

| Status | Count |
|---|---:|
| Muted | 15 |
| Not Muted | 6 |

## 6.3 Recommendations

- Review the five triggered alerts.
- Validate notification recipients and escalation paths.
- Review the 15 muted monitors.
- Confirm monitor ownership.
- Ensure critical monitors have appropriate notification configurations.

---

# 7. Dashboard Inventory

The Datadog account currently displays 10 dashboards.

| Dashboard | Owner |
|---|---|
| Log Management – Estimated Usage | Richa Sharma |
| Kubernetes Restarts Dashboard | Styli Infra Admin |
| [Saurabh] logs | Saurabh |
| stylishop.com – Total Traffic and Failures | Styli Infra Admin |
| Datadog Usage vs Commitments | Styli Infra Admin |
| Log Ingestion Bytes – Service Breakdown | Richa Sharma |
| Log Analytics – Volume, Severity and Optimization | Prabhupad Nayak |
| Kubernetes Resource Utilization | Styli Infra Admin |
| Styli's Dashboard | Styli Infra Admin |
| Microservices Health – Production (Logs) | Styli Infra Admin |

## 7.1 Recommendations

- Review dashboard ownership.
- Validate team access and sharing.
- Review usage and commitment dashboards.
- Identify outdated or duplicate dashboards.
- Ensure operational dashboards are accessible to relevant teams.

---

# 8. Log Management Analysis

The Log Management – Estimated Usage dashboard reports:

| Metric | Value |
|---|---:|
| Ingested Logs | 5.1G |
| Indexed Logs | 5.1G |
| Overall Exclusion Ratio | 0.00% |

## 8.1 Observations

- Log ingestion and indexing are displayed at 5.1G.
- The displayed exclusion ratio is 0.00%.
- Service-level log distribution is available.
- Further analysis is required to identify high-volume services.

## 8.2 Usage Reconciliation

The Log Management dashboard reports 5.1G, while the Usage Overview reports 878 GB of ingested logs.

These figures should be reconciled after confirming the metric definitions, units and reporting periods.

## 8.3 Recommendations

- Validate log ingestion and indexing measurements.
- Review high-volume services.
- Validate exclusion and filtering configurations.
- Review log retention settings.
- Reconcile dashboard values with billing usage.

---

# 9. Key Findings

| Area | Current Understanding | Follow-up |
|---|---|---|
| Infra Enterprise | 50 committed; 18 reported | Validate host utilization |
| APM Enterprise | 18 committed | Validate APM usage |
| Containers | 583 / 613 reported | Reconcile counts |
| Container-hours | 23.1K | Validate billing entitlement |
| Kubernetes | 1 cluster, 20 nodes | Reconcile node inventory |
| Monitors | 21 total, 5 triggered | Review active alerts |
| Muted Monitors | 15 muted | Validate mute status |
| Dashboards | 10 available | Review ownership |
| Log Management | 5.1G ingested and indexed | Reconcile with billing |
| Ingested Logs | 878 GB | Validate monthly utilization |

---

# 10. Recommended Action Plan

| Priority | Action | Expected Outcome |
|---|---|---|
| High | Validate 50-host Infra Enterprise commitment | Understand subscription utilization |
| High | Confirm container entitlement | Clarify container billing |
| High | Reconcile 583 and 613 container counts | Accurate inventory |
| High | Review triggered monitors | Improve alert visibility |
| High | Review muted monitors | Validate monitoring coverage |
| Medium | Reconcile Kubernetes node count | Accurate cluster inventory |
| Medium | Validate APM utilization | Understand APM commitment |
| Medium | Reconcile log usage | Accurate billing visibility |
| Medium | Review dashboard access | Improve operational visibility |

---

# 11. Items Requiring Confirmation

1. Are additional hosts running containers beyond the 18 reported Infra Hosts?
2. Does the remaining 32 committed host capacity include additional container entitlement?
3. How is container usage calculated under the existing subscription?
4. Why do the Datadog views report 583 and 613 containers?
5. Why do the Kubernetes views report 19 and 20 nodes?
6. What is the current APM Enterprise host utilization?
7. How do the 5.1G dashboard figures reconcile with 878 GB of ingested logs?
8. What is the exact billing unit and period for Flex Logs Stored (Starter)?

---

# 12. Conclusion

The current Datadog environment provides visibility into infrastructure, Kubernetes resources, monitoring, dashboards and log-management activity.

The existing subscription includes **50 Infra Enterprise hosts and 18 APM Enterprise hosts**.

The November 2026 Usage Overview reports **18 Infra Hosts, 23.1K container-hours and 878 GB of ingested logs**.

The primary areas requiring further validation are:

- Infrastructure host commitment and utilization.
- Container entitlement and billing.
- Kubernetes resource inventory.
- Monitoring and alert configuration.
- Log ingestion and indexing utilization.

The next step is to validate these findings with the relevant account owner and Datadog team and use this assessment as the baseline for ongoing environment reviews.

---

# 13. Review Ownership

**Airowire Networks Pvt. Ltd.**

**Datadog Observability Team**

*Document Classification: Current Environment Understanding & Usage Assessment*

*Review Date: 04 November 2026*
