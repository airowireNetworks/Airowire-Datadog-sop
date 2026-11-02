
<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Azure Cloud Cost Management Integration with Datadog

## Standard Operating Procedure (SOP)

| Document Information | Details |
|---|---|
| Client | Trilegal |
| Cloud Provider | Microsoft Azure |
| Monitoring Platform | Datadog |
| Integration | Cloud Cost Management (CCM) |
| Document Type | Client Implementation Guide |
| Version | 3.0 |
| Prepared By | Airowire Networks |
| Purpose | Azure Billing and Cost Visibility |

---

## 1. Introduction

This document provides step-by-step instructions for integrating Microsoft Azure billing and cost data with Datadog Cloud Cost Management (CCM).

The integration will allow Trilegal to monitor, analyse, and understand Azure cloud expenditure through the Datadog platform.

### Objectives

- Enable Azure cost visibility within Datadog.
- Monitor actual Azure expenditure.
- Analyse amortized costs, including applicable reservation and savings plan benefits.
- View cost breakdowns across subscriptions and resources.
- Identify spending trends and potential cost optimisation opportunities.
- Provide a centralised view of Azure cloud expenditure.

## 2. Integration Architecture

The integration uses Azure Cost Management exports and Azure Blob Storage to transfer billing information to Datadog.

### Architecture Flow

```text
Microsoft Azure
       |
       v
Azure Cost Management
       |
       v
Actual Cost and Amortized Cost Exports
       |
       v
Azure Storage Account
       |
       v
Azure Blob Container
       |
       v
Datadog Azure Integration
       |
       v
Datadog Cloud Cost Management
       |
       v
Cost Dashboards and Analysis
```

### 2.1 Why Is an Azure Storage Account Required?

Azure Cost Management generates billing and usage information as export files.

These files need to be stored in an accessible location so Datadog can retrieve and process the cost information.

Azure Blob Storage provides this location.

The integration works as follows:

1. Azure Cost Management generates cost and usage export files.
2. The exported files are stored in an Azure Blob Container.
3. Datadog accesses the container using the configured Azure identity and required permissions.
4. Datadog processes the exported billing information.
5. The cost information becomes available in Datadog Cloud Cost Management.

**Important: Creating a new Storage Account is not mandatory.**

The existing Storage Account can be reused if it meets the required access, security, and configuration requirements.

A new Storage Account is needed only when no suitable existing storage resource is available or when Trilegal's internal security policies require dedicated storage.

## 3. Understanding Azure Cost Data

The integration uses two cost datasets.

### 3.1 Actual Cost

Actual Cost represents the recorded Azure charges for resource usage and applicable purchases.

It helps identify the actual expenditure recorded during a billing period.

### 3.2 Amortized Cost

Amortized Cost distributes applicable reservation and savings plan costs across their usage periods.

It helps provide visibility into effective resource costs after accounting for applicable commitment benefits.

**Both datasets must be available and configured according to Datadog's Azure CCM requirements.**

The CSP billing agreement and selected export scope must support the required datasets.

## 4. Existing Environment Information

Based on the initial information shared for this integration:

| Parameter | Current Information |
|---|---|
| Client | Trilegal |
| Cloud Provider | Microsoft Azure |
| Billing Agreement | CSP – confirmation required |
| Billing Scope | Billing Account – confirmation required |
| Azure Subscriptions | 3 subscriptions |
| Currency | INR |
| Azure Integration | Existing integration configured |
| Azure App Registration | Existing application available – verify before reuse |
| Storage Account | Not configured in the initial requirements |
| Blob Container | Not configured in the initial requirements |
| Actual Cost Export | Not configured |
| Amortized Cost Export | Not configured |
| Expected Export Frequency | Daily |
| Validation Frequency | Monthly |

**Note:** These details are based on the initial requirements. The Trilegal Azure Infra team must validate the current environment before implementation.

## 5. Prerequisites

Before starting the configuration, the following access and information are required.

### 5.1 Azure Prerequisites

- Access to the relevant Azure tenant.
- Access to the required billing or subscription scope.
- Appropriate Cost Management permissions.
- Permission to configure Cost Management exports.
- Access to an approved Storage Account.
- Permission to create a Blob Container if required.
- Permission to configure Azure role assignments.
- Confirmation of Actual Cost and Amortized Cost export availability.

