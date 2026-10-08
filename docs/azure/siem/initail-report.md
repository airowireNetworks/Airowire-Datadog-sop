# Trilegal – Datadog Onboarding, Commitment & Optimization Assessment

<div align="center">

<img src="/images/airowire-logo.png" width="260">

<img src="/images/datadog.png" width="180">

</div>

---

## 1. Purpose of the Document

The purpose of this document is to assess the current Datadog environment for Trilegal, identify the existing monitoring and security coverage, review infrastructure utilization, identify monitoring gaps, highlight optimization opportunities, and provide recommendations for improving the overall Datadog implementation.

This assessment has been prepared by **Airowire Networks Pvt. Ltd.**, acting as a **Datadog Advanced Partner**.

The assessment covers:

- Datadog Infrastructure Monitoring
- Datadog Agent deployment
- Azure Integration
- Host inventory
- Infrastructure commitment utilization
- Azure Container Apps
- Workload Protection
- Security signals
- VM tagging and governance
- Monitoring coverage gaps
- Resource optimization
- Potential decommissioning candidates
- Datadog onboarding recommendations
- Airowire responsibilities
- Operational governance

> **Note:** Any decommissioning recommendation is subject to application-owner and infrastructure-owner validation. Resources should not be removed solely based on inactivity or low utilization.

---

## 2. Scope

| Area | Assessment |
|---|---|
| Datadog Infrastructure Monitoring | Included |
| Datadog Agent Coverage | Included |
| Azure Integration | Included |
| Host Inventory | Included |
| Infrastructure Commitment | Included |
| Azure Container Apps | Included |
| Workload Protection | Included |
| Security Signals | Included |
| VM Tagging | Included |
| Resource Optimization | Included |
| Decommissioning Assessment | Included |
| Monitoring Recommendations | Included |
| Airowire Responsibilities | Included |
| Cloud Cost Management | Not in Scope |

---

## 3. Executive Summary

The current Trilegal Datadog environment provides a foundation for infrastructure monitoring through Azure Integration and Datadog Agent deployment on selected hosts.

However, the assessment identified opportunities to improve:

- Infrastructure monitoring coverage
- Datadog Agent coverage
- Workload Protection coverage
- Security visibility
- VM tagging
- Azure Container Apps monitoring
- Resource lifecycle management
- Commitment utilization
- Monitoring governance

### Key Observations

- **27 hosts** were identified in the reviewed host inventory.
- **23 hosts are active**.
- **4 hosts are inactive**.
- **8 hosts have Datadog Agent** based on the reviewed configuration.
- **19 hosts do not currently have Datadog Agent** based on the reviewed inventory.
- Azure Integration is already present and provides Azure-level visibility.
- Infrastructure commitment is **27 hosts**.
- Current usage is **28 hosts**, resulting in **1 host above the committed baseline**.
- Approximately **22 Azure Container Apps** were observed.
- Datadog Serverless Monitoring currently shows **59 pods**.
- Workload Protection currently shows **41.2% host coverage**.
- Only **7 of 17 hosts are fully monitored** under Workload Protection.
- **8 Agents** are detected in the Workload Protection configuration.
- Serverless Workload Protection is currently **inactive**.
- There are **3 open security signals**.
- All currently visible signals are **Low severity**.
- There are currently **0 Critical and 0 High severity signals**.
- VM tagging requires standardization.
- Several low-utilization and inactive resources should be validated before optimization or decommissioning.

### Overall Recommendation

Airowire recommends an **optimization-first approach** rather than immediately increasing the infrastructure commitment.

The recommended approach is:

**Assess → Onboard → Configure → Validate → Optimize → Govern → Document → Support**

---

## 4. Current Environment Overview

