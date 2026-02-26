<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">

<h1 style="color:#000000;">Solution Document for Code Security & DevSecOps Scanning Implementation</h1>
<p><strong>(SAST + SCA + Secrets + IaC Scanning Integration)</strong></p>

<hr>

<h2>1. Purpose</h2>
<p>
This SOP defines a standard, automated, and repeatable process to enable and manage 
Code Security Scanning across the repository:
</p>

<p><strong>Repository:</strong> mohammedsaqlain23/devsecops</p>

<p>This implementation enables:</p>
<ul>
  <li>Early vulnerability detection (Shift-Left Security)</li>
  <li>Secure dependency management</li>
  <li>Secret exposure prevention</li>
  <li>Infrastructure misconfiguration detection</li>
  <li>Automated security gating before production deployment</li>
  <li>Continuous compliance monitoring</li>
</ul>

<hr>

<h2>2. Scope</h2>

<h3>In Scope</h3>
<ul>
  <li>Repository-level security configuration</li>
  <li>SAST (Static Application Security Testing)</li>
  <li>SCA (Software Composition Analysis)</li>
  <li>Secret Scanning</li>
  <li>IaC Security Scanning</li>
  <li>Pull Request security enforcement</li>
  <li>Automated scan triggers</li>
  <li>Remediation workflow</li>
  <li>Governance monitoring</li>
</ul>

<h3>Out of Scope</h3>
<ul>
  <li>External penetration testing</li>
  <li>Firewall/network configuration</li>
  <li>DAST (Dynamic Application Testing)</li>
  <li>Cloud runtime monitoring</li>
</ul>

<hr>

<h2>3. Target Audience</h2>
<ul>
  <li>DevOps Engineers</li>
  <li>DevSecOps Engineers</li>
  <li>SRE Teams</li>
  <li>Application Developers</li>
  <li>Platform Engineering Teams</li>
</ul>

<hr>

<h2>4. Assumptions & Prerequisites</h2>

<h3>Infrastructure</h3>
<ul>
  <li>Git-based repository</li>
  <li>Access to repository Security settings</li>
  <li>CI/CD enabled (recommended)</li>
</ul>

<h3>Repository Must Contain</h3>
<ul>
  <li>Application source code</li>
  <li>Dependency files (package.json / requirements.txt / pom.xml)</li>
  <li>Terraform (.tf) files</li>
  <li>Kubernetes YAML</li>
  <li>Helm charts (optional)</li>
</ul>

<hr>

<h2>5. Roles & Responsibilities</h2>

<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Role</th><th>Responsibility</th></tr>
<tr><td>DevOps</td><td>Enable scanning modules & policies</td></tr>
<tr><td>Developers</td><td>Fix vulnerabilities</td></tr>
<tr><td>Security Team</td><td>Define severity thresholds</td></tr>
<tr><td>SRE</td><td>Validate production readiness</td></tr>
<tr><td>Engineering Lead</td><td>Approve risk exceptions</td></tr>
</table>

<hr>

<h2>6. High-Level Architecture</h2>

<pre>
Developer
   ↓ Git Push / PR
Repository
   ↓
Security Scanning Engine
   ↓
Security Dashboard
   ↓
Policy Gate (Block / Allow)
   ↓
Deployment Pipeline
</pre>

<hr>

<h2>7. Implementation Phases</h2>

<h3>PHASE 1 — Repository Preparation</h3>
<ul>
  <li>Code pushed to main branch</li>
  <li>Source code available</li>
  <li>Dependency files available</li>
  <li>IaC files available</li>
</ul>

<h3>PHASE 2 — Enable Code Security Module</h3>
<p>Navigate to:</p>
<p><strong>Repository → Security → Code Security</strong></p>
<ul>
  <li>Enable Code Scanning (SAST)</li>
  <li>Enable Dependency Scanning (SCA)</li>
  <li>Enable Secret Scanning</li>
  <li>Enable IaC Scanning</li>
