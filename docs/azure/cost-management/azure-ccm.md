
# Trilegal – Azure Cloud Cost Management (CCM) Integration with Datadog

<div align="center">

<img src="/images/airowire-logo.png" width="260">

<img src="/images/datadog.png" width="180">

</div>

---

## 1. Purpose of the Document

The purpose of this document is to provide a step-by-step implementation guide for configuring **Datadog Cloud Cost Management (CCM)** for the customer's Microsoft Azure environment.

The existing Azure account integration with Datadog has been completed. The next phase is to configure Azure billing exports, grant Datadog access to the exported cost data, complete the CCM configuration, and validate cost data ingestion.

This document has been prepared by **Airowire Networks Pvt. Ltd.**, acting as a **Datadog Advanced Partner**.

The implementation covers:

- Azure billing scope validation
- Azure Cost Management exports
- Actual cost export configuration
- Amortized cost export configuration
- Azure Blob Storage configuration
- Datadog App Registration permissions
- Datadog CCM account configuration
- Cost data ingestion validation
- Troubleshooting
- Customer responsibilities
- Airowire implementation responsibilities
- Final validation and handover

> **Note:** Azure integration and Cloud Cost Management are separate configurations. Completing the Azure integration does not automatically enable CCM cost data ingestion.

---

## 2. Scope

| Area | Scope |
|---|---|
| Existing Azure Integration | Completed |
| Azure Billing Scope Validation | Included |
| Azure Cost Management Exports | Included |
| Actual Cost Export | Included |
| Amortized Cost Export | Included |
| Azure Blob Storage | Included |
| Datadog App Registration Permissions | Included |
| Datadog CCM Configuration | Included |
| Cost Data Validation | Included |
| Troubleshooting | Included |
| CCM Billing and Usage Analysis | Included |
| Customer Knowledge Transfer | Included |

---

## 3. Executive Summary

The customer's Azure environment is already integrated with Datadog.

The next step is to configure **Datadog Cloud Cost Management (CCM)** to collect and analyze Azure billing data.

The implementation requires coordination between the customer Azure team and the Airowire implementation team.

### Implementation Approach

**Customer Azure Setup → Cost Export Configuration → Storage Permissions → Datadog CCM Setup → Data Validation → Handover**

### Key Activities

- Confirm the Azure billing agreement and billing scope.
- Identify the Azure Billing Account ID.
- Verify the required actual and amortized cost export types are supported.
- Create or validate the Azure Blob Storage destination.
- Configure the required cost exports.
- Assign the necessary Azure permissions to the Datadog App Registration.
- Share the billing and export details with Airowire.
- Complete the manual CCM configuration in Datadog.
- Validate actual and amortized cost data.

---

## 4. Architecture and Data Flow

```text
              Microsoft Azure Environment
                         |
                         v
                Azure Cost Management
                         |
              +----------+----------+
              |                     |
              v                     v
        Actual Cost Export    Amortized Cost Export
              |                     |
              +----------+----------+
                         |
                         v
                 Azure Blob Storage
                         |
                         v
              Datadog Azure App Access
                         |
                         v
             Datadog Cloud Cost Management
                         |
                         v
                Azure Cost Analysis
                         |
                         v
               Datadog Dashboards
```

The Azure team configures the billing exports and storage permissions. The Airowire implementation team then completes the CCM setup in Datadog and validates the imported data.

---

## 5. Roles and Responsibilities

| Activity | Customer Azure Team | Airowire Implementation Team |
|---|---|---|
| Confirm billing agreement | Responsible | Assist if required |
| Confirm Billing Account ID | Responsible | Validate |
| Identify billing scope | Responsible | Validate |
| Create Azure Storage resources | Responsible | Guide if required |
| Configure cost exports | Responsible | Guide if required |
| Run and validate exports | Responsible | Verify configuration details |
| Assign Azure permissions | Responsible | Provide required role details |
| Share export information | Responsible | Receive and validate |
| Configure CCM in Datadog | Provide required information | Responsible |
| Validate cost ingestion | Assist with Azure-side checks | Responsible |
| Troubleshoot missing data | Assist with Azure configuration | Investigate Datadog configuration |
| Final handover | Participate | Responsible |

---

# PART A — CUSTOMER AZURE CONFIGURATION

## 6. Step 1: Confirm the Azure Billing Account