| Metric | Current Status |
|---|---:|
| Hosts in reviewed inventory | 27 |
| Active hosts | 23 |
| Inactive hosts | 4 |
| Hosts with Datadog Agent | 8 |
| Hosts without Datadog Agent | 19 |
| Infrastructure commitment | 27 hosts |
| Current infrastructure usage | 28 hosts |
| Usage above commitment | 1 host |
| Azure Container Apps | ~22 |
| Serverless pod usage shown | 59 pods |
| Workload Protection coverage | 41.2% |
| Fully monitored Workload Protection hosts | 7 / 17 |
| Agents found in Workload Protection | 8 |
| Open Workload Protection signals | 3 |
| Critical / High signals | 0 |
| Serverless Workload Protection | Inactive |

---

## 5. Host Inventory Assessment

The reviewed host inventory contains **27 hosts**.

### Host Status Summary

| Status | Count |
|---|---:|
| Active | 23 |
| Inactive | 4 |
| **Total** | **27** |

The four inactive hosts require owner validation before any decommissioning activity.

---

## 6. Detailed Host Inventory

| # | Host | Status | Azure Integration | Datadog Agent | Recommendation |
|---:|---|---|---|---|---|
| 1 | `b2e44582-d32...60b8b9` | Inactive | Yes | No | Validate requirement |
| 2 | `TriWinIntappDev` | Inactive | Yes | Yes | Validate requirement |
| 3 | `TriWinIntappPro` | Inactive | Yes | Yes | Validate requirement |
| 4 | `7ddeb35d-922f...8c8f93` | Active | Yes | No | Assess Agent |
| 5 | `EnterpriseCA01` | Active | Yes | Yes | Continue monitoring |
| 6 | `TrilegalWBSRVR` | Active | Yes | Yes | Continue monitoring |
| 7 | `LegalTech-VM-01` | Active | Yes | Yes | Continue monitoring |
| 8 | `0c3617da-c20e...0934f6` | Active | Yes | No | Assess Agent |
| 9 | `a95d95c6-f8c4...36071c` | Inactive | Yes | No | Validate decommissioning |
| 10 | `509896ae-7e0e...52636b` | Active | Yes | No | Assess Agent |
| 11 | `f5638f3a-3816...894c40` | Active | Yes | No | Assess Agent |
| 12 | `c8c5b3e7-024f...a538b1` | Active | Yes | No | Assess Agent |
| 13 | `554b6a7f-5648...918712` | Active | Yes | No | Assess Agent |
| 14 | `3cede714-468...0441db` | Active | Yes | No | Assess Agent |
| 15 | `6ed1882a-56e...c23b20` | Active | Yes | No | Assess Agent |
| 16 | `ced76f2c-f815...62eb2c` | Active | Yes | No | Assess Agent |
| 17 | `2c6d3f4f-a2f8...13b09c` | Active | Yes | No | Assess Agent |
| 18 | `TrilegalRootCA1` | Active | Yes | No | Assess Agent |
| 19 | `TrilegalBYOD` | Active | Yes | Yes | Continue monitoring |
| 20 | `TRLDEV04-1` | Active | Yes | Yes | Continue monitoring |
| 21 | `7efb8ed9-9ec9...46381e` | Active | Yes | No | Assess Agent |
| 22 | `17b90df5-b118...c18807` | Active | Yes | No | Assess Agent |
| 23 | `2571dae0-e73...92cb5c` | Active | Yes | No | Assess Agent |
| 24 | `92b1d107-dd7...144667` | Active | Yes | No | Assess Agent |
| 25 | `TrilegalINDES01` | Active | Yes | Yes | Continue monitoring |
| 26 | `TriWinIntappFnO` | Active | Yes | No | Assess Agent |
| 27 | `5f1be06c-2160...44f64a` | Active | Yes | No | Assess Agent |

> The Agent classification is based on the reviewed screenshots/inventory and should be validated against the current Datadog Agent inventory before implementation.

---

## 7. Datadog Agent Coverage

The current reviewed inventory indicates:

| Agent Status | Host Count |
|---|---:|
| Datadog Agent Installed | 8 |
| Datadog Agent Not Identified | 19 |
| **Total** | **27** |

### Hosts Identified with Datadog Agent

