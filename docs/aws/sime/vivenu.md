<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Google Workspace Service & Cloud SIEM Analysis

---

## Client Information

| Field | Details |
|---|---|
| **Client** | Vivenu |
| **Monitoring Platform** | Datadog Log Management & Cloud SIEM |
| **Log Source** | `source:gsuite` |
| **Additional Source** | Google Workspace Alert Center |
| **Analysis Period** | Last 1 Month |
| **Primary Scope** | Google Workspace log ingestion, service coverage, ingestion drops and Cloud SIEM detection coverage |

---

# 1. Executive Summary

This report provides a one-month analysis of Google Workspace logs ingested into Datadog for the Vivenu environment.

The analysis covers:

- Google Workspace service-wise log volume
- Datadog ingestion activity
- Service-level log distribution
- Cloud SIEM detection-rule coverage
- DLP-related monitoring
- Administrative and authentication monitoring
- Services without dedicated service-specific detection rules
- Historical Gmail ingestion-drop findings
- Recommendations for improving monitoring coverage

During the reviewed one-month period, approximately **147K Google Workspace logs** were identified in Datadog.

The main services observed were:

- Context-Aware Access
- Gemini for Workspace
- Google Chat
- Google Meet
- Rules
- Admin
- Login

The reviewed Cloud SIEM configuration contains **19 enabled Google Workspace detection rules**.

Dedicated detection rules were identified for several administrative, authentication, data-transfer and security-related activities.

However, dedicated service-specific detection rules were **not identified in the reviewed screenshots** for:

- Context-Aware Access
- Gemini for Workspace
- Google Chat
- Google Meet

This should be treated as a detection-coverage observation and not as evidence that these services are not monitored.

---

# 2. Scope

The following areas were reviewed.

## 2.1 Log Ingestion

- Google Workspace logs
- `source:gsuite`
- Service-wise log distribution
- One-month log volume
- Daily activity trend

## 2.2 Cloud SIEM

- Enabled Google Workspace detection rules
- Detection-rule severity
- Administrative monitoring
- Authentication monitoring
- DLP-related monitoring
- Data-transfer monitoring
- Google Drive activity monitoring

## 2.3 Ingestion Health

- Historical ingestion-drop analysis
- Gmail `too_old` drops
- Datadog historical ingestion limitations
- Current-period validation requirements

---

# 3. Analysis Methodology

The analysis was performed using:

1. Datadog Log Explorer
2. Google Workspace log source
3. Cloud SIEM Detection Rules
4. Service-wise log facets
5. Historical Google Workspace ingestion analysis
6. Previously documented Gmail ingestion RCA

## Primary Datadog Log Filter

`source:gsuite`

The one-month analysis focuses on current log volume and detection coverage.

Historical Gmail findings are presented separately because they relate to the previously identified ingestion-delay issue.

---

# 4. One-Month Log Ingestion Summary

During the reviewed one-month period, Datadog showed approximately:

**147K Google Workspace logs**

## Service-wise Log Distribution

| Service | Approx. Logs |
|---|---:|
| Context-Aware Access | 29.2K |
| Gemini for Workspace | 25.3K |
| Google Chat | 21.9K |
| Google Meet | 20.4K |
| Rules | 18.8K |
| Admin | 18.8K |
| Login | 6.8K |
| Gemini for Workspace – additional facet | 5.54K |
| **Total displayed facets** | **~146.74K** |
| **Datadog total displayed** | **~147K** |

The displayed service values approximately reconcile with the overall Datadog total of **147K logs**.

The small difference is consistent with Datadog displaying rounded facet values.

---

# 5. Service-Wise Log Analysis

## 5.1 Context-Aware Access

### Observed Volume

**~29.2K logs**

Context-Aware Access represents one of the largest Google Workspace service categories observed during the one-month period.

### Detection Coverage

A dedicated detection rule specifically named for Context-Aware Access was not identified in the reviewed Cloud SIEM screenshots.

