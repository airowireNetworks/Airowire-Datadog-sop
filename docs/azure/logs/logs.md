<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Solution Document for Instrumenting APM for Azure Kubernetes Services
</h1>

<p><strong>(Datadog APM + USM via Terraform on AKS)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized process for deploying Datadog observability components into an existing Azure Kubernetes Service (AKS) cluster using Terraform and Helm. The deployment introduces:

- Kubernetes and workload visibility
- Container-level telemetry (logs, metrics)
- Automatic APM instrumentation (no code changes)
- Universal Service Monitoring (USM)
- eBPF-based network dependency mapping

Deployment is platform-driven and does not require modifications to application code or images.

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- Deployment to a single AKS cluster (POC or initial onboarding)
- Terraform-based deployment automation
- Platform/SRE operational ownership

<strong>Out of Scope:</strong>

- Application-level instrumentation changes
- Multi-cluster rollout automation
- Commercial & cost modelling
- Governance & compliance frameworks
- Production hardening activities

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

<strong>Access Requirements:</strong>

- Azure subscription access
- AKS RBAC (read/write)
- Datadog account access
- Datadog ingestion API key

<strong>Tooling Requirements:</strong>

- Terraform v1.x
- Providers: azurerm, helm, kubernetes
- kubectl (optional for validation)

<strong>Networking Requirements:</strong>

Outbound access to Datadog ingestion endpoints for:

- Metrics
- Logs
- APM/USM
- Metadata

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

Helm-based Datadog component installation within AKS is coordinated by the deployment using Terraform.

<h3 style="color:#000000; font-weight:bold;">Architecture of Logic</h3>

Terraform → Helm → Datadog Agent → Datadog Cloud UI

<h3 style="color:#000000; font-weight:bold;">Functional Components</h3>

| Component | Role |
|---|---|
| Terraform | Deployment automation & lifecycle control |
| Helm | Installs Datadog agents & controllers |
| Datadog Agent | Telemetry ingestion & instrumentation |
| Cluster Agent | Kubernetes API metadata correlation |
| Admission Controller | Automatic APM injection |
| USM + eBPF | Service & network dependency mapping |
| Datadog UI | Observability, analytics & diagnostics |

<h2 style="color:#000000; font-weight:bold;">Deployment Procedure</h2>

This section describes the deployment steps executed to deploy Datadog components into an existing AKS cluster using Terraform from a Linux VM.

<h3 style="color:#000000; font-weight:bold;">Deployment Environment</h3>

Deployment VM configured with:

- Terraform
- Azure CLI (optional)
- kubectl (optional)
- Helm provider (via Terraform)

<h3 style="color:#000000; font-weight:bold;">Authentication to Azure</h3>

Manual login:

```bash
az login
```

Service principal login:

```bash
az login --service-principal \
  --username <APP_ID> \
  --password <PASSWORD> \
  --tenant <TENANT_ID>
```

Purpose: Enables Terraform to retrieve AKS cluster configuration using the AzureRM provider.

<h3 style="color:#000000; font-weight:bold;">Terraform Initialization</h3>

```bash
terraform init
```

Downloads providers:

- azurerm
- helm
- kubernetes

<h3 style="color:#000000; font-weight:bold;">Deployment Variables</h3>

Example `.tfvars`:

```hcl
aks_cluster_name   = "aks1"
aks_resource_group = "saqlain"
datadog_api_key    = "xxxxxxxx"
env                = "dev"
```

<h3 style="color:#000000; font-weight:bold;">Retrieve AKS Credentials</h3>

```hcl
data "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  resource_group_name = var.aks_resource_group
}
```

Terraform extracts:

- host
- client cert
- client key
- cluster CA

<h3 style="color:#000000; font-weight:bold;">Namespace Provisioning</h3>

```hcl
resource "kubernetes_namespace" "datadog" {
  metadata {
    name = "datadog"
  }
}
```

<h3 style="color:#000000; font-weight:bold;">Datadog Secret Creation</h3>

```hcl
resource "kubernetes_secret" "datadog" {
  metadata {
    name      = "datadog-secret"
    namespace = "datadog"
  }
  data = {
    api-key = var.datadog_api_key
  }
}
```

<h3 style="color:#000000; font-weight:bold;">Helm Deployment via Terraform</h3>

```hcl
resource "helm_release" "datadog" {
  name       = "datadog"
  namespace  = "datadog"
  repository = "https://helm.datadoghq.com"
  chart      = "datadog"
  values     = [ file("${path.module}/datadog-values.yaml") ]
}
```

<h3 style="color:#000000; font-weight:bold;">Execution of Deployment</h3>

```bash
terraform apply -var-file=cluster1.tfvars
```

Terraform lifecycle ensures idempotent operations.

<h2 style="color:#000000; font-weight:bold;">Validation</h2>

<strong>Kubernetes-Side Validation:</strong>

- datadog-agent (running)
- datadog-cluster-agent (running)
- datadog-admission-controller (running)
- system-probe (running)

<strong>Datadog-Side Validation:</strong>

Validation performed by verifying:

- cluster workloads visible
- active metrics
- active logs
- traces visible via APM
- USM service maps functioning

<p align="center"><img src="/images/apm1.png" width="600"/></p>
<p align="center"><img src="/images/apm2.png" width="600"/></p>
<p align="center"><img src="/images/apm3.png" width="600"/></p>

<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

Key operational findings:

- Deployment succeeded through IaC
- No code-level instrumentation required
- No application redeployment required
- No runtime interference observed
- Suitable for multi-cluster expansion
- Alignment with platform observability ownership

<h2 style="color:#000000; font-weight:bold;">Optional Future Enhancements</h2>

- Multi-cluster automation
- Security/compliance modules (CSPM/CWPP)
- Cost intelligence dashboards
- SLO/SLI instrumentation
- Observability governance
- OTEL pipeline alignment

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this Document and its contents please contact Airowire Solutions:

Patrick Schmidt — patrick@airowire.com  
Piyush Choudhary — piyush@airowire.com  
Dr. Shivanand Poojara — shivanand@airowire.com

