<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Solution Document for Log Optimization & Long-Term Archival on Azure Kubernetes Services (AKS)
</h1>

<p><strong>(Datadog Logs + Azure Blob via Terraform)</strong></p>

<h2 style="color:#000000; font-weight:bold;">1. Purpose</h2>

This SOP defines the implementation of a scalable, secure, and cost-optimized logging architecture for applications running on Azure Kubernetes Service (AKS).

The solution integrates:

<ul>
  <li>Datadog for real-time monitoring and alerting</li>
  <li>Azure Blob Storage for long-term log retention</li>
  <li>Terraform for Infrastructure-as-Code automation</li>
</ul>

The objectives are:

<ul>
  <li>Reduce log ingestion cost</li>
  <li>Preserve critical observability</li>
  <li>Enable long-term retention</li>
  <li>Ensure secure authentication</li>
  <li>Provide scalable enterprise architecture</li>
</ul>

<h2 style="color:#000000; font-weight:bold;">2. Scope</h2>

This SOP applies to:

<ul>
  <li>AKS workloads</li>
  <li>Datadog log ingestion & indexing</li>
  <li>Log filtering & exclusion policies</li>
  <li>Azure Blob archival integration</li>
  <li>Terraform-based infrastructure provisioning</li>
</ul>

<h2 style="color:#000000; font-weight:bold;">3. Architecture Overview</h2>

<h3 style="color:#000000; font-weight:bold;">Phase 1 – Optimized Real-Time Monitoring</h3>

AKS → Datadog (Optimized 15-Day Indexed Logs)

<h3 style="color:#000000; font-weight:bold;">Phase 2 – Long-Term Retention</h3>

AKS → Datadog (Real-Time Monitoring – 15 Days)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Blob (Long-Term Archive – 6–12+ Months)

<h2 style="color:#000000; font-weight:bold;">4. Phase 1 – Log Ingestion Optimization</h2>

<h3 style="color:#000000; font-weight:bold;">4.1 Objective</h3>

Reduce indexed log volume while retaining full visibility of critical logs required for monitoring and incident response.

<h3 style="color:#000000; font-weight:bold;">4.2 Log Analysis Summary</h3>

Observed log distribution:

<ul>
  <li>High volume: info, debug</li>
  <li>Low volume but critical: error, warn</li>
</ul>

Optimization focused on ingestion-level control since retention (15 days) is fixed under contract.

<h3 style="color:#000000; font-weight:bold;">4.3 Index Configuration</h3>

<strong>Step 1 – Create Critical Logs Index</strong>
<p align="center"><img src="/images/l1.png" width="600"/></p>
<ul>
  <li><strong>Index Name:</strong> critical-logs</li>
  <li><strong>Filter:</strong> status:error OR status:warn</li>
  <li><strong>Retention:</strong> 15 days</li>
</ul>

Purpose:

<ul>
  <li>Retain 100% of actionable logs</li>
  <li>Maintain alerting and incident response integrity</li>
</ul>

<strong>Step 2 – Modify Main Index</strong>

<ul>
  <li><strong>Index Name:</strong> main</li>
  <li><strong>Filter:</strong> -status:error -status:warn</li>
</ul>

<p align="center"><img src="/images/l2.png" width="600"/></p>

Purpose:

Separate non-critical logs from critical logs.

<h3 style="color:#000000; font-weight:bold;">4.4 Exclusion Policies</h3>

<table border="1" cellpadding="6" cellspacing="0">
<tr>
<th>Log Type</th>
<th>Policy</th>
</tr>
<tr>
<td>status:debug</td>
<td>100% excluded</td>
</tr>
<tr>
<td>status:info</td>
<td>80% excluded</td>
</tr>
</table>

Effect:

<ul>
  <li>Debug logs fully removed from indexing</li>
  <li>Only 20% of info logs retained</li>
  <li>All critical logs preserved</li>
</ul>

<h3 style="color:#000000; font-weight:bold;">4.5 Validation Procedure</h3>

Navigate to:

<ul>
  <li>Logs → Explorer (Confirm correct index separation)</li>
  <li>Logs → Usage → Indexed Logs Volume (Compare before and after optimization)</li>
</ul>

Expected Result:

<strong>~70–80% reduction in indexed log ingestion.</strong>

<h2 style="color:#000000; font-weight:bold;">5. Phase 2 – Azure Blob Long-Term Archival</h2>

<h3 style="color:#000000; font-weight:bold;">5.1 Objective</h3>

Enable cost-efficient long-term log retention beyond Datadog’s 15-day indexed retention.

<h3 style="color:#000000; font-weight:bold;">5.2 Infrastructure Provisioning (Terraform)</h3>

Provisioned using Infrastructure-as-Code.

<strong>Repository Reference:</strong><br>
https://github.com/airowireNetworks/logs.git

Terraform provisions:

<ul>
  <li>Resource Group</li>
  <li>Azure Storage Account</li>
  <li>Private Blob Container</li>
  <li>Lifecycle policies (optional)</li>
  <li>Secure authentication configuration</li>
</ul>

<h3 style="color:#000000; font-weight:bold;">5.3 Secure Authentication Model</h3>

Authentication implemented using:

<strong>Azure AD Service Principal</strong>

Created:

<ul>
  <li>Client ID</li>
  <li>Tenant ID</li>
  <li>Client Secret</li>
</ul>

Advantages:

<ul>
  <li>Enterprise-grade security</li>
  <li>Centralized identity management</li>
  <li>Easier secret rotation</li>
  <li>Least-privilege RBAC enforcement</li>
</ul>

<h3 style="color:#000000; font-weight:bold;">5.4 RBAC Configuration</h3>

<strong>Control Plane Roles (Subscription Level)</strong>

<ul>
  <li>Reader</li>
  <li>Monitoring Reader</li>
</ul>

<strong>Data Plane Role (Container Level)</strong>

<ul>
  <li>Storage Blob Data Contributor</li>
</ul>

Resolved prior authorization issues (e.g., 403 errors) and ensured secure log write access.

<h3 style="color:#000000; font-weight:bold;">5.5 Datadog Azure Integration</h3>

Configured within Datadog:

<ul>
  <li>Installed Azure Integration</li>
  <li>Provided Tenant ID</li>
  <li>Client ID</li>
  <li>Client Secret</li>
  <li>Subscription ID</li>
</ul>

<h3 style="color:#000000; font-weight:bold;">5.6 Archive Configuration</h3>

Location:

Logs → Configuration → Archiving & Forwarding

Configured:

<ul>
  <li>Destination: Azure Storage</li>
  <li>Authentication: Azure AD</li>
  <li>Target container</li>
  <li>Archive status: Active</li>
</ul>

<h3 style="color:#000000; font-weight:bold;">5.7 Archive Validation</h3>

Validation steps:

<ul>
  <li>Confirm archive status is Active in Datadog</li>
  <li>Verify log objects appear in Azure Blob container</li>
  <li>Monitor storage growth and access logs</li>
</ul>

<p align="center"><img src="/images/l3.png" width="600"/></p>

<h2 style="color:#000000; font-weight:bold;">6. Security Controls</h2>

<table border="1" cellpadding="6" cellspacing="0">
<tr>
<th>Layer</th>
<th>Control</th>
</tr>
<tr>
<td>Storage</td>
<td>Private container</td>
</tr>
<tr>
<td>Authentication</td>
<td>Azure AD Service Principal</td>
</tr>
<tr>
<td>Access</td>
<td>RBAC (Least Privilege)</td>
</tr>
<tr>
<td>Transport</td>
<td>HTTPS enforced</td>
</tr>
<tr>
<td>Infrastructure</td>
<td>Terraform-managed</td>
</tr>
</table>

<h2 style="color:#000000; font-weight:bold;">7. Operational Responsibilities</h2>

<table border="1" cellpadding="6" cellspacing="0">
<tr>
<th>Role</th>
<th>Responsibility</th>
</tr>
<tr>
<td>DevOps</td>
<td>Maintain Terraform & Datadog configuration</td>
</tr>
<tr>
<td>Platform Team</td>
<td>Monitor ingestion & archive health</td>
</tr>
<tr>
<td>Security</td>
<td>Review RBAC & identity controls</td>
</tr>
<tr>
<td>Operations</td>
<td>Validate log availability</td>
</tr>
</table>

<h2 style="color:#000000; font-weight:bold;">8. Outcomes Achieved</h2>

<ul>
  <li> 70–80% ingestion reduction</li>
  <li> 100% retention of critical logs</li>
  <li> Secure Azure AD authentication</li>
  <li> Long-term archival capability</li>
  <li> Compliance readiness</li>
  <li> Infrastructure-as-Code governance</li>
  <li> Scalable enterprise architecture</li>
</ul>

<h2 style="color:#000000; font-weight:bold;">9. Future Enhancement (Phase 3 – Optional)</h2>

Vector-based log routing may be introduced if:

<ul>
  <li>Log volume increases significantly</li>
  <li>Further ingestion reduction is required</li>
  <li>Multi-destination routing becomes necessary</li>
  <li>Advanced transformation is needed</li>
</ul>

Phase 3 is optional and will be evaluated based on scaling needs.

<h2 style="color:#000000; font-weight:bold;">10. Conclusion</h2>

The implemented two-phase logging strategy delivers:

<ul>
  <li>Cost optimization</li>
  <li>Preserved observability</li>
  <li>Secure long-term retention</li>
  <li>Infrastructure automation</li>
  <li>Enterprise-ready architecture</li>
</ul>

This approach balances operational simplicity with scalability and financial efficiency.

