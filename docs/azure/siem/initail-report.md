<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Trilegal – Datadog Onboarding, Commitment & Optimization Assessment

**(Datadog Infrastructure Monitoring, Azure Integration, Agent Coverage & Cost Optimization)**

---

## Purpose of the Document

This document provides an assessment of the current Datadog implementation for the Trilegal environment.

The assessment covers:

- Datadog Infrastructure Monitoring
- Azure Integration
- Datadog Agent coverage
- Active and inactive VM inventory
- Azure Container Apps monitoring
- Serverless Monitoring consumption
- Datadog committed usage
- On-demand consumption
- Cloud Cost Management Pro
- VM tagging requirements
- Resource optimization and potential decommissioning
- Airowire responsibilities as the Datadog Advanced Partner

The objective is to identify current monitoring coverage, consumption gaps, optimization opportunities and recommended next steps.

---

# Scope

## In Scope

- Azure VM monitoring
- Azure Integration
- Datadog Agent deployment assessment
- Host inventory assessment
- Active/inactive host analysis
- Azure Container Apps
- Serverless Monitoring
- Datadog commitment analysis
- On-demand host analysis
- Cloud Cost Management Pro
- VM tagging governance
- Resource optimization
- Decommissioning assessment
- Airowire partner responsibilities

## Out of Scope

- Actual Azure resource deletion without customer approval
- Application code changes
- Application architecture changes
- Production workload scaling changes without application-owner approval
- Final billing/contract changes without Datadog/customer approval

---

# 1. Executive Summary

The Trilegal environment has been partially onboarded into Datadog, with Azure Integration and infrastructure monitoring currently available.

The current assessment identified **27 hosts**, of which:

- **23 hosts are Active**
- **4 hosts are Inactive**
- **8 hosts have the Datadog Agent**
- **19 hosts are monitored without the Datadog Agent through Azure Integration**

The Datadog billing view also indicates:

- **27 hosts committed**
- **28 hosts currently consumed**
- **1 host currently appearing as On-Demand**
- **22 Azure Container Apps**
- **59 pods under Serverless Monitoring**
- **Cloud Cost Management Pro with an 80K commitment but currently not onboarded**

A major governance gap identified during the assessment is the **lack of standardized VM tagging**.

### Overall Recommendation

> **Do not increase the current Datadog commitment at this stage.**

Airowire recommends first:

1. Identifying the additional on-demand host.
2. Validating the four inactive hosts.
3. Implementing standardized VM tagging.
4. Assessing Datadog Agent requirements for the 19 VMs without Agent.
5. Reviewing Azure Container App replica consumption.
6. Onboarding the committed CCM Pro capability.
7. Reassessing actual baseline consumption after optimization.

---

# 2. Datadog Commitment Overview

| Billing Dimension | Committed / Allocated | Current Usage | Status | Recommendation |
|---|---:|---:|---|---|
| **Infra DevSecOps Enterprise** | 27 Hosts | 28 Hosts | 🔴 1 On-Demand | Identify additional host |
| **Cloud Cost Management Pro** | 80K | 0 | 🔴 Not Onboarded | Onboard CCM Pro |
| **Serverless Monitoring** | No commitment shown | 59 Pods | 🟠 Usage | Review replica consumption |
| **Infra Hosts** | — | 0 shown | 🟢 | No immediate action |
| **Cloud Security Management** | — | 0 shown | 🟡 | Validate requirement |
| **Workload Protection Hosts** | — | 0 shown | 🟡 | Validate requirement |

---

# 3. Infrastructure Host Inventory

| Host Status | Count | Percentage |
|---|---:|---:|
| 🟢 Active | **23** | **85.2%** |
| 🔴 Inactive | **4** | **14.8%** |
| **Total** | **27** | **100%** |

### Observation

The four inactive hosts require validation with the Trilegal infrastructure/application owners before any decommissioning activity.

An inactive status in Datadog should not automatically be treated as an unused Azure VM.

---

# 4. VM Monitoring & Agent Status

