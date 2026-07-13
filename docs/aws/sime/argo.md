<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
Solution Document for Deploying Datadog on Kubernetes using Argo CD (GitOps)
</h1>

<p><strong>(Datadog Infrastructure Monitoring using Argo CD and Helm)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized process for deploying Datadog into a Kubernetes cluster using Argo CD (GitOps) and the official Datadog Helm Chart.

The deployment enables:

- Infrastructure Monitoring
- Kubernetes Monitoring
- Container Log Collection
- Cluster Agent deployment
- GitOps-based continuous deployment
- Automated synchronization using Argo CD

All deployment configurations are stored in Git and synchronized automatically by Argo CD.

---

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope</strong>

- Datadog Agent deployment
- Cluster Agent deployment
- Infrastructure Monitoring
- Kubernetes Monitoring
- Container Log Collection
- GitOps deployment using Argo CD

<strong>Out of Scope</strong>

- Application Performance Monitoring (APM)
- Continuous Profiler
- Synthetic Monitoring
- Cloud Integrations
- Custom Dashboards

---

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

<strong>Kubernetes Requirements</strong>

- Kubernetes Cluster
- kubectl configured
- Cluster Administrator access

Verify cluster:

```bash
kubectl get nodes
```

<strong>Argo CD Requirements</strong>

Verify Argo CD is running.

```bash
kubectl get pods -n argocd
```

Expected:

- argocd-server
- argocd-repo-server
- argocd-application-controller

<strong>Datadog Requirements</strong>

- Datadog Account
- Datadog API Key
- Datadog Site (US1/EU)

<strong>Git Requirements</strong>

- GitHub or GitLab Repository

Clone repository:

```bash
git clone https://github.com/<organization>/datadog-gitops.git

cd datadog-gitops
```

---

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

Datadog is deployed through Argo CD using the official Datadog Helm Chart.

Git acts as the single source of truth.

Whenever changes are committed to Git, Argo CD automatically synchronizes those changes into the Kubernetes cluster.

<h3 style="color:#000000; font-weight:bold;">Architecture</h3>

```
Git Repository
      │
      ▼
   Argo CD
      │
      ▼
Datadog Helm Chart
      │
      ▼
Datadog Agent (DaemonSet)
      │
      ▼
Datadog Cluster Agent
      │
      ▼
Datadog Platform
```

---

<h2 style="color:#000000; font-weight:bold;">Repository Structure</h2>

```
datadog-gitops
│
├── argocd
│     └── application.yaml
│
└── README.md
```

---

<h2 style="color:#000000; font-weight:bold;">Deployment Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1 – Create Datadog Namespace</h3>

```bash
kubectl create namespace datadog
```

Verify

```bash
kubectl get ns
```

---

<h3 style="color:#000000; font-weight:bold;">Step 2 – Generate Datadog API Key</h3>

Login to Datadog

Organization Settings

→ API Keys

Generate a new API Key.

---

<h3 style="color:#000000; font-weight:bold;">Step 3 – Create Datadog Secret</h3>

```bash
kubectl create secret generic datadog-secret \
--from-literal=api-key=<DATADOG_API_KEY> \
-n datadog
```

Verify

```bash
kubectl get secret -n datadog
```

---

<h3 style="color:#000000; font-weight:bold;">Step 4 – Generate Cluster Agent Token</h3>

Generate Token

```bash
openssl rand -hex 16
```

Example

```
7f9c4e3a8d1b2c6f5a9e8d7c3b1f4a2e
```

Create Secret

```bash
kubectl create secret generic datadog-cluster-agent-token \
--from-literal=token=<TOKEN> \
-n datadog
```

---

<h3 style="color:#000000; font-weight:bold;">Step 5 – Create Argo CD Application</h3>

Create

```
argocd/application.yaml
```

Configure the following:

- Official Datadog Helm Repository
- Helm Chart Version
- Cluster Agent Enabled
- Log Collection Enabled
- GitOps Auto Sync
- Self Heal Enabled

---

<h3 style="color:#000000; font-weight:bold;">Step 6 – Deploy Datadog</h3>

```bash
kubectl apply -f argocd/application.yaml
```

---

<h3 style="color:#000000; font-weight:bold;">Step 7 – Verify Argo CD</h3>

```bash
kubectl get applications -n argocd
```

Expected

```
NAME        SYNC STATUS    HEALTH

datadog     Synced         Healthy
```

---

<h3 style="color:#000000; font-weight:bold;">Step 8 – Verify Kubernetes Resources</h3>

Pods

