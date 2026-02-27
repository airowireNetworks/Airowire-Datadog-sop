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

/* Main Title */
.main-title {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 15px;
}

/* Subtitle */
.subtitle {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 60px;
    color: #333;
}

/* Section Titles */
.section-title {
    font-size: 28px;
    font-weight: 700;
    margin-top: 60px;
    margin-bottom: 20px;
}

/* Paragraph */
p {
    font-size: 18px;
    margin-bottom: 15px;
}

/* Lists */
ul {
    font-size: 18px;
    margin-left: 25px;
}

li {
    margin-bottom: 10px;
}

/* Tables */
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

/* Code blocks */
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

<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:60px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<div class="main-title">
Solution Document for Datadog Code Security Implementation
</div>

<div class="subtitle">
(SAST + SCA + Secrets + IaC Scanning using GitHub Integration)
</div>

<div class="section-title">1. Purpose</div>

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

<div class="section-title">3. Prerequisites</div>

<ul>
<li>Active GitHub repository</li>
<li>Admin access to GitHub repository</li>
<li>Active Datadog account</li>
<li>Admin access to Datadog Code Security</li>
<li>Repository contains application code, dependency files, and IaC files</li>
</ul>

<div class="section-title">4. High-Level Architecture</div>

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

<div class="section-title">5. Functional Components</div>

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

<div class="section-title">6. Implementation Procedure</div>

<p><strong>Step 1 — Navigate to Code Security</strong></p>
<p>Datadog → Software Delivery → Code Security</p>

<p><strong>Step 2 — Connect GitHub Account</strong></p>
<p>Datadog → Security → Code Security → Setup → Add GitHub Account</p>

<p><strong>Step 3 — Select Repository</strong></p>
<p><strong>mohammedsaqlain23/devsecops</strong></p>

<ul>
<li>PR Comments → ENABLED</li>
<li>Main branch scanning → Enabled</li>
</ul>

<p><strong>Step 4 — Enable Security Modules</strong></p>
<ul>
<li>SAST</li>
<li>SCA</li>
<li>Secret Scanning</li>
<li>IaC Security</li>
</ul>

<p><strong>Step 5 — Trigger Initial Scan</strong></p>

<div class="code-block">
git add .
git commit -m "Initial commit"
git push origin main
</div>

<div class="section-title">7. Security Policy Configuration</div>

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

<div class="section-title">8. Remediation Workflow</div>

<div class="code-block">
git checkout -b fix/security-issue
</div>

<ul>
<li>Remove hardcoded credentials</li>
<li>Add input validation</li>
<li>Upgrade vulnerable dependencies</li>
<li>Restrict 0.0.0.0/0 in IaC</li>
<li>Add Kubernetes resource limits</li>
</ul>

<div class="section-title">9. Merge Gate Enforcement</div>

<ul>
<li>No Critical vulnerabilities</li>
<li>No exposed secrets</li>
<li>No High-risk IaC violations</li>
</ul>

<p><strong>If violations exist → Merge is blocked automatically.</strong></p>

<div class="section-title">10. Final Outcome</div>

<ul>
<li>Automated multi-layer repository scanning</li>
<li>AI-enhanced vulnerability detection</li>
<li>Shift-left PR enforcement</li>
<li>Policy-driven merge gating</li>
<li>Centralized security governance</li>
</ul>

<div class="section-title">Contact</div>

<p>
Patrick Schmidt — patrick@airowire.com<br>
Piyush Choudhary — piyush@airowire.com<br>
Dr. Shivanand Poojara — shivanand@airowire.com
</p>

</body>
</html>
