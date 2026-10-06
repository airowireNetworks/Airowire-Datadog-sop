<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
Solution Document for Integrating Datadog with Microsoft Teams
</h1>

<p><strong>(Datadog Monitoring Alerts and Notifications through Microsoft Teams)</strong></p>

---

# 1. Document Information

| Item | Details |
|---|---|
| Document Title | Datadog Microsoft Teams Notification Integration |
| Organization | Airowire Networks Pvt. Ltd. |
| Monitoring Platform | Datadog |
| Notification Platform | Microsoft Teams |
| Integration Type | Datadog Alerts → Microsoft Teams |
| Environment | Production / Non-Production |
| Purpose | Centralized alert notification |
| Incident Management | Not in scope |
| Integration Status | Configured |
| Validation Status | End-to-End notification testing pending |

---

# 2. Purpose

The purpose of this document is to provide a standardized procedure for integrating **Datadog with Microsoft Teams** to deliver monitoring alerts and notifications directly to a designated Microsoft Teams channel.

This integration enables the monitoring team to receive Datadog alerts in Microsoft Teams without requiring users to continuously access the Datadog platform.

The solution is intended for **notification and alert visibility only**. Incident creation and incident management through Microsoft Teams are not part of this implementation.

---

# 3. Scope

This solution covers:

- Microsoft Teams application configuration
- Datadog Microsoft Teams integration
- Microsoft tenant authorization
- Teams Team and Channel mapping
- Creation of a Datadog Teams notification handle
- Configuration of Datadog monitor notifications
- Test notification validation
- Troubleshooting
- Operational and security recommendations

## Out of Scope

The following activities are not included:

- Incident management configuration
- Automated incident creation
- Incident lifecycle management
- Microsoft Teams workflow automation
- Custom Microsoft Teams bot development
- Automated remediation actions

---

# 4. Solution Overview

The implemented notification flow is:

    Datadog Monitor
           |
           v
    Datadog Alert/Event
           |
           v
    Microsoft Teams Integration
           |
           v
    Teams Notification Handle
           |
           v
    airowire Team
           |
           v
    Airwire Feeds Channel
           |
           v
    Monitoring Team receives notification

The integration provides a centralized communication path for Datadog monitoring alerts.

---

# 5. Prerequisites

Before configuring the integration, ensure the following prerequisites are available:

- Datadog administrative access
- Microsoft Teams administrative access or sufficient permissions to install the Datadog application
- Access to the required Microsoft Teams Team and Channel
- Datadog monitors configured for the required environment
- Appropriate notification permissions
- Internet connectivity between Datadog and Microsoft services

---

# 6. Current Microsoft Teams Configuration

The Datadog application has been added to Microsoft Teams.

## Microsoft Teams Configuration

| Configuration | Value |
|---|---|
| Microsoft Teams Application | Datadog |
| Team | airowire Team |
| Channel | Airwire Feeds |
| Notification Purpose | Datadog Monitoring Alerts |
| Incident Management | Not configured |

The **Datadog application** is installed in the required Microsoft Teams Team and Channel.

---

# 7. Install Datadog Application in Microsoft Teams

## Step 1: Open Microsoft Teams

Sign in to Microsoft Teams using an account with the required permissions.

## Step 2: Open Apps

Navigate to:

    Apps → Search

Search for:

    Datadog

Select the official **Datadog** application.

## Step 3: Add Datadog to the Required Team

Add the Datadog application to the required Microsoft Teams Team.

For this implementation:

    Team: airowire Team
    Channel: Airwire Feeds

Ensure that the application is available in the required Team/Channel.

---

# 8. Datadog Microsoft Teams Integration

## Step 1: Open Datadog

Log in to the Datadog organization.

Navigate to:

    Integrations → Microsoft Teams

## Step 2: Configure the Microsoft Tenant

Under the Microsoft Teams integration, configure the required Microsoft tenant.

The tenant-based integration establishes the connection between Datadog and Microsoft Teams.

Complete the Microsoft authorization process when prompted.

## Step 3: Verify Tenant Connection

After authorization, verify that the Microsoft tenant appears under the configured Tenants section.

The connected tenant should be displayed as an active/configured tenant.

---

# 9. Configure Microsoft Teams Notification Handle

The notification handle determines the destination where Datadog sends alerts.

## Step 1: Open the Configured Tenant

In:

    Integrations → Microsoft Teams

Open the configured Microsoft tenant.

## Step 2: Add a Handle

Select:

    Add Handle

Provide a meaningful handle name.

The configured handle for this implementation is:

    datadog-alerts

## Step 3: Select Team and Channel

Map the handle to the required Microsoft Teams destination.

Configured destination:

    Team: airowire Team
    Channel: Airwire Feeds

## Step 4: Save the Configuration

Save the handle configuration.

The final notification mapping is:

    Datadog
       |
       v
    @teams-datadog-alerts
       |
       v
    airowire Team
       |
       v
    Airwire Feeds

---

# 10. Datadog Notification Handle

