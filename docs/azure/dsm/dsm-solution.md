Purpose of the document 
Enable DSM visibility for queue-based microservices running on AKS using RabbitMQ as the 
message broker and Datadog APM with auto-instrumentation. 
What DSM solves 
Distributed message pipelines are typically blind. DSM exposes: 
• Throughput 
• processing + queue latency 
• consumer lag 
• retries & failures 
• full producer → queue → consumer correlation 
Architecture Scope 
In Scope: 
• AKS Cluster 
• RabbitMQ as broker 
• Multi-language microservices (.NET, Java, Python, Node, Go) 
• Datadog Terraform deployment model 
• Admission Controller for tracer injection 
RabbitMQ itself is not instrumented — DSM instruments message spans at producer & 
consumer layers. 
Deployment Model 
DSM consists of 3 core layers: 
Layer                        
Function 
Datadog Agent 
Collects APM & DSM spans 
Admission Controller 
Injects tracers automatically 
Application Runtime 
Emits queue spans 
Why Admission Controller? 
No code changes 
• No library updates 
• No rebuild needed 
• Multi-language support 
• Zero friction onboarding 
Deployment — Datadog Agent via Terraform 
4.1 Final Values File 
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
env: - name: DD_DATA_STREAMS_ENABLED 
value: "true" -name: 
DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED 
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
Reference  
Repo:https://github.com/airowireNetworks/datadog-apm-azure.git 
Change Required: Update datadog-values.yaml only 
4.2 Apply via Terraform 
terraform apply 
CommandExplanation: 
Executes infrastructure deployment — installs/updates Datadog Agent + Admission 
Controller. 
Terraform responsibilities: 
APM enabled 
DSM enabled 
Admission Controller enabled 
Helm chart configured 
Runtime Enablement — Application Layer 
Terraform cannot modify business applications, therefore enable via Kubernetes 
5.1 Auto-Instrumentation via Annotation 
kubectl annotate deployment virtual-customer admission.datadoghq.com/enabled=true -
overwrite 
kubectl annotate deployment order-service admission.datadoghq.com/enabled=true -
overwrite 
kubectl annotate deployment makeline-service admission.datadoghq.com/enabled=true -
overwrite 
kubectl annotate deployment virtual-worker admission.datadoghq.com/enabled=true 
overwrite 
Explanation: 
Adds metadata so Admission Controller auto-injects tracers into pods — no code modification 
required. 
5.2 DSM Runtime Environment Flags 
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
Explanation: 
Enables DSM instrumentation at runtime + improves naming in APM UI. 
Language Support Notes 
Microservice                    
Role                
virtual-customer 
Producer 
DSM Support 
✔ 
order-service 
Producer 
✔ 
makeline-service 
Consumer 
✔ 
virtual-worker 
Consumer 
✔ 
rabbitmq 
Broker 
N/A 
Language maturity: 
FullySupported→.NET,Java,Python,Node 
Partial → Go 
Validation Workflow (Critical) 
DSM validation must follow strict order. 
Validate APM First 
UI: 
APM → Services 
Expected: 
virtual-customer 
order-service 
makeline-service 
virtual-worker 
If APM is empty → DSM cannot generate topology. 
Validate DSM Graph 
UI: 
APM → Data Streams Monitoring → Explore 
Expected topology: 
virtual-customer → rabbitmq → virtual-worker 
Expected metrics: 
Throughput 
queue time 
processing time 
consumer lag 
retries 
latency 
Success Criteria 
DSM implementation considered successful when: 
• APM spans emitted 
• Producers & consumers traced 
• DSM topology visible 
• Metrics populated & stable 
• Matches partner enablement expectations. 
Troubleshooting Guide 
kubectl logs <pod> | grep -i datadog 
Expected output: 
Datadog Tracer initialized 
Data Streams: Enabled 
Operational Notes 
Both sides are required for DSM: 
Producer → Queue → Consumer 
If either side missing → DSM stops reconstructing path. 
CONTACT 
For more information about this Document and its contents please contact Airowire Solutions  
Patrick Schmidt patrick@airowire.com 
Piyush Choudhary piyush@airowire.com  
Dr.Shivanand Poojara shivanand@airowire.com 