This does not mean Context-Aware Access is not monitored.

It means that a dedicated service-specific Cloud SIEM detection rule was not identified in the reviewed rule inventory.

### Recommendation

Review whether the following activities require dedicated security detection:

- Context-Aware Access policy changes
- Access-policy modifications
- Unexpected policy changes
- Administrative changes affecting access restrictions

---

# 6. Gemini for Workspace

### Observed Volume

**~25.3K logs**

Gemini for Workspace is one of the higher-volume services observed in the current one-month dataset.

### Detection Coverage

A dedicated Gemini for Workspace detection rule was not identified in the reviewed Cloud SIEM screenshots.

### Recommendation

Review whether Gemini-related activity should have dedicated detection coverage.

Potential monitoring areas include:

- Administrative configuration changes
- Unexpected configuration changes
- Security-sensitive Gemini activity
- Unusual access patterns

These are recommendations for review and do not represent confirmed existing detection rules.

---

# 7. Gemini for Workspace – Additional Facet

Another Gemini-related facet was visible with approximately:

**~5.54K logs**

This was displayed separately from the main Gemini for Workspace facet.

The current evidence does not establish whether this represents:

- A separate event subtype
- A separate service category
- A Datadog facet representation

Therefore, this should be treated as an additional observed Gemini-related log category rather than assuming it is a separate Google Workspace service.

---

# 8. Google Chat

### Observed Volume

**~21.9K logs**

Google Chat represents a significant portion of the one-month Google Workspace log volume.

### Detection Coverage

No dedicated Google Chat detection rule was identified in the reviewed Cloud SIEM screenshots.

### Recommendation

Review whether security-relevant Google Chat activities require dedicated monitoring.

Potential areas for consideration:

- External communication
- Administrative changes
- Suspicious activity
- Abnormal access behaviour
- Security policy changes

---

# 9. Google Meet

### Observed Volume

**~20.4K logs**

Google Meet is another major contributor to the one-month log volume.

### Detection Coverage

No dedicated Google Meet detection rule was identified in the reviewed Cloud SIEM screenshots.

### Recommendation

Review whether dedicated monitoring is required for:

- Meeting configuration changes
- Administrative changes
- External access
- Security-sensitive meeting activity

---

# 10. Rules / DLP

### Observed Volume

**~18.8K logs**

The `rules` service is relevant to Google Workspace rule and DLP-related activity.

The existing audit identifies this service as containing activities such as:

- DLP triggers
- File scanning violations
- Security policy actions

## Related Cloud SIEM Rules

The reviewed Cloud SIEM configuration includes rules related to:

`Google Workspace administrator initiated a data transfer request`

`Large amount of downloads on Google Drive`

`Google Workspace user forwarding email out of non-Google Workspace domain`

### Assessment

DLP-related telemetry and related detection use cases are present.

However, the reviewed rules do not prove that every possible DLP scenario has a dedicated detection rule.

### Recommendation

Review the DLP use-case matrix and confirm that all business-critical DLP scenarios have appropriate detection and alerting.

---

# 11. Admin

### Observed Volume

**~18.8K logs**

Administrative activity has dedicated Cloud SIEM coverage.

Examples identified include:

- Administrative role assignment
- Administrative role creation
- Account security changes
- Recovery information changes
- Two-step verification changes
- Domain allowlisting changes
- Data transfer requests

### Assessment

Administrative activity has broad detection coverage in the reviewed rule set.

---

# 12. Login

### Observed Volume

**~6.8K logs**

Login and account-security activity has multiple Cloud SIEM detections.

Examples include:

- Suspicious session-cookie activity
- Account security changes
- Leaked-password login attempts
- Two-step verification changes
- Advanced Protection changes

### Assessment

Authentication and account-security activity is represented in the reviewed Cloud SIEM rule inventory.

---

# 13. Service-to-Detection-Rule Coverage

