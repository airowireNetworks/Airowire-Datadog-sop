<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# SOP — Datadog Deployment on AWS EKS Fargate Using Terraform

---

# Project

Datadog Monitoring Deployment on AWS EKS Fargate

---

# Service Provider

**Airowire Networks Pvt. Ltd.**

---

# Reference

Based on approved implementation design and Terraform deployment repository.

---

# 1. Objective

To deploy and configure Datadog monitoring on an existing AWS EKS Fargate cluster using Terraform and Helm.

The deployment enables:

- Kubernetes Monitoring
- Infrastructure Monitoring
- Container Monitoring
- Pod Monitoring
- Process Monitoring
- Log Collection
- Datadog Admission Controller
- Datadog Sidecar Injection
- Fargate Monitoring

---

# 2. Scope

This SOP covers deployment and validation of Datadog components on AWS EKS Fargate including:

- Datadog Cluster Agent
- Datadog Operator
- Datadog Admission Controller
- Datadog Webhook
- Sidecar Injection
- Log Collection
- Metrics Collection
- Kubernetes Monitoring
- Fargate Workload Monitoring

As defined in the approved deployment scope.

---

# 3. Repository Reference

Source Repository:

```text
https://github.com/airowireNetworks/EKS-Fargate.git
```

Clone Repository:

```bash
git clone https://github.com/airowireNetworks/EKS-Fargate.git

cd EKS-Fargate/tr/terraform
```

---

# 4. Prerequisites

Ensure the following prerequisites are completed before implementation.

| Requirement | Status |
|------------|---------|
| AWS CLI v2.x | Required |
| kubectl v1.29+ | Required |
| Terraform v1.5+ | Required |
| Helm v3.x | Required |
| eksctl | Required |
| AWS Account Access | Required |
| Existing EKS Fargate Cluster | Required |
| Datadog API Key | Required |
| Datadog Application Key | Required |

---

# 5. Architecture Overview

```text
Datadog SaaS
      ▲
      │
      │ Metrics / Logs / Events
      │
      ▼

AWS EKS Fargate
│
├── datadog-agent Namespace
│   │
│   ├── Datadog Cluster Agent
│   ├── Datadog Operator
│   ├── Admission Controller
│   └── Datadog Webhook
│
└── Application Namespace
    │
    ├── Application Container
    └── Datadog Sidecar
```

---

# 6. Verify Tool Installation

Run:

```bash
aws --version

kubectl version --client

terraform version

helm version

eksctl version
```

Verify all tools are installed successfully.

---

# 7. Access Validation

## Step 1 — Verify Kubernetes Permissions

Run:

```bash
kubectl auth can-i '*' '*' --all-namespaces
```

Expected:

```text
yes
```

---

## Step 2 — Verify Cluster Connectivity

Run:

```bash
kubectl cluster-info

kubectl get nodes

kubectl get ns
```

Expected:

```text
Cluster reachable
```

---

# 8. Datadog Requirements

Obtain:

```text
Datadog API Key

Datadog Application Key
```

Navigation:

```text
Datadog
→ Organization Settings
→ API Keys
```

---

# 9. Validate Existing Fargate Profiles

Run:

```bash
aws eks list-fargate-profiles \
--cluster-name <cluster-name> \
--region <region>
```

Expected:

```text
datadog-profile

application-profile
```

Example:

```text
datadog-profile

sockshop-profile
```

---

# 10. Create Datadog Fargate Profile (If Required)

Run:

```bash
eksctl create fargateprofile \
--cluster <cluster-name> \
--region <region> \
--name datadog-profile \
--namespace datadog-agent
```

Wait until profile status becomes ACTIVE.

---

# 11. Create Application Fargate Profile (If Required)

Run:

```bash
eksctl create fargateprofile \
--cluster <cluster-name> \
--region <region> \
--name app-profile \
--namespace sock-shop
```

Wait until profile status becomes ACTIVE.

---

# 12. Terraform Repository Structure

```text
terraform/
├── provider.tf
├── data.tf
├── namespace.tf
├── secret.tf
├── rbac.tf
├── helm.tf
├── variables.tf
├── outputs.tf
└── environments/
    └── dev.tfvars
```

---

# 13. Terraform Component Explanation

## provider.tf

Configures:

- AWS Provider
- Kubernetes Provider
- Helm Provider

Purpose:

Allows Terraform to communicate with AWS and Kubernetes.

---

## data.tf

Reads:

- EKS Endpoint
- Cluster Certificate
- Authentication Token

Purpose:

Connects Terraform to the existing EKS cluster.

---

## namespace.tf

Creates:

```text
datadog-agent
```

namespace.

---

## secret.tf

Creates:

```text
datadog-secret
```

Stores:

- Datadog API Key
- Datadog Application Key

---

## rbac.tf

Creates:

- ClusterRole
- ClusterRoleBinding

Provides permissions for:

```text
nodes
nodes/proxy
nodes/stats
nodes/metrics
namespaces
endpoints
```

