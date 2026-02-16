<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Datadog DSM / APM Troubleshooting SOP
</h1>

<p><strong>(AKS + .NET High Availability VM Environment)</strong></p>

<p>
<strong>Version:</strong> 2.1<br>
<strong>Owner:</strong> Platform Engineering Team<br>
<strong>Status:</strong> Production SOP
</p>

<hr>

<h2 style="color:#000000; font-weight:bold;">1. Purpose of the Document</h2>

This SOP defines the standardized troubleshooting procedure when:

<ul>
  <li>Data Streams Monitoring (DSM) stops updating</li>
  <li>APM traces disappear</li>
  <li>Logs stop flowing</li>
  <li>Datadog monitoring degrades</li>
  <li>Trace-agent crashes</li>
</ul>

This ensures fast, structured recovery across AKS and .NET HA VM environments.

<hr>

<h2 style="color:#000000; font-weight:bold;">2. AKS Troubleshooting Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1 – Run AKS Validation Script</h3>

<pre><code>
#!/bin/bash

DD_NAMESPACE="datadog"
DD_SITE="datadoghq.com"

echo "==============================="
echo "DATADOG AKS COMPLIANCE AUDIT"
echo "==============================="

echo "[1/5] Checking Agent Pod..."
DD_POD=$(kubectl get pods -n $DD_NAMESPACE \
-l app.kubernetes.io/component=agent \
--field-selector=status.phase=Running \
-o jsonpath="{.items[0].metadata.name}")

if [ -z "$DD_POD" ]; then
  echo "Agent NOT FOUND"
  exit 1
else
  echo "Agent Found: $DD_POD"
fi

STATUS=$(kubectl exec -n $DD_NAMESPACE $DD_POD -- agent status)

echo "[2/5] API Key Check..."
echo "$STATUS" | grep -Eiq "API key valid|Passing" && echo "VALID" || echo "FAIL"

echo "[3/5] Logs Agent..."
echo "$STATUS" | grep -iq "logs agent" && echo "ACTIVE" || echo "NOT ACTIVE"

echo "[4/5] APM Container..."
kubectl get pod -n $DD_NAMESPACE $DD_POD -o jsonpath='{.spec.containers[*].name}' | grep -q trace-agent && echo "PRESENT" || echo "MISSING"

echo "[5/5] SaaS Connectivity..."
kubectl exec -n $DD_NAMESPACE $DD_POD -- curl -s https://api.$DD_SITE > /dev/null \
&& echo "REACHABLE" || echo "BLOCKED"
</code></pre>

<h3>If AKS Audit Fails</h3>

<table border="1" cellpadding="6" cellspacing="0">
<tr>
<th>Failure</th>
<th>Action</th>
</tr>
<tr>
<td>Agent not found</td>
<td>Restart Datadog DaemonSet</td>
</tr>
<tr>
<td>API failure</td>
<td>Check Kubernetes secret</td>
</tr>
<tr>
<td>Logs inactive</td>
<td>Check container runtime</td>
</tr>
<tr>
<td>APM missing</td>
<td>Re-enable in Helm values</td>
</tr>
<tr>
<td>SaaS blocked</td>
<td>Check outbound NSG / firewall rules</td>
</tr>
</table>

<hr>

<h2 style="color:#000000; font-weight:bold;">3. .NET HA VM Troubleshooting Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1 – Run DSM Incident Script</h3>

<pre><code>
#!/bin/bash

DD_SITE="datadoghq.com"
ISSUE_FOUND=0

echo "DSM INCIDENT TROUBLESHOOT"

echo "[1/10] Agent Service..."
systemctl is-active --quiet datadog-agent || ISSUE_FOUND=1

echo "[2/10] API Key..."
STATUS=$(sudo datadog-agent status 2>/dev/null)
echo "$STATUS" | grep -Eiq "Passing|API key valid" || ISSUE_FOUND=1

echo "[3/10] APM Enabled..."
echo "$STATUS" | grep -iq "APM Agent" || ISSUE_FOUND=1

echo "[4/10] Port 8126..."
ss -tulnp | grep -q 8126 || ISSUE_FOUND=1

echo "[5/10] .NET Running..."
DOTNET_PID=$(pgrep -f dotnet | head -1)
[ -z "$DOTNET_PID" ] && ISSUE_FOUND=1

if [ ! -z "$DOTNET_PID" ]; then
  echo "[6/10] Profiler Attached..."
  cat /proc/$DOTNET_PID/environ | tr '\0' '\n' | grep -q CORECLR_PROFILER || ISSUE_FOUND=1

  echo "[7/10] DSM Enabled..."
  cat /proc/$DOTNET_PID/environ | tr '\0' '\n' | grep -q DD_DATA_STREAMS_ENABLED || ISSUE_FOUND=1
fi

echo "[8/10] RabbitMQ Traffic..."
ss -an | grep -q 5672

echo "[9/10] SaaS Connectivity..."
curl -s https://api.$DD_SITE > /dev/null || ISSUE_FOUND=1

echo "[10/10] OOM Check..."
dmesg | grep -i kill | tail -3

if [ $ISSUE_FOUND -eq 0 ]; then
  echo "Infrastructure Healthy"
else
  echo "Fix Required"
fi
</code></pre>

<hr>

<h2 style="color:#000000; font-weight:bold;">4. Most Common Root Causes</h2>

<table border="1" cellpadding="6" cellspacing="0">
<tr>
<th>Root Cause</th>
<th>Fix</th>
</tr>
<tr>
<td>Application restarted</td>
<td>Restart application with profiler enabled</td>
</tr>
<tr>
<td>Profiler missing</td>
<td>Reattach Datadog tracer</td>
</tr>
<tr>
<td>DSM flag missing</td>
<td>Re-run Ansible configuration</td>
</tr>
<tr>
<td>Trace-agent crash</td>
<td>Restart datadog-agent service</td>
</tr>
<tr>
<td>No traffic</td>
<td>Generate test message to rebuild topology</td>
</tr>
<tr>
<td>Memory OOM</td>
<td>Increase VM memory allocation</td>
</tr>
</table>

<hr>

<h2 style="color:#000000; font-weight:bold;">5. Fast Recovery Command</h2>

<pre><code>
sudo systemctl restart datadog-agent
sudo systemctl restart &lt;dotnet-app&gt;
</code></pre>

After restart:

<ul>
  <li>Generate a test RabbitMQ message</li>
  <li>Wait 2–5 minutes for DSM rebuild</li>
</ul>

<hr>

<h2 style="color:#000000; font-weight:bold;">6. Preventive Monitoring</h2>

Recommended Datadog monitors:

<ul>
  <li>APM spans drop to zero</li>
  <li>Trace-agent not running</li>
  <li>Log ingestion silence</li>
  <li>High memory utilization</li>
  <li>RabbitMQ idle detection</li>
</ul>

<hr>

<h2 style="color:#000000; font-weight:bold;">7. Important Behavioral Note</h2>

Data Streams Monitoring (DSM) is:

<ul>
  <li>Real-time</li>
  <li>Traffic dependent</li>
  <li>Span dependent</li>
</ul>

If no spans are generated, DSM will display no topology.

This is expected behavior and not a system fault.

<hr>

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

This SOP provides a structured and repeatable troubleshooting process for restoring Datadog DSM and APM functionality across AKS and .NET HA VM environments, ensuring minimal downtime and rapid observability restoration.

<hr>

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

Patrick Schmidt — patrick@airowire.com<br>
Piyush Choudhary — piyush@airowire.com<br>
Dr. Shivanand Poojara — shivanand@airowire.com

