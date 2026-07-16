<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
Solution Document for Onboarding FortiGate Firewall and Unify Switches into Datadog Network Device Monitoring (NDM)
</h1>

<p><strong>(Datadog Network Device Monitoring via SNMP)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This document provides the standardized implementation procedure for onboarding FortiGate Firewalls and Unify Network Switches into Datadog Network Device Monitoring (NDM) using SNMP.

The deployment enables centralized monitoring of network infrastructure, allowing operations teams to monitor device health, interface performance, CPU utilization, memory utilization, bandwidth, and network availability from a single Datadog platform.

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- FortiGate Firewall onboarding
- Unify Switch onboarding
- SNMP v2c configuration
- Datadog Agent deployment
- Network Device Monitoring (NDM)
- Device health monitoring
- Interface monitoring
- Performance monitoring

<strong>Out of Scope:</strong>

- NetFlow configuration
- Network configuration changes
- Firewall policy management
- Device firmware upgrades
- Configuration backup

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

<strong>Infrastructure Requirements:</strong>

A dedicated Linux Virtual Machine is required for deploying the Datadog Agent.

Minimum recommended specifications:

- Ubuntu Server 22.04 LTS / Ubuntu 24.04 LTS
- 2 vCPU
- 4 GB RAM
- 20 GB Storage
- Internet Connectivity

<strong>Datadog Requirements:</strong>

- Active Datadog Account
- Datadog API Key
- Datadog Site (US1, EU, etc.)
- Network Device Monitoring (NDM) Enabled

<strong>Network Requirements:</strong>

The monitoring VM must have network connectivity to:

- FortiGate Firewall (UDP 161)
- Unify Switches (UDP 161)
- Datadog SaaS (HTTPS TCP 443)

<strong>Customer Requirements:</strong>

The customer should provide:

- FortiGate Administrator Access
- Switch Administrator Access
- Device IP Addresses
- SNMP Community Strings
- Monitoring VM IP Address

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

Datadog Network Device Monitoring works by polling network devices using SNMP.

The Datadog Agent installed on the monitoring VM securely collects network metrics from the FortiGate Firewall and Unify Switches and forwards them to Datadog over HTTPS.

<h3 style="color:#000000; font-weight:bold;">Architecture of Logic</h3>

Monitoring VM → SNMP → FortiGate / Switches → Datadog Agent → HTTPS → Datadog Platform

<h3 style="color:#000000; font-weight:bold;">Functional Components</h3>

| Component | Role |
|------------|-----------------------------|
| Monitoring VM | Hosts Datadog Agent |
| Datadog Agent | Collects SNMP Metrics |
| FortiGate Firewall | Firewall Monitoring |
| Unify Switch | Switch Monitoring |
| Datadog NDM | Visualization & Analytics |

<h2 style="color:#000000; font-weight:bold;">Deployment Environment</h2>

Deployment requires one Linux Monitoring VM configured with:

- Datadog Agent
- SNMP Utilities
- Internet Connectivity
- Network Connectivity to all monitored devices

<h2 style="color:#000000; font-weight:bold;">Implementation Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1 - Prepare Monitoring VM</h3>

Update the operating system.

```bash
sudo apt update
sudo apt upgrade -y
```

Install SNMP utilities.

```bash
sudo apt install snmp -y
```

Verify SNMP installation.

```bash
snmpwalk --version
```

---

<h3 style="color:#000000; font-weight:bold;">Step 2 - Install Datadog Agent</h3>

Install the Datadog Agent using your Datadog API Key.

Verify installation.

```bash
sudo systemctl status datadog-agent
```

Expected Output

```
Active: active (running)
```

---

<h3 style="color:#000000; font-weight:bold;">Step 3 - Configure FortiGate Firewall</h3>

Login to the FortiGate CLI.

Create a dedicated SNMP community for Datadog.

```text
config system snmp community

    edit 3

        set name "datadog"

        config hosts

            edit 1

                set ip <Monitoring_VM_IP> 255.255.255.255

            next

        end

    next

end
```

Enable SNMP access on the management interface.

```text
config system interface

edit port1

set allowaccess ping https ssh snmp

next

end
```

Verify configuration.

```text
show system snmp community
```

