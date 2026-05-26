<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# SOP — Enterprise CloudWatch Log Streaming to Datadog SIEM using Kinesis Firehose

---

# Project

Enterprise AWS Log Onboarding into Datadog SIEM

---

# Service Provider

**Airowire Networks Pvt. Ltd.**

---

# Reference

Based on approved SOW requirements.

---

# 1. Objective

To configure centralized and scalable AWS log streaming from existing CloudWatch Log Groups into Datadog SIEM using Amazon Kinesis Data Firehose.

This implementation supports enterprise-grade:

- centralized logging
- SIEM onboarding
- scalability
- buffering
- reliable delivery
- multi-account expansion readiness

---

# 2. Scope

This SOP covers onboarding of the following AWS log sources into Datadog SIEM:

- EC2 Logs
- EKS Fargate Logs
- RDS Logs
- ALB Logs

using:

- Existing CloudWatch Log Groups
- CloudWatch Subscription Filters
- Kinesis Firehose
- Datadog HTTP Endpoint Integration

As defined in the approved SOW.

---

# 3. Prerequisites

Ensure the following prerequisites are completed before implementation:

| Requirement | Status |
|---|---|
| AWS Console Access | Required |
| Datadog AWS Integration | Completed |
| Existing CloudWatch Log Groups | Available |
| IAM Permissions | Required |
| Datadog API Key | Available |
| Kinesis Firehose Access | Required |
| CloudWatch Logs Receiving Data | Verified |
| Same AWS Region Validation | Required |

---

# 4. Architecture Overview

```text
AWS Workloads
(EC2 / EKS / RDS / ALB)
            ↓
CloudWatch Log Groups
            ↓
CloudWatch Subscription Filters
            ↓
Kinesis Data Firehose
            ↓
Datadog HTTP Endpoint
            ↓
Datadog SIEM
            ↓
Dashboards / Alerts / SIEM Rules
```

---

# 5. Implementation Flow

The implementation consists of:

- Create Kinesis Firehose Delivery Stream
- Configure Datadog HTTP Endpoint
- Configure CloudWatch Subscription Filters
- Validate Firehose delivery
- Validate Datadog ingestion
- Configure monitoring and alerting

---

# 6. AWS Console Navigation — Kinesis Firehose Setup

## Step 1 — Login to AWS Console

Open:

```text
AWS Console
```

Login using authorized AWS credentials.

---

## Step 2 — Open Kinesis Firehose

Navigation:

```text
AWS Console
→ Search Bar
→ Kinesis
```

Click:

```text
Amazon Data Firehose
```

---

## Step 3 — Create Delivery Stream

Navigation:

```text
Amazon Data Firehose
→ Delivery Streams
→ Create Delivery Stream
```

---

## Step 4 — Configure Source

### Source Configuration

Select:

```text
Source:
Direct PUT
```

Click:

```text
Next
```

---

## Step 5 — Configure Destination

### Destination Configuration

Select:

```text
Destination:
HTTP Endpoint
```

Click:

```text
Next
```

---

## Step 6 — Configure Datadog HTTP Endpoint

### Endpoint Settings

Use:

| Field | Value |
|---|---|
| HTTP Endpoint URL | https://http-intake.logs.datadoghq.com/v1/input |
| Access Key | Datadog API Key |
| Name | datadog-firehose |

---

## Step 7 — Configure Backup Settings

Recommended:

| Setting | Value |
|---|---|
| Failed Data Backup | Enabled |
| S3 Backup Bucket | Configure Existing S3 Bucket |
| Retry Duration | 300 Seconds |

This ensures logs are not lost during failures.

---

## Step 8 — Configure Buffer Settings

Recommended enterprise settings:

| Setting | Value |
|---|---|
| Buffer Size | 5 MB |
| Buffer Interval | 60 Seconds |
| Compression | GZIP |

---

## Step 9 — Configure IAM Role

Select:

- Create new IAM role
OR
- Use existing Firehose delivery role

Required permissions:

- S3 write
- CloudWatch access
- Firehose delivery

Click:

```text
Next
Create Delivery Stream
```

---

## Step 10 — Verify Firehose Status

Status should show:

```text
Active
```

---

# Important Enterprise Consideration

Before configuring CloudWatch subscription filters:

- verify no existing conflicting destinations exist
- validate Firehose region alignment
- confirm ingestion sizing requirements
- validate Datadog indexing strategy

CloudWatch Log Groups support limited subscription filter configurations.

---

# 7. CloudWatch Subscription Filter Configuration

## Step 1 — Open CloudWatch

Navigation:

```text
AWS Console
→ Search Bar
→ CloudWatch
```

---

## Step 2 — Open Log Groups

Navigation:

```text
CloudWatch
→ Logs
→ Log Groups
```

Verify existing log groups.

Examples:

```text
/aws/ec2/application
/aws/eks/fargate
/aws/rds/mysql
/aws/alb/access
```

---

## Step 3 — Open Log Group

Example:

```text
/aws/ec2/application
```

---

## Step 4 — Create Subscription Filter

Navigation:

```text
Log Group
→ Subscription Filters
→ Create
```

---

## Step 5 — Configure Destination

Select:

```text
Destination Type:
Kinesis Firehose
```