| # | Hostname | Status | Azure Integration | Datadog Agent | Recommendation |
|---:|---|---|---|---|---|
| 1 | `b2e44582-d32...60b8b9` | 🔴 Inactive | ✅ Yes | ❌ No | Validate requirement |
| 2 | `TriWinIntappDev` | 🔴 Inactive | ✅ Yes | ✅ Yes | Validate / potential decommission |
| 3 | `TriWinIntappPro` | 🔴 Inactive | ✅ Yes | ✅ Yes | Validate / potential decommission |
| 4 | `7ddeb35d-922f...8c8f93` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 5 | `EnterpriseCA01` | 🟢 Active | ✅ Yes | ✅ Yes | Continue monitoring |
| 6 | `TrilegalWBSRVR` | 🟢 Active | ✅ Yes | ✅ Yes | Continue monitoring |
| 7 | `LegalTech-VM-01` | 🟢 Active | ✅ Yes | ✅ Yes | Continue monitoring |
| 8 | `0c3617da-c20e...0934f6` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 9 | `a95d95c6-f8c4...36071c` | 🔴 Inactive | ✅ Yes | ❌ No | Validate for decommission |
| 10 | `509896ae-7e0e...52636b` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 11 | `f5638f3a-3816...894c40` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 12 | `c8c5b3e7-024f...a538b1` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 13 | `554b6a7f-5648...918712` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 14 | `3cede714-468...0441db` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 15 | `6ed1882a-56e...c23b20` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 16 | `ced76f2c-f815...62eb2c` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 17 | `2c6d3f4f-a2f8...13b09c` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 18 | `TrilegalRootCA1` | 🟢 Active | ✅ Yes | ❌ No | Assess OS monitoring requirement |
| 19 | `TrilegalBYOD` | 🟢 Active | ✅ Yes | ✅ Yes | Continue monitoring |
| 20 | `TRLDEV04-1` | 🟢 Active | ✅ Yes | ✅ Yes | Continue monitoring |
| 21 | `7efb8ed9-9ec9...46381e` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 22 | `17b90df5-b118...c18807` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 23 | `2571dae0-e73...92cb5c` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 24 | `92b1d107-dd7...144667` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 25 | `TrilegalINDES01` | 🟢 Active | ✅ Yes | ✅ Yes | Continue monitoring |
| 26 | `TriWinIntappFnO` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |
| 27 | `5f1be06c-2160...44f64a` | 🟢 Active | ✅ Yes | ❌ No | Assess Agent requirement |

---

# 5. Agent Coverage Summary

| Category | Active | Inactive | Total |
|---|---:|---:|---:|
| **Datadog Agent Installed** | 6 | 2 | **8** |
| **Without Datadog Agent** | 17 | 2 | **19** |
| **Total** | **23** | **4** | **27** |

---

# 6. Azure Integration vs Datadog Agent

Azure Integration and the Datadog Agent provide different levels of monitoring.

| Monitoring Capability | Azure Integration | Datadog Agent |
|---|---|---|
| Azure resource visibility | ✅ | — |
| Azure VM/platform metrics | ✅ | — |
| Detailed guest OS metrics | Limited | ✅ |
| CPU / Memory / Disk | Platform level | Detailed |
| Windows Event Logs | ❌ | ✅ |
| Linux system logs | ❌ | ✅ |
| Application logs | ❌ | ✅ |
| Process monitoring | ❌ | ✅ |
| Custom metrics | Limited | ✅ |
| Host-level integrations | ❌ | ✅ |
| APM | ❌ | ✅* |

\*APM additionally requires application instrumentation.

### Recommendation

Azure Integration should continue to provide **Azure-level visibility**.

For critical production and application workloads, Airowire recommends Datadog Agent deployment to provide deeper:

- OS monitoring
- Log collection
- Process monitoring
- Application monitoring
- Custom metrics
- Troubleshooting visibility

Agent deployment should be based on **business and monitoring requirements**, not automatically installed on every VM.

---

