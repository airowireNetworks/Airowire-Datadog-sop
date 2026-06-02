<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

# SOP — Datadog Implementation

# 1. Datadog Implementation Procedure

## Step 1 — Install Datadog Agent

Set Datadog Environment Variables:

```bash
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_SITE="datadoghq.com"
```

Install Datadog Agent:

```bash
bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

Verify Installation:

```bash
sudo systemctl status datadog-agent
```

Expected:

```text
active (running)
```

---

## Step 2 — Configure Datadog Agent

Open:

```bash
sudo vi /etc/datadog-agent/datadog.yaml
```

Configure:

```yaml
logs_enabled: true

listeners:
  - name: docker

config_providers:
  - name: docker
    polling: true

logs_config:
  container_collect_all: true

process_config:
  process_collection:
    enabled: true

tags:
  - env:poc
  - project:datadog
  - team:devops
```

Save and exit.

---

## Step 3 — Configure Docker Monitoring

Create Docker Configuration Directory:

```bash
sudo mkdir -p /etc/datadog-agent/conf.d/docker.d
```

Create Docker Configuration:

```bash
sudo vi /etc/datadog-agent/conf.d/docker.d/conf.yaml
```

Content:

```yaml
init_config:

instances:
  - url: "unix://var/run/docker.sock"
```

Grant Docker Access:

```bash
sudo usermod -aG docker dd-agent
```

---

## Step 4 — Configure Network Monitoring

Create:

```bash
sudo vi /etc/datadog-agent/system-probe.yaml
```

Content:

```yaml
system_probe_config:
  enabled: true

network_config:
  enabled: true

runtime_security_config:
  enabled: true
```

Apply System Probe Permissions:

```bash
sudo setcap cap_sys_admin,cap_net_admin,cap_net_raw+ep \
/opt/datadog-agent/embedded/bin/system-probe
```

---

## Step 5 — Enable Runtime Security

Verify:

```bash
sudo systemctl enable datadog-agent-security
```

Restart:

```bash
sudo systemctl restart datadog-agent-security
```

Check Status:

```bash
sudo systemctl status datadog-agent-security
```

---

## Step 6 — Restart Datadog Services

```bash
sudo systemctl restart datadog-agent

sudo systemctl restart datadog-agent-process

sudo systemctl restart datadog-agent-sysprobe

sudo systemctl restart datadog-agent-security
```

Enable Services:

```bash
sudo systemctl enable datadog-agent

sudo systemctl enable datadog-agent-process

sudo systemctl enable datadog-agent-sysprobe

sudo systemctl enable datadog-agent-security
```

---

## Step 7 — Validate Datadog Services

Verify Agent Status:

```bash
sudo datadog-agent status
```

Verify Services:

```bash
sudo systemctl status datadog-agent

sudo systemctl status datadog-agent-process

sudo systemctl status datadog-agent-sysprobe

sudo systemctl status datadog-agent-security
```

Expected:

```text
active (running)
```

---

## Step 8 — Validate in Datadog Portal

Navigation:

```text
Datadog
→ Infrastructure
→ Hosts
```

Verify:

- Host Info
- Metrics
- Containers
- Processes
- Network
- Logs
- Security

are visible and reporting data.

---

## Step 9 — Configure Monitoring Alerts

Create the following monitors:

```text
CPU Utilization > 80%
Memory Utilization > 85%
Disk Utilization > 90%
Host Down
Network Errors
```

---

## Step 10 — Implementation Sign-Off

Implementation is considered successful when:

- Host is reporting to Datadog
- Metrics are visible
- Process monitoring is enabled
- Container monitoring is enabled
- Log collection is enabled
- Network monitoring is enabled
- Runtime security is enabled
- Alerts are configured