### 5.2 Datadog Prerequisites

- Access to the Trilegal Datadog organisation.
- Existing Azure integration details.
- Existing Azure App Registration details.
- Azure Tenant ID.
- Application (Client) ID.
- Relevant billing or subscription scope identifiers.
- Storage Account details.
- Blob Container details.
- Azure export names and paths.

### 5.3 Existing Azure App Registration

The existing Datadog Azure App Registration should be reused wherever possible.

Before assigning permissions:

1. Open Microsoft Entra ID.
2. Navigate to App registrations.
3. Identify the existing Datadog application.
4. Verify the Application (Client) ID.
5. Confirm that it matches the application configured in Datadog.

Do not create a duplicate App Registration unless the existing integration cannot support the required configuration.

---

# 6. Available Implementation Approaches

Trilegal can select the appropriate implementation approach based on its existing Azure infrastructure and security requirements.

### Approach 1: Reuse Existing Storage Account and Blob Container

**Use this approach when both the Storage Account and suitable Blob Container already exist.**

Implementation steps:

1. Identify the existing Storage Account.
2. Verify that Blob Storage is available.
3. Identify an approved Blob Container.
4. Confirm that the container can be used for Datadog cost exports.
5. Configure Actual Cost and Amortized Cost exports.
6. Grant the Datadog application the required read permission.
7. Configure the export details in Datadog.

**Benefit:** No new Azure storage resource is required.

### Approach 2: Reuse Existing Storage Account and Create a New Blob Container

**Use this approach when a Storage Account exists but there is no suitable container for Datadog exports.**

Implementation steps:

1. Open the existing Storage Account.
2. Navigate to Data storage > Containers.
3. Select + Container.
4. Enter the container name:

   `datadog-ccm`

5. Set the anonymous access level to Private.
6. Create the container.
7. Configure the Actual Cost and Amortized Cost exports.
8. Assign the Datadog application the required read permission.

**Benefit:** Existing storage infrastructure can be reused while keeping cost exports organised separately.

### Approach 3: Create a New Storage Account and Blob Container

**Use this approach only when no suitable existing Storage Account is available or Trilegal requires dedicated storage.**

Implementation steps:

1. Open Azure Portal.
2. Navigate to Storage Accounts.
3. Select Create.
4. Select the appropriate subscription.
5. Select an approved resource group.
6. Enter a globally unique Storage Account name.
7. Select the approved Azure region.
8. Configure performance and redundancy according to Trilegal's standards.
9. Review and create the Storage Account.
10. Open the newly created Storage Account.
11. Navigate to Data storage > Containers.
12. Select + Container.
13. Enter the container name:

    `datadog-ccm`

14. Set anonymous access to Private.
15. Create the container.
16. Configure both cost exports.
17. Assign the Datadog application the required read permission.

**Benefit:** Dedicated storage for Datadog cost exports.

**Note:** Storage Account creation requires approval from the Trilegal Azure Infra team.

### Approach 4: CSP Partner-Managed Export Configuration

**Use this approach when the CSP partner controls the billing account or required export permissions.**

Implementation steps:

1. Contact the CSP partner.
2. Confirm the exact Azure billing agreement.
3. Verify whether Actual Cost and Amortized Cost exports are available.
4. Confirm the supported billing scope.
5. Ask whether the CSP partner can configure the exports.
6. Agree on the Storage Account and Blob Container location.
7. Confirm how the Datadog application will securely access the exported files.
8. Complete the Datadog CCM configuration.

**Important:** Do not assume that every CSP customer can create billing-account-level exports. The CSP partner must confirm the supported scope and permissions.

### Approach 5: Reuse Existing Azure Cost Exports

**Use this approach when suitable Azure Cost Management exports are already configured.**

Implementation steps:

1. Identify existing Actual Cost exports.
2. Identify existing Amortized Cost exports.
3. Verify that both datasets are available.
4. Confirm that the export scope is supported.
5. Confirm that the destination is Azure Blob Storage.
6. Verify the export format and file partitioning.
7. Confirm that the export schedule meets Datadog requirements.
8. Verify that the Datadog application can read the files.
9. Configure Datadog using the existing export details.

