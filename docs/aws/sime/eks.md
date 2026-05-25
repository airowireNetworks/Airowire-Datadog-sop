<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Standard Operating Procedure (SOP)

# Datadog Instrumentation on AWS EKS Fargate

## Enterprise Observability Implementation Guide

**Based on official Datadog EKS Fargate documentation and enterprise implementation practices**

---

# 1. Purpose

This SOP explains how to implement:

- Datadog monitoring
- Logs collection
- Metrics collection
- Process monitoring
- Kubernetes visibility
- Sidecar instrumentation

for applications running on:

- AWS EKS Fargate

---

# 2. Scope

This SOP is intended for:

| Team | Purpose |
|---|---|
| Observability Team | Datadog implementation |
| Platform Engineering | Kubernetes monitoring |
| DevOps Team | Monitoring enablement |
| Cloud Team | EKS integration |
| Support Team | Troubleshooting |

---

# 3. Important Architecture Understanding

## Traditional Kubernetes (EC2 Worker Nodes)

Traditional Kubernetes clusters use:

- Datadog DaemonSet Agents

One agent runs per node.

---

# EKS Fargate Architecture

EKS Fargate is DIFFERENT.

In Fargate:

- There are NO worker nodes
- AWS manages hidden serverless infrastructure

Because of this:

- ❌ No DaemonSets
- ❌ No node SSH
- ❌ No direct node access

---

# Official Datadog Architecture for Fargate

Datadog recommends:

> Running the Datadog Agent as a sidecar container inside each application pod

This is the MOST important concept.

---

# 4. High-Level Architecture

```text
Application Pod
│
├── Application Container
│
└── Datadog Agent Sidecar
        │
        ├── Logs
        ├── Metrics
        ├── Processes
        ├── Traces
        └── Kubernetes Metadata
                ↓
        Datadog Cluster Agent
                ↓
            Datadog SaaS
```

---

# 5. Responsibilities

# Platform Team Responsibilities

The platform/observability team provides:

| Capability |
|---|
| Datadog Installation |
| Instrumentation |
| Monitoring Setup |
| Logs Collection |
| Kubernetes Monitoring |
| Dashboards |
| Alerts |
| Troubleshooting |
| End-to-End Support |

---

# 6. Prerequisites

Before implementation ensure:

| Requirement | Status |
|---|---|
| EKS Cluster exists | Required |
| Fargate Profile exists | Required |
| kubectl access available | Required |
| Helm installed | Required |
| Datadog API Key available | Required |
| Internet access from Fargate | Required |

---

# 7. Implementation Workflow

# PHASE 1 — Environment Assessment

## Step 1 — Identify Environment Details

Gather:

| Information |
|---|
| Cluster Name |
| AWS Region |
| Namespaces |
| Existing Applications |
| Service Accounts |
| Security Restrictions |
| Logging Requirements |
| APM Requirements |

### Purpose

Understand Kubernetes architecture and monitoring requirements.

---

# PHASE 2 — Datadog Core Installation

## Step 2 — Create Datadog Namespace

Run:

```bash
kubectl create namespace datadog
```

### Purpose

- Stores Datadog core components

---

## Step 3 — Create Datadog Secret

Run:

```bash
kubectl create secret generic datadog-secret -n datadog \
--from-literal api-key=<DATADOG_API_KEY> \
--from-literal token=<32_CHARACTER_TOKEN>
```

### Purpose

| Secret | Purpose |
|---|---|
| api-key | Authenticate to Datadog |
| token | Cluster Agent communication |

---

# IMPORTANT

If applications run in different namespaces:

Create the SAME secret in application namespaces.

Example:

```bash
kubectl create secret generic datadog-secret -n <APP_NAMESPACE> \
--from-literal api-key=<DATADOG_API_KEY> \
--from-literal token=<32_CHARACTER_TOKEN>
```

---

## Step 4 — Add Datadog Helm Repository

Run:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

### Purpose

Downloads Datadog Kubernetes charts.

---

## Step 5 — Install Datadog Operator

Run:

```bash
helm install datadog-operator \
datadog/datadog-operator \
-n datadog
```

### Purpose

Manages Datadog resources automatically.

---

## Step 6 — Verify Operator

Run:

```bash
kubectl get pods -n datadog
```

Expected:

```text
Running
```

---

# PHASE 3 — RBAC Configuration

## Step 7 — Configure Fargate RBAC

Create:

```bash
vi datadog-rbac.yaml
```

Paste:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole

metadata:
  name: datadog-agent-fargate

rules:

- apiGroups: [""]
  resources:
    - nodes
    - namespaces
    - endpoints
  verbs:
    - get
    - list

- apiGroups: [""]
  resources:
    - nodes/metrics
    - nodes/spec
    - nodes/stats
    - nodes/proxy
    - nodes/pods
    - nodes/healthz
  verbs:
    - get
```

### Purpose

Allows Datadog sidecars to access Kubernetes APIs.

---

## Step 8 — Bind RBAC to Service Account

Example:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding

metadata:
  name: datadog-agent-fargate

roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-agent-fargate

subjects:
- kind: ServiceAccount
  name: datadog-agent
  namespace: <APPLICATION_NAMESPACE>
```

---

## Step 9 — Create Service Account

Example:

```yaml
apiVersion: v1
kind: ServiceAccount

metadata:
  name: datadog-agent
  namespace: <APPLICATION_NAMESPACE>
```

Apply:

```bash
kubectl apply -f datadog-rbac.yaml
```

---

# PHASE 4 — Datadog Cluster Agent Configuration

## Step 10 — Create DatadogAgent Configuration

Create:

```bash
vi datadog-agent.yaml
```

Paste:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent

metadata:
  name: datadog
  namespace: datadog

spec:

  global:
    clusterName: <CLUSTER_NAME>

    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:

    logCollection:
      enabled: true

    liveContainerCollection:
      enabled: true

    orchestratorExplorer:
      enabled: true

    kubeStateMetricsCore:
      enabled: true

    processDiscovery:
      enabled: true

  override:
    clusterAgent:
      replicas: 1
```

---

# Purpose of Features

| Feature | Purpose |
|---|---|
| logCollection | Collect container logs |
| liveContainerCollection | Container visibility |
| orchestratorExplorer | Kubernetes inventory |
| kubeStateMetricsCore | Pod/namespace visibility |
| processDiscovery | Process monitoring |

---

## Step 11 — Apply Configuration

Run:

```bash
kubectl apply -f datadog-agent.yaml -n datadog
```

---

# PHASE 5 — Application Instrumentation

# IMPORTANT CONCEPT

In EKS Fargate:

> Datadog Agent MUST run as a sidecar container inside each application pod

---

## Step 12 — Instrument Application Pods

Example deployment:

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: sample-app
  namespace: <APPLICATION_NAMESPACE>

spec:
  replicas: 1

  selector:
    matchLabels:
      app: sample-app

  template:
    metadata:
      labels:
        app: sample-app

    spec:

      serviceAccountName: datadog-agent

      shareProcessNamespace: true

      containers:

      - name: application
        image: <APPLICATION_IMAGE>

      - name: datadog-agent
        image: gcr.io/datadoghq/agent:7

        env:

        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key

        - name: DD_SITE
          value: datadoghq.com

        - name: DD_EKS_FARGATE
          value: "true"

        - name: DD_LOGS_ENABLED
          value: "true"

        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"

        - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
          value: "true"

        - name: DD_CLUSTER_NAME
          value: <CLUSTER_NAME>
```

---

# Purpose of Sidecar Variables

| Variable | Purpose |
|---|---|
| DD_EKS_FARGATE | Enable Fargate mode |
| DD_LOGS_ENABLED | Enable logs |
| DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED | Enable processes |
| DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL | Collect all logs |
| DD_CLUSTER_NAME | Cluster identification |

---

## Step 13 — Deploy Instrumented Application

Run:

```bash
kubectl apply -f application.yaml
```

---

## Step 14 — Verify Pods

Run:

```bash
kubectl get pods -n <APPLICATION_NAMESPACE>
```

Expected:

```text
2/2 Running
```

Meaning:

| Container | Status |
|---|---|
| Application | Running |
| Datadog Sidecar | Running |

---

# PHASE 6 — Verification

## Step 15 — Generate Application Traffic

Use:

- browser
- API calls
- curl
- application traffic

### Purpose

Generate logs and metrics.

---

## Step 16 — Verify in Datadog

# Containers

Go to:

```text
Infrastructure → Containers
```

Search:

```text
cluster_name:<CLUSTER_NAME>
```

---

# Kubernetes Explorer

Go to:

```text
Infrastructure → Kubernetes
```

Verify:

- clusters
- namespaces
- pods
- workloads

---

# Logs

Go to:

```text
Logs → Explorer
```

Search:

```text
kube_namespace:<APPLICATION_NAMESPACE>
```

---

# Processes

Go to:

```text
Infrastructure → Processes
```

Verify:

- application processes
- container processes

---

# PHASE 7 — Troubleshooting

## Issue 1 — Pods Pending

| Cause | Fix |
|---|---|
| Missing Fargate profile | Create correct profile |
| Namespace mismatch | Verify namespace |
| Resource limits | Increase Fargate resources |

---

## Issue 2 — CreateContainerConfigError

### Cause

Missing Kubernetes Secret.

### Fix

Create:

```text
datadog-secret
```

inside application namespace.

---

## Issue 3 — kubectl logs Fails

### Error

```text
no preferred addresses found
```

### Reason

AWS Fargate kubelet limitation.

This is expected in Fargate environments.

Monitoring still works.

---

## Issue 4 — No Data in Datadog UI

| Cause | Fix |
|---|---|
| UI filters enabled | Remove filters |
| No application traffic | Generate requests |
| Sync delay | Wait 5–10 mins |
| Sidecar not injected | Verify 2/2 Running |

---

# PHASE 8 — Enterprise Deliverables

After implementation the platform supports:

| Capability |
|---|
| Kubernetes Monitoring |
| Container Monitoring |
| Logs Collection |
| Process Monitoring |
| Cluster Visibility |
| Namespace Visibility |
| Workload Monitoring |
| Dashboards |
| Alerts |
| Observability Platform |

---

# Important Enterprise Knowledge

## EC2-based Kubernetes

- One Agent per node

---

# EKS Fargate

- One Datadog sidecar per application pod

> This is the MOST important architectural difference in EKS Fargate observability.
