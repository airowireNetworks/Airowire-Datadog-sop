<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Datadog Code Security Implementation</title>

<style>
body {
    font-family: "Times New Roman", Times, serif;
    margin: 60px;
    line-height: 1.9;
    color: #000;
}

h1 {
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 5px;
}

h2 {
    font-size: 24px;
    margin-top: 45px;
    border-bottom: 2px solid #000;
    padding-bottom: 6px;
}

h3 {
    font-size: 20px;
    margin-top: 30px;
}

p {
    margin-top: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    margin-bottom: 15px;
}

table, th, td {
    border: 1px solid #000;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

th, td {
    padding: 12px;
    text-align: left;
}

pre {
    background-color: #f4f4f4;
    padding: 15px;
    border: 1px solid #ccc;
    font-family: "Courier New", monospace;
    font-size: 14px;
}

hr {
    margin-top: 45px;
    margin-bottom: 45px;
}
</style>
</head>

<body>

<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:60px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1>Datadog Code Security Implementation</h1>
<p><strong>(SAST + SCA + Secrets + IaC Scanning using GitHub Integration)</strong></p>

<hr>

<h2>1. Purpose</h2>

<p>
This SOP defines a standardized, automated, and repeatable process to configure 
Datadog Code Security for GitHub repositories.
</p>

<ul>
<li>Static code vulnerability detection (SAST)</li>
<li>Dependency risk analysis (SCA)</li>
<li>Secret exposure detection</li>
<li>Infrastructure as Code (IaC) misconfiguration detection</li>
<li>PR-based security enforcement</li>
<li>Centralized vulnerability visibility inside Datadog</li>
</ul>

<hr>

<h2>2. Scope</h2>

<h3>In Scope</h3>
<ul>
<li>GitHub repository integration</li>
<li>Datadog Code Security activation</li>
<li>Scan configuration</li>
<li>PR comment enablement</li>
<li>Security policy enforcement</li>
<li>Vulnerability review workflow</li>
</ul>

<h3>Out of Scope</h3>
<ul>
<li>GitHub account creation</li>
<li>Datadog account creation</li>
<li>CI/CD pipeline creation</li>
<li>Application deployment configuration</li>
</ul>

<hr>

<h2>3. Target Audience</h2>

<ul>
<li>DevOps Engineers</li>
<li>DevSecOps Engineers</li>
<li>SRE Teams</li>
<li>Platform Engineering Teams</li>
</ul>

<hr>

<h2>4. Assumptions & Prerequisites</h2>

<h3>Infrastructure</h3>
<ul>
<li>GitHub repository available</li>
<li>Datadog account active</li>
<li>Repository contains application code, dependency files, and IaC files</li>
</ul>

<h3>Access</h3>
<ul>
<li>Admin access to GitHub repository</li>
<li>Admin access to Datadog Code Security</li>
</ul>

<hr>

<h2>5. High-Level Architecture</h2>

<pre>
Developer
      ↓ Push / PR
GitHub Repository
      ↓
Datadog Code Security Engine
      ↓
Security Dashboard
      ↓
PR Comments + Merge Gate
      ↓
Deployment Pipeline
</pre>

<hr>

<h2>6. Implementation Phases</h2>

<h3>PHASE 1 — Navigate to Code Security</h3>

<p><strong>Navigation:</strong> Datadog → Software Delivery → Code Security</p>
<p><strong>Purpose:</strong> Centralizes SAST, SCA, Secret, and IaC findings.</p>

<h3>PHASE 2 — Enable Code Security Setup</h3>

<p><strong>Navigation:</strong> Datadog → Security → Code Security → Setup</p>
<p><strong>Purpose:</strong> Activates repository scanning and connects source control.</p>

<h3>PHASE 3 — Select Source Code Provider</h3>

<p>Select: <strong>GitHub</strong></p>
<p><strong>Purpose:</strong> Allows Datadog to access repository metadata securely.</p>

<h3>PHASE 4 — Select Scan Execution Mode</h3>

<ul>
<li>Datadog (AI-enhanced) — Recommended</li>
<li>CI Pipelines</li>
</ul>

Benefits:

<ul>
<li>AI-powered false positive detection</li>
<li>AI-powered remediation suggestions</li>
<li>No heavy CI changes required</li>
</ul>

<hr>

<h2>7. Security Modules Enabled</h2>

<table>
<tr>
<th>Module</th>
<th>Detects</th>
</tr>
<tr>
<td>SAST</td>
<td>Code-level vulnerabilities</td>
</tr>
<tr>
<td>SCA</td>
<td>Vulnerable dependencies</td>
</tr>
<tr>
<td>Secret Scanning</td>
<td>Hardcoded credentials</td>
</tr>
<tr>
<td>IaC Security</td>
<td>Misconfigured infrastructure</td>
</tr>
</table>

<hr>

<h2>8. Trigger First Scan</h2>

<pre>
git add .
git commit -m "Initial commit"
git push origin main
</pre>

Triggers automated:

<ul>
<li>Code scan</li>
<li>Dependency scan</li>
<li>Secret scan</li>
<li>IaC scan</li>
</ul>

<hr>

<h2>9. Security Policy Enforcement</h2>

<table>
<tr>
<th>Severity</th>
<th>Action</th>
</tr>
<tr>
<td>Critical</td>
<td>Block merge</td>
</tr>
<tr>
<td>High</td>
<td>Fix before release</td>
</tr>
<tr>
<td>Medium</td>
<td>Fix within SLA</td>
</tr>
<tr>
<td>Low</td>
<td>Monitor</td>
</tr>
</table>

<hr>

<h2>10. Remediation Workflow</h2>

<pre>
git checkout -b fix/security-issue
</pre>

Common fixes:

<ul>
<li>Remove hardcoded credentials</li>
<li>Add input validation</li>
<li>Restrict 0.0.0.0/0 in IaC</li>
<li>Add Kubernetes resource limits</li>
<li>Upgrade vulnerable libraries</li>
</ul>

Push → PR → Re-scan.

<hr>

<h2>11. Merge Gate Enforcement</h2>

Before merging:

<ul>
<li>No Critical vulnerabilities</li>
<li>No exposed secrets</li>
<li>No high-risk IaC violations</li>
</ul>

Merge is blocked automatically if violations exist.

<hr>

<h2>12. Conclusion</h2>

This implementation provides:

<ul>
<li>Automated repository scanning</li>
<li>Multi-layer security detection</li>
<li>AI-enhanced vulnerability analysis</li>
<li>Shift-left PR enforcement</li>
<li>Enterprise-grade merge gating</li>
<li>Continuous security governance</li>
</ul>

</body>
</html>
