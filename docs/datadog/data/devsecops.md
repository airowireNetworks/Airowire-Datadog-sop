<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Datadog Code Security Implementation</title>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 50px;
    line-height: 1.8;
    color: #000;
}

h1 {
    font-size: 30px;
    font-weight: bold;
}

h2 {
    margin-top: 40px;
    border-bottom: 2px solid #000;
    padding-bottom: 5px;
}

h3 {
    margin-top: 25px;
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

th, td {
    padding: 10px;
    text-align: left;
}

pre {
    background: #f4f4f4;
    padding: 15px;
    border: 1px solid #ccc;
}

hr {
    margin-top: 40px;
    margin-bottom: 40px;
}
</style>
</head>

<body>

<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1>Solution Document for Datadog Code Security Implementation</h1>
<p><strong>(SAST + SCA + Secrets + IaC Scanning using GitHub Integration)</strong></p>

<hr>

<h2>1. Purpose</h2>

<p>
This SOP defines a standardized, automated, and repeatable process to configure 
Datadog Code Security for GitHub repositories.
</p>

<ul>
<li>Static Application Security Testing (SAST)</li>
<li>Software Composition Analysis (SCA)</li>
<li>Secret exposure detection</li>
<li>Infrastructure as Code (IaC) misconfiguration detection</li>
<li>Pull Request-based security enforcement</li>
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

<h2>3. Prerequisites</h2>

<ul>
<li>Active GitHub repository</li>
<li>Admin access to GitHub repository</li>
<li>Active Datadog account</li>
<li>Admin access to Datadog Code Security</li>
<li>Repository contains application code, dependency files, and IaC files</li>
</ul>

<hr>

<h2>4. High-Level Architecture</h2>

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

<h2>5. Functional Components</h2>

<table>
<tr>
<th>Component</th>
<th>Role</th>
</tr>
<tr>
<td>SAST Engine</td>
<td>Detects code-level vulnerabilities</td>
</tr>
<tr>
<td>SCA Engine</td>
<td>Identifies vulnerable dependencies</td>
</tr>
<tr>
<td>Secret Scanner</td>
<td>Detects hardcoded credentials</td>
</tr>
<tr>
<td>IaC Security</td>
<td>Detects infrastructure misconfigurations</td>
</tr>
<tr>
<td>Policy Engine</td>
<td>Blocks merge based on severity rules</td>
</tr>
</table>

<hr>

<h2>6. Implementation Procedure</h2>

<h3>Step 1 — Navigate to Code Security</h3>
Datadog → Software Delivery → Code Security

<h3>Step 2 — Connect GitHub Account</h3>
Datadog → Security → Code Security → Setup → Add GitHub Account  
Authorize Datadog GitHub App and select repositories.

<h3>Step 3 — Select Repository</h3>
Choose:
<strong>mohammedsaqlain23/devsecops</strong>

Verify:
<ul>
<li>PR Comments → ENABLED</li>
<li>Main branch scanning → Enabled</li>
</ul>

<h3>Step 4 — Enable Security Modules</h3>

✔ SAST  
✔ SCA  
✔ Secret Scanning  
✔ IaC Security  

<h3>Step 5 — Trigger Initial Scan</h3>

<pre>
git add .
git commit -m "Initial commit"
git push origin main
</pre>

This triggers:

<ul>
<li>Code scan</li>
<li>Dependency scan</li>
<li>Secret scan</li>
<li>IaC scan</li>
</ul>

<hr>

<h2>7. Security Policy Configuration</h2>

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

<h2>8. Dashboard Review</h2>

Navigation:
Datadog → Code Security → Repositories

Example Output:

<ul>
<li>Code Vulnerabilities → 48</li>
<li>Code Violations → 9764</li>
<li>Libraries → 0</li>
<li>Secrets → 0</li>
<li>IaC Violations → 54</li>
</ul>

Each finding includes:

<ul>
<li>File path</li>
<li>Line number</li>
<li>Severity</li>
<li>Description</li>
<li>Fix recommendation</li>
</ul>

<hr>

<h2>9. Remediation Workflow</h2>

<pre>
git checkout -b fix/security-issue
</pre>

Common Fixes:

<ul>
<li>Remove hardcoded credentials</li>
<li>Add input validation</li>
<li>Upgrade vulnerable dependencies</li>
<li>Restrict 0.0.0.0/0 in IaC</li>
<li>Add Kubernetes resource limits</li>
</ul>

Push → PR → Automatic Re-Scan

<hr>

<h2>10. Merge Gate Enforcement</h2>

Before merging:

<ul>
<li>No Critical vulnerabilities</li>
<li>No exposed secrets</li>
<li>No High-risk IaC violations</li>
</ul>

If violations exist → Merge is blocked automatically.

<hr>

<h2>11. Post-Implementation Validation</h2>

Verify:

<ul>
<li>Scan status → Green</li>
<li>PR comments functioning</li>
<li>No secret exposures</li>
<li>Reduced vulnerability count</li>
</ul>

<hr>

<h2>12. Security Best Practices</h2>

<ul>
<li>Enable GitHub branch protection rules</li>
<li>Require PR approvals</li>
<li>Use environment variables for secrets</li>
<li>Update dependencies regularly</li>
<li>Review weekly scan reports</li>
<li>Track vulnerability trends</li>
</ul>

<hr>

<h2>13. Limitations</h2>

<ul>
<li>SAST does not detect runtime vulnerabilities</li>
<li>False positives may occur</li>
<li>IaC scanning does not replace CSPM tools</li>
</ul>

<hr>

<h2>14. Final Outcome</h2>

Datadog Code Security provides:

<ul>
<li>Automated multi-layer repository scanning</li>
<li>AI-enhanced vulnerability detection</li>
<li>Shift-left PR enforcement</li>
<li>Policy-driven merge gating</li>
<li>Centralized security governance</li>
</ul>

<hr>

<h2>Contact</h2>

Patrick Schmidt — patrick@airowire.com  
Piyush Choudhary — piyush@airowire.com  
Dr. Shivanand Poojara — shivanand@airowire.com  

</body>
</html>