- `TriWinIntappDev`
- `TriWinIntappPro`
- `EnterpriseCA01`
- `TRLDEV04-1`
- `TrilegalWBSRVR`
- `TrilegalINDES01`
- `LegalTech-VM-01`
- `TrilegalBYOD`

---

## 8. Azure Integration vs Datadog Agent

Azure Integration and Datadog Agent provide different levels of visibility.

### Azure Integration

Azure Integration provides Azure/platform-level visibility such as:

- Azure resource metrics
- Platform-level metrics
- Azure service information
- Resource inventory
- Azure-native telemetry
- Cloud resource visibility

### Datadog Agent

The Datadog Agent provides deeper guest-level visibility.

Depending on configuration, it can provide:

- CPU metrics
- Memory metrics
- Disk utilization
- Disk I/O
- Network metrics
- Process monitoring
- OS-level telemetry
- Windows Event Logs
- Linux logs
- Application logs
- Custom metrics
- Host integrations
- Container visibility
- Workload Protection
- APM telemetry when application instrumentation is implemented

---

## 9. Datadog Agent Deployment Recommendation

Airowire recommends that the Agent **not be deployed blindly to all remaining hosts**.

The remaining hosts should be assessed based on:

1. Production criticality
2. Business importance
3. Application dependency
4. Security requirements
5. Log requirements
6. Troubleshooting requirements
7. Application monitoring requirements
8. Compliance requirements

### Recommended Priority

| Priority | System Type | Recommendation |
|---|---|---|
| P1 | Production critical systems | Deploy Agent |
| P1 | Security-sensitive systems | Deploy Agent |
| P1 | Application servers | Deploy Agent |
| P2 | Business-critical development systems | Assess |
| P2 | Systems requiring detailed logs | Deploy Agent |
| P3 | Non-critical systems | Assess based on requirement |
| P3 | Temporary / legacy systems | Validate lifecycle first |

---

## 10. Benefits of Datadog Agent Installation

### Infrastructure Monitoring

- CPU
- Memory
- Disk
- Network
- Load
- Processes
- System health

### Log Monitoring

- Windows Event Logs
- Linux system logs
- Application logs
- Custom logs

### Application Monitoring

- Application metrics
- Application logs
- APM where instrumentation is implemented
- Service dependencies

### Security Monitoring

- Workload Protection
- Runtime visibility
- Security signals
- Host-level security activity

### Operational Benefits

- Faster troubleshooting
- Better incident investigation
- Centralized monitoring
- Improved alerting
- Better dashboards

---

## 11. Inactive Host Assessment

Four hosts are currently shown as inactive.

Inactive resources should be treated as:

> **Potential Decommission – Subject to Application / Infrastructure Owner Approval**

The inactive status alone is not sufficient to remove a VM.

### Validation Required

Before decommissioning:

- Identify owner.
- Confirm application dependency.
- Check DNS.
- Check network dependencies.
- Check scheduled tasks.
- Check backup requirements.
- Check DR requirements.
- Check security dependencies.
- Check integrations.
- Check monitoring dependencies.
- Obtain owner approval.
- Follow formal change management.

---

## 12. Recommended Decommissioning Process

```text
Inactive Resource
       |
       v
Identify Owner
       |
       v
Validate Application Dependency
       |
       v
Validate Backup / DR / Security
       |
       v
Review Recent Activity
       |
       v
Owner Approval
       |
       +----------------------+
       |                      |
       v                      v
    Required              Not Required
       |                      |
       v                      v
    Retain              Change Approval
                              |
                              v
                       Decommission
                              |
                              v
                     Validate Datadog
```

---

## 13. Infrastructure Commitment Assessment

The reviewed Datadog billing information indicates:

| Metric | Value |
|---|---:|
| Infrastructure Commitment | 27 Hosts |
| Current Usage | 28 Hosts |
| Difference | 1 Host |
| Current Position | 1 Host Above Commitment |

The immediate objective should be to identify the additional host.

---

## 14. Additional Host Investigation

Airowire recommends **not immediately increasing the commitment**.

First identify:

- Hostname
- Application
- Environment
- Owner
- Business Unit
- Cost Center
- Production/non-production status
- Temporary/permanent status

Then determine whether the additional host is:

- Required production infrastructure
- Temporary infrastructure
- Development infrastructure
- Duplicate infrastructure
- Legacy infrastructure
- Standby/DR infrastructure
- Unused infrastructure

---

## 15. Commitment Optimization Recommendation

### Scenario 1 – Host is unnecessary

Validate and decommission through the approved change process.

### Scenario 2 – Host is temporary

Retain temporarily and reassess after the temporary workload is completed.

### Scenario 3 – Host is permanently required

Retain the host and reassess the long-term Datadog commitment after overall optimization.

> The commitment should be adjusted only after the environment reaches a stable baseline.

---

## 16. VM Tagging Assessment

Standardized VM tagging is a key governance requirement.

The current environment should implement a consistent tagging strategy across Azure VMs.

### Required Tags

| Tag | Purpose | Example |
|---|---|---|
| `Application` | Application/workload | `LegalTech` |
| `Environment` | Environment | `Production` |
| `Owner` | Responsible owner | `IT-Team` |
| `BusinessUnit` | Business ownership | `Legal` |
| `CostCenter` | Cost allocation | `TRL-IT-001` |

### Optional Tags

| Tag | Purpose |
|---|---|
| `Criticality` | Business criticality |
| `SupportTeam` | Support ownership |
| `Project` | Project association |
| `DataClassification` | Data sensitivity |
| `Lifecycle` | Production / Temporary / Legacy |
| `ApplicationVersion` | Application version |

---

## 17. Benefits of Standardized Tagging

Standardized tagging improves:

- Datadog filtering
- Dashboard grouping
- Monitor targeting
- Ownership identification
- Incident response
- Resource inventory
- Cost allocation
- Automation
- Decommissioning analysis
- Governance
- Reporting

Tagging should be treated as a **P1 governance activity**.

---

## 18. Azure Container Apps Assessment

The reviewed Azure environment contains approximately:

> **22 Azure Container Apps**

| Container App | Approx. Observation |
|---|---:|
| `dp-web-api` | ~1.6 |
| `cp-ingstr-conv` | ~0.8 |
| `cp-ingstr-api` | ~0.8 |
| `cp-research-worker` | ~0.8 |
| `cp-research-api` | ~0.8 |
| `dp-beat-worker` | ~0.8 |
| `dp-flower` | ~0.8 |
| `cp-cloudflared` | 1 fixed |
| `hvy-aspose-worker` | ~0.06 |
| `cp-chat-worker` | ~0.001 |
| `cp-bcase-worker` | ~2.4 |
| `cp-llm-worker` | ~2.4 |
| `dp-flask` | ~2.3 |
| `dp-outlook` | ~2.1 |
| `dp-portkey` | 2 fixed |
| `dp-wordapp` | ~1.9 |
| `cp-ingstr-wkrr` | ~1.8 |
| `cp-gotenberg` | ~1.6 |
| `cp-ingstr-hvy` | ~1.6 |
| `cp-aspose-worker` | ~1.6 |

> Replica figures are based on the reviewed screenshots and should be validated against the actual Azure configuration and workload behavior.

---

## 19. Azure Container Apps Optimization

Container Apps should be reviewed for:

- Minimum replicas
- Maximum replicas
- Scale-to-zero eligibility
- CPU allocation
- Memory allocation
- Request volume
- Queue depth
- Worker utilization
- Scheduled workloads
- Background jobs
- Fixed replica requirements

Low-utilization workloads should be evaluated for scaling optimization.

Examples requiring validation include:

- `hvy-aspose-worker`
- `cp-chat-worker`

Higher-utilization workloads should be evaluated based on workload demand rather than simply reducing replicas.

---

## 20. Container App Decommissioning Approach

A low replica count does not automatically mean that an application is unused.

Before removing a Container App:

- Identify application owner.
- Confirm business purpose.
- Check dependent services.
- Check APIs.
- Check integrations.
- Review traffic.
- Review queues.
- Review scheduled jobs.
- Review recent activity.
- Obtain owner approval.
- Execute through change management.

---

## 21. Serverless Monitoring Usage

The reviewed Datadog usage information shows:

> **59 pods**

This should not be interpreted as 59 separate Container Apps.

The reviewed environment contains approximately:

- **22 Azure Container Apps**
- **59 serverless pod/replica usage**

These represent different measurement dimensions.

---

## 22. Workload Protection Assessment

Datadog Workload Protection was reviewed to assess current host-level security monitoring coverage.

The current configuration shows limited coverage and should be improved for production and security-sensitive workloads.

---

## 23. Workload Protection Current Status

| Metric | Current Status |
|---|---:|
| Host Coverage | 41.2% |
| Fully Monitored Hosts | 7 of 17 |
| Agents Found | 8 |
| Serverless Resources | Inactive |
| Open Security Signals | 3 |
| Critical Signals | 0 |
| High Signals | 0 |
| Current Visible Severity | Low |

The Datadog Workload Protection screen indicates:

> **Very Low coverage – 7 of 17 fully monitored hosts**

---

## 24. Workload Protection Agent Inventory

| Host | Agent Version |
|---|---|
| `TriWinIntappDev` | 7.83.2 |
| `TriWinIntappPro` | 7.83.2 |
| `EnterpriseCA01` | 7.83.2 |
| `TRLDEV04-1` | 7.83.2 |
| `TrilegalWBSRVR` | 7.84.1 |
| `TrilegalINDES01` | 7.83.2 |
| `LegalTech-VM-01` | 7.83.2 |
| `TrilegalBYOD` | 7.84.1 |

Agent versions should be reviewed periodically against the organization's supported Datadog Agent standard.

---

## 25. Workload Protection Security Signals

The reviewed Workload Protection Signals page currently shows:

> **3 Open Signals**

All three signals are currently shown as **Low severity**.

| Severity | Count |
|---|---:|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 3 |

---

## 26. Observed Security Signals

The currently visible signals include Windows registry-related activity.

Examples:

- `Windows shell folders registry key modified`
- `Windows boot registry key modified`
- `Windows shell folders registry key modified`

The signals shown in the screenshot are associated with Windows hosts and the `NT AUTHORITY\SYSTEM` user context.

These activities should be validated with the infrastructure/security team to determine whether they are expected.

Potential legitimate causes may include:

- Windows configuration changes
- Administrative activity
- Application changes
- Patch/update activity
- Configuration management

The activity should be reviewed before determining whether any detection-rule tuning is required.

---

## 27. Workload Protection Recommendations

### Increase Coverage

The current **41.2% coverage** should be improved.

Priority should be given to:

- Production servers
- Critical application servers
- Security-sensitive systems
- Systems containing sensitive workloads
- Systems requiring runtime threat monitoring

### Validate Agent Configuration

For hosts with Datadog Agent:

- Verify Agent health.
- Verify Workload Protection capabilities.
- Verify required security features.
- Review Agent versions.
- Validate configuration consistency.
- Confirm security telemetry is being received.

### Review Security Signals

The three Low-severity signals should be reviewed.

For each signal:

1. Identify affected host.
2. Identify activity.
3. Identify process where available.
4. Validate user/context.
5. Confirm whether activity was expected.
6. Document the result.
7. Tune detection only where justified.

### Serverless Workload Protection

The Serverless Resources section currently shows:

> **INACTIVE**

If Trilegal has serverless workloads requiring security monitoring, Serverless Workload Protection should be assessed and enabled where applicable.

---

## 28. Workload Protection Target State

```text
Production / Critical Hosts
             |
             v
       Datadog Agent
             |
             v
    Workload Protection
             |
             v
      Security Signals
             |
             v
       Investigation
             |
             v
          Triage
             |
             v
     Security Response
```

---

## 29. Recommended Monitoring Architecture

