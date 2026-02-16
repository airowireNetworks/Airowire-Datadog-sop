<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;"> 
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Datadog DSM / APM Troubleshooting SOP
</h1>

<p><strong>(AKS + .NET High Availability VM Environment)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized troubleshooting process when:

- Data Streams Monitoring (DSM) stops updating
- APM traces disappear
- Logs stop flowing
- Datadog monitoring degrades
- Trace-agent crashes or span ingestion drops

This document ensures rapid diagnosis and recovery across AKS and .NET HA VM environments.

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- AKS-based Datadog agent troubleshooting
- .NET HA VM DSM diagnostics
- APM trace validation
- SaaS connectivity validation
- Rapid service recovery procedures

<strong>Out of Scope:</strong>

- Application code debugging
- Business transaction modeling
- Commercial impact analysis
- Datadog billing diagnostics

<h2 style="color:#000000; font-weight:bold;">AKS Troubleshooting Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1 – Run AKS Validation Script</h3>

<strong>AKS Audit Script:</strong>

```bash
#!/bin/bash

DD_NAMESPACE="datadog"
DD_SITE="datadoghq.com"

echo "=============================================================="
echo "🛡️ DATADOG AKS COMPLIANCE AUDIT"
echo "Date: $(date)"
echo "=============================================================="

echo -ne "[1/5] Locating Node Agent... "
DD_POD=$(kubectl get pods -n $DD_NAMESPACE \
-l app.kubernetes.io/component=agent \
--field-selector=status.phase=Running \
-o jsonpath="{.items[0].metadata.name}")

if [ -z "$DD_POD" ]; then
  echo "❌ NOT FOUND"
  exit 1
else
  echo "✅ FOUND ($DD_POD)"
fi

STATUS=$(kubectl exec -n $DD_NAMESPACE $DD_POD -- agent status)

echo -ne "[2/5] API Key... "
echo "$STATUS" | grep -Eiq "API key valid|Passing" && echo "✅ VALID" || echo "❌ FAIL"

echo -ne "[3/5] Logs Agent... "
echo "$STATUS" | grep -iq "logs agent" && echo "✅ ACTIVE" || echo "❌ NOT ACTIVE"

echo -ne "[4/5] APM Container... "
kubectl get pod -n $DD_NAMESPACE $DD_POD -o jsonpath='{.spec.containers[*].name}' | grep -q trace-agent && echo "✅ PRESENT" || echo "❌ MISSING"

echo -ne "[5/5] SaaS Connectivity... "
kubectl exec -n $DD_NAMESPACE $DD_POD -- curl -s https://api.$DD_SITE > /dev/null \
&& echo "✅ REACHABLE" || echo "❌ BLOCKED"

echo "=============================================================="

