<!DOCTYPE html>
<html>

<head>
  <style>
    body {
      font-family: Helvetica, Arial, sans-serif;
      line-height: 1.45;
      margin: 24px;
      font-size: 15px;
    }

    h1 {
      color: black;
      font-weight: bold;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 6px;
      font-size: 28px;
    }

    h2 {
      color: black;
      font-weight: bold;
      border-left: 6px solid #FF6F3C;
      padding-left: 12px;
      margin-top: 32px;
      margin-bottom: 10px;
      font-size: 20px;
    }

    h3 {
      color: black;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 8px;
      font-size: 17px;
    }

    p, li, strong, table {
      color: black;
    }

    table {
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 18px;
      width: 100%;
    }

    table, th, td {
      border: 1px solid #ccc;
      padding: 8px;
    }

    code, pre {
      background: #f3f3f3;
      padding: 10px;
      display: block;
      border-radius: 4px;
      margin-bottom: 15px;
      white-space: pre-wrap;
    }

  </style>
</head>

<body>

<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h2>Solution Document for Azure Cloud Cost Enablement via Datadog</h2>
<p style="text-align:center;"><strong>(Datadog Cloud Costs via Terraform)</strong></p>

<h2>Purpose of the Document</h2>
<p>
Enable Azure cloud cost visibility within Datadog to support enterprise FinOps and Cloud Center of Excellence (CCoE) teams with accurate cost allocation, forecasting, anomaly detection, chargeback/showback, and workload-level optimization across Azure environments.
</p>

<h2>What Cloud Cost Solves</h2>

<p>Cloud Cost addresses visibility gaps in cloud financial operations:</p>
<ul>
  <li>Multi-subscription cloud spend transparency</li>
  <li>Cost allocation by BU/product/env/cluster</li>
  <li>Predictive cost forecasting & anomaly detection</li>
  <li>Chargeback/showback enablement</li>
  <li>AKS workload efficiency analysis</li>
  <li>Waste & idle capacity identification</li>
  <li>FinOps maturity alignment (Inform → Optimize → Operate)</li>
</ul>

<h2>Architecture Scope</h2>

<strong>In Scope:</strong>
<ul>
  <li>Azure Subscription(s)</li>
  <li>Datadog Cloud Cost Integration</li>
  <li>Terraform automation</li>
  <li>Amortized billing export via Azure</li>
  <li>Storage Account for export ingest</li>
  <li>AKS telemetry correlation (optional)</li>
</ul>

<blockquote>Datadog ingests amortized cost data; billing remains authoritative in Azure.</blockquote>

<h2>Key Capabilities</h2>

<table>
<thead>
<tr><th>Capability</th><th>Outcome</th></tr>
</thead>
<tbody>
<tr><td>Cost Visibility</td><td>Normalized amortized Azure billing data</td></tr>
<tr><td>Allocation</td><td>BU/product/cluster/env allocations</td></tr>
<tr><td>Optimization</td><td>AKS efficiency + waste reduction</td></tr>
<tr><td>Forecasting</td><td>Predictive + anomaly-based</td></tr>
<tr><td>Chargeback</td><td>Enables governance + showback</td></tr>
<tr><td>FinOps Alignment</td><td>Inform → Optimize → Operate</td></tr>
</tbody>
</table>

<h2>Prerequisites</h2>

<strong>Accounts & Tools:</strong>
<ul>
  <li>Azure Subscription</li>
  <li>Datadog Cloud Costs</li>
  <li>Terraform</li>
  <li>Azure CLI</li>
</ul>

<strong>Roles Required:</strong>
<ul>
  <li>Application Administrator / Cloud Application Administrator</li>
  <li>Subscription Owner / Contributor</li>
</ul>

<h2>Deployment — Datadog Integration via Terraform</h2>

<p>Terraform provisions:</p>
<ul>
  <li>Azure AD Application</li>
  <li>Service Principal</li>
  <li>Client Secret</li>
  <li>Monitoring Reader role</li>
  <li>Datadog → Azure integration handshake</li>
</ul>

<h3>Apply via Terraform</h3>

<pre><code>terraform init
terraform apply \
  -var "datadog_api_key=&lt;API_KEY&gt;" \
  -var "datadog_app_key=&lt;APP_KEY&gt;"
</code></pre>

<strong>Expected:</strong>
<ul>
  <li>Integration visible in Datadog</li>
  <li>App registered in Azure AD (Entra)</li>
</ul>

<h2>Configure Azure Billing Export</h2>

<strong>Provision Storage:</strong>
<ul>
  <li>Resource Group: <code>datadog</code></li>
  <li>Storage Account: <code>ccmdata</code></li>
  <li>Container: <code>ccmdata</code></li>
  <li>Location: <code>East US</code></li>
  <li>Type: <code>StorageV2</code></li>
</ul>

<h3>Assign Service Principal Permissions</h3>

