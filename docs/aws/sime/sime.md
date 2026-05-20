<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Solution Document for Infrastructure DevSecOps Pro PoC using AWS and Datadog

**(AWS Infrastructure Monitoring + Cloud Security + SIEM Visibility)**

---

# Purpose of the Document

This SOP defines the standardized process for implementing an Infrastructure DevSecOps Pro Proof of Concept (PoC) using AWS and Datadog.

The deployment introduces:

- Infrastructure Monitoring
- Runtime Security
- Vulnerability Scanning
- Cloud Security Visibility
- Audit Logging
- SIEM-style Log Visibility
- Centralized AWS Log Collection
- Security Telemetry
- Threat Visibility
- Runtime Process Monitoring

The implementation enables platform-level monitoring and security visibility without requiring changes to application code.

---

# Scope

## In Scope

- AWS EC2 Infrastructure Monitoring
- Datadog Agent Installation
- Runtime Security Configuration
- Process Monitoring
- AWS Inspector Configuration
- CloudTrail Integration
- CloudWatch Integration
- Datadog AWS Integration
- Datadog Forwarder Deployment
- Centralized Log Collection
- Security Telemetry
- SIEM-style Visibility

## Out of Scope

- Kubernetes Monitoring
- Container Orchestration
- CI/CD Security Pipelines
- Application Tracing (APM)
- Business Log Parsing

---

# Prerequisites

## Access Requirements

- AWS Console Access
- EC2 SSH Access
- IAM Permissions
- Datadog Account Access

## Tooling Requirements

- AWS CLI
- Linux EC2 Instance
- SSH Client
- Datadog Account

## Networking Requirements

Outbound access to:

- Datadog ingestion endpoints
- AWS APIs
- CloudWatch services
- CloudTrail services

---

# Overview of the Solution

Infrastructure monitoring and security telemetry are implemented using Datadog Agent, AWS CloudTrail, AWS Inspector, CloudWatch Logs, and Datadog Forwarder.

The solution enables:

- Infrastructure visibility
- Runtime security monitoring
- Vulnerability scanning
- Audit log collection
- Threat visibility
- Centralized SIEM-style logging
- Runtime process visibility

---

# Architecture of Logic

```text
AWS EC2
   ↓
Datadog Agent
   ↓
Runtime Security
   ↓
AWS Inspector
   ↓
CloudTrail
   ↓
CloudWatch Logs
   ↓
Datadog Forwarder Lambda
   ↓
Datadog SIEM / Logs
```

---

# Functional Components

| Component | Role |
|---|---|
| Datadog Agent | Infrastructure monitoring & runtime security |
| Datadog Process Agent | Runtime process monitoring |
| AWS Inspector | Vulnerability scanning |
| CloudTrail | AWS audit logging |
| CloudWatch Logs | Centralized AWS log streaming |
| Datadog Forwarder Lambda | Log forwarding to Datadog |
| Datadog SIEM | Security telemetry & log analytics |

---

# Deployment Procedure

## Deployment Environment

Deployment environment included:

- AWS EC2 Instance
- AWS CLI
- IAM Roles
- Datadog Account
- CloudWatch Logs
- CloudTrail

---

# Step 1 - Install Datadog Agent

Connected to EC2 instance using SSH.

Executed:

