<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Datadog Code Security Implementation</title>

<style>
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 80px;
    line-height: 1.8;
    color: #111;
    background-color: #ffffff;
}

.main-title {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 15px;
}

.subtitle {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 60px;
    color: #333;
}

.section-title {
    font-size: 28px;
    font-weight: 700;
    margin-top: 60px;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    margin-bottom: 15px;
}

ul {
    font-size: 18px;
    margin-left: 25px;
}

li {
    margin-bottom: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 20px;
}

th, td {
    border: 1px solid #ccc;
    padding: 12px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.code-block {
    background-color: #f5f5f5;
    padding: 15px;
    border-left: 4px solid #632ca6;
    font-family: "Courier New", monospace;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>
</head>

<body>

<div class="main-title">
Datadog Code Security Implementation
</div>

<div class="subtitle">
(SAST + SCA + Secrets + IaC Scanning using GitHub Integration)
</div>

<div class="section-title">1. Purpose</div>

<p>
This SOP defines a standard, automated, and repeatable process to configure Datadog Code Security for GitHub repositories.
</p>

<ul>
<li>Static code vulnerability detection (SAST)</li>
<li>Dependency risk analysis (SCA)</li>
<li>Secret exposure detection</li>
<li>Infrastructure as Code (IaC) misconfiguration detection</li>
<li>PR-based security enforcement</li>
<li>Centralized vulnerability visibility inside Datadog</li>
</ul>

<div class="section-title">2. Scope</div>

<p><strong>In Scope:</strong></p>
<ul>
<li>GitHub repository integration</li>
<li>Datadog Code Security activation</li>
<li>Scan configuration</li>
<li>PR comment enablement</li>
<li>Security policy enforcement</li>
<li>Vulnerability review workflow</li>
</ul>

<p><strong>Out of Scope:</strong></p>
<ul>
<li>GitHub account creation</li>
<li>Datadog account creation</li>
<li>CI/CD pipeline creation</li>
<li>Application deployment configuration</li>
</ul>

<div class="section-title">3. Target Audience</div>

<ul>
<li>DevOps Engineers</li>
<li>DevSecOps Engineers</li>
<li>SRE Teams</li>
<li>Platform Engineering Teams</li>
</ul>

<div class="section-title">4. Assumptions & Prerequisites</div>

<p><strong>Infrastructure:</strong></p>
<ul>
<li>GitHub repository available</li>
<li>Datadog account active</li>
<li>Repository contains application code, dependency files, and IaC files</li>
</ul>

<p><strong>Access:</strong></p>
<ul>
<li>Admin access to GitHub repository</li>
<li>Admin access to Datadog Code Security</li>
</ul>

<div class="section-title">5. High-Level Architecture</div>

<div class="code-block">
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
</div>

<div class="section-title">6. Implementation Steps (With Navigation)</div>

<p><strong>PHASE 1 — Navigate to Code Security</strong></p>
<p>Datadog → Software Delivery → Code Security</p>

<p><strong>PHASE 2 — Enable Code Security Setup</strong></p>
<p>Datadog → Security → Code Security → Setup</p>

<p><strong>PHASE 3 — Select Source Code Provider</strong></p>
<p>Select GitHub as source control provider.</p>

<p><strong>PHASE 4 — Select Scan Execution Mode</strong></p>
<ul>
<li>Datadog (AI-enhanced) — Recommended</li>
<li>CI Pipelines</li>
</ul>

<p><strong>PHASE 5 — Connect GitHub Account</strong></p>
<ul>
<li>Add GitHub Account</li>
<li>Authorize Datadog GitHub App</li>
<li>Select repositories</li>
<li>Grant permissions</li>
</ul>

<p><strong>PHASE 6 — Repository Configuration</strong></p>
<p>Select repository: <strong>mohammedsaqlain23/devsecops</strong></p>

<ul>
<li>PR Comments → ENABLED</li>
<li>Branch scanned → main</li>
</ul>

<p><strong>PHASE 7 — Enable Scanning Modules</strong></p>

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
<td>Secrets</td>
<td>Hardcoded credentials</td>
</tr>
<tr>
<td>IaC</td>
<td>Misconfigured infrastructure</td>
</tr>
</table>

<p><strong>PHASE 8 — Trigger First Scan</strong></p>

<div class="code-block">
git add .
git commit -m "Initial commit"
git push origin main
</div>

<div class="section-title">15. Review Findings</div>

<ul>
<li>Code Vulnerabilities → 48</li>
<li>Code Violations → 9764</li>
<li>Libraries → 0</li>
<li>Secrets → 0</li>
<li>IaC Violations → 54</li>
</ul>

<p>Each finding includes:</p>
<ul>
<li>File path</li>
<li>Line number</li>
<li>Severity</li>
<li>Description</li>
<li>Fix recommendation</li>
</ul>

<div class="section-title">17. Security Policy Configuration</div>

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

<div class="section-title">18. Remediation Workflow</div>

<div class="code-block">
git checkout -b fix/security-issue
</div>

<ul>
<li>Remove hardcoded credentials</li>
<li>Add input validation</li>
<li>Restrict 0.0.0.0/0 in IaC</li>
<li>Add Kubernetes resource limits</li>
<li>Upgrade vulnerable libraries</li>
</ul>

<div class="section-title">19. Merge Gate Enforcement</div>

<ul>
<li>No Critical vulnerabilities</li>
<li>No exposed secrets</li>
<li>No High-risk IaC violations</li>
</ul>

<p><strong>If issues exist → Merge is blocked automatically.</strong></p>

<div class="section-title">20. Post-Implementation Validation</div>

<ul>
<li>Scan status → Green</li>
<li>Reduced vulnerability count</li>
<li>PR comments functioning</li>
<li>No secret exposures</li>
</ul>

<div class="section-title">21. Security & Best Practices</div>

<ul>
<li>Enable branch protection in GitHub</li>
<li>Require PR approvals</li>
<li>Use environment variables for secrets</li>
<li>Update dependencies regularly</li>
<li>Review weekly scan reports</li>
<li>Track vulnerability trends</li>
</ul>

<div class="section-title">22. Limitations</div>

<ul>
<li>SAST does not detect runtime issues</li>
<li>False positives may occur</li>
<li>IaC scanning does not replace CSPM tools</li>
</ul>

<div class="section-title">23. Conclusion</div>

<ul>
<li>Automated repository scanning</li>
<li>Multi-layer security detection</li>
<li>AI-enhanced vulnerability analysis</li>
<li>Shift-left PR enforcement</li>
<li>Enterprise-level merge gating</li>
<li>Continuous security governance</li>
</ul>

<div class="section-title">Contact</div>

<p>
Patrick Schmidt — patrick@airowire.com<br>
Piyush Choudhary — piyush@airowire.com<br>
Dr. Shivanand Poojara — shivanand@airowire.com
</p>

</body>
</html>