**Benefit:** Avoids duplicate exports and unnecessary Azure resource creation.

---

# 7. CSP Billing Validation

Since Trilegal uses a CSP billing arrangement, billing scope and export availability must be confirmed before implementation.

### Step 1: Confirm the Billing Agreement

The Azure Infra team or CSP partner should confirm:

- Exact billing agreement type.
- Whether the billing arrangement uses Microsoft Partner Agreement (MPA) or another agreement.
- Available billing scope.
- Whether Actual Cost exports are supported.
- Whether Amortized Cost exports are supported.
- Whether Trilegal or the CSP partner is responsible for configuring the exports.

### Step 2: Confirm Cost Export Availability

Confirm that both Actual Cost and Amortized Cost datasets can be exported at the selected scope.

If either dataset is unavailable:

1. Stop the export configuration.
2. Contact the CSP partner.
3. Confirm supported export options with Microsoft if required.
4. Confirm the supported integration method with Datadog.

Do not replace the required cost datasets with usage-only exports without Datadog confirmation.

### Step 3: Confirm the Export Scope

The selected scope must be supported by the billing agreement and the permissions available to the customer.

Possible scopes include:

- Billing Account.
- Subscription.
- Resource Group.

The scope must also cover the subscriptions that Trilegal wants to monitor.

---

# 8. Azure Portal Configuration – Step by Step

The following instructions describe the Azure Portal configuration.

## Step 1: Log in to Azure Portal

1. Open:

   https://portal.azure.com

2. Log in using an authorised Azure account.
3. Verify that the correct Microsoft Entra tenant is selected.
4. Select the appropriate billing account or subscription.

## Step 2: Identify the Billing Scope

1. Search for Cost Management + Billing.
2. Open the relevant billing account or subscription.
3. Confirm the billing scope.
4. Verify that the three Trilegal subscriptions are covered by the selected scope.

If the required scope is not available, contact the CSP partner.

## Step 3: Verify Existing Storage

Navigate to:

Azure Portal > Storage Accounts

1. Check whether an existing Storage Account is available.
2. Open the Storage Account.
3. Navigate to Data storage > Containers.
4. Identify an approved container.
5. Confirm that the storage resource meets the required security and access policies.

If a suitable Storage Account and container already exist, reuse them.

If a Storage Account exists but no suitable container is available, create a dedicated private container.

If no suitable Storage Account exists, obtain approval to create one.

## Step 4: Create a Blob Container if Required

Navigate to:

Azure Portal > Storage Accounts > Select Storage Account > Data storage > Containers

1. Select + Container.
2. Enter:

   `datadog-ccm`

3. Set the anonymous access level to Private.
4. Select Create.

The container will be used to store the Azure cost export files.

## Step 5: Open Cost Management Exports

Navigate to:

Azure Portal > Cost Management + Billing > Cost Management > Exports

The exact menu placement may vary depending on the billing scope and Azure Portal experience.

1. Select the confirmed billing scope.
2. Open Exports.
3. Select Create or the equivalent export creation option.

## Step 6: Configure Actual Cost Export

Create an Actual Cost export using the supported cost and usage dataset available at the selected scope.

Suggested export name:

`trilegal-actual-daily-mtd`

Configure the following:

| Setting | Configuration |
|---|---|
| Export Type | Actual Cost |
| Frequency | Daily |
| Dataset | Cost and usage – Actual |
| Destination | Azure Blob Storage |
| Storage Account | Approved existing or new account |
| Container | `datadog-ccm` or approved existing container |
| Export Format | Supported CSV or Parquet |
| File Partitioning | As required by Datadog |
| Overwrite | As required by Datadog |

Select the appropriate month-to-date export period where supported by the Azure export configuration and Datadog requirements.

## Step 7: Configure Amortized Cost Export

Create a separate Amortized Cost export.

Suggested export name:

`trilegal-amortized-daily-mtd`

Configure the following:

