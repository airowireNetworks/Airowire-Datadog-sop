
<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:25px;">
  <img src="/images/airowire-logo.png" width="220">
  <img src="/images/datadog.png" width="130">
</div>

# Datadog Custom Role Configuration & Google Workspace SAML SSO

---

## 1. Document Information

| Field | Details |
|---|---|
| Client | Landmark |
| Prepared By | Airowire Networks Pvt. Ltd. |
| Platform | Datadog |
| Features | Custom Roles and Role-Based Access Control (RBAC) |
| Authentication | Google Workspace SAML SSO |
| Implementation | Proposed Use Cases and Access Model |
| Document Status | Proposed for Client Review and Approval |

## 2. Overview

This document outlines Airowire's proposed approach for implementing Datadog Custom Roles and Google Workspace SAML SSO for Landmark.

The objective is to establish structured access management across different teams by assigning appropriate Datadog permissions based on user responsibilities.

Airowire has identified five proposed Custom Role use cases for Landmark.

The proposed implementation includes:

1. Review proposed Custom Role use cases.
2. Define the required permissions.
3. Create approved Custom Roles in Datadog.
4. Configure Google Workspace SAML SSO.
5. Configure SAML Group Mappings.
6. Validate authentication and role assignments.

**Architecture:**

```text
       Google Workspace
              |
              v
      SAML Authentication
              |
              v
           Datadog
              |
              v
       SAML Group Mapping
              |
              v
      Custom Role Assignment
              |
       +------+------+------+
       |      |      |      |
       v      v      v      v
     Infra   Dev    NOC  Security
              |
              v
         Management
```

## 3. Airowire – Proposed Custom Role Use Cases

Airowire recommends the following five Custom Role use cases based on Landmark's monitoring and operational requirements.

### 3.1 Use Case 1 – Infrastructure Monitoring Engineer

**Proposed by Airowire**

**Purpose:** Enable infrastructure engineers to monitor infrastructure resources, Kubernetes clusters, containers and system performance.

**Recommended Access:**

- Infrastructure and host monitoring.
- Kubernetes and container metrics.
- Infrastructure dashboards.
- Metrics and events.
- Monitor viewing and approved monitor management.
- Network Monitoring visibility.

**Access Restrictions:**

- No user management access.
- No billing administration.
- No unrestricted organization settings access.

### 3.2 Use Case 2 – Application Developer

**Proposed by Airowire**

**Purpose:** Enable application developers to investigate application performance and troubleshoot application-related issues.

**Recommended Access:**

- APM services and distributed traces.
- Application performance metrics.
- Application logs.
- Service dashboards.
- Application monitors.

**Access Restrictions:**

- No user administration.
- No billing access.
- No unrestricted organization administration.

### 3.3 Use Case 3 – NOC / Operations Engineer

**Proposed by Airowire**

**Purpose:** Enable NOC and operations teams to monitor infrastructure health, investigate alerts and respond to operational incidents.

**Recommended Access:**

- Infrastructure dashboards.
- Monitors and alerts.
- Logs and events.
- Network Monitoring.
- Incident management.
- Approved monitor configuration.

**Access Restrictions:**

- No billing administration.
- No user management.
- No unrestricted organization administration.

### 3.4 Use Case 4 – Security Analyst

**Proposed by Airowire**

**Purpose:** Enable security teams to investigate security events and monitor security-related activities through Datadog Cloud SIEM.

**Recommended Access:**

- Cloud SIEM security signals.
- Security dashboards.
- Security events.
- Relevant security findings.
- Approved security monitoring resources.

**Access Restrictions:**

- No unrestricted organization administration.
- No billing administration.
- No unnecessary infrastructure configuration permissions.

### 3.5 Use Case 5 – Management / Executive Viewer

**Proposed by Airowire**

**Purpose:** Provide management and stakeholders with visibility into infrastructure health, application performance and monitoring reports without allowing configuration changes.

**Recommended Access:**

- Infrastructure dashboards.
- APM dashboards.
- Monitor and SLO visibility.
- Approved logs and monitoring reports.

**Access Restrictions:**

- No dashboard modifications.
- No monitor modifications.
- No user management.
- No billing administration.