The following table summarizes the reviewed service-level coverage.

| Service | Logs Observed | Dedicated Rule Identified | Observation |
|---|---:|---|---|
| Context-Aware Access | ~29.2K | No | Dedicated service-specific rule not identified |
| Gemini for Workspace | ~25.3K | No | Dedicated service-specific rule not identified |
| Google Chat | ~21.9K | No | Dedicated service-specific rule not identified |
| Google Meet | ~20.4K | No | Dedicated service-specific rule not identified |
| Rules / DLP | ~18.8K | Related rules identified | DLP/data-transfer coverage present |
| Admin | ~18.8K | Yes | Multiple administrative rules |
| Login | ~6.8K | Yes | Authentication/security rules |

---

# 14. Services Without Dedicated Detection Rules

Based on the reviewed Cloud SIEM screenshots, dedicated service-specific detection rules were not identified for:

## Context-Aware Access

**~29.2K logs**

## Gemini for Workspace

**~25.3K logs**

## Google Chat

**~21.9K logs**

## Google Meet

**~20.4K logs**

These services should be reviewed against the client's security monitoring requirements.

> **Important:** Absence of a dedicated rule does not mean absence of monitoring. It means that a dedicated service-specific detection rule was not identified in the reviewed rule inventory.

---

# 15. Cloud SIEM Detection Rule Inventory

The reviewed Google Workspace Cloud SIEM configuration contains:

**19 enabled Google Workspace detection rules**

| Severity | Detection Use Case |
|---|---|
| High | Google Workspace changes to Multi Approval setup |
| Low | Google Workspaces Delegated Admin changes |
| Low | Google Workspace Multi Approval workflow triggered |
| High | Google Workspace user signed out due to suspicious session cookie |
| High | Google Workspace user performing account deletion or security changes |
| Medium | Unfamiliar service account changing group memberships |
| High | Google Workspace user assigned administrative role |
| Low | Google Workspace user disabled 2-step verification |
| Low | Google Workspace administrator initiated a data transfer request |
| Low | Google Workspace user has unenrolled from Advanced Protection |
| High | Google Workspace user edited account recovery information |
| Medium | Google Workspace administrator disabled 2-step verification for organizational unit |
| Medium | Domain added to Google Workspace allowlisted domains |
| High | Google Workspace Tor client detected |
| Low | Google Workspace admin role created |
| Medium | Google Workspace accessed by Google |
| Low | Google Workspace user forwarding email out of non-Google Workspace domain |
| Low | Large amount of downloads on Google Drive |
| Info | User attempted login with leaked password |

---

# 16. Detection Coverage by Security Area

| Security Area | Coverage Observed |
|---|---|
| Administrative Changes | Yes |
| Admin Role Changes | Yes |
| Account Security | Yes |
| Authentication | Yes |
| 2-Step Verification | Yes |
| Recovery Information | Yes |
| Domain Allowlisting | Yes |
| Data Transfer | Yes |
| Google Drive Download Activity | Yes |
| External Email Forwarding | Yes |
| Tor Access | Yes |
| DLP-related Activity | Related coverage identified |
| Context-Aware Access | Dedicated rule not identified |
| Gemini for Workspace | Dedicated rule not identified |
| Google Chat | Dedicated rule not identified |
| Google Meet | Dedicated rule not identified |

---

# 17. Daily Log Trend

The one-month Datadog view shows activity across the reviewed period, with increased activity visible toward the end of the reporting window.

The trend indicates active Google Workspace log generation.

The observed increase should not automatically be interpreted as an ingestion problem.

A log-volume increase can result from:

- Increased user activity
- Increased administrative activity
- Increased application usage
- Increased security events
- Service-specific activity

Ingestion health should be validated separately using Datadog drop metrics.

---

# 18. Ingestion Drop Validation

The current one-month screenshot provides total log volume and service distribution but does not display the `drop_count` metric.

Therefore:

| Validation Area | Current Evidence |
|---|---|
| Log volume | Validated |
| Service distribution | Validated |
| Current drop count | Not directly validated |
| Current drop reason | Not directly validated |

The following Datadog metric should be used to validate ingestion drops:

`sum(last_15m):sum:datadog.estimated_usage.logs.drop_count{source:gsuite} by {reason,service}.as_count() > 0`

This should be configured as a Datadog metric monitor.

## Recommended Monitor Name

**Google Workspace Log Ingestion Drop Detection**

## Recommended Alert Condition

`drop_count > 0`

## Recommended Grouping

- `reason`
- `service`

This provides visibility into:

- Which service is dropping logs
- Why logs are being dropped
- Whether the issue is isolated or widespread

---

# 19. Historical Gmail Ingestion RCA

A previous audit identified a Gmail ingestion issue.

During the historical audit period:

**~346K Gmail logs were indexed**

Approximately:

**~90K Gmail logs were dropped**

The primary drop reason was:

`too_old`

The historical analysis identified Google Reports API publication delay as the root cause.

Events were observed arriving approximately:

**19–38 hours old**

Datadog's historical intake window was:

**18 hours**

Therefore, events older than the supported historical intake window were rejected.

---

# 20. Historical Gmail Root Cause

The historical sequence was:

**Google Workspace**

↓

**Google Reports API**

↓

**Delayed event publication**

↓

**Datadog Google Workspace Integration**

↓

**Event age greater than 18 hours**

↓

**Datadog Intake**

↓

**`too_old` Drop**

### Root Cause

The issue was caused by upstream event publication latency.

### Impact

Gmail events that arrived outside Datadog's supported historical ingestion window were dropped.

### Important

This historical Gmail issue should not automatically be interpreted as a current-month ingestion failure.

Current-period drop validation should be performed using:

`datadog.estimated_usage.logs.drop_count`

---

# 21. Historical RCA vs Current Analysis

| Area | Historical Finding | Current One-Month Analysis |
|---|---|---|
| Gmail | `too_old` drops identified | Current screenshot does not show `drop_count` |
| Root Cause | Google Reports API publication delay | No new root cause established |
| Datadog Intake | 18-hour historical window | Same ingestion mechanism should be monitored |
| Workspace Logs | Multiple services healthy historically | ~147K current logs observed |
| Cloud SIEM | Existing detection rules | 19 enabled rules reviewed |
| Context-Aware Access | Historical service coverage | ~29.2K current logs |
| Gemini | Not central to historical RCA | ~25.3K current logs |
| Google Chat | Not central to historical RCA | ~21.9K current logs |
| Google Meet | Not central to historical RCA | ~20.4K current logs |

---

# 22. Recommendations

## 22.1 Configure Ingestion Drop Monitoring

Create a Datadog monitor using:

`sum(last_15m):sum:datadog.estimated_usage.logs.drop_count{source:gsuite} by {reason,service}.as_count() > 0`

This provides early detection of ingestion failures.

---

## 22.2 Monitor Gmail Historical Drops

Continue monitoring:

`source:gsuite`

with the relevant historical drop reason:

`reason:too_old`

This will help identify recurrence of delayed Gmail events.

---

## 22.3 Review Context-Aware Access Detection

Review whether dedicated detection rules are required for:

- Policy changes
- Access restriction changes
- Administrative changes

---

## 22.4 Review Gemini Detection Coverage

Review whether Gemini for Workspace requires dedicated detection coverage for:

- Configuration changes
- Administrative activity
- Security-sensitive activity

---

## 22.5 Review Google Chat Detection Coverage

Review whether dedicated detection is required for:

- External communication
- Administrative changes
- Security-sensitive activity

---

## 22.6 Review Google Meet Detection Coverage

Review whether dedicated detection is required for:

- Meeting configuration changes
- Administrative activity
- External access

---

## 22.7 Review DLP Coverage