| Setting | Configuration |
|---|---|
| Export Type | Amortized Cost |
| Frequency | Daily |
| Dataset | Cost and usage – Amortized |
| Destination | Azure Blob Storage |
| Storage Account | Approved existing or new account |
| Container | `datadog-ccm` or approved existing container |
| Export Format | Supported CSV or Parquet |
| File Partitioning | As required by Datadog |
| Overwrite | As required by Datadog |

Both exports can use the same Storage Account and Blob Container.

Ensure that the export names and destination paths are unique and correctly configured.

**Important:** Dataset version, file format, compression, partitioning, and overwrite settings must follow the current Datadog Azure CCM documentation and the options available at the selected Azure scope. Do not assume every Azure export option is supported.

## Step 8: Review and Create Exports

Before creating the exports:

1. Verify the selected billing scope.
2. Verify the Actual Cost export configuration.
3. Verify the Amortized Cost export configuration.
4. Confirm the Storage Account.
5. Confirm the Blob Container.
6. Verify the export frequency.
7. Confirm the dataset and file settings.

Select Review + Create or the equivalent option.

## Step 9: Run Initial Exports

After the exports are created:

1. Open the Actual Cost export.
2. Select Run Now if available.
3. Wait for the export job to complete.
4. Open the Amortized Cost export.
5. Select Run Now if available.
6. Wait for the export job to complete.

Verify that both exports have completed successfully.

## Step 10: Verify Export Files

Navigate to:

Azure Portal > Storage Accounts > Select Storage Account > Data storage > Containers

1. Open the configured Blob Container.
2. Verify that Actual Cost files are available.
3. Verify that Amortized Cost files are available.
4. Confirm that the files are stored under the expected export paths.
5. Verify that both export jobs completed successfully.

If the files are missing, review the export job status and configuration.

## Step 11: Assign Storage Permissions to Datadog

Datadog requires permission to read the exported billing files.

Navigate to:

Azure Portal > Storage Accounts > Select Storage Account > Access Control (IAM)

1. Select Add.
2. Select Add role assignment.
3. Search for:

   `Storage Blob Data Reader`

4. Select the role.
5. Select Next.
6. Under Select members, search for the existing Datadog App Registration.
7. Verify the Application (Client) ID.
8. Select the correct application/service principal.
9. Select Review + assign.
10. Complete the role assignment.

If the exports use separate containers or storage accounts, assign the required permissions to each relevant destination.

**Security:** Assign the role at the narrowest scope that supports the integration, preferably the dedicated container where possible.

## Step 12: Configure Cost Management Reader Where Required

For subscription or resource-group scope, follow the current Datadog instructions to determine whether Cost Management Reader is required.

Where required:

Navigate to:

Azure Portal > Subscriptions > Select Subscription > Access Control (IAM)

1. Select Add.
2. Select Add role assignment.
3. Search for:

   `Cost Management Reader`

4. Select the role.
5. Select Next.
6. Select the existing Datadog App Registration.
7. Review the assignment.
8. Select Review + assign.

Repeat for the relevant subscriptions or resource groups.

**Note:** Do not assign unnecessary permissions. Follow the current Datadog requirements for the selected scope.

---

# 9. Configure Azure Cloud Cost Management in Datadog

After completing the Azure configuration, proceed with Datadog setup.

## Step 1: Log in to Datadog

1. Open the Trilegal Datadog organisation.
2. Navigate to Cloud Cost Management.
3. Open the Azure configuration or setup section.

The exact menu names may vary depending on the Datadog interface and account configuration.

## Step 2: Verify the Existing Azure Integration

1. Identify the existing Azure integration.
2. Verify the Tenant ID.
3. Verify the Application (Client) ID.
4. Confirm that the correct App Registration is being used.
5. Avoid creating a duplicate integration.

## Step 3: Configure Billing Scope

Provide the required billing or subscription scope details.

Depending on the selected integration scope, this may include:

- Billing Account ID.
- Azure Subscription ID.
- Resource Group details.

Use the exact identifiers from Azure.

## Step 4: Configure Storage and Export Details

Provide the details requested by the Datadog configuration:

- Storage Account name.
- Blob Container name.
- Actual Cost export name.
- Actual Cost export path.
- Amortized Cost export name.
- Amortized Cost export path.