**Responsible:** Customer Azure Administrator / FinOps Team

### Procedure

1. Sign in to the Azure Portal.

   https://portal.azure.com

2. Navigate to **Cost Management + Billing**.
3. Open the appropriate billing account.
4. Identify the billing agreement type.
5. Record the Billing Account ID.
6. Confirm which subscriptions or resource groups should be included in CCM.
7. Verify that the selected billing scope supports the required cost exports.

### Billing Agreement Types

| Agreement Type | Required Action |
|---|---|
| Microsoft Customer Agreement (MCA) | Verify support for the required export datasets at the selected billing scope |
| Enterprise Agreement (EA) | Verify available export types and permissions |
| Pay-As-You-Go (PAYG) | Confirm compatibility before proceeding; usage-details exports alone may not satisfy CCM requirements |

### Information Required

| Information | Customer Response |
|---|---|
| Billing Account ID | To be provided |
| Billing Agreement Type | To be provided |
| CCM Scope | To be confirmed |
| Subscription ID(s) | To be provided, where applicable |
| Required Export Types Supported | Yes / No |

**Expected Result:** The billing account, scope, and export compatibility are confirmed.

> **Important:** Do not proceed with the export configuration until the customer confirms that the required actual and amortized cost datasets are supported.

---

## 7. Step 2: Verify Azure Storage Resources

**Responsible:** Customer Azure Administrator

Azure Blob Storage is used to store the billing export files that Datadog will read.

### Procedure

1. Open the Azure Portal.
2. Search for **Storage accounts**.
3. Identify the Storage Account intended for CCM exports.
4. Open the Storage Account.
5. Navigate to **Data storage → Containers**.
6. Check whether a container already exists for cost exports.
7. Identify the container and directory intended for the actual and amortized exports.
8. Confirm that the customer can use the existing resources or obtain approval to create new ones.

If the required resources do not exist, the customer must create or approve their creation.

### Information Required

| Field | Description |
|---|---|
| Storage Account Name | Name of the Azure Storage Account |
| Storage Container Name | Container holding billing export files |
| Storage Directory | Directory or export path |
| Azure Subscription | Subscription containing the storage resources |
| Resource Group | Resource group containing the storage resources |

**Expected Result:** The Azure Storage destination is available and ready for cost export configuration.

---

## 8. Step 3: Configure Azure Cost Management Exports

**Responsible:** Customer Azure Administrator / FinOps Team

The customer must configure the required cost exports before the Datadog CCM integration can be completed.

### 8.1 Open the Exports Page

1. Sign in to the Azure Portal.
2. Open **Cost Management + Billing**.
3. Navigate to **Cost Management → Exports**.
4. Select the appropriate billing scope.
5. Review the existing export configurations.

If suitable exports already exist, verify their settings rather than creating duplicate exports.

### 8.2 Configure the Required Export Datasets

1. Select the option to create or schedule an export.
2. Select the supported **Cost and usage (actual + amortized)** export template, if available at the selected billing scope.
3. Configure the actual and amortized cost datasets required by Datadog.
4. Set the export frequency to **Daily export of month-to-date costs**.
5. Confirm that the export dataset version is supported by Datadog.
6. Provide an appropriate export prefix if required.
7. Configure Azure Blob Storage as the destination.

### 8.3 Configure the Export Destination

For each required export:

1. Select the destination Storage Account.
2. Select the Storage Container.
3. Enter the required export directory or path.
4. Choose a supported file format.
5. Choose a supported compression option.
6. Enable **File partitioning**.
7. Ensure **Overwrite data is disabled**.
8. Review the export configuration.
9. Save the export.

### Recommended Export Settings

| Setting | Configuration |
|---|---|
| Export Frequency | Daily |
| Cost Period | Month-to-date |
| Export Datasets | Actual and amortized, as supported |
| Destination | Azure Blob Storage |
| File Partitioning | Enabled |
| Overwrite Data | Disabled |
| File Format | Supported CSV or Parquet format |
| Compression | Supported compression option |

For the supported export formats, compression settings, dataset versions, and other requirements, follow the current Datadog Azure CCM documentation.

**Expected Result:** The required cost exports are configured and ready to run.

---

## 9. Step 4: Run and Validate the Cost Exports

**Responsible:** Customer Azure Administrator

Both required cost datasets must be available in Azure Blob Storage before the Datadog setup is finalized.