<pre><code>az role assignment create \
  --assignee &lt;SP_ID&gt; \
  --role "Storage Blob Data Reader" \
  --scope /subscriptions/&lt;SUB_ID&gt;/resourceGroups/datadog/providers/Microsoft.Storage/storageAccounts/ccmdata

az role assignment create \
  --assignee &lt;SP_ID&gt; \
  --role "Cost Management Reader" \
  --scope /subscriptions/&lt;SUB_ID&gt;
</code></pre>

<h2>Configure Azure Cost Export (Portal)</h2>

<p>Navigate:</p>
<p><strong>Azure Portal → Cost Management → Exports</strong></p>

<h3>Required Export: Amortized Cost</h3>

<table>
<thead>
<tr><th>Setting</th><th>Value</th></tr>
</thead>
<tbody>
<tr><td>Data</td><td>Cost & usage (Amortized)</td></tr>
<tr><td>Frequency</td><td>Daily</td></tr>
<tr><td>Storage</td><td>ccmdata</td></tr>
<tr><td>Container</td><td>ccmdata</td></tr>
<tr><td>Directory</td><td>datadog/azure-cost/datadog-amortized-cost</td></tr>
<tr><td>Overwrite</td><td>Disabled</td></tr>
<tr><td>Status</td><td>Enabled</td></tr>
<tr><td>Name</td><td>datadog-amortized-cost</td></tr>
</tbody>
</table>

<strong>Optional:</strong> Actual Cost (not required)

<h2>Validation — Export Files</h2>

<pre><code>STORAGE_KEY=$(az storage account keys list \
  --resource-group datadog \
  --account-name ccmdata \
  --query "[0].value" -o tsv)

az storage blob list \
  --account-name ccmdata \
  --container-name ccmdata \
  --account-key "$STORAGE_KEY" \
  --output table
</code></pre>

<strong>Expected Files:</strong>
<pre><code>manifest.json
part_0_0001.csv.gz
</code></pre>

<strong>Data Availability:</strong> 6–24 hours

<h2>Datadog — Cloud Cost Configuration</h2>

<p>Navigate:</p>
<p><strong>Datadog → Cloud Cost → Settings → Accounts → Azure → Add Account</strong></p>

<strong>Actions:</strong>
<ol>
  <li>Enter Subscription ID</li>
  <li>Discover amortized export</li>
  <li>Validate storage access</li>
  <li>Start ingestion</li>
</ol>

<h2>Validation Workflow</h2>

<p align="center"><img src="/images/cost1.png" width="600"/></p>
<p align="center"><img src="/images/cost2.png" width="600"/></p>
<p align="center"><img src="/images/cost3.png" width="600"/></p>

<p>Cloud Cost validation requires data availability:</p>

<h3>Step 1 — Validate Storage Export</h3>
<p>Check for manifest + CSV artifacts.</p>

<h3>Step 2 — Validate Datadog Ingestion</h3>
<p>Check:</p>
<ul>
  <li>Cloud Spend Overview</li>
  <li>Allocation Views</li>
  <li>Forecasting Panels</li>
</ul>

<h3>Step 3 — Validate FinOps Views</h3>
<p>Metrics expected:</p>
<ul>
  <li>Spend Trends</li>
  <li>Forecasting</li>
  <li>Anomalies</li>
  <li>Allocation</li>
  <li>Optimization insights</li>
</ul>

<h2>FinOps Operational Alignment</h2>

<table>
<thead>
<tr><th>Phase</th><th>Value</th></tr>
</thead>
<tbody>
<tr><td>Inform</td><td>Transparency + allocation</td></tr>
<tr><td>Optimize</td><td>Rightsizing + efficiency</td></tr>
<tr><td>Operate</td><td>Chargeback + governance + anomaly mgmt</td></tr>
</tbody>
</table>

<h2>Troubleshooting</h2>

<pre><code>az monitor activity-log list --subscription &lt;SUB_ID&gt;
</code></pre>

<strong>Common Issues:</strong>

<table>
<thead>
<tr><th>Issue</th><th>Resolution</th></tr>
</thead>
<tbody>
<tr><td>Overwrite enabled</td><td>Disable overwrite</td></tr>
<tr><td>Permissions denied</td><td>Assign Blob Reader + Cost Mgmt Reader</td></tr>
<tr><td>Missing manifest</td><td>Export not triggered</td></tr>
<tr><td>No ingestion</td><td>Verify amortized export</td></tr>
<tr><td>No forecasting</td><td>Historical dataset required</td></tr>
</tbody>
</table>

<h2>Final Outcome</h2>

<p>
Azure cloud cost successfully integrated into Datadog via Terraform and amortized billing exports, enabling enterprise FinOps, unit economics, chargeback/showback, forecasting, anomaly detection, and AKS workload efficiency at scale.
</p>

<h2>Contact</h2>

<p>For more information, contact Airowire Solutions:</p>
<ul>
  <li>Patrick Schmidt — patrick@airowire.com</li>
  <li>Piyush Choudhary — piyush@airowire.com</li>
  <li>Dr. Shivanand Poojara — shivanand@airowire.com</li>
</ul>

</body>
</html>