The export paths must match the actual Azure export configuration.

Do not guess or manually construct the paths.

## Step 5: Complete Configuration

1. Review the Azure identity.
2. Verify the billing scope.
3. Verify the Storage Account.
4. Verify the Blob Container.
5. Verify both export names and paths.
6. Complete the configuration using the Datadog setup instructions.
7. Check the configuration status and any reported errors.

---

# 10. Optional Automation Using Terraform

For organisations that prefer Infrastructure as Code, parts of the Azure CCM configuration can be managed using Terraform.

This approach should be considered only after the manual integration requirements are confirmed.

Possible Terraform-managed components include:

- Azure Storage Account.
- Azure Blob Container.
- Azure role assignments.
- Datadog Azure Usage Cost configuration.

The Datadog Terraform resource is:

`datadog_azure_uc_config`

Before using Terraform:

1. Verify the current Datadog Terraform provider version.
2. Refer to the official resource schema.
3. Confirm the required attributes and nested configuration blocks.
4. Verify the export names and paths.
5. Review the existing Datadog integration to avoid duplicate resources.
6. Run `terraform plan`.
7. Obtain approval before running `terraform apply`.

Official Terraform reference:

https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/azure_uc_config

**Note:** Terraform configuration should be prepared using the actual Trilegal environment details. No placeholder configuration should be applied directly to production.

---

# 11. Validation and Testing

After completing the configuration, perform the following checks.

## 11.1 Azure Validation Checklist

- [ ] Correct Azure tenant selected.
- [ ] Correct billing scope selected.
- [ ] Actual Cost export created.
- [ ] Amortized Cost export created.
- [ ] Both exports completed successfully.
- [ ] Export schedule configured.
- [ ] Correct Storage Account selected.
- [ ] Correct Blob Container selected.
- [ ] Actual Cost files available in Blob Storage.
- [ ] Amortized Cost files available in Blob Storage.
- [ ] Datadog App Registration has the required storage permission.
- [ ] Additional Cost Management permissions assigned where required.

## 11.2 Datadog Validation Checklist

- [ ] Existing Azure integration verified.
- [ ] Correct Tenant ID configured.
- [ ] Correct Application (Client) ID configured.
- [ ] Correct billing scope configured.
- [ ] Storage Account details verified.
- [ ] Blob Container details verified.
- [ ] Actual Cost export configured.
- [ ] Amortized Cost export configured.
- [ ] Export paths verified.
- [ ] No permission errors.
- [ ] Azure cost data visible in Datadog CCM.

## 11.3 Cost Data Comparison

Compare Azure Cost Management with Datadog CCM.

Validate using the same:

1. Billing scope.
2. Subscription selection.
3. Date range.
4. Currency (INR).
5. Cost dataset.
6. Applicable filters.

Allow for Azure export generation and Datadog processing delays before determining whether there is a data mismatch.

---

# 12. Troubleshooting

| Issue | Possible Reason | Recommended Action |
|---|---|---|
| Export creation fails | Insufficient billing permissions | Contact Azure billing administrator or CSP partner |
| Actual Cost export unavailable | Dataset not supported at selected scope | Confirm availability with CSP partner |
| Amortized Cost export unavailable | Billing agreement or scope limitation | Confirm supported options |
| Storage access denied | Missing Blob permissions | Verify Storage Blob Data Reader assignment |
| Datadog cannot read files | Incorrect application identity or storage permission | Verify Client ID and role assignment |
| Export files missing | Export has not completed or destination is incorrect | Check export job status and destination |
| Cost data not visible | Processing delay or incorrect configuration | Verify exports, paths, scope and Datadog status |
| Cost mismatch | Different date range, scope or cost dataset | Compare matching Azure and Datadog filters |
| Permission error | Missing role or network restriction | Verify Azure RBAC and network access requirements |

---

# 13. Security and Access Considerations

The following security practices must be followed:

1. Reuse the existing approved Datadog App Registration wherever possible.
2. Assign only the permissions required for the integration.
3. Keep Blob Containers private.
4. Do not enable anonymous public access.
5. Do not share Azure credentials, Client Secrets, Storage Account keys, or SAS tokens through email.
6. Follow Trilegal's Azure security and governance policies.
7. Use approved Storage Account locations and configurations.
8. Review access permissions periodically.

