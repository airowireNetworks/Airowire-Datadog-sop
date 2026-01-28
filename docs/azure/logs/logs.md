<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Solution Document for Azure Cloud Cost Enablement via Datadog
</h1>

<p><strong>(Datadog Cloud Costs via Terraform)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>
This SOP defines the standardized process for deploying Datadog observability components 
into an existing Azure Kubernetes Service (AKS) cluster using Terraform and Helm. The 
deployment introduces: 
- Kubernetes and workload visibility 
- Container-level telemetry (logs, metrics) 
- Automatic APM instrumentation (no code changes) 
- Universal Service Monitoring (USM) 
- eBPF-based network dependency mapping 
The deployment is platform-driven and does not require modifications to application code or 
images.  

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

In Scope: 
- Deployment to a single AKS cluster (POC or initial onboarding) 
- Terraform-based deployment automation 
- Platform/SRE operational ownership 

Out Scope: 

- Application-level instrumentation changes 
- Multi-cluster rollout automation 
- Commercial & cost modelling 
- Governance & compliance frameworks 
- Production hardening activities

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

3.1 Access Requirements 
- Azure subscription access 
- AKS RBAC access (read/write) 
- Datadog account access 
- Datadog ingestion API key

3.2 Tooling Requirements 
- Terraform v1.x 
- Terraform providers: 
- azurerm, helm, kubernetes 
- kubectl (optional for validation) 

3.3 Networking Requirements 
- Outbound access to Datadog ingestion endpoints for: 
- Metrics 
- Logs 
- APM/USM 
- Metadata  