# 7. Benefits of Datadog Agent Deployment

Installing the Datadog Agent provides additional visibility including:

- Detailed CPU and memory metrics
- Disk utilization and I/O
- Network metrics
- Windows Event Logs
- Linux system logs
- Application logs
- Process monitoring
- Custom metrics
- Host-level integrations
- Deeper troubleshooting capability
- APM support where application instrumentation is implemented

### Agent Deployment Priority

| VM Type | Recommendation |
|---|---|
| Production application server | 🔴 Install Agent |
| Critical infrastructure | 🔴 Install Agent |
| Server requiring OS logs | 🔴 Install Agent |
| Server requiring process monitoring | 🔴 Install Agent |
| Azure-only monitoring requirement | 🟡 Evaluate |
| Non-production server | 🟡 Evaluate |
| Inactive server | ❌ Validate first |

---

# 8. Azure Container Apps & Serverless Monitoring

The Trilegal environment currently shows **22 Azure Container Apps**.

Datadog billing shows approximately **59 pods** under Serverless Monitoring.

| Metric | Value |
|---|---:|
| Azure Container Apps | **22** |
| Serverless Monitoring | **59 Pods** |
| Monitoring Model | Serverless Monitoring – Managed |
| Optimization | Replica/scaling review required |

---

# 9. Container App Optimization

| Container App | Approx. Avg. Replicas | Recommendation |
|---|---:|---|
| `cp-bcase-worker` | ~2.4 | Review scaling |
| `cp-llm-worker` | ~2.4 | Review scaling |
| `dp-flask` | ~2.3 | Review scaling |
| `dp-outlook` | ~2.1 | Review scaling |
| `dp-portkey` | 2 fixed | Validate requirement |
| `dp-wordapp` | ~1.9 | Review scaling |
| `cp-ingstr-wkrr` | ~1.8 | Review scaling |
| `cp-gotenberg` | ~1.6 | Review scaling |
| `cp-ingstr-hvy` | ~1.6 | Review scaling |
| `cp-aspose-worker` | ~1.6 | Review scaling |
| `dp-web-api` | ~1.6 | Review scaling |
| `cp-cloudflared` | 1 fixed | Validate requirement |
| `cp-ingstr-conv` | ~0.8 | Review |
| `cp-ingstr-api` | ~0.8 | Review |
| `cp-research-worker` | ~0.8 | Review |
| `cp-research-api` | ~0.8 | Review |
| `dp-beat-worker` | ~0.8 | Review |
| `dp-flower` | ~0.8 | Review |
| `hvy-aspose-worker` | ~0.06 | Validate business requirement |
| `cp-chat-worker` | ~0.001 | Validate business requirement |

### Recommendation

Review:

- Minimum replicas
- Maximum replicas
- Fixed replica configuration
- Scale-to-zero eligibility
- Production/non-production classification
- Workload utilization
- Idle workloads

No Container App should be decommissioned solely based on low replica usage without application-owner confirmation.

---

# 10. VM Tagging – Required

### Observation

Standardized VM tagging is currently **not consistently implemented** across the environment.

### Recommended Mandatory Tags

| Tag | Example |
|---|---|
| Application | `Intapp` |
| Environment | `Production` |
| Owner | `Trilegal-IT` |
| BusinessUnit | `LegalTech` |
| CostCenter | `TRI-001` |
| Criticality | `High` |
| SupportTeam | `Infrastructure` |
| Project | `Trilegal` |

### Minimum Mandatory Tags

> **Application | Environment | Owner | BusinessUnit | CostCenter**

### Benefits

Standardized tagging will help:

- Identify VM ownership
- Identify application dependencies
- Identify Production/Dev/Test
- Allocate costs
- Identify unused resources
- Identify the on-demand host
- Validate inactive VMs
- Support safe decommissioning
- Improve dashboards
- Improve CCM Pro cost reporting

### Recommendation

> **VM tagging should be implemented before final decommissioning and cost-optimization decisions.**

---

# 11. On-Demand Host Assessment

