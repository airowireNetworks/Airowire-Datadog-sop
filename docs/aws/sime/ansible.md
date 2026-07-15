<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
Solution Document for Deploying Datadog Agent on Linux using Ansible
</h1>

<p><strong>(Datadog Infrastructure Monitoring using Ansible Automation)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This Standard Operating Procedure (SOP) defines the standardized process for deploying and configuring the Datadog Agent on Linux servers using Ansible Automation.

The automation enables centralized deployment and configuration of the Datadog Agent across multiple Linux servers from a single Ansible Control Node.

The implementation provides:

- Automated Datadog Agent Installation
- Infrastructure Monitoring
- Host Metrics Collection
- Log Collection
- Process Monitoring
- Network Monitoring
- Docker Monitoring (Optional)
- Runtime Security (Optional)
- Automated Configuration Management
- Multi-host Deployment
- Operational Validation

---

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope</strong>

- Datadog Agent Installation
- Agent Configuration
- Infrastructure Monitoring
- Host Metrics Collection
- Process Monitoring
- Log Collection
- Service Validation
- Ansible Inventory Management
- Automated Deployment

<strong>Out of Scope</strong>

- Kubernetes Monitoring
- Application Performance Monitoring (APM)
- Cloud SIEM
- Database Monitoring
- Synthetic Monitoring
- Real User Monitoring (RUM)

---

<h2 style="color:#000000; font-weight:bold;">Roles and Responsibilities</h2>

<strong>Airowire Networks</strong>

- Solution Design
- Ansible Playbook Development
- Inventory Configuration
- Datadog Agent Deployment
- Validation and Testing
- Documentation
- Operational Handover

<strong>Customer</strong>

- Linux Server Provisioning
- SSH Access
- Sudo Privileges
- Datadog API Key
- Firewall Configuration
- Change Approval

---

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

<strong>Ansible Control Node</strong>

- Ansible Installed
- Git Installed
- Python 3 Installed
- SSH Key Authentication
- Internet Connectivity

Verify Ansible installation:

```bash
ansible --version
```

<strong>Target Linux Servers</strong>

- Ubuntu / RHEL / CentOS / Amazon Linux
- Python Installed
- SSH Enabled
- Sudo Privileges
- Outbound HTTPS (TCP 443)

Verify connectivity:

```bash
ansible all -m ping
```

Expected Output:

```
SUCCESS
```

<strong>Datadog Requirements</strong>

- Active Datadog Organization
- Datadog API Key
- Datadog Site URL

---

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

The Datadog Agent is deployed using Ansible playbooks from a centralized Ansible Control Node.

Ansible automates installation, configuration, service validation, and ongoing configuration management across multiple Linux servers.

<h3 style="color:#000000; font-weight:bold;">Architecture</h3>

```
                +----------------------+
                |  Ansible Control VM  |
                +----------+-----------+
                           |
                    SSH (Port 22)
                           |
        --------------------------------------
        |          |            |            |
        ▼          ▼            ▼            ▼
    Linux-01   Linux-02    Linux-03    Linux-04
        |          |            |            |
        --------------------------------------
                           |
                    Datadog Agent
                           |
                           ▼
                    Datadog Platform
```

---

<h2 style="color:#000000; font-weight:bold;">Repository Structure</h2>

```
datadog-linux-ansible/
│
├── inventory/
│   └── hosts.ini
│
├── playbooks/
│   └── install-datadog.yml
│
├── roles/
│   ├── datadog/
│   ├── tasks/
│   ├── handlers/
│   ├── defaults/
│   ├── vars/
│   └── templates/
│
├── group_vars/
│
├── ansible.cfg
│
└── README.md
```

---

<h2 style="color:#000000; font-weight:bold;">Deployment Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Step 1 – Clone Repository</h3>

```bash
git clone https://github.com/airowireNetworks/datadog-linux-ansible.git

cd datadog-linux-ansible
```

---

<h3 style="color:#000000; font-weight:bold;">Step 2 – Configure Inventory</h3>

Update the inventory file with your Linux servers.

Example:

```ini
[linux]

server1 ansible_host=192.168.1.10

server2 ansible_host=192.168.1.11
```

---

<h3 style="color:#000000; font-weight:bold;">Step 3 – Configure Variables</h3>

Update the Datadog variables.

```yaml
datadog_api_key: xxxxxxxxxxxxxxxxx

datadog_site: datadoghq.com
```

---

<h3 style="color:#000000; font-weight:bold;">Step 4 – Verify Connectivity</h3>

```bash
ansible all -m ping
```

Expected Output:

```
SUCCESS
```

---

<h3 style="color:#000000; font-weight:bold;">Step 5 – Deploy Datadog Agent</h3>

Run the Ansible Playbook.

```bash
ansible-playbook \
-i inventory/hosts.ini \
playbooks/install-datadog.yml
```

---

<h3 style="color:#000000; font-weight:bold;">Step 6 – Verify Agent Status</h3>

```bash
sudo systemctl status datadog-agent
```

Expected Result:

```
active (running)
```

---

<h2 style="color:#000000; font-weight:bold;">Validation</h2>

Run:

```bash
datadog-agent status
```

Verify:

- Agent Running
- API Connectivity
- Hostname Detection
- Logs Enabled
- Process Agent Running
- Inventory Collection

---

<h2 style="color:#000000; font-weight:bold;">Datadog UI Validation</h2>

Navigate to **Infrastructure → Hosts**

Verify:

- Linux Hosts
- Infrastructure Metrics
- Host Tags
- Running Processes
- Logs
- Containers (if enabled)

---

<h2 style="color:#000000; font-weight:bold;">Troubleshooting</h2>

<strong>SSH Connectivity Failed</strong>

- Verify SSH Keys
- Verify Firewall Rules
- Verify Port 22

<strong>Invalid API Key</strong>

- Verify the Datadog API Key

<strong>Host Not Visible in Datadog</strong>

```bash
systemctl status datadog-agent

datadog-agent status
```

<strong>Permission Denied</strong>

- Verify sudo privileges
- Verify SSH user permissions

---

<h2 style="color:#000000; font-weight:bold;">Expected Deliverables</h2>

After successful deployment, the customer will receive:

- Datadog Agent Installed
- Infrastructure Monitoring
- Host Metrics Collection
- Process Monitoring
- Log Collection
- Automated Deployment
- Centralized Configuration
- Deployment Documentation

---

<h2 style="color:#000000; font-weight:bold;">Benefits of Using Ansible</h2>

| Manual Installation | Ansible Automation |
|--------------------|--------------------|
| One server at a time | Deploy to hundreds of servers simultaneously |
| Manual configuration | Standardized configuration |
| Error-prone | Consistent and repeatable |
| Time-consuming | Fast deployment |
| Difficult to maintain | Easy updates using playbooks |

---

<h2 style="color:#000000; font-weight:bold;">Deployment Validation Checklist</h2>

| Validation | Status |
|------------|--------|
| Repository Cloned | ✅ |
| Inventory Configured | ✅ |
| Variables Updated | ✅ |
| SSH Connectivity Verified | ✅ |
| Datadog Agent Installed | ✅ |
| Agent Running | ✅ |
| Host Visible in Datadog | ✅ |
| Infrastructure Metrics Available | ✅ |
| Log Collection Enabled | ✅ |

---

<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

- Datadog Agent deployment is fully automated using Ansible.
- Configuration is centralized and reusable across multiple Linux servers.
- Infrastructure monitoring and log collection are enabled.
- The deployment process is repeatable, scalable, and easy to maintain.
- Ansible simplifies ongoing configuration management and future updates.

---

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

Datadog Agent was successfully deployed on Linux servers using Ansible Automation. The solution provides Infrastructure Monitoring, Host Metrics Collection, Log Collection, and centralized configuration management while enabling scalable, repeatable, and automated deployments across multiple Linux environments.

---

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this document and its contents, please contact Airowire Networks.

Patrick Schmidt — patrick@airowire.com

Piyush Choudhary — piyush@airowire.com

Dr. Shivanand Poojara — shivanand@airowire.com