Choose:

```text
datadog-firehose
```

---

## Step 6 — Configure Filter Pattern

Leave blank:

```text
(blank forwards all logs)
```

Click:

```text
Next
Start Streaming
```

---

## Step 7 — Verify Subscription Filter Status

Verify status:

```text
Active
```

---

## Step 8 — Repeat for All Required Log Groups

Repeat Steps 3–7 for:

| AWS Service | Example Log Group |
|---|---|
| EC2 | /aws/ec2/application |
| EKS Fargate | /aws/eks/fargate |
| RDS | /aws/rds/mysql |
| ALB | /aws/alb/access |

As required in approved SOW.

---

# 8. Datadog Validation Procedure

## Step 1 — Login to Datadog

Open:

```text
Datadog Login
```

---

## Step 2 — Open Log Explorer

Navigation:

```text
Datadog
→ Logs
→ Log Explorer
```

---

## Step 3 — Validate Incoming Logs

Search using:

```text
source:aws
```

or:

```text
service:ec2
```

Verify logs are visible and continuously updating.

---

## Step 4 — Validate Firehose Delivery Metrics

Navigation:

```text
AWS Console
→ Kinesis Firehose
→ datadog-firehose
→ Monitoring
```

Verify:

- Incoming records increasing
- Delivery success increasing
- No delivery failures
- Retry count stable

---

# 9. Operational Monitoring

Monitor the following services continuously:

| Component | Monitoring Item |
|---|---|
| Firehose | Delivery failures |
| Firehose | Incoming records |
| Firehose | DeliveryToHttpEndpointSuccess |
| CloudWatch | Subscription filter failures |
| Datadog | Log ingestion delay |
| Datadog | SIEM indexing |
| S3 Backup | Failed delivery storage |

---

# 10. Troubleshooting Guide

## Issue 1 — Logs Not Visible in Datadog

Verify:

- CloudWatch subscription filters
- Firehose delivery stream status
- Datadog API key
- Firehose HTTP endpoint
- Region alignment

---

## Issue 2 — Firehose Delivery Failure

Check:

- HTTP endpoint configuration
- Datadog API key validity
- Retry configuration
- Backup S3 bucket

---

## Issue 3 — CloudWatch Cannot Stream Logs

Verify:

- IAM permissions
- Firehose ARN selection
- Active Firehose status

---

## Issue 4 — Region Mismatch

Ensure:

- CloudWatch
- Firehose
- Datadog integration

are configured in the same AWS region.

---

## Issue 5 — High Delivery Delay

Possible causes:

| Cause | Resolution |
|---|---|
| High log volume | Increase Firehose throughput |
| Large buffering interval | Reduce buffering interval |
| Endpoint throttling | Validate Datadog ingestion limits |
| Retry saturation | Review failed delivery metrics |

---

# 11. Rollback Procedure

If rollback is required:

1. Remove CloudWatch Subscription Filters
2. Disable Firehose Delivery Stream
3. Validate CloudWatch normal operation
4. Verify Datadog ingestion stops
5. Retain S3 backup logs for audit

---

# 12. IAM Permissions Required

## CloudWatch Permissions

```json
{
  "Effect": "Allow",
  "Action": [
    "logs:PutSubscriptionFilter",
    "logs:DescribeLogGroups",
    "logs:DescribeSubscriptionFilters"
  ],
  "Resource": "*"
}
```

---

## Firehose Permissions

```json
{
  "Effect": "Allow",
  "Action": [
    "firehose:PutRecord",
    "firehose:PutRecordBatch",
    "firehose:DescribeDeliveryStream"
  ],
  "Resource": "*"
}
```

---

# 13. Validation Checklist

| Validation Item | Status |
|---|---|
| Firehose Delivery Stream Created | ☐ |
| CloudWatch Subscription Filters Active | ☐ |
| Firehose Receiving Logs | ☐ |
| Datadog HTTP Delivery Successful | ☐ |
| Logs Visible in Datadog | ☐ |
| SIEM Ingestion Verified | ☐ |
| Backup S3 Bucket Configured | ☐ |

---

# 14. Expected Outcome

After successful implementation:

- CloudWatch logs stream into Kinesis Firehose
- Firehose reliably delivers logs into Datadog
- Datadog SIEM indexes AWS events
- Enterprise centralized logging becomes operational
- Dashboards and alerts become available
- High-scale ingestion pipeline is established

---

# 15. Cost Considerations

| Service | Cost Factor |
|---|---|
| CloudWatch Logs | Log ingestion volume |
| Firehose | Delivery throughput |
| S3 Backup | Storage usage |
| Datadog | Indexed log volume |

---

# 16. Deliverables

Upon successful completion:

- Enterprise Firehose-based log pipeline operational
- AWS log sources onboarded into Datadog SIEM
- Subscription filters configured
- Firehose delivery validated
- SIEM ingestion verified
- Backup and retry mechanisms enabled

Aligned with approved SOW deliverables.

---

# 17. References

- AWS Kinesis Firehose Documentation
- AWS CloudWatch Logs Documentation
- Datadog AWS Integration Documentation
- Datadog AWS Log Collection Documentation
- AWS Firehose HTTP Endpoint Documentation
- Datadog SIEM Documentation
