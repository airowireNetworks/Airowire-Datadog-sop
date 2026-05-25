<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Solution Document for Enabling Datadog Observability on AWS EKS Fargate

**(Datadog Monitoring via Sidecar Instrumentation on EKS Fargate)**

---

# Purpose of the Document

This SOP defines the standardized process for enabling observability for workloads running on AWS EKS Fargate using Datadog.

The deployment introduces:

- Kubernetes workload monitoring
- Container log collection
- Metrics collection
- Process visibility
- Kubernetes metadata enrichment
- Fargate sidecar instrumentation
- Cluster-level observability

Monitoring enablement is platform-driven and does not require modifications to application source code.

---

# Scope

## In Scope

- Deployment to AWS EKS Fargate clusters
- Datadog Cluster Agent deployment
- Sidecar-based instrumentation
- Kubernetes visibility
- Logs and metrics collection
- Namespace and workload observability

## Out of Scope

- Application code modifications
- Custom application tracing logic
- Business-event parsing
- Compliance frameworks
- SIEM integrations
- Security runtime policies

---

# Prerequisites

## Access Requirements

- AWS account access
- EKS administrative access
- kubectl access
- Datadog account access

## Tooling Requirements

- kubectl
- Helm v3+
- AWS CLI
- Datadog API Key

## Networking Requirements

Outbound HTTPS access to Datadog ingestion endpoints for:

- Logs
- Metrics
- Kubernetes metadata
- Processes
- Traces (optional)

---

# Overview of the Solution

AWS EKS Fargate differs from traditional Kubernetes environments.

EKS Fargate:

- does NOT expose worker nodes
- does NOT support DaemonSet-based monitoring
- runs workloads on serverless AWS-managed infrastructure

Because of this, Datadog monitoring is implemented using:

# Datadog Agent Sidecar Architecture

Each monitored application pod contains:

- Application container
- Datadog Agent sidecar container

The sidecar is responsible for:

- Logs collection
- Metrics collection
- Process visibility
- Container monitoring
- Kubernetes metadata communication

---

# Architecture of Logic

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
    ├── Kubernetes Metadata
    └── Container Visibility
            ↓
     Datadog Cluster Agent
            ↓
        Datadog SaaS
```

---

# Functional Components

| Component | Role |
|---|---|
| Datadog Sidecar Agent | Pod-level observability |
| Datadog Cluster Agent | Kubernetes metadata aggregation |
| Kubernetes RBAC | API access permissions |
| Datadog SaaS | Monitoring & analytics |
| Fargate Profile | Serverless pod scheduling |

---

# Important Architectural Difference

## Traditional Kubernetes (EC2 Worker Nodes)

Traditional EKS clusters use:

- Datadog DaemonSet Agents
- One agent per worker node

## EKS Fargate Architecture

EKS Fargate uses:

- Datadog Sidecar Agents
- One agent sidecar per application pod

> This is the MOST important architectural difference for EKS Fargate monitoring.

---

# Deployment Procedure

# Deployment Environment

Deployment system configured with:

- kubectl
- AWS CLI
- Helm
- EKS access permissions

---

# Phase 1 — EKS Environment Validation

## Step 1 — Validate EKS Cluster Access

```bash
aws eks update-kubeconfig \
--region us-east-1 \
--name <CLUSTER_NAME>
```

### Purpose

- Configures kubectl authentication
- Connects local environment to EKS cluster

---

## Step 2 — Verify Cluster Connectivity

```bash
kubectl get pods -A
```

### Purpose

- Validate Kubernetes API access
- Confirm cluster connectivity

---

# Phase 2 — Datadog Namespace Setup

## Step 3 — Create Datadog Namespace

```bash
kubectl create namespace datadog
```

### Purpose

- Stores Datadog core components
- Separates observability workloads

---

# Phase 3 — Datadog Secret Configuration

## Step 4 — Create Datadog Secret

```bash
kubectl create secret generic datadog-secret -n datadog \
--from-literal api-key=<DATADOG_API_KEY> \
--from-literal token=<32_CHARACTER_TOKEN>
```

### Important

The same secret MUST exist inside application namespaces.

Example:

```bash
kubectl create secret generic datadog-secret -n <APPLICATION_NAMESPACE> \
--from-literal api-key=<DATADOG_API_KEY> \
--from-literal token=<32_CHARACTER_TOKEN>
```

---

# Phase 4 — Helm Repository Configuration

## Step 5 — Add Datadog Helm Repository

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

---

# Phase 5 — Datadog Operator Installation

## Step 6 — Install Datadog Operator

```bash
helm install datadog-operator \
datadog/datadog-operator \
-n datadog
```

### Purpose

- Automates Datadog Kubernetes management
- Manages DatadogAgent CRDs

---

## Step 7 — Verify Operator Status

```bash
kubectl get pods -n datadog
```

Expected Output:

```text
Running
```

---

# Phase 6 — Fargate Profile Configuration

## Step 8 — Create Fargate Profile

Create Fargate profiles for:

- Application namespace
- Datadog namespace

---

# Phase 7 — Kubernetes RBAC Configuration

## Step 9 — Create Datadog RBAC

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
```