---

# 14. Roles and Responsibilities

| Activity | Trilegal Azure Infra Team | CSP Partner | Airowire / Datadog Team |
|---|---|---|---|
| Confirm billing agreement | Support | Responsible | Consulted |
| Confirm billing scope | Support | Responsible | Consulted |
| Confirm export availability | Support | Responsible | Consulted |
| Identify existing Storage Account | Responsible | Consulted | Guide |
| Create Storage Account if required | Responsible | Support | Guide |
| Create Blob Container if required | Responsible | Support | Guide |
| Configure Azure cost exports | Responsible / as authorised | Support / as authorised | Guide |
| Assign Azure permissions | Responsible | Support | Guide |
| Configure Datadog CCM | Support | Consulted | Responsible |
| Validate cost data | Support | Support | Responsible |

---

# 15. Information Required from Trilegal

Before proceeding with implementation, the Trilegal Azure Infra team is requested to confirm the following:

| No. | Confirmation Required | Response |
|---|---|---|
| 1 | What is the exact Azure CSP billing agreement type? | Pending |
| 2 | Is the billing scope accessible to Trilegal or managed by the CSP partner? | Pending |
| 3 | Are Actual Cost exports available? | Pending |
| 4 | Are Amortized Cost exports available? | Pending |
| 5 | Can the three Azure subscriptions be covered by the selected export scope? | Pending |
| 6 | Is there an existing Storage Account that can be reused? | Pending |
| 7 | Is there an existing Blob Container suitable for cost exports? | Pending |
| 8 | If no suitable storage exists, can a dedicated Storage Account and container be created? | Pending |
| 9 | Can the existing Datadog App Registration be granted the required storage access? | Pending |
| 10 | Who will configure the exports: Trilegal Infra team or CSP partner? | Pending |

These confirmations will help determine the correct implementation approach and avoid unnecessary Azure resource creation.

---

# 16. Implementation Completion Criteria

The integration will be considered successfully completed when:

1. The Azure billing agreement and export scope are confirmed.
2. Actual Cost and Amortized Cost export availability is confirmed.
3. Both exports are configured successfully.
4. Export files are generated in Azure Blob Storage.
5. The Datadog application has the required permissions.
6. The Azure CCM configuration is completed in Datadog.
7. Cost data is visible in Datadog CCM.
8. Azure and Datadog cost values are validated using matching filters.

---

# 17. Official Documentation

### Datadog Documentation

Azure Cloud Cost Management Setup:

https://docs.datadoghq.com/cloud_cost_management/setup/azure/

Datadog Cloud Cost Management:

https://docs.datadoghq.com/cloud_cost_management/

Datadog Terraform Provider:

https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/azure_uc_config

### Microsoft Documentation

Azure Cost Management Exports:

https://learn.microsoft.com/en-in/azure/cost-management-billing/costs/tutorial-improved-exports

Microsoft Partner Billing:

https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/get-started-partners

Azure Role-Based Access Control:

https://learn.microsoft.com/en-us/azure/role-based-access-control/overview

---

# 18. Conclusion and Next Steps

The Azure Cloud Cost Management integration will provide Trilegal with centralised visibility into Azure cloud expenditure through Datadog.

Before starting the implementation, the Trilegal Azure Infra team should:

1. Confirm the CSP billing agreement and supported billing scope.
2. Verify the availability of Actual Cost and Amortized Cost exports.
3. Identify whether an existing Storage Account and Blob Container can be reused.
4. Confirm the required permissions for the existing Datadog App Registration.
5. Select the appropriate implementation approach.

Once these prerequisites are confirmed, the Azure cost exports can be configured and connected to Datadog.

**Expected Outcome:** Successful integration of Azure billing and cost data with Datadog Cloud Cost Management, providing visibility into Actual Cost, Amortized Cost, and Azure cloud expenditure.

---

**Document Prepared By: Airowire Networks**  
**For: Trilegal – Azure Cloud Cost Management Integration**

