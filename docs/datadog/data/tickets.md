<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Standard Operating Procedure for Raising Datadog Support Tickets
</h1>

<p><strong>(Agent Issues, Integration Failures & Monitoring Incidents)</strong></p>

<h2 style="color:#000000; font-weight:bold;">1. Purpose</h2>

This SOP defines the standard process for raising a support ticket in Datadog for:

<ul>
  <li>Agent-related issues</li>
  <li>Integration failures</li>
  <li>Missing metrics, logs, or traces</li>
  <li>Unexpected monitoring behavior</li>
  <li>Production visibility impact</li>
</ul>

The objective is to ensure structured escalation, faster resolution, and minimal operational disruption.

<hr>

<h2 style="color:#000000; font-weight:bold;">2. Scope</h2>

This procedure applies to:

<ul>
  <li>DevOps Engineers</li>
  <li>Cloud Operations Team</li>
  <li>Monitoring Team</li>
  <li>SRE Team</li>
  <li>Infrastructure Support Team</li>
</ul>

<hr>

<h2 style="color:#000000; font-weight:bold;">3. When to Raise a Datadog Support Ticket</h2>

Raise a support ticket when:

<ul>
  <li>Datadog Agent is not reporting</li>
  <li>Metrics, logs, or traces are missing</li>
  <li>Integration status shows <strong>Broken</strong> or <strong>Unconfigured</strong></li>
  <li>Unexpected monitoring behavior occurs</li>
  <li>Production visibility is impacted</li>
  <li>Error messages appear in the Datadog UI</li>
</ul>

<strong>⚠ Always verify internally before escalating to Datadog.</strong>

<hr>

<h2 style="color:#000000; font-weight:bold;">4. Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">METHOD 1: Agent-Specific Support Ticket (Recommended)</h3>

Use this method for issues related to a specific host or Datadog Agent.

<h4>Step 1: Login to Datadog</h4>

Access:
<br>
https://app.datadoghq.com

Login using your organization credentials.

<h4>Step 2: Navigate to Fleet Automation</h4>

Go to:

Integrations → Fleet Automation → View Agents

<h4>Step 3: Select the Affected Agent</h4>

<ul>
  <li>Identify the affected hostname</li>
  <li>Click the hostname to open agent details</li>
</ul>

<h4>Step 4: Open the “Support” Tab</h4>

<ul>
  <li>Click the <strong>Support</strong> tab</li>
  <li>Click <strong>Send Support Ticket</strong></li>
</ul>

<h4>Step 5: Submit the Ticket</h4>

Provide:

<ul>
  <li>Clear subject line</li>
  <li>Detailed issue description</li>
  <li>Time of issue (with timezone)</li>
  <li>Environment (Production / Staging / Dev)</li>
  <li>Business impact</li>
  <li>Screenshots (if required)</li>
</ul>

Click <strong>Submit</strong>.

The system will automatically:

<ul>
  <li>Collect agent flare</li>
  <li>Attach diagnostic logs</li>
  <li>Send metadata to Datadog Support</li>
</ul>

<hr>

<h3 style="color:#000000; font-weight:bold;">METHOD 2: General Support Request</h3>

Use this method for non-agent-specific issues.

<h4>Step 1: Open Help Menu</h4>

<ul>
  <li>Click the <strong>?</strong> icon (top-right corner)</li>
  <li>Select <strong>Live Chat With Support</strong></li>
</ul>

<h4>Step 2: Explain the Issue</h4>

Provide:

<ul>
  <li>Clear problem statement</li>
  <li>Affected service/environment</li>
  <li>Time of occurrence</li>
  <li>Impact</li>
</ul>

Request:

<strong>"Please convert this conversation into a support ticket and share the ticket ID."</strong>

<hr>

<h2 style="color:#000000; font-weight:bold;">5. Required Information Checklist</h2>

Before submitting a ticket, ensure you include:

<ul>
  <li>Exact error message</li>
  <li>Timestamp (with timezone)</li>
  <li>Hostname or service name</li>
  <li>Agent version</li>
  <li>Cloud provider (AWS / Azure / GCP)</li>
  <li>Business impact description</li>
  <li>Steps to reproduce (if applicable)</li>
</ul>

<strong>Incomplete tickets may delay resolution.</strong>

<hr>

<h2 style="color:#000000; font-weight:bold;">6. Role and Access Requirements</h2>

If the <strong>Send Support Ticket</strong> button is disabled:

<ul>
  <li>Contact Organization Admin</li>
  <li>Request appropriate role access</li>
</ul>

Role verification path:

Organization Settings → Roles

Only users with proper permissions can raise agent-level support tickets.

<hr>

<h2 style="color:#000000; font-weight:bold;">7. Priority Guidelines</h2>

<table border="1" cellpadding="6">
<tr>
<th>Severity</th>
<th>Definition</th>
</tr>
<tr>
<td>Critical</td>
<td>Production outage or major monitoring failure</td>
</tr>
<tr>
<td>High</td>
<td>Significant degradation impacting services</td>
</tr>
<tr>
<td>Medium</td>
<td>Partial issue with workaround available</td>
</tr>
<tr>
<td>Low</td>
<td>General inquiry or non-urgent issue</td>
</tr>
</table>

Follow internal escalation policy before marking tickets as <strong>Critical</strong>.

<hr>

<h2 style="color:#000000; font-weight:bold;">8. Post-Submission Actions</h2>

After raising a ticket:

<ul>
  <li>Save the Ticket ID</li>
  <li>Update internal incident tracking system (JIRA / ServiceNow)</li>
  <li>Inform DevOps Lead if production is impacted</li>
  <li>Respond promptly to Datadog support requests</li>
</ul>

<hr>

<h2 style="color:#000000; font-weight:bold;">9. Best Practices</h2>

<ul>
  <li>Be clear and specific</li>
  <li>Provide exact timestamps</li>
  <li>Avoid vague descriptions</li>
  <li>Attach screenshots when helpful</li>
  <li>Prefer Agent Support Ticket for agent-related issues (auto flare collection)</li>
</ul>

<hr>

<h2 style="color:#000000; font-weight:bold;">10. Final Outcome</h2>

Following this SOP ensures:

<ul>
  <li>Faster resolution times</li>
  <li>Structured escalation</li>
  <li>Minimal production impact</li>
  <li>Efficient communication with Datadog Support</li>
</ul>


<h2 style="color:#000000; font-weight:bold;">Contact</h2>

Patrick Schmidt — patrick@airowire.com<br>
Piyush Choudhary — piyush@airowire.com<br>
Dr. Shivanand Poojara — shivanand@airowire.com
