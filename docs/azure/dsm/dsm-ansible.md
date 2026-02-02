<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Datadog Agent & Data Streams Monitoring (DSM) Installation using Ansible
</h1>

<p><strong>(Datadog Agent v7 + APM + DSM on Linux Servers)</strong></p>

<h2 style="color:#000000; font-weight:bold;">1. Purpose</h2>

This SOP defines a standard, automated, and repeatable process to install and configure the Datadog Agent with Data Streams Monitoring (DSM) across multiple Linux servers using **Ansible automation**.

This enables:

- End-to-end visibility of message flows  
- Queue and stream latency analysis  
- Producer → Broker → Consumer pathway tracking  
- Faster root cause analysis in distributed systems  

<h2 style="color:#000000; font-weight:bold;">2. Scope</h2>

<strong>In Scope:</strong>

- Installation of Datadog Agent v7  
- Enablement of APM, SSI, and DSM  
- Ansible automation  
- Linux virtual machines  
- Application-level instrumentation  

<strong>Out of Scope:</strong>

- Datadog account creation  
- Firewall/network setup  
- Broker installation (RabbitMQ/Kafka)  
- Custom dashboards & alerts  

<h2 style="color:#000000; font-weight:bold;">3. Target Audience</h2>

- DevOps Engineers  
- SRE Teams  
- Platform Engineers  
- Messaging / Middleware Teams  

<h2 style="color:#000000; font-weight:bold;">4. Assumptions & Prerequisites</h2>

<strong>Infrastructure:</strong>

- Linux OS (Ubuntu / RHEL / Debian)  
- SSH access from Ansible control node  
- Internet access to Datadog endpoints  

<strong>Tools:</strong>

- Ansible ≥ 2.14  
- Python ≥ 3.9 on target hosts  
- Git (optional)

<strong>Datadog:</strong>

- Valid Datadog API key  
- DSM enabled in Datadog account  

<h2 style="color:#000000; font-weight:bold;">5. Roles & Responsibilities</h2>

| Role | Responsibility |
|---|---|
| DevOps | Execute Ansible playbooks |
| Platform | Maintain inventory & vars |
| Application | Instrument producers & consumers |
| SRE | Validate DSM in Datadog |

<h2 style="color:#000000; font-weight:bold;">6. High-Level Architecture</h2>

**Ansible Control Node**  
↓ SSH  
Linux VMs  
↓  
Datadog Agent (APM + DSM)  
↓  
Datadog Platform

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

<strong>Why this structure:</strong>  
Adheres to Ansible best practices, separates inventory, variables, and playbooks for clarity and maintainability.

<h2 style="color:#000000; font-weight:bold;">8. Repository Reference</h2>

The full implementation for this SOP, including inventory, playbooks, and variable files, is available in the official repository:

<p>
  <a href="https://github.com/airowireNetworks/Datadog-Agent-Data-Streams-Monitoring-DSM-Installation-using-Ansible.git" target="_blank">
    https://github.com/airowireNetworks/Datadog-Agent-Data-Streams-Monitoring-Installation-using-Ansible.git
  </a>
</p>

<strong>Clone Repository:</strong>

```bash
git clone https://github.com/airowireNetworks/Datadog-Agent-Data-Streams-Monitoring-DSM-Installation-using-Ansible.git
cd Datadog-Agent-Data-Streams-Monitoring-DSM-Installation-using-Ansible
```

<strong>Repository Includes:</strong>

- Ansible inventory and playbooks  
- `group_vars` with DSM configuration  
- `requirements.yml` for Datadog role  
- README with usage examples  

This repository serves as the **living implementation** of this SOP and should be referenced for updates and environment-specific configurations.

<h2 style="color:#000000; font-weight:bold;">9. File-Level Explanation</h2>

<h3 style="color:#000000; font-weight:bold;">9.1 inventory</h3>

```ini
[datadog_hosts]
host1 ansible_host=10.0.0.4 ansible_user=as
host2 ansible_host=10.0.0.5 ansible_user=as
host3 ansible_host=10.0.0.6 ansible_user=as
```

<strong>Why it’s used:</strong>  
Defines the target servers to which Ansible should apply the DSM configuration, grouping them under `datadog_hosts` for role application.

