<p align="center">
  <img src="/images/airowire-logo.png" width="260"/>
</p>

<p align="center">
  <img src="/images/datadog.png" width="150"/>
</p>

---

<h1 style="color:#FF6F3C; font-weight:bold;">
  Solution Document for Azure Cloud Cost Enablement via Datadog
</h1>

<p><strong>(Datadog Cloud Costs via Terraform)</strong></p>

---

<h2 style="color:#FF6F3C; font-weight:bold;">Purpose of the Document</h2>

Enable Azure cloud cost visibility within Datadog to support enterprise FinOps and Cloud Center of Excellence (CCoE) teams with accurate cost allocation, forecasting, anomaly detection, chargeback/showback, and workload-level optimization across Azure environments.

---

<h2 style="color:#FF6F3C; font-weight:bold;">What Cloud Cost Solves</h2>

Cloud Cost addresses visibility gaps in cloud financial operations:

- Multi-subscription cloud spend transparency
- Cost allocation by BU/product/env/cluster
- Predictive cost forecasting & anomaly detection
- Chargeback/showback enablement
- AKS workload efficiency analysis
- Waste & idle capacity identification
- FinOps maturity alignment (Inform → Optimize → Operate)

---

<h2 style="color:#FF6F3C; font-weight:bold;">Architecture Scope</h2>

<strong>In Scope:</strong>

- Azure Subscription(s)
- Datadog Cloud Cost Integration
- Terraform automation
- Amortized billing export via Azure
- Storage Account for export ingest
- AKS telemetry correlation (optional)

> Datadog ingests amortized cost data; billing remains authoritative in Azure.

---

<h2 style="color:#FF6F3C; font-weight:bold;">High-Level Architecture</h2>

<p align="center">
  <img src="/images/cloud-cost-architecture.png" width="600"/>
</p>

---

<h2 style="color:#FF6F3C; font-weight:bold;">Key Capabilities</h2>

| Capability | Outcome |
|---|---|
| Cost Visibility | Normalized amortized Azure billing data |
| Allocation | BU/product/cluster/env allocations |
| Optimization | AKS efficiency + waste reduction |
| Forecasting | Predictive + anomaly-based |
| Chargeback | Enables governance + showback |
| FinOps Alignment | Inform → Optimize → Operate |

---

<h2 style="color:#FF6F3C; font-weight:bold;">Prerequisites</h2>

<strong>Accounts & Tools:</strong>

- Azure Subscription
- Datadog Cloud Costs
- Terraform
- Azure CLI

<strong>Roles Required:</strong>

- Application Administrator / Cloud Application Administrator
- Subscription Owner / Contributor

---

<h2 style="color:#FF6F3C; font-weight:bold;">Deployment — Datadog Integration via Terraform</h2>

Terraform provisions:

- Azure AD Application
- Service Principal
- Client Secret
- Monitoring Reader role
- Datadog → Azure integration handshake

<h3 style="color:#FF6F3C; font-weight:bold;">Apply via Terraform</h3>

```bash
terraform init
terraform apply \
  -var "datadog_api_key=<API_KEY>" \
  -var "datadog_app_key=<APP_KEY>"
```

<strong>Expected:</strong>

- Integration visible in Datadog
- App registered in Azure AD (Entra)

---

<h2 style="color:#FF6F3C; font-weight:bold;">Configure Azure Billing Export</h2>

Provision Storage:

- Resource Group: `datadog`
- Storage Account: `ccmdata`
- Container: `ccmdata`
- Location: `East US`
- Type: `StorageV2`

<h3 style="color:#FF6F3C; font-weight:bold;">Assign Service Principal Permissions</h3>

```bash
az role assignment create \
  --assignee <SP_ID> \
  --role "Storage Blob Data Reader" \
  --scope /subscriptions/<SUB_ID>/resourceGroups/datadog/providers/Microsoft.Storage/storageAccounts/ccmdata

az role assignment create \
  --assignee <SP_ID> \
  --role "Cost Management Reader" \
  --scope /subscriptions/<SUB_ID>
```

---

<h2 style="color:#FF6F3C; font-weight:bold;">Configure Azure Cost Export (Portal)</h2>

Navigate:

Azure Portal → Cost Management → Exports

<h3>Required Export: Amortized Cost</h3>

| Setting | Value |
|---|---|
| Data | Cost & usage (Amortized) |
| Frequency | Daily |
| Storage | ccmdata |
| Container | ccmdata |
| Directory | datadog/azure-cost/datadog-amortized-cost |
| Overwrite | Disabled |
| Status | Enabled |
| Name | datadog-amortized-cost |

<strong>Optional:</strong> Actual Cost (not required)

---

<h2 style="color:#FF6F3C; font-weight:bold;">Validation — Export Files</h2>

```bash
STORAGE_KEY=$(az storage account keys list \
  --resource-group datadog \
  --account-name ccmdata \
  --query "[0].value" -o tsv)

az storage blob list \
  --account-name ccmdata \
  --container-name ccmdata \
  --account-key "$STORAGE_KEY" \
  --output table
```

<strong>Expected Files:</strong>

```
manifest.json
part_0_0001.csv.gz
```

<strong>Data Availability:</strong> 6–24 hours

---

<h2 style="color:#FF6F3C; font-weight:bold;">Datadog — Cloud Cost Configuration</h2>

Navigate:

Datadog → Cloud Cost → Settings → Accounts → Azure → Add Account

Actions:

1. Enter Subscription ID
2. Discover amortized export
3. Validate storage access
4. Start ingestion

---

<h2 style="color:#FF6F3C; font-weight:bold;">Validation Workflow</h2>

Cloud Cost validation requires data availability:

<h3>Step 1 — Validate Storage Export</h3>

Check for manifest + CSV artifacts.

<h3>Step 2 — Validate Datadog Ingestion</h3>

Check:

- Cloud Spend Overview
- Allocation Views
- Forecasting Panels

<h3>Step 3 — Validate FinOps Views</h3>

Metrics expected:

- Spend Trends
- Forecasting
- Anomalies
- Allocation
- Optimization insights

---

<h2 style="color:#FF6F3C; font-weight:bold;">FinOps Operational Alignment</h2>

| Phase | Value |
|---|---|
| Inform | Transparency + allocation |
| Optimize | Rightsizing + efficiency |
| Operate | Chargeback + governance + anomaly mgmt |

---

<h2 style="color:#FF6F3C; font-weight:bold;">Troubleshooting</h2>

```bash
az monitor activity-log list --subscription <SUB_ID>
```

Common Issues:

| Issue | Resolution |
|---|---|
| Overwrite enabled | Disable overwrite |
| Permissions denied | Assign Blob Reader + Cost Mgmt Reader |
| Missing manifest | Export not triggered |
| No ingestion | Verify amortized export |
| No forecasting | Historical dataset required |

---

<h2 style="color:#FF6F3C; font-weight:bold;">Final Outcome</h2>

Azure cloud cost successfully integrated into Datadog via Terraform and amortized billing exports, enabling enterprise FinOps, unit economics, chargeback/showback, forecasting, anomaly detection, and AKS workload efficiency at scale.

---

<h2 style="color:#FF6F3C; font-weight:bold;">Contact</h2>

For more information, contact Airowire Solutions:

- Patrick Schmidt — patrick@airowire.com
- Piyush Choudhary — piyush@airowire.com
- Dr. Shivanand Poojara — shivanand@airowire.com

