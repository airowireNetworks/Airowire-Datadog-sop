
<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:25px;">
  <img src="/images/airowire-logo.png" width="220">
  <img src="/images/datadog.png" width="130">
</div>

# Datadog APM Integration Guide – Go Application on GKE

---

## 1. Document Information

| Field | Details |
|---|---|
| Client | Landmark |
| Prepared By | Airowire Networks Pvt. Ltd. |
| Application | Go |
| Go Runtime | 1.27.2 |
| Platform | Google Kubernetes Engine (GKE) |
| Monitoring | Datadog APM |
| Method | Manual Instrumentation |

## 2. Overview

This guide explains how to enable Datadog APM for a Go application running on GKE.

Follow these steps to complete the integration:

1. Verify the Datadog Agent.
2. Enable APM in the Agent.
3. Install the Datadog Go Tracer.
4. Instrument the Go application.
5. Configure Kubernetes.
6. Deploy and verify traces.

**Architecture:**

```text
Go Application (GKE Pod)
          |
          v
   Datadog Go Tracer
          |
          v
 Datadog Agent (GKE)
      TCP 8126
          |
          v
     Datadog Cloud
          |
          v
       Datadog APM
```

## 3. Step 1 – Verify GKE and Datadog Agent

Connect to the GKE cluster:

```bash
gcloud container clusters get-credentials <CLUSTER_NAME> \
  --region <REGION> \
  --project <PROJECT_ID>
```

Verify cluster connectivity:

```bash
kubectl get nodes
```

Identify the Datadog namespace:

```bash
kubectl get pods -A | grep datadog
```

Check Agent health:

```bash
kubectl get daemonset -n <DATADOG_NAMESPACE>
kubectl get pods -n <DATADOG_NAMESPACE>
```

**Expected result:** Datadog Agent Pods should be running.

## 4. Step 2 – Enable APM in Datadog Agent

Back up the existing Helm configuration:

```bash
helm get values <RELEASE_NAME> \
  -n <DATADOG_NAMESPACE> -a > datadog-backup.yaml
```

Open the existing Helm values file and add:

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126
```

Apply the updated configuration using the existing Helm release and chart:

```bash
helm upgrade <RELEASE_NAME> <CHART_REFERENCE> \
  -n <DATADOG_NAMESPACE> \
  -f <VALUES_FILE>
```

Verify:

```bash
kubectl get pods -n <DATADOG_NAMESPACE>
```

Check Agent status:

```bash
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -- agent status
```

**Expected result:** APM trace intake should be enabled on TCP port `8126`.

## 5. Step 3 – Install Datadog Go Tracer

Navigate to the Go application source directory:

```bash
cd <APPLICATION_DIRECTORY>
```

Install the Datadog Go Tracer v2 and HTTP integration using compatible, approved versions:

```bash
go get github.com/DataDog/dd-trace-go/v2@<TRACER_VERSION>

go get github.com/DataDog/dd-trace-go/contrib/net/http/v2@<INTEGRATION_VERSION>
```

Update dependencies:

```bash
go mod tidy
```

Verify:

```bash
go test ./...
go build ./...
```

**Expected result:** Dependencies should install and the application should build successfully.

Check Go compatibility before selecting tracer versions:

https://docs.datadoghq.com/tracing/trace_collection/compatibility/go/

## 6. Step 4 – Instrument the Go Application

Import the Datadog packages:

```go
import (
    "net/http"

    httptrace "github.com/DataDog/dd-trace-go/contrib/net/http/v2"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)
```

Initialize the tracer:

```go
tracer.Start()
defer tracer.Stop()
```

Instrument the HTTP handler:

```go
mux := http.NewServeMux()

mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("OK"))
})

handler := httptrace.WrapHandler(
    mux,
    "go-application",
    "/",
)

http.ListenAndServe(":8080", handler)
```

Integrate this into the application's existing server lifecycle, preserving its current routing and graceful shutdown.

**Expected result:** Incoming HTTP requests should generate Datadog traces.

## 7. Step 5 – Configure Kubernetes Deployment

Open the existing application Deployment YAML.

Add the following environment variables under the application container:

```yaml
env:
  - name: DD_SERVICE
    value: "go-application"

  - name: DD_ENV
    value: "staging"

  - name: DD_VERSION
    value: "1.0.0"

  - name: DD_AGENT_HOST
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP

  - name: DD_TRACE_AGENT_PORT
    value: "8126"
```

Update the service name, environment and application version according to the Landmark application.

**Important:** Ensure the Agent is reachable through the node IP on TCP port `8126`. Preserve all existing Deployment settings.

## 8. Step 6 – Deploy the Application

Build and publish the updated application image using the existing CI/CD pipeline.

Apply the updated Deployment:

```bash
kubectl apply -f deployment.yaml -n <APP_NAMESPACE>
```

Check the rollout:

```bash
kubectl rollout status deployment/<DEPLOYMENT_NAME> \
  -n <APP_NAMESPACE>
```

Check application Pods:

```bash
kubectl get pods -n <APP_NAMESPACE>
```

Check application logs:

```bash
kubectl logs deployment/<DEPLOYMENT_NAME> \
  -n <APP_NAMESPACE> --tail=100
```

**Expected result:** Application Pods should be running without unexpected errors.

## 9. Step 7 – Verify Datadog APM

Generate requests against an existing application endpoint:

```bash
curl -i https://<APPLICATION_URL>/<ENDPOINT>
```

Check Agent status:

```bash
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -- agent status
```

Open the Datadog dashboard:

**Datadog → APM → Services**

Search for the configured service name.

Verify:

- Service name
- Environment
- Application version
- Request traces
- Request latency
- Error information

<badge color="success">Success criteria</badge>

The integration is complete when actual application requests generate traces that are visible in Datadog APM.

## 10. Troubleshooting

| Issue | Action |
|---|---|
| Service not visible | Verify tracer initialization and service name |
| No traces | Generate requests and check instrumentation |
| Connection refused | Verify Agent APM port `8126` |
| Connection timeout | Check firewall and NetworkPolicies |
| Application startup failure | Check Go dependencies and application logs |
| Incorrect environment | Verify `DD_ENV` |

## 11. Rollback

If the application deployment causes issues:

```bash
kubectl rollout undo deployment/<DEPLOYMENT_NAME> \
  -n <APP_NAMESPACE>
```

If the Agent configuration needs rollback, identify the previous Helm revision:

```bash
helm history <RELEASE_NAME> -n <DATADOG_NAMESPACE>
```

Then restore the approved previous revision:

```bash
helm rollback <RELEASE_NAME> <REVISION> \
  -n <DATADOG_NAMESPACE>
```

## 12. Official References

- Go APM: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/go/
- Go Compatibility: https://docs.datadoghq.com/tracing/trace_collection/compatibility/go/
- Kubernetes APM: https://docs.datadoghq.com/containers/kubernetes/apm/

---

**Prepared By**
# 28. Contact

**Airowire Networks Pvt. Ltd.**

**Datadog Observability & Cloud SIEM Team**`
Dr. Shivanand Poojara

shivanand@airowire.com



