<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# Solution Document for Integrating Okta System Logs with Datadog

**(Datadog Okta Integration using OAuth API Service Integration)**

---

# Purpose of the Document

This document defines the standardized procedure for integrating Okta System Logs with Datadog using the official OAuth API Service Integration.

The integration enables centralized monitoring of authentication events, user activities, administrator actions, and security-related logs from Okta within Datadog.

The solution provides:

- Secure OAuth-based integration
- Automatic collection of Okta System Logs
- Centralized log management
- Authentication monitoring
- Administrative activity monitoring
- Security dashboard visualization
- Cloud SIEM compatibility

---

# Scope

## In Scope

- Okta OAuth API Service Integration
- Datadog Okta Integration
- Okta System Log collection
- Dashboard validation
- Log Explorer validation
- Live Tail validation

## Out of Scope

- SAML SSO Configuration
- SCIM User Provisioning
- Lifecycle Management
- Identity Federation

---

# Prerequisites

## Okta Requirements

- Okta Administrator Access
- API Service Integrations enabled
- Okta Workforce Identity Cloud

## Datadog Requirements

- Datadog Administrator Access
- Integrations Management permission

## Network Requirements

Outbound HTTPS connectivity between Datadog and Okta API endpoints.

---

# Overview of the Solution

Datadog integrates with Okta using OAuth authentication.

Instead of installing an agent inside Okta, Datadog securely connects to the Okta System Log API and periodically retrieves audit events.

These logs become searchable inside Datadog and populate the built-in Okta Security Dashboard.

---

# Architecture

```
                 +------------------+
                 |      Okta        |
                 |  System Log API  |
                 +--------+---------+
                          |
                     OAuth 2.0
                          |
                          ▼
              +----------------------+
              | Datadog Integration  |
              +----------+-----------+
                         |
               Retrieves System Logs
                         |
                         ▼
                Datadog Log Explorer
                         |
                         ▼
           Okta Security Overview Dashboard
                         |
                         ▼
                  Datadog Cloud SIEM
```

---

# Functional Components

| Component | Description |
|------------|-------------|
| Okta System Log | Generates authentication and audit events |
| API Service Integration | OAuth authentication between Okta and Datadog |
| Datadog Integration | Retrieves System Log events |
| Log Explorer | Search and analyze Okta logs |
| Live Tail | Real-time event monitoring |
| Security Dashboard | Visualizes authentication and security events |
| Cloud SIEM | Detects suspicious activities |

---

# Deployment Procedure

---

# Step 1 – Install Datadog API Service Integration

Login to the Okta Admin Console.

Navigate to:

```
Applications

↓

API Service Integrations
```

Click

```
Add Integration
```

Search for

```
Datadog
```

Select

```
Datadog
```

Click

```
Install
```

Verify

```
Status = Active
```

<p align="center"><img src="/images/ot1.png" width="600"/></p>




---

# Step 2 – Verify API Permissions

Navigate to

```
Applications

↓

API Service Integrations

↓

Datadog
```

Open

```
Okta API Scopes
```

Verify the following permission is granted:

```
Systems

↓

Read about system log entries
```

This permission allows Datadog to retrieve Okta System Logs.

<p align="center"><img src="/images/ot2.png" width="600"/></p>


---

# Step 3 – Obtain OAuth Credentials

Open

```
General
```

Copy the following values:

- Okta Domain
- Client ID
- Client Secret

Example

```
Okta Domain

https://trial-7214856.okta.com
```

<p align="center"><img src="/images/ot3.png" width="600"/></p>


---

# Step 4 – Configure Datadog Integration

Login to Datadog.

Navigate to

```
Integrations

↓

Okta

↓

Configure
```

Fill in the following details.

| Field | Value |
|--------|-------|
| Account Name | Airowire_Okta |
| Authorization Method | OAuth |
| Domain | https://trial-7214856.okta.com |
| Client ID | From Okta |
| Client Secret | From Okta |

Click

```
Save
```

Wait for the integration to be installed successfully.

<p align="center"><img src="/images/ot4.png" width="600"/></p>


---

# Step 5 – Wait for Synchronization

Allow approximately

```
5–10 Minutes
```

for Datadog to establish the OAuth connection and retrieve System Logs.

---

# Step 6 – Generate Test Events

Generate activity inside Okta.

Recommended actions include:

- User Login
- User Logout
- Open Admin Console
- Reset Password
- Assign Application
- Add User
- Remove User
- MFA Authentication
- Unlock User
- Change Group Membership