### Procedure

1. Return to **Cost Management → Exports**.
2. Open the actual cost export.
3. Select **Run now**, if available.
4. Wait for the export job to finish.
5. Confirm that the actual cost export completed successfully.
6. Repeat the process for the amortized cost export.
7. Open the relevant Azure Storage Account.
8. Navigate to the configured container.
9. Verify that the expected files are present in the configured directory.
10. Record the exact export names and directory paths.

### Validation Checklist

| Validation Item | Status |
|---|---|
| Actual Cost Export Configured | Pending |
| Actual Cost Export Executed | Pending |
| Actual Cost Files Available | Pending |
| Amortized Cost Export Configured | Pending |
| Amortized Cost Export Executed | Pending |
| Amortized Cost Files Available | Pending |
| Export Names Recorded | Pending |
| Directory Paths Recorded | Pending |

**Expected Result:** Both exports have completed successfully and the expected billing files are available in Azure Blob Storage.

---

## 10. Step 5: Assign Datadog Storage Permissions

**Responsible:** Customer Azure Administrator

The Datadog Azure App Registration must have permission to read the billing export files.

### 10.1 Identify the Datadog App Registration

1. Open the Azure Portal.
2. Navigate to **Microsoft Entra ID**.
3. Open **App registrations**.
4. Identify the application associated with the existing Datadog Azure integration.
5. Confirm the correct application with the Datadog implementation team.

Do not create a new App Registration unless required by the implementation design.

### 10.2 Assign Storage Blob Data Reader

1. Open the relevant Storage Account.
2. Navigate to **Data storage → Containers**.
3. Open the container containing the billing export files.
4. Select **Access Control (IAM)**.
5. Select **Add → Add role assignment**.
6. Search for the role **Storage Blob Data Reader**.
7. Select the role.
8. Proceed to the member selection screen.
9. Select the appropriate service principal or application member option.
10. Search for the confirmed Datadog App Registration.
11. Select the correct application.
12. Select **Review + assign**.
13. Verify that the role assignment is created successfully.

Repeat the assignment if the actual and amortized exports are stored in different containers.

### 10.3 Assign Additional Cost Management Permissions Where Required

For subscription or resource-group scope, follow the current Datadog setup guide to determine whether **Cost Management Reader** must be assigned at the appropriate subscription scope.

For billing-account scope, follow the billing-specific permissions documented by Datadog.

### Permission Summary

| Permission | Purpose | Required Action |
|---|---|---|
| Storage Blob Data Reader | Allows Datadog to read cost export files | Assign at the appropriate storage scope |
| Cost Management Reader | Supports cost-management access where required | Assign at the documented scope when applicable |

**Expected Result:** The Datadog App Registration has the required access to the export files and any additional required cost-management scope.

> **Security Note:** Do not share client secrets, passwords, or other credentials through email or Teams. The required configuration should use the existing approved Datadog integration identity wherever possible.

---

## 11. Step 6: Share Azure CCM Details with Airowire

**Responsible:** Customer Azure Administrator

After completing the Azure-side configuration, share the following information with the Airowire implementation team.

| No. | Required Information | Customer Response |
|---:|---|---|
| 1 | Billing Account ID | To be provided |
| 2 | Billing Agreement Type | To be provided |
| 3 | CCM Scope | To be confirmed |
| 4 | Subscription ID(s), if applicable | To be provided |
| 5 | Storage Account Name | To be provided |
| 6 | Storage Container Name | To be provided |
| 7 | Actual Export Directory | To be provided |
| 8 | Actual Export Name | To be provided |
| 9 | Amortized Export Directory | To be provided |
| 10 | Amortized Export Name | To be provided |
| 11 | Actual Export Status | Successful / Pending |
| 12 | Amortized Export Status | Successful / Pending |
| 13 | Storage Blob Data Reader Assignment | Completed / Pending |
| 14 | Additional Required Permissions | Completed / Pending |

**Expected Result:** Airowire receives the information required to configure Azure CCM in Datadog.

---

# PART B — DATADOG CCM CONFIGURATION

## 12. Step 7: Open the Azure CCM Setup in Datadog

**Responsible:** Airowire Implementation Team

Once the customer confirms that the Azure exports and permissions are ready, proceed with the Datadog configuration.

### Procedure

