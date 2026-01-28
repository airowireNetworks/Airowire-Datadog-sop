<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Solution Document for Enabling APM for Azure Kubernetes Services (AKS)
</h1>

<p><strong>(Datadog APM via Terraform on AKS)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized process for deploying Datadog Application Performance Monitoring (APM) into Azure Kubernetes Service (AKS) using Terraform and Helm. The deployment introduces:

- Automatic APM instrumentation
- Request tracing + latency analysis
- Application dependency analysis
- Error/exception visibility
- Platform-driven enablement without code changes

APM deployment is platform-driven and does not require rebuilding or modifying application containers.

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- Deployment to a single AKS cluster (POC or onboarding)
- Terraform-based deployment automation
- Platform-controlled APM enablement

<strong>Out of Scope:</strong>

- Distributed business transaction modeling
- OpenTelemetry pipelines
- Cost & commercial modeling
- Multi-cluster federation

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

- APM
- Metadata
- Metrics (optional)

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

Datadog APM runs via the Datadog Agent deployed on AKS nodes. Workloads send traces to the agent using auto-instrumentation or runtime injection.

<h3 style="color:#000000; font-weight:bold;">Architecture of Logic</h3>

Workload → Datadog Agent → APM Ingestion → Analytics → Visualization

<h3 style="color:#000000; font-weight:bold;">Functional Components</h3>

| Component | Role |
|---|---|
| Datadog Agent | Trace ingestion & instrumentation |
| Cluster Agent | Workload metadata aggregation |
| APM UI | Visualization & service mapping |
| Pipelines | Application dependency processing |

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
- APM enablement artifacts

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
aks_cluster_name   = "cluster name"
aks_resource_group = "resource-group-name"
datadog_api_key    = "xxxxxxxx"
env                = "dev"
```

<h3 style="color:#000000; font-weight:bold;">Enable APM via Helm Values</h3>

```hcl
apm:
  enabled: true
```

This enables:

- automatic instrumentation support
- trace ingestion
- latency + error visibility

<h3 style="color:#000000; font-weight:bold;">Execution of Deployment</h3>

```bash
terraform apply -var-file=cluster1.tfvars
```

<h2 style="color:#000000; font-weight:bold;">Platform APM Capabilities</h2>

Once deployed, the platform supports:

- Service-level tracing
- Error monitoring
- Latency analysis
- Application dependency mapping
- Performance insights

<h2 style="color:#000000; font-weight:bold;">Datadog-Side Validation</h2>

Validation performed by verifying:

- Traces visible in APM service catalog
- Application services discovered
- Error/latency analysis active
- Endpoint-level request visibility

<p align="center"><img src="/images/aks6.png" width="600"/></p>
<p align="center"><img src="/images/aks5.png" width="600"/></p>
<p align="center"><img src="/images/aks4.png" width="600"/></p>

<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

Key operational findings:

- APM ingestion successful via IaC
- No code-level instrumentation required
- Application visibility improved
- Error/latency analysis enriched debugging

<h2 style="color:#000000; font-weight:bold;">Optional Enhancements</h2>

Recommended enhancements:

- Distributed tracing correlation
- OpenTelemetry alignment
- Multi-cluster hybrid APM
- Custom span enrichment

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

APM successfully integrated into Datadog via Terraform and Helm for AKS, enabling platform-driven service performance visibility with no application code changes.

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this Document and its contents please contact Airowire Solutions:

Patrick Schmidt — patrick@airowire.com  
Piyush Choudhary — piyush@airowire.com  
Dr. Shivanand Poojara — shivanand@airowire.com  

