<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Solution Document for Enabling Logs for Azure Kubernetes Services (AKS)
</h1>

<p><strong>(Datadog Logs via Terraform on AKS)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized process for enabling platform and workload log ingestion from Azure Kubernetes Service (AKS) into Datadog using Terraform and Helm. The deployment introduces:

- Container and workload log ingestion
- Kubernetes metadata enrichment
- Log-based analytics and filtering
- Retention + archival workflows
- Platform-driven enablement with no app changes

Logging enablement is platform-driven and does not require modifications to application code or container images.

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- Deployment to a single AKS cluster (POC or onboarding)
- Terraform-based deployment automation
- Workload & namespace-level logging

<strong>Out of Scope:</strong>

- APM/Tracing
- SIEM forwarding
- Compliance frameworks
- Business-event parsing rules

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

<strong>Access Requirements:</strong>

- Azure subscription access
- AKS RBAC (read/write)
- Datadog account access

<strong>Tooling Requirements:</strong>

- Terraform v1.x
- Helm provider
- kubectl (optional)

<strong>Networking Requirements:</strong>

Outbound access to Datadog ingestion endpoints for:

- Logs
- Metadata
- Metrics (optional)

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

Logs are collected via the Datadog Agent running on AKS nodes. The agent performs:

- Log collection (stdout/stderr)
- Format detection & parsing
- Kubernetes metadata enrichment
- Log transport via HTTPS

<h3 style="color:#000000; font-weight:bold;">Architecture of Logic</h3>

Workload → Datadog Agent → Pipelines → Indexing → Analytics

<h3 style="color:#000000; font-weight:bold;">Functional Components</h3>

| Component | Role |
|---|---|
| Datadog Agent | Log ingestion & enrichment |
| Cluster Agent | Telemetry aggregation |
| Pipelines | Parsing + normalization |
| Indexes | Analytics & search |
| Archive/Rehydration | Long-term retention |

<h2 style="color:#000000; font-weight:bold;">Repository Reference</h2>

Deployment artifacts and Terraform implementation are maintained in the following repository:

<p>
  <a href="https://github.com/airowireNetworks/datadog-apm-azure.git" target="_blank">
    https://github.com/airowireNetworks/datadog-apm-azure.git
  </a>
</p>

<strong>Clone Repository:</strong>

```bash
git clone https://github.com/airowireNetworks/datadog-apm-azure.git
cd datadog-apm-azure
```

<strong>Repository Includes:</strong>

- Terraform deployment modules
- Helm values configuration
- tfvars examples
- Logging enablement artifacts

<h2 style="color:#000000; font-weight:bold;">Deployment Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Deployment Environment</h3>

Deployment VM configured with:

- Terraform
- Azure CLI (optional)
- kubectl (optional)
- Helm provider (via Terraform)

<h3 style="color:#000000; font-weight:bold;">Terraform Initialization</h3>

```bash
terraform init
```

<h3 style="color:#000000; font-weight:bold;">Deployment Variables</h3>

Example `.tfvars`:

```hcl
aks_cluster_name   = "aks1"
aks_resource_group = "saqlain"
datadog_api_key    = "xxxxxxxx"
env                = "dev"
```

<h3 style="color:#000000; font-weight:bold;">Enable Logs via Helm Values</h3>

```hcl
logs:
  enabled: true
  containerCollectAll: true
```

This enables:

- container stdout/stderr
- workload logs
- namespace scoped logs

<h3 style="color:#000000; font-weight:bold;">Execution of Deployment</h3>

```bash
terraform apply -var-file=cluster1.tfvars
```

<h2 style="color:#000000; font-weight:bold;">Platform Logging Capabilities</h2>

Once deployed, the platform supports:

- Log search & filtering
- Log-based metrics
- Pipelines & processors
- Tag-based correlation
- Retention & archival workflows

<h2 style="color:#000000; font-weight:bold;">Datadog-Side Validation</h2>

Confirm:

- Logs visible in Explorer
- Metadata enrichment active
- Workload tagging (namespace, pod, container)
- Pipelines parsing messages

<p align="center"><img src="/images/logs1.png" width="600"/></p>
<p align="center"><img src="/images/logs2.png" width="600"/></p>
<p align="center"><img src="/images/logs3.png" width="600"/></p>

<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

Key operational findings:

- Log ingestion successful via IaC
- Automatic enrichment improved troubleshooting
- Workload-level transparency improved
- Minimal platform dependencies

<h2 style="color:#000000; font-weight:bold;">Optional Enhancements</h2>

- SIEM forwarding (optional)
- Security event-driven analysis
- Business log normalization
- Archive + Rehydration pipelines
- FinOps alignment for log retention tiers

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

AKS logs successfully integrated into Datadog via Terraform and Helm, enabling operational observability and improved debugging for workloads and platform infrastructure.

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this Document and its contents please contact Airowire Solutions:

Patrick Schmidt — patrick@airowire.com  
Piyush Choudhary — piyush@airowire.com  
Dr. Shivanand Poojara — shivanand@airowire.com  