1. Sign in to the correct Datadog organization.
2. Navigate to the Cloud Cost Management setup.
3. Open the Azure account configuration.
4. Select the option to add an Azure account for CCM.
5. Select **Manually**, following the configuration workflow shown in the Datadog screenshots.
6. Select the appropriate **Scope Type**.
7. Use **Billing Account** if that is the agreed and validated billing scope.

**Expected Result:** The manual Azure CCM configuration form is ready for the customer's billing and storage details.

---

## 13. Step 8: Configure Billing Account Details

**Responsible:** Airowire Implementation Team

1. Obtain the confirmed Billing Account ID from the customer.
2. Enter the Billing Account ID in the Datadog form.
3. Verify that the ID corresponds to the correct customer billing account.
4. Confirm that the selected scope matches the customer's agreed configuration.

**Expected Result:** The correct billing account is selected for CCM.

---

## 14. Step 9: Configure Actual Bill Details

**Responsible:** Airowire Implementation Team

In the **ACTUAL BILL** section, enter the details provided by the customer.

| Datadog Field | Value |
|---|---|
| Storage Account | Customer's Azure Storage Account name |
| Storage Container | Container containing actual cost files |
| Storage Directory | Actual export directory or path |
| Export Name | Exact actual cost export name |

### Procedure

1. Enter the Storage Account name.
2. Enter the Storage Container name.
3. Enter the actual cost export directory.
4. Enter the exact actual cost export name.
5. Verify each value against the customer-provided details.

**Expected Result:** Datadog is configured with the location of the actual cost export.

---

## 15. Step 10: Configure Amortized Bill Details

**Responsible:** Airowire Implementation Team

In the **AMORTIZED BILL** section, enter the amortized export details.

| Datadog Field | Value |
|---|---|
| Storage Account | Storage Account containing amortized cost files |
| Storage Container | Container containing amortized cost files |
| Storage Directory | Amortized export directory or path |
| Export Name | Exact amortized cost export name |

### Procedure

1. Enter the Storage Account name.
2. Enter the Storage Container name.
3. Enter the amortized export directory.
4. Enter the exact amortized cost export name.
5. Verify each value against the customer-provided details.

If both exports use the same Storage Account and container, enter the same values in both sections while preserving the correct export paths and names.

**Expected Result:** Datadog is configured with the location of the amortized cost export.

---

## 16. Step 11: Submit the Datadog CCM Configuration

**Responsible:** Airowire Implementation Team

1. Review the Billing Account ID.
2. Verify the actual cost export details.
3. Verify the amortized cost export details.
4. Confirm that the required Azure permissions have been assigned.
5. Review the configuration for missing or incorrect values.
6. Select **Add Account**.
7. Review any validation messages returned by Datadog.
8. Resolve errors before proceeding.

If the form reports an access or permission error, coordinate with the customer Azure administrator to verify the application identity and role assignments.

**Expected Result:** The Azure CCM account configuration is accepted by Datadog.

---

## 17. Step 12: Validate Azure Cost Data in Datadog

**Responsible:** Airowire Implementation Team, with Customer Support

After the configuration has been accepted:

1. Open Datadog Cloud Cost Management.
2. Navigate to the available cost explorer or Azure cost views.
3. Filter for the configured Azure billing account or subscriptions.
4. Verify whether actual cost data is available.
5. Verify whether amortized cost data is available.
6. Review the reporting period and billing currency.
7. Compare the imported cost data with the Azure export files.
8. Investigate missing data, access errors, or unexpected cost differences.
9. Record the validation results.

### Validation Checklist

| Validation Item | Status |
|---|---|
| Azure CCM Account Added | Pending |
| Actual Cost Data Visible | Pending |
| Amortized Cost Data Visible | Pending |
| Billing Scope Correct | Pending |
| Reporting Period Verified | Pending |
| Currency Verified | Pending |
| Export Data Compared | Pending |
| Errors Investigated | Pending |

**Expected Result:** Azure cost data is available in Datadog and is consistent with the configured billing exports, allowing for documented ingestion delays and billing adjustments.

> **Note:** Initial cost data ingestion and stabilization may take time. Follow the current Datadog documentation for expected processing times before treating a delay as a failure.

---

## 18. Troubleshooting Guide

