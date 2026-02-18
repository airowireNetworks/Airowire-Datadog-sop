<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Enterprise Solution Document for Log Optimization & Long-Term Archival on Azure Kubernetes Services (AKS)
</h1>

<p><strong>(Datadog Logs + Azure Blob Integration)</strong></p>

<h2 style="color:#000000; font-weight:bold;">1. Purpose</h2>

This SOP defines a scalable, secure, and cost-optimized logging architecture for workloads running on Azure Kubernetes Service (AKS).

<ul>
  <li>Datadog for real-time monitoring</li>
  <li>Azure Blob for long-term retention</li>
  <li>Index optimization for cost reduction</li>
</ul>

<hr>

<h2 style="color:#000000; font-weight:bold;">2. Phase 1 – Log Ingestion Optimization</h2>

<h3>2.1 Critical Logs Index</h3>

<p align="center"><img src="/images/l1.png" width="600"/></p>

<ul>
  <li><strong>Index Name:</strong> critical-logs</li>
  <li><strong>Filter:</strong> status:error OR status:warn</li>
  <li><strong>Retention:</strong> 15 days</li>
</ul>

<h3>2.2 Main Index Filter</h3>

<ul>
  <li>Filter: -status:error -status:warn</li>
</ul>

<p align="center"><img src="/images/l2.png" width="600"/></p>

<h3>2.3 Exclusion Policies</h3>

<table border="1" cellpadding="6">
<tr><th>Log Type</th><th>Policy</th></tr>
<tr><td>status:debug</td><td>100% excluded</td></tr>
<tr><td>status:info</td><td>80% excluded</td></tr>
</table>

<hr>

<h2 style="color:#000000; font-weight:bold;">3. Phase 2 – Azure Blob Long-Term Archival</h2>

<h3>3.1 Create Azure Storage Account</h3>

<ul>
  <li>Name: akslogsarchive</li>
  <li>Region: Same as AKS cluster</li>
  <li>Performance: Standard</li>
  <li>Redundancy: LRS</li>
  <li>Secure Transfer Required: Enabled</li>
</ul>

<h3>3.2 Create Blob Container</h3>

<ul>
  <li>Name: datadog-logs-archive</li>
  <li>Access Level: Private</li>
</ul>

<h3>3.3 Create Azure AD Service Principal</h3>

<pre><code>
az login
az ad sp create-for-rbac --name datadog-archive-sp
</code></pre>

Save securely:

<ul>
  <li>Client ID</li>
  <li>Client Secret</li>
  <li>Tenant ID</li>
</ul>

<h3>3.4 Assign RBAC Role</h3>

<pre><code>
az role assignment create \
  --assignee &lt;APP_ID&gt; \
  --role "Storage Blob Data Contributor" \
  --scope $(az storage account show \
      --name akslogsarchive \
      --resource-group &lt;RESOURCE_GROUP&gt; \
      --query id -o tsv)
</code></pre>

Role Assigned:

<strong>Storage Blob Data Contributor</strong>

<hr>

<h3>3.5 Configure Archive in Datadog</h3>

Navigate:

Logs → Configuration → Archiving & Forwarding → Add Archive

Configure:

<ul>
  <li>Archive Name: azure-blob-archive</li>
  <li>Destination: Azure Storage</li>
  <li>Authentication: Azure AD</li>
  <li>Tenant ID</li>
  <li>Client ID</li>
  <li>Client Secret</li>
  <li>Storage Account: akslogsarchive</li>
  <li>Container: datadog-logs-archive</li>
</ul>

Ensure status shows:

<strong>ACTIVE</strong>

<hr>

<h2 style="color:#000000; font-weight:bold;">4. Lifecycle Policy (Cost Optimization)</h2>

<table border="1" cellpadding="6">
<tr><th>Condition</th><th>Action</th></tr>
<tr><td>Older than 30 days</td><td>Move to Cool tier</td></tr>
<tr><td>Older than 180 days</td><td>Move to Archive tier</td></tr>
<tr><td>Older than 365 days</td><td>Delete (Optional)</td></tr>
</table>

<hr>

<h2 style="color:#000000; font-weight:bold;">5. Validation</h2>

<ul>
  <li>Archive Status = Active</li>
  <li>.json.gz files visible in Azure</li>
  <li>No archive errors in Datadog</li>
</ul>

<p align="center"><img src="/images/l3.png" width="600"/></p>

<hr>

<h2 style="color:#000000; font-weight:bold;">6. Security Controls</h2>

<table border="1" cellpadding="6">
<tr><th>Layer</th><th>Control</th></tr>
<tr><td>Storage</td><td>Private container</td></tr>
<tr><td>Authentication</td><td>Azure AD Service Principal</td></tr>
<tr><td>Access</td><td>RBAC (Least Privilege)</td></tr>
<tr><td>Transport</td><td>HTTPS enforced</td></tr>
</table>

<hr>

<h2 style="color:#000000; font-weight:bold;">7. Rollback Procedure</h2>

<ul>
  <li>Disable archive in Datadog</li>
  <li>Remove Azure AD credentials</li>
  <li>Confirm ingestion remains operational</li>
</ul>

<hr>

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

Patrick Schmidt — patrick@airowire.com<br>
Piyush Choudhary — piyush@airowire.com<br>
Dr. Shivanand Poojara — shivanand@airowire.com