```text
                    TRILEGAL AZURE ENVIRONMENT
                              |
             +----------------+----------------+
             |                                 |
             v                                 v
      Azure Integration                  Datadog Agent
             |                                 |
             |                    +------------+-------------+
             |                    |            |            |
             |                    v            v            v
             |                 Metrics       Logs       Processes
             |                                 |
             |                                 v
             |                         Workload Protection
             |                                 |
             +----------------+----------------+
                              |
                              v
                       Datadog Platform
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
    Infrastructure       Application          Security
      Monitoring          Monitoring         Monitoring
          |                   |                   |
          +-------------------+-------------------+
                              |
                              v
                     Dashboards & Alerts
                              |
                              v
                       Operations Team
```

---

## 30. Dashboard Recommendations

### Infrastructure Dashboard

Recommended widgets:

- Host count
- Active hosts
- Inactive hosts
- CPU
- Memory
- Disk
- Network
- Process health
- Agent status

### Application Dashboard

Recommended widgets:

- Application availability
- Request rate
- Error rate
- Latency
- Application health
- Service dependencies

### Security Dashboard

Recommended widgets:

- Workload Protection coverage
- Security signals
- Signal severity
- Affected hosts
- Open signals
- Security trends

### Azure Dashboard

Recommended widgets:

- Azure resource health
- Container Apps
- Replica count
- CPU
- Memory
- Application availability

---

## 31. Priority Recommendations

| Priority | Area | Recommendation |
|---|---|---|
| P1 | On-Demand Host | Identify the 1 host exceeding the committed infrastructure baseline |
| P1 | Inactive Hosts | Validate the 4 inactive hosts |
| P1 | VM Tagging | Implement standardized VM tagging |
| P1 | Workload Protection | Improve current 41.2% coverage |
| P1 | Security Signals | Review the 3 open Low-severity signals |
| P2 | Datadog Agent | Assess the 19 hosts without Agent |
| P2 | Container Apps | Review replica and scaling configuration |
| P2 | Serverless Security | Assess Serverless Workload Protection |
| P3 | Low Utilization | Validate low-utilization workloads |
| P3 | Governance | Establish periodic Datadog health and usage reviews |

---

## 32. Airowire – Datadog Advanced Partner Responsibilities

As the Datadog Advanced Partner, Airowire can support Trilegal across the complete Datadog lifecycle.

### Solution Design

- Review monitoring requirements.
- Design Datadog architecture.
- Define monitoring strategy.
- Define security monitoring strategy.
- Define Agent deployment strategy.

### Datadog Onboarding

- Datadog environment assessment.
- Azure Integration assessment.
- Datadog Agent onboarding.
- Host monitoring configuration.
- Container monitoring assessment.

### Infrastructure Monitoring

- Host monitoring
- CPU monitoring
- Memory monitoring
- Disk monitoring
- Network monitoring
- Process monitoring
- Agent health monitoring

### Log Monitoring

- Log source assessment
- Log collection configuration
- Log parsing
- Log filtering
- Log-based monitors
- Dashboard creation

### Application Monitoring

- APM assessment
- Application instrumentation guidance
- Service monitoring
- Application dashboards
- Application performance recommendations

### Security Monitoring

- Workload Protection assessment
- Agent security configuration
- Security signal review
- Detection configuration
- Security monitoring dashboards
- Security best-practice recommendations

### Optimization

- Host utilization assessment
- Commitment analysis
- Inactive resource assessment
- Container scaling review
- Replica optimization
- Monitoring coverage optimization

### Governance

- VM tagging strategy
- Dashboard governance
- Monitor governance
- Ownership mapping
- Documentation
- Operational procedures

### Knowledge Transfer

- Datadog fundamentals
- Dashboard usage
- Monitor management
- Security signal investigation
- Agent troubleshooting
- Operational best practices

### Ongoing Support

- Periodic environment health review
- Monitoring optimization
- Security review
- Usage review
- Configuration recommendations
- Troubleshooting assistance

---

## 33. Customer Responsibilities

Trilegal responsibilities include:

- Providing infrastructure access.
- Providing required Azure permissions.
- Providing required Datadog permissions.
- Identifying application owners.
- Confirming production and non-production classification.
- Providing change approvals.
- Approving Agent installation.
- Approving monitoring configuration.
- Validating inactive resources.
- Approving decommissioning activities.
- Providing security requirements.
- Participating in knowledge-transfer sessions.

---

## 34. Recommended Implementation Plan

### Phase 1 – Assess

- Validate Datadog inventory.
- Validate Azure inventory.
- Identify Agent coverage.
- Identify inactive resources.
- Review commitment utilization.
- Review Workload Protection coverage.
- Review Container Apps.

### Phase 2 – Govern

- Implement VM tagging.
- Define ownership.
- Define environment classification.
- Define business criticality.
- Define monitoring standards.

### Phase 3 – Onboard

Prioritize:

1. Production systems
2. Critical application servers
3. Security-sensitive systems
4. Systems requiring logs
5. Systems requiring process monitoring

### Phase 4 – Secure

- Increase Workload Protection coverage.
- Validate Agent configuration.
- Review security signals.
- Enable required Workload Protection capabilities.
- Assess Serverless Workload Protection.

### Phase 5 – Monitor

Configure:

- Infrastructure dashboards
- Application dashboards
- Azure dashboards
- Security dashboards
- Availability monitors
- Resource monitors
- Security monitors

### Phase 6 – Optimize

- Investigate the additional host.
- Validate inactive hosts.
- Review Container App scaling.
- Identify low-utilization workloads.
- Validate potential decommissioning candidates.

### Phase 7 – Validate

- Validate host metrics.
- Validate logs.
- Validate dashboards.
- Validate monitors.
- Validate security signals.
- Validate Workload Protection coverage.

### Phase 8 – Document & Handover

- Finalize SOP.
- Provide dashboard documentation.
- Provide monitoring documentation.
- Provide security investigation procedures.
- Conduct knowledge transfer.
- Establish operational ownership.

---

## 35. Operational Governance

A periodic Datadog health review should be established.

### Monthly Review

The following should be reviewed:

- Host count
- Commitment utilization
- Agent coverage
- Inactive hosts
- New hosts
- Removed hosts
- Workload Protection coverage
- Security signals
- Container App utilization
- Dashboard health
- Monitor health
- Tag compliance

---

## 36. Recommended KPIs

| KPI | Target |
|---|---|
| Critical Production Host Coverage | 100% |
| Datadog Agent Coverage for Required Hosts | 100% |
| Workload Protection Coverage | Improve from 41.2% |
| VM Tag Compliance | >95% |
| Critical Monitoring Coverage | 100% |
| Critical Security Signal Review | 100% |
| Inactive Host Validation | 100% |
| Unowned Hosts | 0 |
| Unowned Security Signals | 0 |
| Commitment Utilization | Optimized |

---

## 37. Key Findings

### Finding 1 – Infrastructure Commitment

Current infrastructure usage is approximately **28 hosts against a commitment of 27 hosts**.

**Recommendation:** Identify the additional host before increasing commitment.

### Finding 2 – Agent Coverage

Only a subset of the reviewed hosts currently have Datadog Agent installed.

**Recommendation:** Assess the remaining hosts based on criticality and monitoring requirements.

### Finding 3 – Inactive Hosts

Four hosts are currently shown as inactive.

**Recommendation:** Validate ownership and dependencies before considering decommissioning.

### Finding 4 – VM Tagging

Standardized tagging is required.

**Recommendation:** Implement Application, Environment, Owner, BusinessUnit and CostCenter tags as a minimum standard.

### Finding 5 – Workload Protection Coverage

Workload Protection currently shows **41.2% coverage** and only **7 of 17 hosts fully monitored**.

**Recommendation:** Increase coverage for production and security-sensitive workloads.

### Finding 6 – Security Signals

Three Low-severity security signals are currently open.

**Recommendation:** Validate the observed Windows registry activities and document the outcome.

### Finding 7 – Serverless Workload Protection

