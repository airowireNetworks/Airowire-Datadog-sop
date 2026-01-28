<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Solution Document for Enabling Logs for Azure Kubernetes Services (AKS)
</h1>

<p><strong>(Datadog Logs + APM Correlation via Terraform on AKS)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized process for enabling platform and workload log ingestion from Azure Kubernetes Service (AKS) into Datadog using Terraform and Helm. The deployment introduces:

- Container and workload log ingestion
- Kubernetes metadata enrichment
- Trace ↔ Log correlation
- Log-based metrics + analytics
- Retention + archival + rehydration options

Logging enablement is platform-driven and does not require modifications to application code or container images.

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- Deployment to a single AKS cluster (POC or initial onboarding)
- Terraform-based deployment automation
- Workload & namespace-level logging
- Trace-log correlation (optional)

<strong>Out of Scope:</strong>

- SIEM forwarding
- Compliance & GRC frameworks
- Multi-cluster federation
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
- Metrics
- APM/USM
- Metadata

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

Logs are collected via the Datadog Agent running on AKS nodes. The agent performs:

- Log collection
- Format detection & parsing
- Kubernetes metadata enrichment
- Log transport via HTTPS

<h3 style="color:#000000; font-weight:bold;">Architecture of Logic</h3>

Workload → Datadog Agent → Pipelines → Indexing → Analytics → Optional APM Correlation

<h3 style="color:#000000; font-weight:bold;">Functional Components</h3>

| Component | Role |
|---|---|
| Datadog Agent | Log ingestion & metadata enrichment |
| Cluster Agent | Telemetry aggregation & workload awareness |
| Pipelines | Parsing + normalization + routing |
| Indexes | Real-time search & analytics |
| Archive/Rehydration | Long-term retention workflows |
| APM Runtime | Trace ↔ Log correlation (optional) |

<h2 style="color:#000000; font-weight:bold;">Deployment Procedure</h2>

This section describes the deployment steps executed to enable log ingestion into Datadog using Terraform and Helm.

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

Terraform lifecycle ensures idempotent operations.

<h2 style="color:#000000; font-weight:bold;">Platform Logging Capabilities</h2>

Once deployed, the platform supports:

- Log search & filtering
- Log-based metrics
- Pipelines & processors
- Tag-based correlation
- Retention & archival policies

<h2 style="color:#000000; font-weight:bold;">Runtime Enablement — Application Layer (Optional)</h2>

To enable APM ↔ Log Correlation:

```bash
kubectl annotate deployment <app> \
  instrumentation.datadoghq.com/enabled=true \
  instrumentation.datadoghq.com/service=<service_name>
```

Correlation provides:

- Request path + status visibility
- Error analysis
- Latency impact correlation
- Unified service observability

<h2 style="color:#000000; font-weight:bold;">Datadog-Side Validation</h2>

Validation performed by verifying:

- Logs visible in Explorer
- Metadata enrichment active
- Workload tagging (service, pod, namespace)
- Pipelines parsing messages
- Optional trace ↔ log correlation

<p align="center"><img src="/images/logs1.png" width="600"/></p>
<p align="center"><img src="/images/logs2.png" width="600"/></p>
<p align="center"><img src="/images/logs3.png" width="600"/></p>

<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

Key operational findings:

- Log ingestion successful via IaC
- Automatic enrichment improved troubleshooting
- Trace ↔ log correlation beneficial for diagnostics
- Workload-level transparency improved

<h2 style="color:#000000; font-weight:bold;">Optional Future Enhancements</h2>

Recommended enhancements:

- SIEM forwarding (optional)
- Security event-driven analysis
- Business-event log parsing
- OTel alignment for multi-vendor pipelines
- Archival rehydration workflows

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

AKS logs successfully integrated into Datadog via Terraform and Helm, enabling operational observability, enriched analytics, and optional trace-log correlation for improved debugging and platform visibility.

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this Document and its contents please contact Airowire Solutions:

Patrick Schmidt — patrick@airowire.com  
Piyush Choudhary — piyush@airowire.com  
Dr. Shivanand Poojara — shivanand@airowire.com  