The configured Datadog Teams notification handle is:

    @teams-datadog-alerts

This handle is used inside Datadog monitor notification messages.

For example:

    @teams-datadog-alerts

When a Datadog monitor triggers and contains this notification target, Datadog sends the notification to the configured Microsoft Teams channel.

---

# 11. Configure Datadog Monitor Notifications

Datadog monitors must be configured to send notifications to Microsoft Teams.

## Step 1: Open the Required Monitor

Navigate to:

    Monitors → Manage Monitors

Open the monitor for which Microsoft Teams notifications are required.

## Step 2: Edit the Notification Section

Locate the monitor notification/message section.

Add:

    @teams-datadog-alerts

to the notification message.

## Step 3: Add a Clear Alert Message

A recommended notification format is:

    Datadog Alert

    Monitor: <Monitor Name>
    Environment: <Environment>
    Severity: <Severity>
    Status: <Alert Status>
    Host/Service: <Host or Service>
    Message: <Alert Message>

    @teams-datadog-alerts

The exact monitor variables can be adjusted based on the Datadog monitor type.

---

# 12. Recommended Notification Format

For operational consistency, Datadog alerts should contain the following information wherever applicable:

| Field | Description |
|---|---|
| Monitor Name | Name of the Datadog monitor |
| Environment | Production / Non-Production |
| Severity | Alert severity |
| Status | Alert / Warning / Recovery |
| Service | Affected service |
| Host | Affected host, if applicable |
| Message | Description of the detected issue |
| Datadog Link | Link to investigate the alert |
| Teams Handle | @teams-datadog-alerts |

Example:

    Datadog Alert

    Monitor: High CPU Utilization
    Environment: Production
    Severity: Critical
    Status: Alert
    Host: <Host Name>
    Message: CPU utilization has exceeded the configured threshold.

    @teams-datadog-alerts

---

# 13. Notification Severity Recommendation

The following severity model is recommended for Teams notifications:

| Severity | Recommended Action |
|---|---|
| Critical | Immediate notification |
| High | Immediate notification |
| Warning | Notification based on operational requirement |
| Informational | Optional |
| Recovery | Notification recommended |

For production environments, Critical and High severity alerts should be prioritized.

---

# 14. Test Notification

After completing the configuration, an end-to-end notification test should be performed.

## Test Procedure

1. Select a suitable Datadog test monitor.
2. Open the monitor configuration.
3. Confirm that the following handle is present:

    @teams-datadog-alerts

4. Trigger the monitor using a controlled test condition.
5. Monitor the Microsoft Teams channel:

    airowire Team → Airwire Feeds

6. Confirm that the Datadog notification is received.
7. Validate that the notification contains the expected alert information.
8. Confirm that the Datadog monitor link is accessible.
9. If recovery notifications are configured, validate the recovery message as well.

## Current Test Status

    Configuration: Completed
    Teams Mapping: Completed
    Notification Handle: Configured
    End-to-End Test: Pending validation

The integration should not be marked fully validated until an actual Datadog notification is successfully received in the configured Microsoft Teams channel.

---

# 15. Validation Checklist

| Validation Item | Status |
|---|---|
| Datadog Teams integration enabled | Completed |
| Microsoft tenant connected | Completed |
| Datadog application installed in Teams | Completed |
| Team configured | Completed |
| Channel configured | Completed |
| Notification handle created | Completed |
| Handle mapped to correct Team | Completed |
| Handle mapped to correct Channel | Completed |
| Monitor notification configured | Pending / As Required |
| Test alert generated | Pending |
| Teams notification received | Pending |
| Recovery notification validated | Pending / As Required |

---

# 16. Troubleshooting

## Issue 1: Required Team Does Not Appear in Datadog

If the required Microsoft Teams Team does not appear during handle configuration:

1. Verify that the Datadog application has been added to the required Team.
2. Open the standard channel in Microsoft Teams.
3. Verify that the Datadog application is available.
4. Synchronize the Team if required.
5. Return to Datadog and refresh the Microsoft Teams integration configuration.

If the Team still does not appear, remove and re-add the Datadog application to the Team only after confirming that this will not affect other existing Teams integrations or connectors.

---

# 17. Troubleshooting: Notification Not Received

If the Teams notification is not received:

## Step 1: Verify Monitor Configuration

Confirm that the monitor contains:

    @teams-datadog-alerts

## Step 2: Verify Handle Configuration

Confirm:

    Handle: datadog-alerts
    Team: airowire Team
    Channel: Airwire Feeds

## Step 3: Verify Microsoft Teams Application

Confirm that the Datadog application is still installed and available in the Team.

## Step 4: Verify Monitor Status

Confirm that the monitor has actually transitioned into the configured alert state.

## Step 5: Review Datadog Monitor Events

Check the monitor event/activity information to determine whether the notification was generated successfully.

---

# 18. Security Considerations

The integration should follow the organization's existing access-control and security standards.

Recommended practices:

