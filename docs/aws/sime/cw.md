<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# SOP — CloudWatch Log Integration with Datadog SIEM

---

# Project

Datadog SIEM & CloudWatch Log Onboarding

---

# Service Provider

**Airowire Networks Pvt. Ltd.**

---

# Reference

Based on approved SOW document.

---

# 1. Objective

To configure existing AWS CloudWatch Log Groups for secure log forwarding into Datadog SIEM using:

- Datadog Forwarder Lambda
- CloudWatch Subscription Filters

---

# 2. Scope

This SOP covers onboarding of the following AWS log sources into Datadog SIEM:

- EC2 Logs
- EKS Fargate Logs
- RDS Logs
- ALB Logs

using existing CloudWatch Log Groups.

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
| Datadog API Key | Configured |
| CloudWatch Logs Receiving Data | Verified |

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
Datadog Forwarder Lambda
            ↓
Datadog SIEM
            ↓
Dashboards / Alerts / SIEM Rules
```

---

# 5. AWS Console Navigation — Step-by-Step Implementation

## Step 1 — Login to AWS Console

Open:

```text
AWS Console
```

Login using authorized AWS credentials.

---

## Step 2 — Open CloudWatch Service

Navigation:

```text
AWS Console
→ Search Bar
→ CloudWatch
```

Click:

```text
CloudWatch
```

---

## Step 3 — Open CloudWatch Log Groups

Navigation:

```text
CloudWatch
→ Logs
→ Log Groups
```

Verify existing log groups are available.

Examples:

```text
/aws/ec2/application
/aws/eks/fargate
/aws/rds/mysql
/aws/alb/access
```

---

## Step 4 — Verify Datadog Forwarder Lambda

Navigation:

```text
AWS Console
→ Lambda
```

Verify Lambda function exists.

Example:

```text
datadog-forwarder
```

---

## Step 4A — Deploy Datadog Forwarder Lambda (If Not Available)

If the `datadog-forwarder` Lambda function is not present in the AWS account,
deploy the official Datadog Forwarder using AWS CloudShell.

---

### Open AWS CloudShell

Click the CloudShell terminal icon from the AWS Console navigation bar.

Navigation:

```text
AWS Console
→ CloudShell
```

Wait for the terminal session to initialize.

---

### Deploy Datadog Forwarder Stack

Run the following command.

Replace:

```text
<YOUR_DATADOG_API_KEY>
```

with the actual Datadog API key.

```bash
aws cloudformation create-stack \
  --stack-name Datadog-Log-Forwarder \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
  --parameters ParameterKey=DdApiKey,ParameterValue=<YOUR_DATADOG_API_KEY> ParameterKey=DdSite,ParameterValue=datadoghq.com
```

---

### Verify CloudFormation Deployment Status

Run:

```bash
aws cloudformation describe-stacks \
  --stack-name Datadog-Log-Forwarder \
  --query "Stacks[0].StackStatus"
```

Wait until the status changes to:

```text
CREATE_COMPLETE
```

---

## Step 4B — Verify Deployed Lambda Function

Navigation:

```text
AWS Console
→ Lambda
→ Functions
```

Verify a Lambda function similar to the following exists:

```text
Datadog-Log-Forwarder-DatadogForwarder-XXXXXXXX
```

Copy the complete Lambda function name.

---

## Step 4C — Grant CloudWatch Permission to Invoke Lambda

Because the Lambda was deployed manually using CloudFormation,
CloudWatch Logs must be explicitly allowed to invoke the function.

Open AWS CloudShell again and run:

```bash
aws lambda add-permission \
  --function-name <DATADOG_FORWARDER_FUNCTION_NAME> \
  --statement-id cloudwatch-logs \
  --principal logs.amazonaws.com \
  --action lambda:InvokeFunction