| Issue | Possible Cause | Recommended Action |
|---|---|---|
| Billing account is not accepted | Incorrect ID or unsupported scope | Verify the billing ID and supported scope |
| Required export type is unavailable | Billing agreement or scope limitation | Confirm compatibility with the Azure FinOps team |
| Actual cost data is missing | Export failed or incorrect path | Verify export status, files, and actual export details |
| Amortized cost data is missing | Export failed or incorrect configuration | Verify the amortized export and directory |
| Datadog cannot read the files | Missing or incorrect permissions | Verify Storage Blob Data Reader and application identity |
| CCM configuration fails | Incorrect storage or export details | Validate all values against Azure |
| Cost data is delayed | Export or ingestion processing delay | Check Azure execution status and allow the documented processing time |
| Cost values differ | Different reporting periods, currencies, or cost definitions | Compare matching periods and actual versus amortized cost data |

---

## 19. Final Implementation Checklist

### Customer / Azure Team

- [ ] Billing agreement and scope confirmed.
- [ ] Billing Account ID shared.
- [ ] Subscription IDs shared where applicable.
- [ ] Storage Account and container confirmed.
- [ ] Actual cost export configured.
- [ ] Amortized cost export configured.
- [ ] Both exports executed successfully.
- [ ] Export files verified in Azure Blob Storage.
- [ ] Storage Blob Data Reader role assigned.
- [ ] Additional required permissions assigned.
- [ ] Export names and paths shared with Airowire.

### Airowire / Datadog Team

- [ ] Azure CCM setup opened in Datadog.
- [ ] Correct billing scope selected.
- [ ] Billing Account ID entered.
- [ ] Actual Bill details configured.
- [ ] Amortized Bill details configured.
- [ ] CCM account submitted successfully.
- [ ] Actual cost data validated.
- [ ] Amortized cost data validated.
- [ ] Any errors investigated.
- [ ] Customer informed of completion status.
- [ ] Final configuration documented.

---

## 20. Customer Communication Template

**Subject: Azure Cloud Cost Management (CCM) – Configuration Prerequisites**

Hi Anil and Anoop,

As the Azure account integration with Datadog has been completed, we are proceeding with the next phase: configuring Cloud Cost Management (CCM).

To complete the configuration, we request your support with the following Azure-side activities:

1. Confirm the Azure billing agreement type and Billing Account ID.
2. Verify the availability of the required actual and amortized cost export types.
3. Create or validate the required cost exports.
4. Configure the Azure Blob Storage destination.
5. Run both exports and confirm that the files are available.
6. Assign the required permissions to the Datadog Azure App Registration.
7. Share the billing scope, storage details, export names, directory paths, and permission confirmation with us.

Once these activities are completed, the Airowire team will configure CCM in Datadog and validate the Azure cost data ingestion.

Please refer to the attached step-by-step implementation guide for detailed instructions.

Thank you.

---

## 21. Official Documentation

- [Datadog Azure Cloud Cost Management Setup](https://docs.datadoghq.com/cloud_cost_management/setup/azure/)
- [Microsoft Azure Cost Management Exports](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports)

---

## 22. Implementation Status

| Activity | Current Status |
|---|---|
| Existing Azure Integration | Completed |
| Billing Scope Confirmation | Pending |
| Azure Cost Exports | Pending Validation |
| Azure Storage Permissions | Pending Validation |
| Datadog CCM Configuration | Pending |
| Cost Data Validation | Pending |
| Final Handover | Pending |

---

## 23. Conclusion

The existing Azure integration provides the foundation for Datadog's Azure monitoring. Cloud Cost Management requires a separate configuration to ingest and analyze Azure billing data.

The implementation will be completed through coordinated activities between the customer Azure team and Airowire.

The recommended approach is:

**Confirm Billing Scope → Configure Exports → Grant Access → Configure Datadog CCM → Validate Cost Data → Document and Handover**

Airowire will guide the customer through the required Azure prerequisites and complete the Datadog-side configuration once the required information and permissions are available.

---

## 24. Contact

<div align="center">

**Airowire Networks Pvt. Ltd.**

**Datadog Advanced Partner**

Datadog Onboarding | Cloud Cost Management | Infrastructure Monitoring | Optimization | Implementation | Support


**Dr. Shivanand Poojara** — shivanand@airowire.com
**Anoop Ravikumar Biradar** - Anoop@airowire.com
**Anil Kumar** - Anil@airowire.com
**Mohammed Saqlain** - Mohammed@airowire.com

</div>