- Grant Datadog administrative permissions only to authorized users.
- Restrict Microsoft Teams administration to authorized administrators.
- Use dedicated Teams channels for operational notifications.
- Do not include passwords, API keys, tokens, or other secrets in monitor messages.
- Avoid exposing sensitive infrastructure information unnecessarily.
- Review Teams membership periodically.
- Review Datadog integration permissions periodically.
- Follow the organization's change-management process for modifications.

---

# 19. Operational Guidelines

The Microsoft Teams channel should be used primarily for monitoring notifications.

Recommended practices:

- Keep alert messages concise and actionable.
- Use consistent severity classifications.
- Avoid unnecessary informational alerts.
- Route only relevant monitors to the Teams channel.
- Review alert volume periodically.
- Tune noisy monitors to avoid notification fatigue.
- Ensure production-critical alerts are prioritized.
- Maintain a clear ownership model for alerts.

---

# 20. Alert Routing Recommendation

A recommended routing structure is:

    Production Critical Alerts
              |
              v
    @teams-datadog-alerts
              |
              v
    Airwire Feeds

For larger environments, separate Teams channels or notification handles can be introduced later for:

    Production
    Non-Production
    Infrastructure
    Applications
    Security
    Database
    Network

This should only be implemented if operational requirements justify separate routing.

---

# 21. Change Management

Any modification to the integration should follow the organization's change-management process.

Changes may include:

- Changing the Microsoft Teams Team
- Changing the Microsoft Teams Channel
- Changing the Datadog notification handle
- Adding or removing monitors
- Modifying alert severity
- Changing notification routing
- Changing Microsoft Teams permissions

All production changes should be validated after implementation.

---

# 22. Rollback Procedure

If the integration needs to be disabled:

## Option 1: Remove Monitor Notification Target

Remove:

    @teams-datadog-alerts

from the affected Datadog monitors.

This stops those monitors from sending notifications to Microsoft Teams.

## Option 2: Remove the Teams Handle

Remove or disable the configured Datadog Teams handle if the integration is no longer required.

## Option 3: Remove the Teams Application

If the integration is being permanently decommissioned, remove the Datadog application from the Microsoft Teams Team after confirming that it is not being used by other monitoring workflows.

---

# 23. Post-Change Validation

After any configuration change, validate the following:

- Datadog integration status
- Microsoft tenant connection
- Teams application availability
- Team mapping
- Channel mapping
- Notification handle
- Datadog monitor notification configuration
- Test alert
- Teams notification delivery

The change should be considered successful only after the required notification is received in Microsoft Teams.

---

# 24. Current Configuration Summary

| Component | Configuration |
|---|---|
| Monitoring Platform | Datadog |
| Notification Platform | Microsoft Teams |
| Teams Application | Datadog |
| Microsoft Tenant | AIROWIRE NETWORKS |
| Team | airowire Team |
| Channel | Airwire Feeds |
| Datadog Handle | datadog-alerts |
| Notification Target | @teams-datadog-alerts |
| Purpose | Datadog monitoring notifications |
| Incident Management | Not configured |
| End-to-End Test | Pending |

---

# 25. Completion Criteria

The implementation can be considered complete when all of the following conditions are satisfied:

- Microsoft Teams Datadog application is installed.
- Microsoft tenant is successfully connected to Datadog.
- Required Team and Channel are mapped.
- Datadog notification handle is configured.
- Required Datadog monitors contain the Teams notification target.
- A controlled test alert is generated.
- The test notification is successfully received in the Airwire Feeds channel.
- The notification contains sufficient information for the monitoring team to take action.

---

# 26. Final Verification

Final notification path:

    Datadog Monitor
          |
          v
    Datadog Alert
          |
          v
    @teams-datadog-alerts
          |
          v
    airowire Team
          |
          v
    Airwire Feeds
          |
          v
    Monitoring Team

This configuration provides a centralized mechanism for delivering Datadog monitoring alerts to Microsoft Teams while keeping the implementation focused on notification delivery.

---

# 27. References

Datadog Microsoft Teams Integration:
https://docs.datadoghq.com/integrations/microsoft-teams/

Datadog Microsoft Teams Troubleshooting:
https://docs.datadoghq.com/integrations/guide/microsoft_teams_troubleshooting/

Datadog Monitor Notifications:
https://docs.datadoghq.com/monitors/notify/

---

# 28. Document Status

| Item | Status |
|---|---|
| SOP Preparation | Completed |
| Datadog Integration Configuration | Completed |
| Microsoft Teams Configuration | Completed |
| Team/Channel Mapping | Completed |
| Notification Handle Configuration | Completed |
| Monitor Notification Configuration | As Required |
| End-to-End Notification Test | Pending |
| Production Validation | Pending Test Completion |

<p><strong>Document Owner:</strong> Airowire Networks Pvt. Ltd.</p>

<p><strong>Solution:</strong> Datadog Microsoft Teams Notification Integration</p>

<p><strong>Purpose:</strong> Centralized Datadog Monitoring Alert Notifications</p>