## 4. Airowire – Proposed Role and Permission Matrix

| Proposed Custom Role | Recommended Access | Permission Level |
|---|---|---|
| Infrastructure Monitoring Engineer | Hosts, Kubernetes, Containers, Metrics | View + Selected Management |
| Application Developer | APM, Traces, Application Logs | View |
| NOC / Operations Engineer | Infrastructure, Monitors, Events | View + Selected Management |
| Security Analyst | Cloud SIEM, Security Events | View |
| Management / Executive Viewer | Dashboards, SLOs, Reports | Read Only |

**Note:** The above use cases and permission levels are recommendations from Airowire and are subject to Landmark's review and approval.

## 5. Prerequisites

Before starting the implementation, ensure the following requirements are met:

- Datadog Administrator access.
- Google Workspace Super Administrator access.
- SAML SSO enabled in the Datadog organization.
- Access to Google Admin Console.
- Required Google Workspace user groups created.
- Proposed Custom Roles reviewed and approved by Landmark.

## 6. Step 1 – Create Custom Roles in Datadog

1. Log in to the Datadog organization.
2. Navigate to **Organization Settings**.
3. Open **Roles**.
4. Click **New Role**.
5. Enter the required Custom Role name.
6. Add a description explaining the role's purpose.
7. Select permissions based on the approved use case.
8. Review the selected permissions.
9. Click **Save**.

**Example – Infrastructure Monitoring Engineer**

| Permission Area | Proposed Access |
|---|---|
| Infrastructure | View |
| Kubernetes / Containers | View |
| Dashboards | View |
| Metrics | View |
| Monitors | View + Approved Management |
| User Management | No Access |
| Billing | No Access |

Repeat the process for the other approved Custom Roles.

**Expected Result:** Custom Roles should be created with permissions according to the approved access model.

## 7. Step 2 – Configure SAML on Datadog

1. Navigate to **Organization Settings → SAML**.
2. Verify whether SAML authentication is enabled.
3. If SAML is not enabled, contact Datadog Support.
4. Enable IdP-Initiated SSO if required.
5. Collect the following Service Provider details:

   - Assertion Consumer Service (ACS) URL.
   - Entity ID.
   - Single Sign-On login URL.

6. Download the latest Datadog Service Provider metadata.

Keep these details available for Google Workspace configuration.

## 8. Step 3 – Create a SAML Application in Google Workspace

1. Log in to Google Admin Console.
2. Navigate to **Apps → Web and mobile apps**.
3. Click **Add App**.
4. Select **Add custom SAML app**.
5. Enter the application name as **Datadog**.
6. Configure the Service Provider details.

| Google SAML Field | Configuration |
|---|---|
| ACS URL | Datadog ACS URL |
| Entity ID | Datadog Entity ID |
| Name ID Format | EMAIL |
| Name ID | Basic Information → Primary Email |
| Signed Response | Configure according to Datadog integration requirements |

Configure the required user attribute mappings:

| Google Directory Attribute | Application Attribute |
|---|---|
| Primary Email | email |
| First Name | firstName |
| Last Name | lastName |

7. Configure the required group membership attribute.
8. Save the application configuration.
9. Download Google Identity Provider metadata.

**Important:** SAML assertions must be signed. Verify the signing configuration against Datadog's integration requirements. Google Workspace group membership attributes must be explicitly configured and validated.

## 9. Step 4 – Configure Google Workspace SAML in Datadog

1. Return to the Datadog SAML configuration page.
2. Upload Google Workspace IdP metadata.
3. Save the configuration.
4. Verify that the metadata is accepted.
5. Confirm that the latest Datadog Service Provider metadata is configured in Google Workspace.

**Expected Result:** Google Workspace should be configured as the Identity Provider for Datadog SAML authentication.

## 10. Step 5 – Configure SAML Group Mappings

Navigate to:

**Organization Settings → SAML Group Mappings**

1. Capture and validate an actual SAML assertion.
2. Confirm the group membership attribute and values.
3. Enable Group Mappings after successful validation.
4. Click **New Mapping**.
5. Configure the SAML attribute key and value.
6. Select the corresponding Datadog Custom Role.
7. Save the mapping.