```bash
DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
DD_SBOM_HOST_ENABLED=true \
DD_ENV=devsecops \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

This enabled:

- Infrastructure Monitoring
- Runtime Security
- SBOM Host Scanning
- Cloud Security features

---

## Verification

Executed:

```bash
sudo systemctl status datadog-agent
```

Verified:

- Datadog Agent running successfully

---

# Step 2 - Verify Datadog Process Agent

Executed:

```bash
sudo systemctl status datadog-agent-process
```

Verified:

- Datadog Process Agent active
- Runtime process monitoring operational

Purpose:

- Monitor running processes
- Runtime threat visibility
- Process telemetry collection

---

# Step 3 - Verify Infrastructure Monitoring

Opened Datadog Infrastructure Dashboard.

Verified:

- EC2 instance visible
- CPU metrics available
- Memory metrics available
- Disk metrics available
- Host telemetry collected

---

# Step 4 - Configure AWS Inspector

Opened:

```text
AWS Console → Amazon Inspector
```

Observed:

- EC2 instance unmanaged
- Vulnerability scanning disabled

---

## Inspector Resource Coverage

Opened:

```text
Inspector → Resource Coverage → EC2 Instances
```

Observed:

```text
Unmanaged EC2 instance
```

Meaning:

- Inspector unable to scan EC2 instance

---

## Fix IAM Role Issue

Navigated to:

```text
EC2 → Actions → Security → Modify IAM Role
```

Attached IAM Role:

```text
AmazonSSMManagedInstanceCore
```

Purpose:

- Enable Systems Manager
- Enable Inspector management
- Enable vulnerability scanning

---

## Verification

Returned to:

```text
Inspector → Resource Coverage
```

Observed:

```text
Scanning = 1
Not scanning = 0
```

Result:

- EC2 vulnerability scanning enabled successfully

---

# Step 5 - Configure AWS CloudTrail

Opened:

```text
AWS Console → CloudTrail → Create Trail
```

Configured:

| Configuration | Value |
|---|---|
| Trail Name | devsecops-trail |
| Multi-region Trail | Enabled |
| CloudWatch Logs | Enabled |
| SNS Notifications | Enabled |
| Log Validation | Enabled |
| SSE-KMS Encryption | Enabled |

---

## CloudTrail Storage

Created S3 bucket:

```text
aws-cloudtrail-logs-828264807293-295c3de3
```

---

## KMS Configuration

Observed error:

```text
AWS KMS alias cannot be empty
```

Resolved using:

```text
alias/cloudtrail-key
```

---

## CloudWatch Integration

Configured:

- CloudWatch Log Group
- IAM Role for CloudTrail
- Log delivery to CloudWatch

Purpose:

- Stream CloudTrail logs into monitoring pipeline

---

# Step 6 - Configure Datadog AWS Integration

Opened:

```text
Datadog → Integrations → Amazon Web Services
```

Connected AWS Account:

```text
828264807293
```

Purpose:

- Infrastructure telemetry collection
- AWS monitoring
- Cloud security visibility

---

## Observed Permission Warning

Observed:

```text
Datadog is not authorized to monitor some services
```

Cause:

- Missing S3 permissions

---

## Updated IAM Policy

Opened policy:

```text
DatadogIntegrationPolicy
```

Added permission:

```json
"s3:GetObject"
```

Purpose:

- Allow Datadog to read CloudTrail logs from S3

Performed:

- Edited policy
- Created new version
- Set as default version

Result:

- Permission issue resolved successfully

---

# Step 7 - Configure Datadog Log Collection

Opened:

```text
Datadog → AWS Integration → Log Collection
```

Attempted enabling:

- CloudTrail Logs
- VPC Flow Logs
- ELB Logs

Issue:

- Toggle switches disabled

Cause:

- Datadog Forwarder Lambda missing

---

# Step 8 - Deploy Datadog Forwarder

Opened:

```text
AWS Serverless Application Repository
```

Searched:

```text
Datadog-Forwarder
```

Purpose:

- Forward AWS logs into Datadog

---

## Initial Deployment Failure

Observed:

```text
ROLLBACK_COMPLETE
```

Cause:

- Existing failed CloudFormation stack

---

## Verified Lambda Functions

Executed:

```bash
aws lambda list-functions --region us-east-1
```

Observed:

- No Datadog Lambda functions

---

## Attempted Serverless Repository Deployment

Executed:

```bash
aws serverlessrepo create-cloud-formation-template
```

Observed:

```text
AccessDeniedException
```

Cause:

- Missing Serverless Repository permissions

---

## Switched to CloudFormation Deployment

Executed:

```bash
aws cloudformation create-stack \
  --stack-name datadog-forwarder \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
  --parameters \
      ParameterKey=DdApiKey,ParameterValue=<DATADOG_API_KEY> \
      ParameterKey=DdSite,ParameterValue=datadoghq.com \
      ParameterKey=FunctionName,ParameterValue=datadog-forwarder \
  --region us-east-1
