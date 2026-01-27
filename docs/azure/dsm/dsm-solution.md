<p align="center">
  <img src="/images/airowire-logo.png" width="260"/>
</p>

<p align="center">
  <img src="/images/datadog.png" width="150"/>
</p>

---

<h1 style="color:#FF6F3C; font-weight:bold;">
  Solution Document for Data Streams Monitoring (DSM) Enablement on AKS with RabbitMQ
</h1>

<p><strong>(Datadog APM via Terraform)</strong></p>

---

<h2 style="color:#FF6F3C; font-weight:bold;">Purpose of the Document</h2>

Enable DSM visibility for queue-based microservices running on AKS using RabbitMQ as the
message broker and Datadog APM with auto-instrumentation.

---

<h2 style="color:#FF6F3C; font-weight:bold;">What DSM Solves</h2>

DSM addresses invisibility in distributed queue pipelines:

- Throughput
- Queue latency
- Processing latency
- Consumer lag
- Retries & failures
- Full producer → queue → consumer correlation

---

<h2 style="color:#FF6F3C; font-weight:bold;">Architecture Scope</h2>

<strong>In Scope:</strong>

- AKS Cluster
- RabbitMQ Broker
- Multi-language services (.NET, Java, Python, Node, Go)
- Datadog Terraform deployment model
- Admission Controller for tracer injection

> RabbitMQ is not instrumented; spans captured from producers & consumers.

---

<h2 style="color:#FF6F3C; font-weight:bold;">High-Level Architecture</h2>

<p align="center">
  <img src="/images/dsm-architecture.png" width="600"/>
</p>

---

<h2 style="color:#FF6F3C; font-weight:bold;">Deployment Model</h2>

DSM involves 3 key layers:

| Layer | Function |
|---|---|
| Datadog Agent | Collects APM & DSM spans |
| Admission Controller | Auto-injects tracers |
| Application Runtime | Emits queue spans |

---

<h2 style="color:#FF6F3C; font-weight:bold;">Why Admission Controller?</h2>

- Zero code changes
- No rebuild
- No library updates
- Multi-language support
- Fast enablement

---

<h2 style="color:#FF6F3C; font-weight:bold;">Deployment — Datadog Agent via Terraform</h2>

<h3 style="color:#FF6F3C; font-weight:bold;">Final Values File (YAML)</h3>

```yaml
datadog:
  site: datadoghq.eu
  apiKeyExistingSecret: datadog-secret

  logs:
    enabled: true
    containerCollectAll: true

  apm:
    enabled: true
    instrumentation:
      enabled: true

  env:
    - name: DD_DATA_STREAMS_ENABLED
      value: "true"
    - name: DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED
      value: "true"

  serviceMonitoring:
    enabled: true

  networkMonitoring:
    enabled: true

  processAgent:
    enabled: true

  containerRuntime:
    enabled: true

  systemProbe:
    enabled: true

  sysctlEnabled: true

  seccompProfileEnabled: false
  appArmorProfileEnabled: false

  admissionController:
    enabled: true
    mutateUnlabelled: true
    failurePolicy: Ignore

  clusterAgent:
    enabled: true