Validate that the existing DLP-related rules cover the client's required scenarios.

Existing related coverage includes:

- Data Transfer
- Large Google Drive Downloads
- External Email Forwarding

---

# 23. Recommended Monitoring Dashboard

A dedicated Google Workspace monitoring dashboard should include:

| Widget | Metric / Query |
|---|---|
| Total Workspace Logs | `source:gsuite` |
| Logs by Service | `source:gsuite` grouped by service |
| Logs by Day | `source:gsuite` over time |
| Ingestion Drops | `datadog.estimated_usage.logs.drop_count` |
| Drops by Service | Group by `service` |
| Drops by Reason | Group by `reason` |
| Gmail `too_old` Drops | `source:gsuite` + `reason:too_old` |
| Cloud SIEM Rules | Google Workspace detection rules |
| DLP Events | `service:rules` |
| Admin Activity | `service:admin` |
| Login Activity | `service:login` |

---

# 24. Recommended Alerting

## Critical

Alert when:

`source:gsuite` ingestion `drop_count > 0`

for high-priority services or security-related events.

## High

Alert on repeated:

`reason:too_old`

events.

## Medium

Alert on unusual increases in:

- Admin activity
- Login activity
- DLP activity
- Google Drive downloads

## Low

Monitor service-volume changes for:

- Chat
- Meet
- Gemini
- Context-Aware Access

---

# 25. Final Findings

The one-month Google Workspace analysis identified approximately:

**147K logs**

The primary observed services were:

- Context-Aware Access
- Gemini for Workspace
- Google Chat
- Google Meet
- Rules
- Admin
- Login

The reviewed Cloud SIEM configuration contains:

**19 enabled Google Workspace detection rules**

Strong coverage was identified for:

- Administrative activity
- Account security
- Authentication
- 2-Step Verification
- Recovery information
- Domain allowlisting
- Data transfer
- Google Drive downloads
- External email forwarding
- Tor access

Dedicated service-specific detection rules were not identified in the reviewed screenshots for:

- Context-Aware Access
- Gemini for Workspace
- Google Chat
- Google Meet

The historical Gmail ingestion issue was related to:

**Google Reports API publication delay**

combined with:

**Datadog's 18-hour historical intake window**

which resulted in:

**`too_old` log drops**

The current one-month screenshots confirm log ingestion volume and service distribution, but they do not by themselves establish the current drop count.

---

# 26. Final Conclusion

The Vivenu Google Workspace environment is actively sending telemetry to Datadog, with approximately **147K logs observed during the reviewed one-month period**.

Cloud SIEM provides broad detection coverage for administrative, authentication, account-security and selected data-protection activities.

The primary improvement area identified from the reviewed configuration is **dedicated detection coverage for high-volume Workspace services**, particularly:

- Context-Aware Access
- Gemini for Workspace
- Google Chat
- Google Meet

The previously identified Gmail `too_old` ingestion issue should continue to be monitored separately using Datadog ingestion-drop metrics.

The recommended next step is to implement ingestion-drop monitoring and perform a service-by-service detection coverage review against Vivenu's security requirements.

---

# 27. Recommended Action Plan

| Priority | Action | Status |
|---|---|---|
| High | Configure Google Workspace ingestion-drop monitor | Recommended |
| High | Monitor Gmail `too_old` drops | Recommended |
| High | Review Context-Aware Access detection coverage | Recommended |
| High | Review Gemini detection coverage | Recommended |
| Medium | Review Google Chat detection coverage | Recommended |
| Medium | Review Google Meet detection coverage | Recommended |
| Medium | Validate DLP detection coverage | Recommended |
| Medium | Create Google Workspace SIEM dashboard | Recommended |
| Low | Review service-level volume trends | Recommended |

---

# 28. Contact

**Airowire Networks Pvt. Ltd.**

**Datadog Observability & Cloud SIEM Team**`
Dr. Shivanand Poojara

shivanand@airowire.com