```

Purpose:

- Deploy Datadog Forwarder Lambda

---

## Resolved Existing Stack Issue

Observed:

```text
Stack already exists
```

Executed:

```bash
aws cloudformation delete-stack
```

Recreated stack successfully.

---

## Verified Lambda Function

Executed:

```bash
aws lambda list-functions \
--query "Functions[?contains(FunctionName, 'datadog')]"
```

Observed:

```text
datadog-forwarder
```

---

## Retrieved Lambda ARN

Executed:

```bash
aws lambda get-function
```

Returned:

```text
arn:aws:lambda:us-east-1:828264807293:function:datadog-forwarder
```

---

# Step 9 - Add Datadog Forwarder ARN

Opened:

```text
Datadog → AWS Integration → Log Collection
```

Added:

```text
arn:aws:lambda:us-east-1:828264807293:function:datadog-forwarder
```

Result:

- Datadog Forwarder connected successfully

---

# Step 10 - Enable AWS Log Sources

Successfully enabled:

- CloudTrail Logs
- VPC Flow Logs
- Application ELB Logs
- API Gateway Logs

Purpose:

- Centralized AWS logging
- Security telemetry
- SIEM visibility

---

# Step 11 - Verify Logs in Datadog

Opened:

Datadog Logs Explorer

Executed query:

```text
source:cloudtrail
```

Observed:

- CloudTrail events
- AWS API activities
- Event IDs
- Security telemetry

---

# Step 12 - Verify Live Tail Monitoring

Opened:

```text
Datadog → Logs → Live Tail
```

Executed query:

```text
source:cloudtrail
```

Verified:

- Real-time CloudTrail events flowing into Datadog

Purpose:

- Validate real-time security telemetry
- Verify SIEM-style visibility

---

# Example Security Monitoring Queries

## Console Login Monitoring

```text
eventName:ConsoleLogin
```

## IAM Policy Monitoring

```text
@eventName:AttachRolePolicy
```

## CloudTrail Monitoring

```text
source:cloudtrail
```

## EC2 Monitoring

```text
@eventSource:ec2.amazonaws.com
```

---

# End-to-End Pipeline Verification

Successfully validated:

```text
AWS EC2
   ↓
Datadog Agent
   ↓
Runtime Security
   ↓
AWS Inspector
   ↓
AWS CloudTrail
   ↓
CloudWatch Logs
   ↓
Datadog Forwarder Lambda
   ↓
Datadog SIEM / Logs
```

Pipeline operational successfully.

---

# Platform Security Capabilities

Once deployed, the platform supports:

- Infrastructure Monitoring
- Runtime Security
- Vulnerability Scanning
- Cloud Security Visibility
- Security Telemetry
- Audit Logging
- SIEM-style Monitoring
- Centralized AWS Logging
- Threat Visibility
- Runtime Process Monitoring

---

# Security Features Implemented

| Component | Status |
|---|---|
| Datadog Agent | Completed |
| Infrastructure Monitoring | Completed |
| Runtime Security | Completed |
| Datadog Process Monitoring | Completed |
| SBOM Scanning | Completed |
| AWS Inspector | Completed |
| Vulnerability Scanning | Completed |
| CloudTrail Logging | Completed |
| CloudWatch Integration | Completed |
| Datadog AWS Integration | Completed |
| Datadog Forwarder Lambda | Completed |
| SIEM Integration | Completed |
| Centralized Logging | Completed |
| Security Telemetry | Completed |

---

# Observations & Findings

Key operational findings:

- Infrastructure monitoring successfully enabled
- Vulnerability scanning active via AWS Inspector
- CloudTrail audit logging operational
- Runtime security visibility enabled
- Security telemetry flowing into Datadog
- Centralized AWS logging operational
- SIEM-style visibility enabled

---

# Optional Enhancements

- Kubernetes Monitoring
- Container Security Monitoring
- AWS GuardDuty Integration
- AWS Security Hub Integration
- AWS Config Integration
- CI/CD Security Scanning
- Terraform Automation
- Datadog Monitors & Alerts
- Compliance Monitoring

---

# Final Outcome

Successfully implemented an Infrastructure DevSecOps Pro PoC using AWS and Datadog.

The implementation provides:

- Infrastructure Monitoring
- Runtime Security
- Vulnerability Scanning
- Audit Logging
- Security Telemetry
- SIEM Integration
- Centralized Logging
- Threat Visibility

The solution aligns with Datadog Infrastructure DevSecOps Pro architecture and security monitoring practices.
