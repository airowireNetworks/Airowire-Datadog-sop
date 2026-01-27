<p align="center">
  <img src="../../images/airowire-logo.png" width="260"/>
</p>

<p align="center">
  <img src="../../images/datadog.png" width="150"/>
</p>

---

# Solution Document for Data Streams Monitoring (DSM) Enablement on AKS with RabbitMQ  
**(Datadog APM via Terraform)**

---

## Purpose of the Document

Enable DSM visibility for queue-based microservices running on AKS using RabbitMQ as the 
message broker and Datadog APM with auto-instrumentation.

---

## What DSM Solves

Distributed message pipelines are typically blind. DSM provides visibility into:

- Throughput
- Processing + queue latency
- Consumer lag
- Retries & failures
- Full producer → queue → consumer correlation

---

## Architecture Scope

**In Scope:**

- AKS Cluster
- RabbitMQ as broker
- Multi-language microservices (.NET, Java, Python, Node, Go)
- Datadog Terraform deployment model
- Admission Controller for tracer injection

> RabbitMQ itself is not instrumented — DSM instruments producer and consumer spans.

---

## High-Level Architecture

<p align="center">
  <img src="images/dsm-architecture.png" width="600"/>
</p>

---

## Deployment Model

DSM consists of three core layers:

| Layer | Function |
|---|---|
| Datadog Agent | Collects APM & DSM spans |
| Admission Controller | Injects tracers automatically |
| Application Runtime | Emits queue spans |

---

## Why Admission Controller?

- No code changes
- No library updates
- No rebuild required
- Multi-language support
- Zero friction onboarding

---

## Deployment — Datadog Agent via Terraform

### Final Values File

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