Serverless Resources are currently inactive.

**Recommendation:** Assess whether Serverless Workload Protection is required.

### Finding 8 – Container Apps

Approximately 22 Azure Container Apps are present with different replica configurations.

**Recommendation:** Review scaling, minimum replicas, maximum replicas and scale-to-zero eligibility.

### Finding 9 – Low Utilization

Some Container Apps show very low observed replica/utilization levels.

**Recommendation:** Validate business requirements before reducing replicas or decommissioning workloads.

---

## 38. Recommended Target State

The target Datadog environment should provide:

- Centralized infrastructure monitoring
- Standardized Agent deployment
- Azure resource visibility
- Host-level metrics
- Centralized log monitoring
- Application monitoring where required
- Workload Protection
- Security signal monitoring
- Standardized VM tagging
- Ownership mapping
- Centralized dashboards
- Actionable monitors
- Resource lifecycle governance
- Commitment optimization
- Periodic health reviews
- Documented operational procedures

---

## 39. Final Recommendations

Airowire recommends the following immediate actions:

1. **Identify the 1 host above the committed infrastructure baseline.**
2. **Validate the 4 inactive hosts.**
3. **Implement standardized VM tagging.**
4. **Assess the 19 hosts without Datadog Agent.**
5. **Prioritize Agent deployment for production and critical systems.**
6. **Improve Workload Protection coverage from the current 41.2%.**
7. **Review the 3 open Low-severity security signals.**
8. **Assess Serverless Workload Protection where applicable.**
9. **Review Azure Container App replica and scaling configuration.**
10. **Validate low-utilization workloads with application owners.**
11. **Avoid immediate commitment expansion until optimization is completed.**
12. **Establish monthly Datadog governance and health reviews.**

---

## 40. Validation Checklist

| Validation Item | Status |
|---|---|
| Azure Integration | Reviewed |
| Host Inventory | Reviewed |
| Active Hosts | Reviewed |
| Inactive Hosts | Identified |
| Datadog Agent Coverage | Reviewed |
| Infrastructure Commitment | Reviewed |
| Additional Host Usage | Identified |
| VM Tagging | Improvement Required |
| Azure Container Apps | Reviewed |
| Container Replica Configuration | Optimization Required |
| Workload Protection | Reviewed |
| Workload Protection Coverage | Improvement Required |
| Security Signals | Reviewed |
| Serverless Workload Protection | Inactive |
| Decommissioning Candidates | Require Owner Validation |
| Monitoring Strategy | Recommendations Provided |
| Governance | Recommendations Provided |
| Airowire Responsibilities | Defined |

---

## 41. Conclusion

The current Trilegal Datadog implementation provides a solid foundation through Azure Integration and existing Datadog Agent deployment.

The primary opportunity is to improve the depth and consistency of monitoring rather than simply expanding the Datadog footprint.

The key priorities are:

1. **Optimize infrastructure commitment usage.**
2. **Validate inactive hosts.**
3. **Standardize VM tagging.**
4. **Expand Agent coverage where required.**
5. **Improve Workload Protection coverage from the current 41.2%.**
6. **Review and validate current security signals.**
7. **Review Azure Container App scaling and replica configuration.**
8. **Establish clear monitoring and security governance.**
9. **Document operational procedures.**
10. **Perform periodic Datadog health and optimization reviews.**

Airowire, as the **Datadog Advanced Partner**, can support Trilegal through the complete lifecycle of:

**Assessment → Onboarding → Monitoring → Security → Optimization → Governance → Documentation → Support**

---

## 42. Contact

**Airowire Networks Pvt. Ltd.**

**Datadog Advanced Partner**

**Datadog Onboarding | Infrastructure Monitoring | Security | Optimization | Implementation | Support**




**Dr. Shivanand Poojara** — shivanand@airowire.com
**Anoop Ravikumar Biradar** - Anoop@airowire.com
**Anil Kumar** - Anil@airowire.com
**Mohammed Saqlain** - Mohammed@airowire.com