These activities generate System Log events.

---

# Step 7 – Validate Log Collection

Navigate to

```
Logs

↓

Live Tail
```

Search

```
source:okta
```

Expected Result

- Logs appear immediately.
- Authentication events are visible.
- User activities are collected.
- Administrator actions are collected.

Example Event Types

```
user.session.start

user.session.end

user.lifecycle.create

user.account.lock

user.mfa.factor.verify

app.oauth2.token.grant.access_token

<p align="center"><img src="/images/ot5.png" width="600"/></p>


---

# Step 8 – Validate Log Explorer

Navigate to

```
Logs

↓

Log Explorer
```

Search

```
source:okta
```

Verify

- Event Name
- Actor
- Target
- Authentication Provider
- IP Address
- Event Outcome


---

# Step 9 – Validate Dashboard

Navigate to

```
Dashboards

↓

Okta Security Overview
```

Verify the following widgets.

- Okta Log Overview
- Frequent Events
- Infrequent Events
- User Activity
- Administrator Activity
- Cloud SIEM
- Security Signals

<p align="center"><img src="/images/ot6.png" width="600"/></p>

---

# Understanding Dashboard Widgets

Some dashboard widgets populate only when specific events occur.

| Widget | Required Event |
|----------|----------------|
| User Account Lockout | user.account.lock |
| MFA Rejected | user.authentication.failed |
| Password Reset | user.account.reset_password |
| User Created | user.lifecycle.create |
| Group Assignment | group.user_membership.add |
| Admin Console Access | system.admin_console.login |

If those activities have not occurred, the widget will correctly display

```
No Data
```

This is expected behavior.

---

# Validation Queries

General Logs

```
source:okta
```

Login Events

```
source:okta evt.name:user.session.start
```

Logout Events

```
source:okta evt.name:user.session.end
```

Password Reset

```
source:okta evt.name:user.account.reset_password
```

User Created

```
source:okta evt.name:user.lifecycle.create
```

Locked User

```
source:okta evt.name:user.account.lock
```

Failed Authentication

```
source:okta evt.outcome:FAILURE
```

---

# Operational Validation Checklist

| Validation | Status |
|------------|--------|
| Datadog API Service Integration Installed | ✅ |
| OAuth Credentials Generated | ✅ |
| Okta Domain Configured | ✅ |
| Client ID Configured | ✅ |
| Client Secret Configured | ✅ |
| OAuth Connection Successful | ✅ |
| source:okta Returns Logs | ✅ |
| Live Tail Shows Events | ✅ |
| Log Explorer Displays Events | ✅ |
| Dashboard Accessible | ✅ |

---

# Troubleshooting

## No Logs Appearing

Verify:

- OAuth credentials are correct.
- Okta Domain is correct.
- Integration is Active.
- Wait at least 10 minutes.

---

## Dashboard Shows No Data

Generate additional Okta events.

Examples

- Login
- Logout
- Password Reset
- User Creation
- MFA Authentication

Refresh the dashboard.

---

## User Email Shows Client ID

This occurs when OAuth token events are being collected instead of actual user login events.

Generate a real user login.

Example

```
Login using an Okta user account.
```

The dashboard will automatically populate user details.

---

## Frequent Events Only Showing OAuth Token Events

This is expected if only the Datadog OAuth application has authenticated.

Generate additional user activity to populate other dashboard widgets.

---

# Observations

During implementation the following observations were made.

- OAuth integration completed successfully.
- System Logs were successfully collected.
- Live Tail confirmed ingestion.
- Dashboard populated after authentication events.
- Widgets requiring specific events remained empty until those events occurred.
- No Datadog Agent installation was required.

---

# Benefits

The integration provides

- Centralized Okta log management
- Authentication monitoring
- Administrator auditing
- Security visibility
- Compliance reporting
- Cloud SIEM integration
- Built-in security dashboards
- Searchable audit logs

---

# Final Outcome

The Datadog Okta Integration was successfully configured using OAuth API Service Integration.

Datadog now securely retrieves Okta System Logs and provides centralized visibility into authentication events, administrative activities, security monitoring, and audit logs.

The integration is fully operational and ready for production monitoring.

---

# Contact

For more information regarding this document, please contact Airowire Solutions.

Patrick Schmidt

patrick@airowire.com

Piyush Choudhary

piyush@airowire.com

Dr. Shivanand Poojara

shivanand@airowire.com