### Current Situation

**27 committed hosts → 28 consumed → 1 on-demand host**

The additional host should be identified and validated.

| Scenario | Recommendation |
|---|---|
| Production-critical | Keep |
| Temporary workload | Review expiry |
| Non-production | Consider scheduled shutdown |
| Duplicate resource | Decommission |
| Retired application | Decommission |
| Unused resource | Decommission |

### Target

If the additional host is not required:

> **28 hosts → 27 hosts**

This would bring consumption back within the existing commitment.

### Recommendation

**Do not increase the commitment from 27 to 28 before completing this optimization exercise.**

---

# 12. Cloud Cost Management Pro

| Item | Current Status |
|---|---|
| Product | **Cloud Cost Management Pro** |
| Commitment | **80K** |
| Current Usage | **0** |
| Utilization | **0%** |
| Onboarding | ❌ Not completed |
| Recommendation | 🔴 **Onboard** |

### Observation

CCM Pro is already included in the commitment, but the capability has **not yet been onboarded**.

Therefore, the current 0% utilization represents **unused committed capability**, rather than absence of entitlement.

### Recommendation

Airowire should complete CCM Pro onboarding for the required AWS accounts and Azure subscriptions to enable:

- Cloud cost visibility
- Cost allocation
- Cost dashboards
- Cost trend analysis
- Resource utilization analysis
- Cloud cost optimization

---

# 13. Decommissioning Assessment

| Priority | Resource | Current State | Recommendation |
|---|---|---|---|
| 🔴 P1 | 1 On-demand host | Above commitment | Identify and optimize |
| 🔴 P1 | 4 inactive VMs | Not reporting | Validate and decommission if unused |
| 🔴 P1 | VM tagging | Not standardized | Implement mandatory tags |
| 🔴 P1 | CCM Pro | Not onboarded | Complete onboarding |
| 🟠 P2 | High-replica Container Apps | Multiple replicas | Review scaling |
| 🟠 P2 | Fixed-replica apps | Fixed capacity | Validate requirement |
| 🟡 P3 | Low-utilization apps | Very low replicas | Validate business requirement |
| 🟢 P4 | Active production hosts | Required | Continue monitoring |

---

# 14. Airowire – Datadog Advanced Partner Responsibilities

As the **Datadog Advanced Partner**, Airowire will support Trilegal across the Datadog implementation and optimization lifecycle.

| # | Responsibility | Airowire Role |
|---:|---|---|
| 1 | Datadog onboarding | Lead onboarding activities |
| 2 | Azure Integration | Configure and validate Azure integration |
| 3 | Agent deployment | Assess and deploy Agent where required |
| 4 | Infrastructure monitoring | Validate infrastructure telemetry |
| 5 | Log monitoring | Configure and validate log collection |
| 6 | APM | Assess and onboard required applications |
| 7 | Container monitoring | Monitor and optimize Container Apps |
| 8 | Dashboard development | Build required dashboards |
| 9 | Monitor configuration | Configure alerts and thresholds |
| 10 | Cost optimization | Review commitment and consumption |
| 11 | CCM Pro | **Onboard and enable CCM Pro** |
| 12 | VM governance | Implement tagging standards |
| 13 | Resource optimization | Identify unused/overprovisioned resources |
| 14 | Documentation | Maintain SOPs and configuration documents |
| 15 | Knowledge transfer | Enable Trilegal teams |
| 16 | Ongoing support | Troubleshooting and technical support |
| 17 | Best-practice advisory | Recommend observability improvements |
| 18 | Periodic review | Review health, usage and optimization |

---

# 15. Airowire Delivery Approach

**Assess → Onboard → Configure → Validate → Optimize → Govern → Document → Support**

| Phase | Airowire Activity |
|---|---|
| **Assess** | Review infrastructure, applications and requirements |
| **Onboard** | Configure Datadog integrations |
| **Configure** | Agent, logs, dashboards and monitors |
| **Validate** | Verify telemetry and monitoring coverage |
| **Optimize** | Review usage, replicas and resources |
| **Govern** | Implement VM tagging and standards |
| **Document** | Maintain SOP and configuration documentation |
| **Support** | Provide ongoing technical support |