```bash
kubectl get pods -n datadog
```

Deployments

```bash
kubectl get deployments -n datadog
```

DaemonSets

```bash
kubectl get daemonset -n datadog
```

Services

```bash
kubectl get svc -n datadog
```

---

<h3 style="color:#000000; font-weight:bold;">Step 9 – Verify Datadog Agent</h3>

```bash
kubectl exec -it \
-n datadog \
<agent-pod> \
-c agent \
-- agent status
```

Verify:

- API Key Valid
- Cluster Agent Connected
- Kubernetes Checks Running
- Logs Running

---

<h2 style="color:#000000; font-weight:bold;">Production Configuration</h2>

Enable High Availability

```yaml
clusterAgent:
  enabled: true
  replicas: 2
```

Use Existing Token

```yaml
clusterAgent:
  tokenExistingSecret: datadog-cluster-agent-token
```

Configure Cluster Name

```yaml
datadog:
  clusterName: production-cluster
```

Enable Logs

```yaml
logs:
  enabled: true
  containerCollectAll: true
```

Configure Kubelet

```yaml
kubelet:
  useApiServer: true
  tlsVerify: false
```

Disable APM

```yaml
apm:
  enabled: false
```

Disable Process Monitoring

```yaml
processAgent:
  enabled: false
```

---

<h2 style="color:#000000; font-weight:bold;">Datadog UI Validation</h2>

Verify the following sections in Datadog.

Infrastructure

→ Hosts

Expected

- Worker Nodes Visible
- Healthy Status

Infrastructure

→ Kubernetes

Expected

- Cluster
- Nodes
- Pods
- Deployments
- Namespaces

Logs

→ Live Tail

Expected

- Kubernetes Logs
- Container Logs

---

<h2 style="color:#000000; font-weight:bold;">Troubleshooting</h2>

Check Argo CD

```bash
kubectl get applications -n argocd
```

Manual Sync

```bash
argocd app sync datadog
```

Check Pods

```bash
kubectl get pods -n datadog
```

Agent Logs

```bash
kubectl logs <agent-pod> -n datadog -c agent
```

Cluster Agent Logs

```bash
kubectl logs deployment/datadog-cluster-agent -n datadog
```

---

<h2 style="color:#000000; font-weight:bold;">Upgrade Procedure</h2>

Update Helm Chart Version

Example

```
3.120.0

↓

3.121.0
```

Commit Changes

```bash
git add .

git commit -m "Upgrade Datadog Helm Chart"

git push
```

Argo CD automatically synchronizes the deployment.

---

<h2 style="color:#000000; font-weight:bold;">Rollback Procedure</h2>

```bash
argocd app rollback datadog
```

---

<h2 style="color:#000000; font-weight:bold;">Best Practices</h2>

- Use the official Datadog Helm Chart.
- Store API Keys in Kubernetes Secrets.
- Use a static Cluster Agent Token.
- Enable Auto Sync and Self Heal.
- Use two Cluster Agent replicas for High Availability.
- Test Helm upgrades in a non-production environment.
- Monitor Argo CD Application Health after every deployment.

---

<h2 style="color:#000000; font-weight:bold;">Deployment Validation Checklist</h2>

| Validation | Status |
|------------|--------|
| Namespace Created | ✅ |
| Datadog Secret Created | ✅ |
| Cluster Agent Token Created | ✅ |
| Argo CD Application Created | ✅ |
| Application Synced | ✅ |
| Application Healthy | ✅ |
| Datadog Agent Running | ✅ |
| Cluster Agent Running | ✅ |
| Infrastructure Hosts Visible | ✅ |
| Kubernetes Cluster Visible | ✅ |
| Container Logs Collected | ✅ |

---

<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

- Datadog was successfully deployed using GitOps.
- Argo CD continuously synchronizes changes from Git.
- Infrastructure Monitoring is enabled.
- Kubernetes Monitoring is enabled.
- Container Log Collection is enabled.
- Cluster Agent provides Kubernetes metadata and cluster-level monitoring.
- Deployment is fully automated and repeatable.

---

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

Datadog was successfully deployed on Kubernetes using Argo CD (GitOps) with the official Datadog Helm Chart. The deployment provides Infrastructure Monitoring, Kubernetes Monitoring, Container Log Collection, and GitOps-based automated deployment while maintaining Git as the single source of truth.

---

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this document and its contents, please contact Airowire Solutions.

Patrick Schmidt — patrick@airowire.com

Piyush Choudhary — piyush@airowire.com

Dr. Shivanand Poojara — shivanand@airowire.com
