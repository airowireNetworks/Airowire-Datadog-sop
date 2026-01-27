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

> RabbitMQ is not instrumented; spans are captured from producers & consumers.

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
```

---

<h3 style="color:#FF6F3C; font-weight:bold;">Apply via Terraform</h3>

```bash
terraform apply
```

**Purpose:** Installs/updates Datadog Agent + Admission Controller + Runtime instrumentation.

---

<h2 style="color:#FF6F3C; font-weight:bold;">Runtime Enablement — Application Layer</h2>

Terraform cannot instrument workloads directly; Kubernetes annotations enable DSM:

```bash
kubectl annotate deployment virtual-customer admission.datadoghq.com/enabled=true --overwrite
kubectl annotate deployment order-service admission.datadoghq.com/enabled=true --overwrite
kubectl annotate deployment makeline-service admission.datadoghq.com/enabled=true --overwrite
kubectl annotate deployment virtual-worker admission.datadoghq.com/enabled=true --overwrite
```

Enable runtime DSM flags:

```bash
kubectl set env deployment/virtual-customer \
DD_DATA_STREAMS_ENABLED=true \
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true

kubectl set env deployment/order-service \
DD_DATA_STREAMS_ENABLED=true \
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true

kubectl set env deployment/makeline-service \
DD_DATA_STREAMS_ENABLED=true \
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true

kubectl set env deployment/virtual-worker \
DD_DATA_STREAMS_ENABLED=true \
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true
```

---

<h2 style="color:#FF6F3C; font-weight:bold;">Language Support Notes</h2>

| Microservice | Role | DSM Support |
|---|---|---|
| virtual-customer | Producer | ✔ |
| order-service | Producer | ✔ |
| makeline-service | Consumer | ✔ |
| virtual-worker | Consumer | ✔ |
| rabbitmq | Broker | N/A |

Maturity:
- Fully supported → .NET, Java, Python, Node
- Partial → Go

---

<h2 style="color:#FF6F3C; font-weight:bold;">Validation Workflow</h2>

DSM validation requires strict sequence.

<h3>Step 1 — Validate APM</h3>

APM → Services expects:

- virtual-customer
- order-service
- makeline-service
- virtual-worker

<p align="center">
  <img src="/images/dsm-apm-services.png" width="600"/>
</p>

If APM is empty → DSM topology cannot build.

---

<h3>Step 2 — Validate DSM Topology</h3>

APM → Data Streams Monitoring → Explore

Topology:

```
virtual-customer → rabbitmq → virtual-worker
```

<p align="center">
  <img src="/images/dsm-topology.png" width="650"/>
</p>

Metrics expected:

- Throughput
- Queue time
- Processing time
- Consumer lag
- Retries
- Latency

<p align="center">
  <img src="/images/dsm-metrics.png" width="650"/>
</p>

---

<h2 style="color:#FF6F3C; font-weight:bold;">Troubleshooting</h2>

```bash
kubectl logs <pod> | grep -i datadog
```

Expected:

```
Datadog Tracer initialized
Data Streams: Enabled
```

---

<h2 style="color:#FF6F3C; font-weight:bold;">Operational Notes</h2>

DSM requires full path:

```
Producer → Queue → Consumer
```

Missing either breaks topology reconstruction.

---

<h2 style="color:#FF6F3C; font-weight:bold;">Contact</h2>

For more information, contact Airowire Solutions:

- Patrick Schmidt — patrick@airowire.com
- Piyush Choudhary — piyush@airowire.com
- Dr. Shivanand Poojara — shivanand@airowire.com