<h3 style="color:#000000; font-weight:bold;">9.2 requirements.yml</h3>

```yaml
- name: datadog.datadog
  src: https://github.com/DataDog/ansible-datadog.git
  version: 5.5.0
```

<strong>Why it’s used:</strong>  
This ensures the official Datadog Ansible role — which includes DSM support — is downloaded and version-locked, preventing breaking changes.

Install the role:

```bash
ansible-galaxy install -r requirements.yml
```

This command pulls the required role into Ansible’s roles path.

<h3 style="color:#000000; font-weight:bold;">9.3 group_vars/datadog_hosts.yml</h3>

```yaml
datadog_api_key: "{{ lookup('env', 'DD_API_KEY') }}"
datadog_site: "datadoghq.com"
datadog_agent_major_version: 7
```

<strong>Why:</strong>  
Centralizes configuration and avoids hardcoding secrets. API key is pulled from environment.

```yaml
datadog_apm_enabled: true
datadog_apm_instrumentation_enabled: "host"
```

<strong>Why:</strong>  
Enables APM and auto-instrumentation, which is required by DSM for trace correlations.

```yaml
datadog_apm_instrumentation_libraries:
  - "python:4"
  - "java:1"
  - "js:5"
  - "php:1"
  - "dotnet:3"
  - "ruby:2"
```

<strong>Why:</strong>  
Selects supported language libraries for automatic instrumentation.

```yaml
datadog_env_vars:
  DD_DATA_STREAMS_ENABLED: "true"
```

<strong>Why:</strong>  
Explicitly enables Data Streams Monitoring on each host.

<h3 style="color:#000000; font-weight:bold;">9.4 datadog.yml (Main Playbook)</h3>

```yaml
---
- name: Install Datadog Agent with DSM
  hosts: datadog_hosts
  become: true
  gather_facts: true

  roles:
    - datadog.datadog
```

<strong>Why it’s used:</strong>  
This playbook applies the Datadog role to all hosts in the inventory, performing installation and configuration in a repeatable and idempotent manner.

<h2 style="color:#000000; font-weight:bold;">10. Execution Steps</h2>

```bash
export DD_API_KEY=<DATADOG_API_KEY>
```

<strong>Why:</strong>  
Loads API key into environment securely for use by Ansible.

```bash
ansible-playbook -i inventory datadog.yml
```

<strong>Why:</strong>  
Runs the playbook against all hosts defined in inventory.

<h2 style="color:#000000; font-weight:bold;">11. Post-Installation Validation</h2>

```bash
sudo datadog-agent status
```

<strong>Why:</strong>  
Verifies Agent is running, API key is valid, APM & DSM are enabled, and trace agent ports are active.

<h2 style="color:#000000; font-weight:bold;">12. Application Instrumentation (Client Action Required)</h2>

<strong>Why this is required:</strong>  
DSM tracks logical application pathways — without producer & consumer instrumentation, correlation graphs cannot be created.

Producer:

- Creates DSM checkpoint  
- Injects `x-datadog-pathway` header  

Consumer:

- Extracts pathway header  
- Creates downstream checkpoint  

<h2 style="color:#000000; font-weight:bold;">13. Restart Applications</h2>

```bash
sudo systemctl restart <application>
```

<strong>Why:</strong>  
Auto-instrumentation hooks attach at start, enabling DSM capture.

<h2 style="color:#000000; font-weight:bold;">14. Datadog UI Validation</h2>

Navigate to:

**Datadog → APM → Data Streams Monitoring**

Expected:

- Producer visible  
- Consumer visible  
- Pathway graph  

Note:

Message counts may not show; DSM emphasizes flow & latency.

<h2 style="color:#000000; font-weight:bold;">15. Security & Best Practices</h2>

- Use Ansible Vault for API keys  
- Avoid hardcoding secrets  
- Restrict outbound traffic  
- Combine DSM with broker metrics  

<h2 style="color:#000000; font-weight:bold;">16. Limitations</h2>

- DSM does not replace broker metrics  
- Message count visibility varies by integration  

<h2 style="color:#000000; font-weight:bold;">17. Conclusion</h2>

This SOP provides:

- Automated, repeatable Datadog Agent deployment  
- Reliable DSM enablement  
- Minimal operational overhead  

