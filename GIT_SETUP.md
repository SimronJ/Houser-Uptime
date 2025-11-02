# Git Authentication Setup

## Problem
Git is failing with: "fatal: could not read Username for 'https://github.com': terminal prompts disabled"

## ✅ FIXED: GitHub Actions Issue

**If you were getting this error in GitHub Actions**, it has been fixed! The issue was that workflows were using `github.head_ref` which is only available for pull request events. For scheduled workflows, repository dispatch, and manual triggers, this was undefined, causing checkout to fail.

**Solution Applied:** All workflow files have been updated to use:
```yaml
ref: ${{ github.head_ref || github.ref }}
```

This uses `github.head_ref` for PRs and falls back to `github.ref` for all other events.

**Fixed Files:**
- `.github/workflows/uptime.yml`
- `.github/workflows/setup.yml`
- `.github/workflows/updates.yml`
- `.github/workflows/response-time.yml`
- `.github/workflows/graphs.yml`
- `.github/workflows/summary.yml`
- `.github/workflows/site.yml`
- `.github/workflows/update-template.yml`

---

## Local Development Setup

## Solution Options

### Option 1: Use Personal Access Token (HTTPS) - CURRENT SETUP

The credential helper is already configured. You have two ways to authenticate:

#### Method A: Create a token and use it in the URL
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` scope
3. Run:
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/SimronJ/Houser-Uptime.git
   ```
   Replace `YOUR_TOKEN` with your actual token.

#### Method B: Let Git prompt you (if running interactively)
When Git prompts for username/password:
- Username: your GitHub username (SimronJ)
- Password: use your Personal Access Token (NOT your GitHub password)

The credential will be saved automatically thanks to the credential helper.

### Option 2: Set up SSH Keys (Better for long-term use)

1. Generate an SSH key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add it to your SSH agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

4. Add it to GitHub:
   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key

5. Change remote to SSH:
   ```bash
   git remote set-url origin git@github.com:SimronJ/Houser-Uptime.git
   ```

### Option 3: For GitHub Actions (if the issue is in CI/CD)

If this error is happening in GitHub Actions, ensure:
1. The workflow has proper permissions (check workflow files)
2. `GH_PAT` secret is set in repository settings if using custom token
3. The workflow already uses `github.token` as fallback

## Current Configuration
- Remote URL: `https://github.com/SimronJ/Houser-Uptime.git`
- Credential helper: `store` (configured)

## Quick Test
Try fetching:
```bash
git fetch origin
```

If it prompts for credentials, use your GitHub username and a Personal Access Token as the password.