---

# 16. Recommended Action Plan

| Priority | Action | Responsible Team | Expected Outcome |
|---|---|---|---|
| 🔴 P1 | Identify 1 on-demand host | Airowire + Trilegal | Reduce on-demand usage |
| 🔴 P1 | Validate 4 inactive VMs | Trilegal + Airowire | Identify decommission candidates |
| 🔴 P1 | Implement VM tagging | Trilegal + Airowire | Ownership/cost visibility |
| 🔴 P1 | Onboard CCM Pro | Airowire | Utilize committed capability |
| 🟠 P2 | Assess 19 VMs without Agent | Airowire | Improve monitoring where required |
| 🟠 P2 | Review Container App replicas | Airowire + App Team | Optimize serverless consumption |
| 🟠 P2 | Review fixed replicas | App Team | Optimize capacity |
| 🟡 P3 | Validate logs/APM | Airowire | Improve observability |
| 🟡 P3 | Configure dashboards/monitors | Airowire | Improve operational visibility |
| 🟢 P4 | Periodic usage review | Airowire | Continuous optimization |

---

# 17. Observations & Findings

- Azure Integration is currently providing Azure-level monitoring.
- 27 hosts are visible in the current host inventory.
- 23 hosts are Active and 4 hosts are Inactive.
- 8 hosts have the Datadog Agent installed.
- 19 hosts are currently monitored without the Datadog Agent.
- Datadog billing shows 27 committed hosts and 1 additional on-demand host.
- 22 Azure Container Apps have been identified.
- Serverless Monitoring currently shows 59 pods.
- Container App replica configuration should be reviewed for optimization opportunities.
- VM tagging is not currently standardized and should be implemented.
- CCM Pro is included with an **80K commitment but has not yet been onboarded**.
- Increasing the commitment is not recommended until the current consumption is optimized.
- Inactive resources should be validated with the relevant Trilegal owners before decommissioning.

---

# 18. Final Outcome / Recommendation

> Trilegal's Datadog environment is currently in the onboarding and optimization phase. Azure Integration and infrastructure monitoring are established, while further improvements are required around Datadog Agent coverage, VM tagging, inactive resource validation, serverless consumption and Cloud Cost Management Pro onboarding.
>
> Airowire recommends optimizing the existing environment before increasing the Datadog commitment. The immediate priorities are to identify the 1 on-demand host, validate the 4 inactive VMs, standardize VM tagging, assess Agent deployment for critical workloads, review Azure Container App replica configurations and onboard the committed CCM Pro capability.
>
> Following these activities, actual baseline consumption should be reassessed to determine whether the existing commitment is sufficient or whether any future commitment adjustment is required.

---

# 19. Overall Status

| Area | Status |
|---|---|
| Azure Integration | 🟢 **Configured** |
| Host Monitoring | 🟡 **Partially Validated** |
| Datadog Agent Coverage | 🟡 **Requires Assessment** |
| Inactive Hosts | 🔴 **Validation Required** |
| On-Demand Host | 🔴 **Optimization Required** |
| Azure Container Apps | 🟢 **Monitored** |
| Serverless Consumption | 🟠 **Optimization Required** |
| VM Tagging | 🔴 **Required** |
| CCM Pro | 🔴 **Not Onboarded** |
| Commitment Increase | 🟢 **Not Recommended Yet** |
| Cost Optimization | 🟠 **Action Required** |
| Airowire Partner Support | 🟢 **Ongoing** |

---

# Contact

For more information about this document and its contents, please contact **Airowire Networks**.

**Dr. Shivanand Poojara** — shivanand@airowire.com
**Anoop Ravikumar Biradar** - Anoop@airowire.com
**Anil Kumar** - Anil@airowire.com
**Mohammed Saqlain** - Mohammed@airowire.com
