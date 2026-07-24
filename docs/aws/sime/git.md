<div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:40px;">
  <img src="/images/airowire-logo.png" width="260">
  <img src="/images/datadog.png" width="150">
</div>

<h1 style="color:#000000; font-weight:bold;">
Solution Document for Datadog Container Image Scanning using GitHub Actions
</h1>

<p><strong>(Datadog Security CLI for Container Vulnerability Management)</strong></p>

<h2 style="color:#000000; font-weight:bold;">Purpose of the Document</h2>

This SOP defines the standardized process for implementing Datadog Container Image Scanning within a GitHub Actions CI/CD pipeline using the Datadog Security CLI.

The solution provides:

- Automated container image vulnerability scanning
- GitHub Actions CI/CD integration
- Docker image security validation
- Centralized vulnerability management
- Continuous security assessment
- Informational (Non-blocking) image scanning
- Automated upload of scan results to Datadog

The workflow performs vulnerability scanning without interrupting the CI/CD pipeline, allowing development teams to review findings directly in Datadog.

---

<h2 style="color:#000000; font-weight:bold;">Scope</h2>

<strong>In Scope:</strong>

- GitHub Actions CI/CD
- Docker Image Build
- Docker Hub Image Registry
- Datadog Security CLI
- Container Image Vulnerability Scanning
- Datadog Vulnerability Management

<strong>Out of Scope:</strong>

- Runtime Security Monitoring
- Kubernetes Workload Protection
- Infrastructure Monitoring
- Application Performance Monitoring (APM)
- Cloud SIEM
- Software Composition Analysis (SCA)

---

<h2 style="color:#000000; font-weight:bold;">Prerequisites</h2>

<strong>Access Requirements:</strong>

- GitHub Repository Administrator Access
- Docker Hub Repository Access
- Datadog Administrator Access

<strong>Datadog Requirements:</strong>

- Datadog API Key
- Datadog Application Key
- Vulnerability Management Enabled
- Container Scanning License

<strong>GitHub Repository Secrets:</strong>

- DD_API_KEY
- DD_APP_KEY
- DD_SITE
- DOCKERHUB_USERNAME
- DOCKERHUB_TOKEN

---

<h2 style="color:#000000; font-weight:bold;">Overview of the Solution</h2>

The GitHub Actions workflow automatically builds the Docker image, pushes it to Docker Hub, scans the image using the Datadog Security CLI, and uploads vulnerability findings to Datadog Vulnerability Management.

The workflow is configured with **continue-on-error: true**, ensuring that vulnerabilities are reported without interrupting the CI/CD pipeline.

<h3 style="color:#000000; font-weight:bold;">Architecture of Logic</h3>

GitHub Repository → GitHub Actions → Docker Build → Docker Hub → Datadog Security CLI → Datadog Vulnerability Management

<h3 style="color:#000000; font-weight:bold;">Functional Components</h3>

| Component | Role |
|---|---|
| GitHub Actions | CI/CD Workflow |
| Docker Buildx | Image Build |
| Docker Hub | Container Registry |
| Datadog Security CLI | Vulnerability Scanner |
| Datadog Cloud Security | Vulnerability Management |

---

<h2 style="color:#000000; font-weight:bold;">Repository Reference</h2>

Create the GitHub Actions workflow under:

```text
.github/workflows/build-blackbit-assets.yml
```

The workflow includes:

- Docker Login
- Docker Build
- Docker Push
- Datadog Security CLI Installation
- Image Scanning
- Upload of Vulnerability Findings

---

<h2 style="color:#000000; font-weight:bold;">Deployment Procedure</h2>

<h3 style="color:#000000; font-weight:bold;">Configure Datadog Credentials</h3>

Generate:

- Datadog API Key
- Datadog Application Key

If Scoped Application Keys are enabled, assign:

```text
appsec_vm_read
```

---

<h3 style="color:#000000; font-weight:bold;">Configure GitHub Repository Secrets</h3>

Configure the following GitHub Secrets:

```text
DD_API_KEY
DD_APP_KEY
DD_SITE
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

---

<h3 style="color:#000000; font-weight:bold;">GitHub Actions Workflow</h3>

Create the workflow:

```text
.github/workflows/build-blackbit-assets.yml
```

Copy the following workflow:

```yaml
name: Build Blackbit Assets

on:
  workflow_dispatch:

  schedule:
    - cron: '0 9 * * MON'

  push:
    paths:
      - 'blackbit-assets/**'

env:
  DD_API_KEY: ${{ secrets.DD_API_KEY }}
  DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
  DD_SITE: ${{ secrets.DD_SITE }}
  TZ: Europe/Berlin

jobs:
  build:

    runs-on: ubuntu-latest

    permissions:
      contents: read
      security-events: write

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Extract Docker Metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: blackbitdigital/blackbit-assets
          tags: |
            type=raw,value=latest

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v6
        with:
          context: ./blackbit-assets
          file: ./blackbit-assets/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      - name: Verify Docker Image
        run: |
          docker pull blackbitdigital/blackbit-assets:latest

      - name: Install Datadog Security CLI
        run: |
          curl -LO https://github.com/DataDog/datadog-sca-github-action/releases/latest/download/datadog-security-cli_Linux_x86_64.tar.gz
          tar -xzf datadog-security-cli_Linux_x86_64.tar.gz
          sudo mv datadog-security-cli /usr/local/bin/
          datadog-security-cli version

      - name: Scan Container Image
        continue-on-error: true
        run: |
          datadog-security-cli image blackbitdigital/blackbit-assets:latest \
            --tag image:blackbit-assets \
            --tag repo:${{ github.repository }} \
            --tag branch:${{ github.ref_name }} \
            --tag commit:${{ github.sha }} \
            --tag run_number:${{ github.run_number }} \
            -o json

      - name: Workflow Complete
        run: |
          echo "Container image scanning completed successfully."
```

---

<h3 style="color:#000000; font-weight:bold;">Execute the Workflow</h3>

Run the workflow using:

- Git Push
- Workflow Dispatch
- Scheduled Execution

The workflow automatically:

- Builds the Docker image
- Pushes the image to Docker Hub
- Installs Datadog Security CLI
- Scans the image
- Uploads vulnerability findings to Datadog

---

<h2 style="color:#000000; font-weight:bold;">Platform Capabilities</h2>

The deployment enables:

- Automated vulnerability scanning
- Centralized vulnerability visibility
- CI/CD security validation
- Image metadata collection
- Continuous container security
- Datadog Vulnerability Management integration

---

<h2 style="color:#000000; font-weight:bold;">Datadog-Side Validation</h2>

Validate the deployment by confirming:

- Workflow completed successfully
- Container image appears in Vulnerability Management
- Vulnerabilities are displayed
- Repository metadata is visible
- Branch metadata is visible
- Commit metadata is visible


---

<h2 style="color:#000000; font-weight:bold;">Observations & Findings</h2>

Key operational findings:

- Container image scanning is fully automated.
- Security findings are uploaded to Datadog.
- The CI/CD pipeline is not interrupted.
- Developers can review vulnerabilities after every build.
- Centralized visibility improves security governance.

---

<h2 style="color:#000000; font-weight:bold;">Optional Enhancements</h2>

Recommended enhancements:

- SBOM generation
- Image signing verification
- Security dashboards
- Vulnerability alerting
- Policy-based build enforcement

---

<h2 style="color:#000000; font-weight:bold;">Final Outcome</h2>

Datadog Container Image Scanning has been successfully integrated into the GitHub Actions CI/CD pipeline using the Datadog Security CLI. Every Docker image is automatically scanned during the build process, and vulnerability findings are uploaded to Datadog Vulnerability Management without interrupting the deployment pipeline.

---

<h2 style="color:#000000; font-weight:bold;">Contact</h2>

For more information about this document and its contents, please contact Airowire Solutions.

Patrick Schmidt — patrick@airowire.com

Piyush Choudhary — piyush@airowire.com

Dr. Shivanand Poojara — shivanand@airowire.com
