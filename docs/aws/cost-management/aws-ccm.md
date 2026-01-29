<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Solution Document for AWS Cloud Cost Management (CCM)
</h1>

<p><strong>(Datadog Cloud Cost Management via Terraform & CloudFormation on AWS)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized process to integrate AWS billing and usage data with Datadog Cloud Cost Management (CCM). The objective is to enable:

- AWS cost visibility and transparency
- Service-level and account-level cost allocation
- Cost trend analysis and forecasting
- Waste identification and optimization
- FinOps-aligned governance and reporting

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- AWS payer (billing) account integration
- Datadog Cloud Cost Management (CCM)
- Terraform-based AWS integration
- AWS Cost & Usage Report (CUR)
- S3-based billing data ingestion

<strong>Out of Scope:</strong>

- Multi-cloud cost federation
- Chargeback automation tooling
- Custom FinOps dashboards
- Compliance and audit frameworks

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

<strong>AWS Requirements:</strong>

- Active AWS Billing (Payer) Account
- AWS Admin / Tech Lead access
- Region: us-east-1 (N. Virginia)

<strong>Datadog Requirements:</strong>

- Datadog account with Cloud Cost Management enabled
- Datadog API Key
- Datadog Application Key

<strong>Tooling Requirements:</strong>

- Terraform v1.x
- AWS CLI (optional)

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

Datadog Cloud Cost Management ingests AWS billing data via Cost & Usage Reports (CUR) delivered to S3. Terraform and CloudFormation are used to securely provision:

- IAM roles and permissions
- S3 bucket for CUR storage
- CUR report configuration
- Datadog ↔ AWS integration

<h3 style="color:#000000; font-weight:bold;">Architecture of Logic</h3>

AWS Billing → CUR → S3 → Datadog CCM → Cost Analytics & Dashboards

<h3 style="color:#000000; font-weight:bold;">Functional Components</h3>

| Component | Role |
|---|---|
| AWS Payer Account | Billing source |
| IAM Role | Secure Datadog access |
| Cost & Usage Report (CUR) | Detailed billing data |
| S3 Bucket | CUR storage |
| Datadog CCM | Cost analytics & optimization |

<h2 style="color:#000000; font-weight:bold;">Deployment Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1 — Configure AWS Integration in Datadog</h3>

Navigate to:

Datadog → Integrations → Amazon Web Services

Actions:

- Select Terraform option
- Enter AWS Account ID
- Generate API & Application Keys
- Copy generated Terraform HCL
- **Do NOT click Confirm yet**

<p align="center">
  <img src="/images/cost4.png" width="600"/>
</p>

<p align="center">
  <img src="/images/cost5.png" width="600"/>
</p>

<h3 style="color:#000000; font-weight:bold;">Step 2 — Run Terraform (AWS Side)</h3>

AWS Admin executes the Terraform code provided by Datadog.

```bash
terraform init
terraform apply
```

Terraform provisions:

- DatadogIntegrationRole
- Read-only IAM policies
- Trust relationship with Datadog

<h3 style="color:#000000; font-weight:bold;">Step 3 — Confirm AWS Integration</h3>

After Terraform completes:

- Return to Datadog AWS integration page
- Click **Confirm**
- Integration status becomes **Installed**

<h3 style="color:#000000; font-weight:bold;">Step 4 — Enable Cloud Cost Management</h3>

Navigate:

Datadog → Cloud Cost → Settings

Begin AWS Cost & Usage Report (CUR) setup.

<p align="center">
  <img src="/images/cost6.png" width="600"/>
</p>


<h3 style="color:#000000; font-weight:bold;">Step 5 — Create Cost & Usage Report (CUR)</h3>

AWS Admin deploys CloudFormation stack using the Datadog CCM template.

This provisions:

- New CUR with CREATE_NEW_REPORT versioning
- S3 bucket for billing data
- Required IAM permissions

<h3 style="color:#000000; font-weight:bold;">Step 6 — Validate CUR in Datadog</h3>

In Datadog Cloud Cost Settings:

- Click **Retry Validation**
- Validate:
  - S3 access
  - CUR configuration

Both validations must succeed.

<h3 style="color:#000000; font-weight:bold;">Step 7 — Wait for Cost Data</h3>

- AWS generates CUR files daily
- Datadog processes CUR data
- Cost data appears within **24–48 hours**

<p align="center">
  <img src="/images/cost7.png" width="600"/>
</p>


<h2 style="color:#000000; font-weight:bold;">Datadog-Side Validation</h2>

Validate the following in Datadog:

- Cloud Cost Overview populated
- AWS services visible
- Account-level spend trends
- Cost breakdown by service and account

<p align="center">
  <img src="/images/cost9.png" width="600"/>
</p>


<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

Key operational findings:

- Secure AWS billing ingestion via CUR
- No impact on production workloads
- Accurate cost attribution at scale
- Suitable for enterprise FinOps adoption

<h2 style="color:#000000; font-weight:bold;">Optional Future Enhancements</h2>

Recommended enhancements:

- Cost allocation by tags
- Budget and anomaly alerts
- Chargeback / showback models
- Multi-account cost rollups
- Forecast-based optimization

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

AWS Cloud Cost Management successfully integrated into Datadog, providing centralized cost visibility, analytics, and optimization insights across AWS services and accounts.

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this Document and its contents please contact Airowire Solutions:

Patrick Schmidt — patrick@airowire.com  
Piyush Choudhary — piyush@airowire.com  
Dr. Shivanand Poojara — shivanand@airowire.com  