Apply:

```bash
kubectl apply -f datadog-rbac.yaml
```

---

# Phase 8 — Datadog Cluster Agent Configuration

## Step 10 — Create DatadogAgent Configuration

Create:

```bash
vi datadog-agent.yaml
```

Apply:

```bash
kubectl apply -f datadog-agent.yaml -n datadog
```

---

# Phase 9 — Application Instrumentation

## Important Concept

In EKS Fargate:

> Datadog Agent MUST run as a sidecar container inside each application pod.

---

## Step 11 — Instrument Application Workloads

Example deployment:

```yaml
containers:
- name: application
  image: <APPLICATION_IMAGE>

- name: datadog-agent
  image: gcr.io/datadoghq/agent:7
```

### Important Variables

| Variable | Purpose |
|---|---|
| DD_EKS_FARGATE | Enables Fargate mode |
| DD_LOGS_ENABLED | Enables logs |
| DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED | Enables processes |
| DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL | Collect all logs |
| DD_CLUSTER_NAME | Cluster identification |

---

## Step 12 — Deploy Instrumented Workload

```bash
kubectl apply -f application.yaml
```

---

## Step 13 — Verify Pod Status

```bash
kubectl get pods -n <APPLICATION_NAMESPACE>
```

Expected Output:

```text
2/2 Running
```

Meaning:

| Container | Status |
|---|---|
| Application | Running |
| Datadog Sidecar | Running |

---

# Phase 10 — Validation

## Step 14 — Generate Application Traffic

Generate:

- browser traffic
- API requests
- application activity

Purpose:

- Generate logs
- Generate metrics
- Generate process activity

---

# Datadog UI Validation

## Containers

Go to:

```text
Infrastructure → Containers
```

Search:

```text
cluster_name:<CLUSTER_NAME>
```

---

## Kubernetes Explorer

Go to:

```text
Infrastructure → Kubernetes
```

Verify:

- clusters
- namespaces
- workloads
- pods

---

## Logs Explorer

Go to:

```text
Logs → Explorer
```

Search:

```text
kube_namespace:<APPLICATION_NAMESPACE>
```

---

## Process Explorer

Go to:

```text
Infrastructure → Processes
```

Verify:

- application processes
- container processes

---

# Common Operational Findings

| Observation | Description |
|---|---|
| Fargate does not expose nodes | Expected behavior |
| kubectl logs may intermittently fail | Fargate kubelet limitation |
| Sidecar monitoring works independently | Expected |
| Kubernetes inventory sync may take time | Expected |

---

# Known Limitations

## kubectl logs / exec

Possible error:

```text
no preferred addresses found
```

### Reason

AWS Fargate kubelet communication limitation.

This is expected behavior in some Fargate environments and does NOT impact Datadog telemetry collection.

---

# Platform Monitoring Capabilities

Once deployed, the platform supports:

- Kubernetes monitoring
- Namespace visibility
- Pod visibility
- Container metrics
- Process monitoring
- Log ingestion
- Workload analytics
- Dashboards and alerting

---

# Optional Enhancements

- Application Performance Monitoring (APM)
- OpenTelemetry integration
- SIEM integration
- Synthetic monitoring
- SLO dashboards
- Security monitoring
- FinOps visibility

---

# Final Outcome

AWS EKS Fargate workloads successfully integrated with Datadog using sidecar-based instrumentation, enabling:

- Enterprise observability
- Container monitoring
- Kubernetes visibility
- Logs collection
- Metrics collection
- Process monitoring

for cloud-native serverless Kubernetes environments.

---

# Important Enterprise Learning

## Traditional Kubernetes

- One Datadog Agent per worker node

## AWS EKS Fargate

- One Datadog Agent sidecar per application pod

> This is the MOST important architectural difference for EKS Fargate observability.
