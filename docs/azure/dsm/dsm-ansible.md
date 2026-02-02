<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Datadog Agent & Data Streams Monitoring (DSM) Installation using Ansible
</h1>

<p><strong>(Datadog Agent v7 + APM + DSM on Linux Servers)</strong></p>

<h2 style="color:#000000; font-weight:bold;">1. Purpose</h2>

The purpose of this SOP is to define a standard, automated, and repeatable process to install and configure the Datadog Agent with Data Streams Monitoring (DSM) across multiple Linux servers using Ansible.

This enables:

- End-to-end visibility of message flows  
- Queue and stream latency analysis  
- Producer → Broker → Consumer pathway monitoring  
- Faster root cause analysis for distributed systems  

<h2 style="color:#000000; font-weight:bold;">2. Scope</h2>

<strong>In Scope:</strong>

- Installation of Datadog Agent v7  
- Enablement of:
  - APM  
  - Single Step Instrumentation (SSI)  
  - Data Streams Monitoring (DSM)  
- Automation using Ansible  
- Linux-based virtual machines  
- Application-level instrumentation (example: RabbitMQ producer/consumer)

<strong>Out of Scope:</strong>

- Datadog account creation  
- Network firewall configuration  
- Message broker installation (RabbitMQ / Kafka)  
- Custom dashboards and alerts  
- Application refactoring beyond minimal instrumentation  

<h2 style="color:#000000; font-weight:bold;">3. Target Audience</h2>

- Client DevOps Engineers  
- SRE Teams  
- Platform Engineers  
- Middleware / Messaging Teams  
- Cloud Operations Teams  

<h2 style="color:#000000; font-weight:bold;">4. Assumptions & Prerequisites</h2>

<h3 style="color:#000000; font-weight:bold;">Infrastructure</h3>

- Linux OS (Ubuntu / RHEL / Debian)  
- SSH access from Ansible control node  
- Internet access to Datadog endpoints  

<h3 style="color:#000000; font-weight:bold;">Tools</h3>

- Ansible ≥ 2.14 (control node)  
- Python ≥ 3.9 (target hosts)  
- Git (optional)

<h3 style="color:#000000; font-weight:bold;">Datadog</h3>

- Valid Datadog API key  
- DSM feature enabled in Datadog account  

<h2 style="color:#000000; font-weight:bold;">5. Roles & Responsibilities</h2>

| Role | Responsibility |
|---|---|
| Client DevOps Team | Run Ansible playbooks |
| Platform Team | Maintain inventory & variables |
| Application Team | Instrument producers & consumers |
| SRE Team | Validate data in Datadog UI |

<h2 style="color:#000000; font-weight:bold;">6. High-Level Architecture</h2>

Ansible Control Node  
&nbsp;&nbsp;&nbsp;&nbsp;↓ SSH (Automation)  
Linux VMs (Multiple Hosts)  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
Datadog Agent + APM + DSM  
&nbsp;&nbsp;&nbsp;&nbsp;↓  
Datadog Platform (APM + Data Streams Monitoring)

<h2 style="color:#000000; font-weight:bold;">7. File & Directory Structure</h2>

```text
datadog-dsm-ansible/
├── inventory
├── datadog.yml
├── requirements.yml
├── group_vars/
│   └── datadog_hosts.yml
└── README.md
```

<h2 style="color:#000000; font-weight:bold;">8. File-Level Explanation</h2>

<h3 style="color:#000000; font-weight:bold;">8.1 inventory</h3>

Defines the target hosts.

```ini
[datadog_hosts]
host1 ansible_host=10.0.0.4 ansible_user=as
host2 ansible_host=10.0.0.5 ansible_user=as
host3 ansible_host=10.0.0.6 ansible_user=as
```

<h3 style="color:#000000; font-weight:bold;">8.2 requirements.yml</h3>

Installs the official Datadog Ansible role.

```yaml
- name: datadog.datadog
  src: https://github.com/DataDog/ansible-datadog.git
  version: 5.5.0
```

Install the role:

```bash
ansible-galaxy install -r requirements.yml
```

<h3 style="color:#000000; font-weight:bold;">8.3 group_vars/datadog_hosts.yml</h3>

Central configuration applied to all hosts.

```yaml
datadog_api_key: "{{ lookup('env', 'DD_API_KEY') }}"
datadog_site: "datadoghq.com"

datadog_agent_major_version: 7

# Enable APM
datadog_apm_enabled: true

# Enable Single Step Instrumentation (SSI)
datadog_apm_instrumentation_enabled: "host"
datadog_apm_instrumentation_libraries:
  - "python:4"
  - "java:1"
  - "js:5"
  - "php:1"
  - "dotnet:3"
  - "ruby:2"

# Enable Data Streams Monitoring
datadog_env_vars:
  DD_DATA_STREAMS_ENABLED: "true"
```

<h3 style="color:#000000; font-weight:bold;">8.4 datadog.yml (Main Playbook)</h3>

```yaml
---
- name: Install Datadog Agent with DSM
  hosts: datadog_hosts
  become: true
  gather_facts: true

  roles:
    - datadog.datadog
```

<h2 style="color:#000000; font-weight:bold;">9. Execution Steps</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1: Export Datadog API Key</h3>

```bash
export DD_API_KEY=<DATADOG_API_KEY>
```

<h3 style="color:#000000; font-weight:bold;">Step 2: Run Playbook</h3>

```bash
ansible-playbook -i inventory datadog.yml
```

<h2 style="color:#000000; font-weight:bold;">10. Post-Installation Validation</h2>

On each host:

```bash
sudo datadog-agent status
```

Verify:

- Agent running  
- API key valid  
- APM enabled  
- DSM enabled  
- Trace agent listening on port `5012`  

<h2 style="color:#000000; font-weight:bold;">11. Application Instrumentation (Client Action Required)</h2>

<h3 style="color:#000000; font-weight:bold;">Producer</h3>

- Create DSM checkpoint before publishing  
- Inject `x-datadog-pathway` header  

<h3 style="color:#000000; font-weight:bold;">Consumer</h3>

- Extract pathway header  
- Create downstream checkpoint  

<strong>Important:</strong> DSM visibility requires both producer and consumer.

<h2 style="color:#000000; font-weight:bold;">12. Restart Applications</h2>

```bash
sudo systemctl restart <application>
```

<strong>Reason:</strong>

- Auto-instrumentation hooks attach at startup  

<h2 style="color:#000000; font-weight:bold;">13. Datadog UI Validation</h2>

Navigate to:

Datadog → APM → Data Streams Monitoring

<strong>Expected:</strong>

- Producer service visible  
- Consumer service visible  
- Pathway graph created  
- Latency metrics populated  

<strong>Note:</strong>

For RabbitMQ:

- Messages In/Out may appear empty  
- DSM focuses on flow & latency, not broker counters  

<h2 style="color:#000000; font-weight:bold;">14. Security & Best Practices</h2>

- Store API keys using Ansible Vault in production  
- Do not hardcode secrets  
- Restrict outbound firewall access to Datadog endpoints  
- Restart applications after agent upgrades  
- Combine DSM with native broker metrics  

<h2 style="color:#000000; font-weight:bold;">15. Limitations</h2>

- DSM does not replace broker metrics  
- Message count visibility depends on integration support  
- Latency is the primary DSM KPI  

<h2 style="color:#000000; font-weight:bold;">16. Conclusion</h2>

This SOP ensures:

- Consistent Datadog Agent deployment  
- Reliable DSM enablement  
- Scalable, automated instrumentation  
- Minimal operational overhead  

