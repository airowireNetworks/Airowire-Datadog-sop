<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Instrumenting Airowire Network Assets</title>

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
<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<div class="main-title">
SOP — Instrumenting Airowire Network Assets
</div>

<div class="subtitle">
(Network Monitoring using Datadog SNMP Integration)
</div>

<div class="section-title">1. Purpose</div>

<p>
This SOP defines the process for instrumenting Airowire network devices using Datadog 
to enable centralized monitoring, network visibility, and proactive alerting.
</p>

<div class="section-title">2. Scope</div>

<p>This procedure applies to all Airowire network infrastructure including:</p>

<ul>
<li>Routers</li>
<li>Switches</li>
<li>Firewalls</li>
<li>Access Points</li>
<li>Network Gateways</li>
</ul>

<p>
These devices will be monitored using SNMP telemetry integrated with Datadog.
</p>

<div class="section-title">3. Prerequisites</div>

<p>Before starting instrumentation, ensure the following:</p>

<ul>
<li>Access to network devices (SSH or management interface)</li>
<li>SNMP supported on devices</li>
<li>Datadog account access</li>
<li>Monitoring server available to run Datadog Agent</li>
<li>Network connectivity between monitoring server and devices</li>
</ul>

<div class="section-title">4. Architecture Overview</div>
<p align="center"><img src="/images/na.png" width="600"/></p>

<div class="code-block">
Network Devices
      ↓ SNMP Telemetry
Datadog Agent with SNMP Integration
      ↓
Datadog Platform
      ↓
Dashboards and Alerts
</div>

<p>
Network devices expose telemetry via SNMP.  
The Datadog agent collects telemetry and sends it to the Datadog platform 
for monitoring, visualization, and alerting.
</p>

<div class="section-title">5. Procedure</div>

<p><strong>Step 1 — Identify Network Assets</strong></p>

<p>Create a network asset inventory including:</p>

<ul>
<li>Device hostname</li>
<li>IP address</li>
<li>Device type</li>
<li>Location</li>
<li>SNMP version</li>
</ul>

<p>Store this information in a centralized inventory document.</p>

<p><strong>Step 2 — Enable SNMP on Network Devices</strong></p>

<p>Configure SNMP on each network device.</p>

<p><strong>Recommended configuration:</strong></p>

<ul>
<li>Use SNMPv3 for enhanced security</li>
<li>Configure authentication and encryption</li>
<li>Restrict SNMP access to the monitoring server</li>
</ul>

<p>Test SNMP connectivity using:</p>

<div class="code-block">
snmpwalk
</div>

<p><strong>Step 3 — Install Datadog Agent</strong></p>

<p>Install the Datadog Agent on the monitoring server.</p>

<div class="code-block">
DD_API_KEY=&lt;DATADOG_API_KEY&gt; \
DD_SITE="datadoghq.com" \
bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
</div>

<p>Verify that the Datadog agent is running successfully.</p>

<p><strong>Step 4 — Configure SNMP Integration</strong></p>

<p>Configure SNMP monitoring in the Datadog agent configuration.</p>

<div class="code-block">
snmp:
  - ip_address: &lt;DEVICE_IP&gt;
    community_string: &lt;COMMUNITY_STRING&gt;
</div>

<p>Restart the Datadog agent after updating the configuration.</p>

<p><strong>Step 5 — Verify Metrics Collection</strong></p>

<p>Check the Datadog dashboard to verify that network metrics are being collected.</p>

<p><strong>Expected metrics include:</strong></p>

<ul>
<li>Interface traffic</li>
<li>Interface errors</li>
<li>Packet drops</li>
<li>Device uptime</li>
<li>Interface status</li>
</ul>

<p><strong>Step 6 — Create Network Monitoring Dashboards</strong></p>

<p>Create dashboards to monitor network performance including:</p>

<ul>
<li>Device availability</li>
<li>Interface bandwidth usage</li>
<li>Traffic patterns</li>
<li>Packet errors</li>
</ul>

<p>
These dashboards provide visibility into the overall health of the network.
</p>

<p><strong>Step 7 — Configure Alerts</strong></p>

<p>Create alerts for critical network conditions.</p>

<table>
<tr>
<th>Event</th>
<th>Alert Condition</th>
</tr>
<tr>
<td>Device Down</td>
<td>SNMP unreachable</td>
</tr>
<tr>
<td>Interface Down</td>
<td>Interface status change</td>
</tr>
<tr>
<td>High Bandwidth</td>
<td>Utilization above threshold</td>
</tr>
<tr>
<td>Packet Errors</td>
<td>Error threshold exceeded</td>
</tr>
</table>

<p>
Alerts should notify the Network Operations team immediately.
</p>

<div class="section-title">6. Validation</div>

<p>Confirm that instrumentation is successful by verifying:</p>

<ul>
<li>SNMP connectivity to devices</li>
<li>Metrics visible in Datadog</li>
<li>Dashboards displaying network data</li>
<li>Alerts triggering correctly</li>
</ul>

<div class="section-title">7. Roles and Responsibilities</div>

<table>
<tr>
<th>Role</th>
<th>Responsibility</th>
</tr>
<tr>
<td>Network Team</td>
<td>Enable SNMP on devices</td>
</tr>
<tr>
<td>DevOps / Monitoring Team</td>
<td>Configure Datadog monitoring</td>
</tr>
<tr>
<td>Operations Team</td>
<td>Monitor dashboards and alerts</td>
</tr>
</table>

<div class="section-title">8. Expected Outcome</div>

<ul>
<li>All Airowire network devices will be monitored centrally</li>
<li>Network performance will be visible in real time</li>
<li>Network failures will trigger alerts automatically</li>
<li>Troubleshooting will become faster and more efficient</li>
</ul>

</body>
</html>
