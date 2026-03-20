# Cloudflare Pages Deployment Guide

## Prerequisites
- Cloudflare account with Pages enabled
- GitHub repository connected

## Setup Steps

### 1. Connect GitHub to Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project** → **Connect to Git**
3. Authorize GitHub and select the repository: `airowireNetworks/Airowire-Datadog-sop`
4. Click **Begin setup**

### 2. Configure Build Settings
Set the following values:
- **Production branch**: `main` (or `master` if that's your default)
- **Build command**: `pip install -r requirements.txt && mkdocs build`
- **Build output directory**: `site`
- **Root directory**: `/` (leave blank for root)

### 3. Set Environment Variables
Add these secrets to your GitHub repository:

1. **CLOUDFLARE_API_TOKEN**:
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create a token with:
     - Permission: `Account.Cloudflare Pages - Edit`
     - Account Resources: Include all accounts
   - Copy the token

2. **CLOUDFLARE_ACCOUNT_ID**:
   - Go to Cloudflare Dashboard → Overview
   - Copy your Account ID (shown on the right side)

3. Add to GitHub:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click **New repository secret**
   - Add both `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`

### 4. Deploy
- Push to your `main` branch
- GitHub Actions will automatically:
  - Install dependencies
  - Build the site with MkDocs
  - Deploy to Cloudflare Pages
- Check **Actions** tab to monitor deployment

## Your Site Details
- **Repository**: https://github.com/airowireNetworks/Airowire-Datadog-sop
- **Project Name**: `airowire-datadog-sop`
- **Build Command**: `pip install -r requirements.txt && mkdocs build`
- **Output Directory**: `site`

## Troubleshooting

### Build fails with "No such file or directory"
- Verify `requirements.txt` is in the root directory
- Check `mkdocs.yml` configuration

### Pages not deploying
- Check GitHub Actions logs for errors
- Verify API token and Account ID are correctly set
- Ensure `CLOUDFLARE_API_TOKEN` has correct permissions

### Theme not showing
- Verify `mkdocs.yml` has `theme: material`
- Reinstall with: `pip install --upgrade mkdocs-material`