---

## helm.tf

Deploys:

- Datadog Cluster Agent
- Datadog Operator
- Admission Controller
- Datadog Webhook

---

## variables.tf

Contains deployment variables.

---

## outputs.tf

Displays deployment outputs.

---

# 14. Configure Deployment Variables

Update:

```hcl
cluster_name = "<cluster-name>"

region = "<region>"

datadog_api_key = "<api-key>"

datadog_app_key = "<app-key>"
```

Save the file.

---

# 15. Initialize Terraform

Run:

```bash
terraform init
```

Expected:

```text
Terraform has been successfully initialized
```

---

# 16. Validate Terraform Configuration

Run:

```bash
terraform validate
```

Expected:

```text
Success! The configuration is valid.
```

---

# 17. Review Terraform Plan

Run:

```bash
terraform plan \
-var-file=../environments/dev.tfvars
```

Review resources before deployment.

---

# 18. Deploy Datadog

Run:

```bash
terraform apply \
-var-file=../environments/dev.tfvars
```

Type:

```text
yes
```

Expected:

```text
Apply complete!
```

---

# 19. Terraform Deployment Workflow

```text
Terraform Apply
      │
      ▼
Create Namespace
      │
      ▼
Create Secret
      │
      ▼
Create ClusterRole
      │
      ▼
Create ClusterRoleBinding
      │
      ▼
Deploy Helm Release
      │
      ▼
Deploy Cluster Agent
      │
      ▼
Deploy Operator
      │
      ▼
Deploy Admission Controller
      │
      ▼
Create Datadog Webhook
```

---

# 20. Validate Namespace

Run:

```bash
kubectl get ns datadog-agent
```

Expected:

```text
datadog-agent
```

---

# 21. Validate Pods

Run:

```bash
kubectl get pods -n datadog-agent
```

Expected:

```text
datadog-agent-cluster-agent

datadog-agent-operator
```

Status:

```text
Running
```

---

# 22. Validate Helm Release

Run:

```bash
helm list -A
```

Expected:

```text
datadog-agent
```

---

# 23. Validate Secret

Run:

```bash
kubectl get secret datadog-secret \
-n datadog-agent
```

Expected:

```text
datadog-secret
```

---

# 24. Validate Cluster Role

Run:

```bash
kubectl get clusterrole datadog-agent-fargate
```

Expected:

```text
datadog-agent-fargate
```

---

# 25. Validate Cluster Role Binding

Run:

```bash
kubectl get clusterrolebinding datadog-agent-fargate
```

Expected:

```text
datadog-agent-fargate
```

---

# 26. Validate Service

Run:

```bash
kubectl get svc -n datadog-agent
```

Expected:

```text
datadog-agent-cluster-agent
```

---

# 27. Validate Datadog Webhook

Run:

```bash
kubectl get mutatingwebhookconfigurations | grep datadog
```

Expected:

```text
datadog-webhook
```

---

# 28. Enable Sidecar Injection

Patch deployment:

```bash
kubectl patch deployment front-end \
-n sock-shop \
--type merge \
-p '{"spec":{"template":{"metadata":{"labels":{"agent.datadoghq.com/sidecar":"fargate"}}}}}'
```

Restart deployment:

```bash
kubectl rollout restart deployment front-end \
-n sock-shop
```

---

# 29. Verify Sidecar Injection

Run:

```bash
kubectl get pod <pod-name> \
-o jsonpath='{.spec.containers[*].name}'
```

Expected:

```text
front-end datadog-agent-injected
```

---

# 30. Synchronize Datadog Secret

Run:

```bash
kubectl get secret datadog-secret \
-n datadog-agent -o yaml \
| sed 's/namespace: datadog-agent/namespace: sock-shop/' \
| kubectl apply -f -
```

Verify:

```bash
kubectl get secret datadog-secret \
-n sock-shop
```

---

# 31. Configure RBAC

Run:

```bash
kubectl create clusterrolebinding sockshop-datadog-fargate \
--clusterrole=datadog-agent-fargate \
--serviceaccount=sock-shop:default
```

Validate:

```bash
kubectl auth can-i get nodes/proxy \
--as=system:serviceaccount:sock-shop:default
```

Expected:

```text
yes
```

---

# 32. Configure Log Collection

Front-End:

```yaml
ad.datadoghq.com/front-end.logs: |
  [{"source":"nodejs","service":"front-end"}]
```

Orders:

```yaml
ad.datadoghq.com/orders.logs: |
  [{"source":"java","service":"orders"}]
```

RabbitMQ:

```yaml
ad.datadoghq.com/rabbitmq.logs: |
  [{"source":"rabbitmq","service":"rabbitmq"}]
```

---

# 33. Restart Application Workloads

Run:

```bash
kubectl rollout restart deployment \
<deployment-name> \
-n sock-shop
```

Verify:

```bash
kubectl get pods -n sock-shop
```

Expected:

```text
2/2 Running
```

or

```text
3/3 Running
```

---

# 34. Generate Test Logs

View logs:

```bash
kubectl logs deployment/front-end \
-n sock-shop --tail=100
```

Generate traffic:

```bash
curl http://<application-url>
```

---

# 35. Validate Metrics Collection

Run:

```bash
kubectl exec -it <pod> \
-c datadog-agent-injected \
-- agent status
```

Verify:

- Container Metrics
- Kubernetes Metrics
- Running Checks

---

# 36. Validate Log Collection

Run:

```bash
kubectl exec -it <pod> \
-c datadog-agent-injected \
-- agent status
```

Verify:

```text
LogsProcessed > 0

LogsSent > 0

BytesSent > 0
```

---

# 37. Datadog UI Validation

## Infrastructure Validation

Navigation:

```text
Datadog
→ Infrastructure
→ Kubernetes
```

Verify:

- Cluster Visible
- Pods Visible
- Containers Visible
- Workloads Visible

---

## Log Validation

Navigation:

```text
Datadog
→ Logs
→ Explorer
```

Search:

```text
kube_namespace:sock-shop
```

Verify:

```text
Application Logs Visible
```

---

# 38. Expected Outcome

After successful deployment:

- Datadog Cluster Agent Running
- Datadog Operator Running
- Admission Controller Running
- Webhook Available
- Sidecar Injection Operational
- Metrics Visible
- Logs Visible
- Kubernetes Explorer Operational
- Fargate Workloads Monitored

---

# 39. Troubleshooting Guide

| Issue | Resolution |
|---------|------------|
| Datadog Pods Pending | Verify Datadog Fargate Profile |
| Application Pods Pending | Verify Application Fargate Profile |
| Sidecar Not Injected | Verify sidecar label |
| Secret Not Found | Synchronize Secret |
| Metrics Missing | Verify RBAC |
| Logs Missing | Verify Log Annotation |
| Webhook Missing | Verify Admission Controller |
| Helm Release Exists | Remove Release or Import State |

---

# 40. IAM Permissions Required

Minimum permissions:

```json
{
  "Effect": "Allow",
  "Action": [
    "eks:DescribeCluster",
    "eks:ListFargateProfiles",
    "iam:PassRole",
    "ec2:DescribeSubnets",
    "ec2:DescribeSecurityGroups",
    "ec2:DescribeVpcs",
    "sts:GetCallerIdentity"
  ],
  "Resource": "*"
}
```

---

# 41. Validation Checklist

| Validation Item | Status |
|---|---|
| Namespace Created | ☐ |
| Secret Created | ☐ |
| Cluster Agent Running | ☐ |
| Operator Running | ☐ |
| Webhook Available | ☐ |
| Sidecar Injected | ☐ |
| Secret Synchronized | ☐ |
| RBAC Working | ☐ |
| Metrics Visible | ☐ |
| Logs Visible | ☐ |
| Kubernetes Explorer Visible | ☐ |

---

# 42. Rollback Procedure

Remove Helm Release:

```bash
helm uninstall datadog-agent \
-n datadog-agent
```

Or destroy infrastructure:

```bash
terraform destroy \
-var-file=../environments/dev.tfvars
```

---

# 43. Deliverables

Upon successful completion:

- Datadog deployed on AWS EKS Fargate
- Cluster Agent operational
- Datadog Operator deployed
- Admission Controller deployed
- Webhook configured
- Sidecar Injection enabled
- Metrics collection validated
- Log collection validated
- Kubernetes monitoring enabled
- Fargate monitoring operational

---

# 44. Important Implementation Notes

- Datadog namespace requires a dedicated Fargate Profile.
- Application namespace requires a Fargate Profile.
- Sidecar injection requires:

```text
agent.datadoghq.com/sidecar: fargate
```

- Secret must exist in application namespace.
- RBAC must be configured.
- Log annotations are mandatory.
- Restart workloads after adding labels or annotations.
- Verify metrics before dashboard validation.
- Verify logs before SIEM validation.

---

# 45. Success Criteria

Deployment is considered successful when:

- Datadog Cluster Agent Running
- Datadog Operator Running
- Datadog Webhook Available
- Sidecar Injection Working
- Metrics Visible in Datadog
- Logs Visible in Datadog
- Kubernetes Explorer Operational
- No Pending Datadog Components
- No Failed Datadog Components

---
# References

- https://docs.datadoghq.com/
- https://docs.datadoghq.com/containers/kubernetes/
- https://docs.datadoghq.com/containers/amazon_eks/
- https://registry.terraform.io/providers/hashicorp/aws/latest/docs
- https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs
- https://helm.sh/docs/
- https://eksctl.io/

# Contact

For more information about this document and its contents please contact Airowire Networks:

- Dr. Shivanand Poojara — shivanand@airowire.com
- Anil Kumar — anil@airowire.com
- Mohammed Saqlain — mohammed@airowire.com

---
