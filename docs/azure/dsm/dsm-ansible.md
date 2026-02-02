<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
  Datadog Agent & Data Streams Monitoring (DSM) Installation using Ansible
</h1>

<p><strong>(Datadog Agent v7 + APM + DSM on Linux Servers)</strong></p>

<h2 style="color:#000000; font-weight:bold;">1. Purpose</h2>

This SOP defines a standard, automated, and repeatable process to install and configure the Datadog Agent with Data Streams Monitoring (DSM) across multiple Linux servers using Ansible.

This enables:

- End-to-end message flow visibility  
- Stream and queue latency analysis  
- Producer → Broker → Consumer pathway tracking  
- Faster root cause analysis in distributed systems  

<h2 style="color:#000000; font-weight:bold;">2. Scope</h2>

<strong>In Scope:</strong>

- Datadog Agent v7 installation  
- Enablement of APM, SSI, and DSM  
- Ansible-based automation  
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

<h3 style="color:#000000; font-weight:bold;">Infrastructure</h3>

- Linux OS  
- SSH access from Ansible control node  
- Internet access to Datadog endpoints  

<h3 style="color:#000000; font-weight:bold;">Tools</h3>

- Ansible ≥ 2.14  
- Python ≥ 3.9 on hosts  
- Git (optional)

<h3 style="color:#000000; font-weight:bold;">Datadog</h3>

- Valid Datadog API key  
- DSM feature enabled  

<h2 style="color:#000000; font-weight:bold;">5. Roles & Responsibilities</h2>

| Role | Responsibility |
|---|---|
| DevOps | Execute Ansible playbooks |
| Platform | Maintain inventory & vars |
| Application | Producer/Consumer instrumentation |
| SRE | Validate DSM in Datadog |

<h2 style="color:#000000; font-weight:bold;">6. High-Level Architecture</h2>

Ansible Control Node  
↓ SSH  
Linux VMs  
↓  
Datadog Agent (APM + DSM)  
↓  
Datadog Platform

<h2 style="color:#000000; font-weight:bold;">7. Directory Structure</h2>

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

- Follows Ansible best practices  
- Separates inventory, variables, and playbooks  
- Easy to scale and maintain  

<h2 style="color:#000000; font-weight:bold;">8. File-Level Explanation</h2>

<h3 style="color:#000000; font-weight:bold;">8.1 inventory</h3>

```ini
[datadog_hosts]
host1 ansible_host=10.0.0.4 ansible_user=as
host2 ansible_host=10.0.0.5 ansible_user=as
host3 ansible_host=10.0.0.6 ansible_user=as
```

<strong>Why this is used:</strong>

- Defines which servers Ansible will manage  
- Groups hosts logically (`datadog_hosts`)  
- Enables parallel configuration across servers  
- Keeps SSH details outside playbooks  

<h3 style="color:#000000; font-weight:bold;">8.2 requirements.yml</h3>

```yaml
- name: datadog.datadog
  src: https://github.com/DataDog/ansible-datadog.git
  version: 5.5.0
```

<strong>Why this is used:</strong>

- Uses Datadog’s official, maintained role  
- Ensures compatibility with Agent v7, APM, DSM  
- Avoids custom scripts and manual installs  
- Version pinning ensures stability  

Install the role:

```bash
ansible-galaxy install -r requirements.yml
```

<h3 style="color:#000000; font-weight:bold;">8.3 group_vars/datadog_hosts.yml</h3>

```yaml
datadog_api_key: "{{ lookup('env', 'DD_API_KEY') }}"
datadog_site: "datadoghq.com"
datadog_agent_major_version: 7
```

<strong>Why:</strong>

- API key pulled from environment (no secrets in repo)  
- Centralized configuration for all hosts  
- Easy to rotate keys  

```yaml
datadog_apm_enabled: true
```

<strong>Why:</strong>

- Enables trace collection  
- Required for DSM correlation  
- Allows service-level visibility  

```yaml
datadog_apm_instrumentation_enabled: "host"
```

<strong>Why:</strong>

- Enables Single Step Instrumentation (SSI)  
- Auto-instruments supported runtimes  
- No application rebuilds required  

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

- Specifies runtime libraries for auto-instrumentation  
- Controls language versions explicitly  
- Prevents unexpected upgrades  

```yaml
datadog_env_vars:
  DD_DATA_STREAMS_ENABLED: "true"
```

<strong>Why:</strong>

- Explicitly enables DSM  
- Required for pathway & latency tracking  
- Applies consistently across all hosts  

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

<strong>Why this playbook design:</strong>

- Uses role-based automation  
- `become: true` ensures root-level install  
- Idempotent (safe to re-run)  
- Minimal custom logic → lower risk  

<h2 style="color:#000000; font-weight:bold;">9. Execution Steps</h2>

```bash
export DD_API_KEY=<DATADOG_API_KEY>
```

<strong>Why:</strong>

- Keeps secrets out of code  
- Supports CI/CD and Ansible Vault  

```bash
ansible-playbook -i inventory datadog.yml
```

<strong>Why:</strong>

- Applies configuration consistently  
- Installs and configures agent in one run  

<h2 style="color:#000000; font-weight:bold;">10. Post-Installation Validation</h2>

```bash
sudo datadog-agent status
```

<strong>Why:</strong>

- Confirms agent health  
- Verifies APM & DSM enabled  
- Confirms trace agent port (5012)  

<h2 style="color:#000000; font-weight:bold;">11. Application Instrumentation</h2>

<strong>Why application changes are required:</strong>

- DSM tracks logical message flow  
- Both producer and consumer must participate  

<h3>Producer</h3>

- Creates DSM checkpoint  
- Injects `x-datadog-pathway` header  

<h3>Consumer</h3>

- Extracts pathway header  
- Creates downstream checkpoint  

<h2 style="color:#000000; font-weight:bold;">12. Restart Applications</h2>

```bash
sudo systemctl restart <application>
```

<strong>Why:</strong>

- Auto-instrumentation hooks attach at startup  
- Required for SSI & DSM activation  

<h2 style="color:#000000; font-weight:bold;">13. Datadog UI Validation</h2>

Navigate to:

Datadog → APM → Data Streams Monitoring

<strong>Validate:</strong>

- Producer visible  
- Consumer visible  
- Pathway graph created  
- Latency populated  

<h2 style="color:#000000; font-weight:bold;">14. Security & Best Practices</h2>

- Use Ansible Vault in production  
- Never hardcode API keys  
- Restrict outbound traffic  
- Restart apps after upgrades  
- Combine DSM with broker metrics  

<h2 style="color:#000000; font-weight:bold;">15. Limitations</h2>

- DSM does not replace broker metrics  
- Message counts depend on integrations  
- Latency is primary KPI  

<h2 style="color:#000000; font-weight:bold;">16. Conclusion</h2>

This SOP delivers:

- Automated, repeatable agent deployment  
- Consistent DSM enablement  
- Scalable architecture  
- Minimal operational overhead  

