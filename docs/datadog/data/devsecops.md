<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Datadog Code Security Implementation</title>
</head>

<body style="font-family:Arial, sans-serif; margin:40px; line-height:1.6; color:#000;">

<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="font-weight:bold;">
  Datadog Code Security Implementation
</h1>

<p><strong>(SAST + SCA + Secrets + IaC Scanning using GitHub Integration)</strong></p>

<hr>

<h2>1. Purpose</h2>

<p>
This SOP defines a standard, automated, and repeatable process to configure 
Datadog Code Security for GitHub repositories.
</p>

This enables:

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

<p><strong>Navigation:</strong></p>
Datadog → Software Delivery → Code Security  

<p><strong>Purpose:</strong> Centralizes SAST, SCA, Secret, and IaC findings.</p>

---

<h3>PHASE 2 — Enable Code Security Setup</h3>

<p><strong>Navigation:</strong></p>
Datadog → Security → Code Security → Setup  

<p><strong>Purpose:</strong> Activates repository scanning and connects source control.</p>

---

<h3>PHASE 3 — Select Source Code Provider</h3>

Select:
<strong>GitHub</strong>

<p><strong>Purpose:</strong> Allows Datadog to access repository metadata securely.</p>

---

<h3>PHASE 4 — Select Where Scans Should Run</h3>

Options:

<ul>
  <li>Datadog (AI-enhanced)</li>
  <li>CI Pipelines</li>
</ul>

Select:
<strong>Datadog (Recommended)</strong>

Benefits:

<ul>
  <li>Scans run directly in Datadog</li>
  <li>AI-powered false positive detection</li>
  <li>AI-powered remediation suggestions</li>
  <li>No heavy CI configuration required</li>
</ul>

---

<h3>PHASE 5 — Connect GitHub Account</h3>

<p><strong>Navigation:</strong></p>
Connect your GitHub repositories → Add GitHub Account  

Steps:

<ul>
  <li>Click Add GitHub Account</li>
  <li>Authorize Datadog GitHub App</li>
  <li>Select required repositories</li>
  <li>Grant permissions</li>
</ul>

---

<h3>PHASE 6 — Repository Configuration</h3>

<p><strong>Navigation:</strong></p>
Datadog → Code Security → Repositories  

Select repository:

<strong>mohammedsaqlain23/devsecops</strong>

Verify:

<ul>
  <li>PR Comments → ENABLED</li>
  <li>Branch scanned → main</li>
</ul>

---

<h3>PHASE 7 — Enable Scanning Modules</h3>

Ensure the following are enabled:

<ul>
  <li>✔ Software Composition Analysis (SCA)</li>
  <li>✔ Static Code Analysis (SAST)</li>
  <li>✔ Secret Scanning</li>
  <li>✔ Infrastructure as Code Security (IaC)</li>
</ul>

<table border="1" cellpadding="8" cellspacing="0" width="100%">
<tr><th>Module</th><th>Detects</th></tr>
<tr><td>SAST</td><td>Code-level vulnerabilities</td></tr>
<tr><td>SCA</td><td>Vulnerable dependencies</td></tr>
<tr><td>Secrets</td><td>Hardcoded credentials</td></tr>
<tr><td>IaC</td><td>Misconfigured infrastructure</td></tr>
</table>

---

<h3>PHASE 8 — Trigger First Scan</h3>

<pre>
git add .
git commit -m "Initial commit"
git push origin main
</pre>

Triggers:

<ul>
  <li>Code scan</li>
  <li>Dependency scan</li>
  <li>Secret scan</li>
  <li>IaC scan</li>
</ul>

---

<h3>PHASE 9 — Review Findings</h3>

<p><strong>Navigation:</strong></p>
Datadog → Code Security → Repositories  

Example Dashboard Output:

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

---

<h3>PHASE 10 — Enable PR Security (Shift-Left)</h3>

Ensure:

PR Comments → ENABLED  

Benefits:

<ul>
  <li>Vulnerabilities appear inside PR</li>
  <li>Developers fix before merge</li>
  <li>Reduced production risk</li>
</ul>

---

<h3>PHASE 11 — Security Policy Configuration</h3>

<p><strong>Navigation:</strong></p>
Datadog → Code Security → Repository Settings  

<table border="1" cellpadding="8" cellspacing="0" width="100%">
<tr><th>Severity</th><th>Action</th></tr>
<tr><td>Critical</td><td>Block merge</td></tr>
<tr><td>High</td><td>Fix before release</td></tr>
<tr><td>Medium</td><td>Fix within SLA</td></tr>
<tr><td>Low</td><td>Monitor</td></tr>
</table>

---

<h3>PHASE 12 — Remediation Workflow</h3>

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

---

<h3>PHASE 13 — Merge Gate Enforcement</h3>

Before merging:

<ul>
  <li>✔ No Critical vulnerabilities</li>
  <li>✔ No exposed secrets</li>
  <li>✔ No High-risk IaC violations</li>
</ul>

If violations exist:

<strong>Merge is blocked automatically.</strong>

---

<h2>Post-Implementation Validation</h2>

<p><strong>Navigation:</strong></p>
Datadog → Code Security → Summary  

Verify:

<ul>
  <li>Scan status → Green</li>
  <li>Reduced vulnerability count</li>
  <li>PR comments functioning</li>
  <li>No secret exposures</li>
</ul>

---

<h2>Security & Best Practices</h2>

<ul>
  <li>Enable branch protection in GitHub</li>
  <li>Require PR approvals</li>
  <li>Use environment variables for secrets</li>
  <li>Update dependencies regularly</li>
  <li>Review weekly scan reports</li>
  <li>Track vulnerability trends</li>
</ul>

---

<h2>Limitations</h2>

<ul>
  <li>SAST does not detect runtime issues</li>
  <li>False positives may occur</li>
  <li>IaC scanning does not replace CSPM tools</li>
</ul>

---

<h2>Conclusion</h2>

This SOP provides:

<ul>
  <li>Automated repository scanning</li>
  <li>Multi-layer security detection</li>
  <li>AI-enhanced vulnerability analysis</li>
  <li>Shift-left PR enforcement</li>
  <li>Enterprise-level merge gating</li>
  <li>Continuous security governance</li>
</ul>

</body>
</html>