---

<h3 style="color:#000000; font-weight:bold;">Step 4 - Configure Unify Switch</h3>

Login to the switch management interface.

Enable:

- SNMP Agent
- Read-only Community
- Allow Monitoring VM IP

Save the configuration.

---

<h3 style="color:#000000; font-weight:bold;">Step 5 - Validate SNMP Connectivity</h3>

Validate the FortiGate Firewall.

```bash
snmpwalk -v2c -c datadog <Firewall_IP> 1.3.6.1.2.1.1.1.0
```

Validate the Unify Switch.

```bash
snmpwalk -v2c -c public <Switch_IP> 1.3.6.1.2.1.1.1.0
```

Expected Output

```
SNMPv2-MIB::sysDescr.0
```

No timeout should be observed.

---

<h3 style="color:#000000; font-weight:bold;">Step 6 - Configure Datadog SNMP Integration</h3>

Edit the Datadog SNMP configuration file.

```bash
sudo nano /etc/datadog-agent/conf.d/snmp.d/conf.yaml
```

Example Configuration

```yaml
init_config:
  loader: core
  use_device_id_as_hostname: true

instances:

  #
  # FortiGate Firewall
  #
  - ip_address: 10.4.4.1
    port: 161
    community_string: datadog

    tags:
      - environment:production
      - location:munich
      - vendor:fortinet
      - device:firewall
      - hostname:Firewall-DE-01

  #
  # Unify Switch
  #
  - ip_address: 10.10.1.252
    port: 161
    community_string: public

    tags:
      - environment:production
      - location:munich
      - vendor:unify
      - device:switch
      - hostname:Switch-DE-01
```

Save the configuration.

---

<h3 style="color:#000000; font-weight:bold;">Step 7 - Validate Datadog Configuration</h3>

Run the configuration validation.

```bash
sudo datadog-agent configcheck
```

Restart the Datadog Agent.

```bash
sudo systemctl restart datadog-agent
```

Verify Agent Status.

```bash
sudo datadog-agent status
```

Expected Output

```
snmp:default:<Firewall_IP> [OK]

snmp:default:<Switch_IP> [OK]
```

---

<h3 style="color:#000000; font-weight:bold;">Step 8 - Validate in Datadog</h3>

Navigate to:

Infrastructure → Network Monitoring → Network Devices

Verify the following:

- Firewall is discovered
- Switch is discovered
- CPU Utilization
- Memory Utilization
- Interface Status
- Interface Traffic
- Network Throughput
- Device Availability

<h2 style="color:#000000; font-weight:bold;">Operational Capabilities</h2>

Once deployment is complete, Datadog provides:

- Device Availability Monitoring
- CPU Utilization
- Memory Utilization
- Interface Statistics
- Network Throughput
- Error & Discard Monitoring
- Interface Status
- Device Inventory
- Historical Performance Trends

<h2 style="color:#000000; font-weight:bold;">Troubleshooting</h2>

Common issues and resolutions:

| Issue | Resolution |
|------------|-----------------------------|
| SNMP Timeout | Verify UDP Port 161 |
| Authentication Failed | Verify Community String |
| Device Not Visible | Verify Datadog Agent Status |
| Config Error | Run datadog-agent configcheck |
| Device Offline | Verify Network Connectivity |

<h2 style="color:#000000; font-weight:bold;">Rollback Procedure</h2>

If monitoring needs to be removed:

- Remove device entries from:

```
/etc/datadog-agent/conf.d/snmp.d/conf.yaml
```

Restart the Datadog Agent.

```bash
sudo systemctl restart datadog-agent
```

Remove the Datadog SNMP community from the FortiGate Firewall and Unify Switch if it is no longer required.

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

Following this implementation guide successfully integrates FortiGate Firewalls and Unify Switches into Datadog Network Device Monitoring.

Upon completion, Datadog continuously collects network device metrics, interface statistics, health information, and performance telemetry, providing centralized visibility and proactive monitoring for the customer's network infrastructure.

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this Document and its contents please contact Airowire Solutions:

Patrick Schmidt — patrick@airowire.com

Piyush Choudhary — piyush@airowire.com

Dr. Shivanand Poojara — shivanand@airowire.com