```

Replace:

```text
<DATADOG_FORWARDER_FUNCTION_NAME>
```

with the actual deployed Lambda function name.

---

### Purpose

This permission allows:

- CloudWatch Logs
- Subscription Filters

to invoke the Datadog Forwarder Lambda securely.

---

## Step 5 — Open a CloudWatch Log Group

Example:

```text
/aws/ec2/application
```

Click the required log group.

---

## Step 6 — Create Subscription Filter

Inside the log group:

```text
Log Group
→ Subscription Filters
→ Create Subscription Filter
```

---

## Step 7 — Configure Destination

Select:

```text
Destination Type:
Lambda Function
```

Choose Lambda Function:

```text
datadog-forwarder
```

---

## Step 8 — Configure Filter Pattern

Filter Pattern:

Leave blank to forward all logs.

Click:

```text
Next
Start Streaming
```

---

## Step 9 — Verify Subscription Filter Status

Verify subscription filter status shows:

```text
Active
```

---

## Step 10 — Repeat for All Required Log Groups

Repeat Steps 5–9 for:

| AWS Service | Example Log Group |
|---|---|
| EC2 | /aws/ec2/application |
| EKS Fargate | /aws/eks/fargate |
| RDS | /aws/rds/mysql |
| ALB | /aws/alb/access |

---

# Important AWS Limitation

AWS CloudWatch Log Groups support a limited number of subscription filters.

Before configuring Datadog forwarding:

- verify existing subscription filters
- ensure no conflicting SIEM integrations exist
- validate forwarding destinations

If another SIEM or Lambda subscription already exists,
evaluate integration impact before proceeding.

---

# 6. Datadog Validation Procedure

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

Use search queries:

```text
source:aws
```

or:

```text
service:ec2
```

Verify logs are successfully visible in Datadog SIEM.

---

## Step 4 — Verify Lambda Invocations

Navigation:

```text
AWS Console
→ Lambda
→ datadog-forwarder
→ Monitor
```

Verify:

- Lambda invocations increasing
- No invocation failures
- No throttling errors

---

# 7. Expected Outcome

After successful completion:

- AWS logs are forwarded into Datadog SIEM
- CloudWatch Subscription Filters are active
- Datadog begins log indexing
- SIEM rules can analyze events
- Security dashboards become operational
- Alerting workflows can be configured

---

# Cost Considerations

CloudWatch log forwarding and Datadog ingestion may increase:

- CloudWatch subscription usage
- Lambda invocation costs
- Datadog log indexing costs

Validate retention and indexing strategies based on operational requirements.

---

# 8. Troubleshooting Guide

## Issue 1 — Logs Not Visible in Datadog

Verify:

- Subscription Filter status
- Lambda execution logs
- IAM permissions
- Datadog API key configuration
- CloudWatch log activity

---

## Issue 2 — Lambda Permission Error

Run:

```bash
aws lambda add-permission \
  --function-name datadog-forwarder \
  --statement-id cwlogs \
  --principal logs.amazonaws.com \
  --action lambda:InvokeFunction
```

---

## Issue 3 — No Logs Generated

Verify:

- Applications are actively writing logs
- CloudWatch Log Group receives logs
- Log streams are updating

---

## Issue 4 — Logs Delayed in Datadog

Possible causes:

| Cause | Resolution |
|---|---|
| Lambda throttling | Increase Lambda concurrency |
| High log volume | Validate ingestion throughput |
| Datadog indexing delay | Wait 5–10 minutes |
| Subscription filter inactive | Re-enable subscription |

---

# 9. IAM Permissions Required

Minimum required permissions:

```json
{
  "Effect": "Allow",
  "Action": [
    "logs:PutSubscriptionFilter",
    "logs:DescribeLogGroups",
    "logs:DescribeSubscriptionFilters",
    "lambda:AddPermission",
    "lambda:InvokeFunction",
    "lambda:GetPolicy"
  ],
  "Resource": "*"
}
```

---

# 10. Validation Checklist

| Validation Item | Status |
|---|---|
| Datadog AWS Integration Verified | ☐ |
| Datadog Forwarder Lambda Available | ☐ |
| Subscription Filters Created | ☐ |
| Logs Visible in Datadog | ☐ |
| Lambda Invocations Successful | ☐ |
| SIEM Ingestion Verified | ☐ |

---

# 11. Rollback Procedure

To remove Datadog forwarding:

1. Open CloudWatch Log Group
2. Navigate to:
   ```text
   Subscription Filters
   ```
3. Delete Datadog subscription filter
4. Verify forwarding stops
5. Validate Lambda invocation reduction

---

# 12. Deliverables

Upon successful completion:

- CloudWatch log forwarding configured
- Datadog SIEM ingestion validated
- Subscription filters operational
- AWS log sources onboarded
- SIEM pipeline verified

Aligned with approved SOW deliverables.

---

# 13. References

- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [Datadog Forwarder Documentation](https://docs.datadoghq.com/logs/guide/forwarder/)
- [Datadog AWS Integration Documentation](https://docs.datadoghq.com/integrations/amazon_web_services/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Datadog SIEM Documentation](https://docs.datadoghq.com/security/cloud_siem/)

---

# Contact

For more information about this document and its contents please contact Airowire Solutions:

- Dr. Shivanand Poojara — shivanand@airowire.com
- Anil Kumar - Anil@airowire.com
- Mohammed Saqlain - Mohammed@airowire.com