**Proposed Google Workspace Group Mapping:**

| Google Workspace Group | Proposed Datadog Custom Role |
|---|---|
| DD-Infrastructure | Infrastructure Monitoring Engineer |
| DD-Developers | Application Developer |
| DD-NOC | NOC / Operations Engineer |
| DD-Security | Security Analyst |
| DD-Management | Management / Executive Viewer |

**Note:** Group names and SAML attribute values are examples. Final mappings must match Landmark's Google Workspace configuration and actual SAML assertions.

## 11. Step 6 – Testing and Validation

After implementation, perform the following validation using representative user accounts.

| Test Case | Expected Result |
|---|---|
| Infrastructure user login | Infrastructure role assigned |
| Developer user login | Developer role assigned |
| NOC user login | NOC role assigned |
| Security user login | Security role assigned |
| Management user login | Read-only role assigned |
| Incorrect group attribute | Expected role is not assigned |
| Restricted feature access | Unauthorized actions are denied |

Verify:

- Successful Google Workspace SAML authentication.
- Correct user email and identity attributes.
- Correct group membership attribute.
- Appropriate Datadog role assignment.
- Access restrictions for each role.

**Expected Result:** Users should receive the appropriate Datadog permissions according to their assigned Google Workspace group.

## 12. Important Considerations

- Enable SAML Group Mappings only after validating SAML assertions.
- Just-in-time provisioning can create users during their first SSO login.
- Role mappings take priority over the JIT default role.
- Unmatched users may lose their assigned roles and SAML login access.
- Team mappings are provisioning-only and do not determine login authorization.
- SAML strict mode can disable password and Google OAuth login.
- Review external user access before enabling strict mode.
- Maintain an appropriate administrator recovery path.
- Datadog combines permissions from multiple assigned roles.
- Test all proposed roles before production rollout.

## 13. Airowire – Proposed Implementation Approach

Following Landmark's approval, Airowire proposes the following implementation activities:

1. Review and finalize the proposed Custom Role use cases with Landmark.
2. Confirm the required permissions for each team.
3. Create the approved Custom Roles in Datadog.
4. Configure permissions based on the approved access matrix.
5. Configure Google Workspace SAML SSO.
6. Configure group-based role mapping.
7. Assign the appropriate roles to users.
8. Perform SSO authentication and access validation.
9. Document the final implemented configuration.

## 14. Client Review and Approval

Airowire is sharing the proposed Custom Role use cases, recommended permission model and Google Workspace SAML SSO implementation approach for Landmark's review.

Landmark is requested to:

- Review and approve the proposed Custom Role use cases.
- Validate the recommended permissions.
- Confirm the required Google Workspace groups.
- Provide the necessary administrative access and configuration details.
- Identify any additional access requirements.
- Approve the proposed implementation approach before configuration begins.

## 15. Expected Outcome

Upon approval and implementation:

- Google Workspace users can authenticate into Datadog using SAML SSO.
- Custom Roles provide access according to team responsibilities.
- Google Workspace groups can map users to the appropriate Datadog roles.
- Infrastructure, APM, Logs, Monitors and Cloud SIEM access can be managed according to approved permissions.
- Unnecessary administrative privileges are minimized.
- Access management is standardized and aligned with Landmark's requirements.

## 16. Official References

- Datadog RBAC: https://docs.datadoghq.com/account_management/rbac/
- Datadog Google Workspace SAML: https://docs.datadoghq.com/account_management/saml/google/
- Datadog SAML Authentication: https://docs.datadoghq.com/account_management/saml/
- Datadog SAML Group Mapping: https://docs.datadoghq.com/account_management/saml/mapping/
- Google Workspace SAML Setup: https://support.google.com/a/answer/7553768

---

## 17. Contact

**Airowire Networks Pvt. Ltd.**

**Datadog Observability & Cloud SIEM Team**

**Dr. Shivanand Poojara**

Email: shivanand@airowire.com

---

**Prepared By:** Airowire Networks Pvt. Ltd.  
**Prepared For:** Landmark  
**Document Status:** Proposed for Client Review and Approval  
**Proposed Solution:** Datadog Custom Roles with Google Workspace SAML SSO