</ul>

<h3>PHASE 3 — Configure Automatic Scans</h3>
<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Event</th><th>Security Action</th></tr>
<tr><td>PR Created</td><td>Full security scan</td></tr>
<tr><td>Code Push</td><td>Incremental scan</td></tr>
<tr><td>Scheduled</td><td>Full repository scan</td></tr>
</table>

<h3>PHASE 4 — Enable PR Comments</h3>
<p>Enable PR Comments to show vulnerabilities directly inside pull requests.</p>

<h3>PHASE 5 — Define Security Policies</h3>

<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Severity</th><th>Enforcement</th></tr>
<tr><td>Critical</td><td>Block merge</td></tr>
<tr><td>High</td><td>Fix before release</td></tr>
<tr><td>Medium</td><td>Fix within SLA</td></tr>
<tr><td>Low</td><td>Monitor</td></tr>
</table>

<h3>PHASE 6 — First Scan Execution</h3>

<pre>
git add .
git commit -m "Initial commit"
git push origin main
</pre>

<p>Automated scans triggered:</p>
<ul>
  <li>SAST</li>
  <li>SCA</li>
  <li>Secret Detection</li>
  <li>IaC Scan</li>
</ul>

<h3>PHASE 7 — Review Scan Results</h3>

<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Category</th><th>Findings</th></tr>
<tr><td>Code Vulnerabilities</td><td>48</td></tr>
<tr><td>Code Violations</td><td>9764</td></tr>
<tr><td>Library Vulnerabilities</td><td>0</td></tr>
<tr><td>Secrets</td><td>0</td></tr>
<tr><td>IaC Violations</td><td>54</td></tr>
</table>

<h3>PHASE 8 — Remediation Workflow</h3>

<pre>
git checkout -b fix/security-issue
</pre>

<ul>
  <li>Remove hardcoded credentials</li>
  <li>Add input validation</li>
  <li>Fix insecure API usage</li>
  <li>Restrict open CIDR ranges</li>
  <li>Add Kubernetes resource limits</li>
  <li>Enable encryption in Terraform</li>
</ul>

<h3>PHASE 9 — Security Gate Enforcement</h3>
<ul>
  <li>No Critical vulnerabilities</li>
  <li>No exposed secrets</li>
  <li>No high-risk IaC issues</li>
</ul>
<p>If violations exist → Merge blocked automatically.</p>

<h3>PHASE 10 — Governance & Monitoring</h3>

<h4>Weekly</h4>
<ul>
  <li>Review dashboard</li>
  <li>Track vulnerability trends</li>
  <li>Validate SLA compliance</li>
</ul>

<h4>Monthly</h4>
<ul>
  <li>Generate security report</li>
  <li>Update risk register</li>
  <li>Executive review</li>
</ul>

<hr>

<h2>8. Security Best Practices</h2>
<ul>
  <li>Enable branch protection rules</li>
  <li>Require PR approval</li>
  <li>Never hardcode secrets</li>
  <li>Use environment variables</li>
  <li>Regularly update dependencies</li>
  <li>Review scheduled scan reports</li>
</ul>

<hr>

<h2>9. Limitations</h2>
<ul>
  <li>SAST does not detect runtime vulnerabilities</li>
  <li>IaC scanning does not replace CSPM</li>
  <li>False positives may occur</li>
</ul>

<hr>

<h2>10. Final Outcome</h2>

<p>
The repository <strong>mohammedsaqlain23/devsecops</strong> is secured with:
</p>

<ul>
  <li>Automated multi-layer scanning</li>
  <li>Continuous vulnerability monitoring</li>
  <li>Policy-driven merge control</li>
  <li>Shift-left DevSecOps enforcement</li>
  <li>Audit-ready governance framework</li>
</ul>

<hr>

<h3>End of Document</h3>

</body>
</html>
