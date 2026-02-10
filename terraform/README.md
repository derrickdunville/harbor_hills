# AWS Spoke Terraform Boilerplate

This repo is a Terraform boilerplate for provisioning AWS infrastructure with GitHub Actions.
It includes:
- A bootstrap module to create the Terraform state bucket (and optional DynamoDB lock table).
- A main infra module to hold your infrastructure resources.
- Workflows to bootstrap state, apply on `main`,manually destroy, and nuke (destroy + delete state bucket).

## Repository Structure
- `terraform/bootstrap/` - Terraform module that provisions the S3 state bucket and optional lock table.
- `terraform/infra/` - Terraform module for your actual infrastructure.
- `.github/workflows/` - GitHub Actions workflows.

## GitHub Actions Workflows

### Terraform State Bootstrap
- File: `.github/workflows/terraform-bootstrap.yml`
- Trigger: `workflow_dispatch`
- Purpose: Checks whether the state bucket exists and creates it if missing.

### Terraform Apply
- File: `.github/workflows/terraform-apply.yml`
- Trigger: `push` to `main`
- Purpose: Applies `infra/` changes to AWS.

### Terraform Destroy
- File: `.github/workflows/terraform-destroy.yml`
- Trigger: `workflow_dispatch`
- Purpose: Destroys `infra/` resources.
- Safety: Only the repo owner can run it and it requires `confirm_destroy=DESTROY`.

### Terraform Nuke
- File: `.github/workflows/terraform-nuke.yml`
- Trigger: `workflow_dispatch`
- Purpose: Destroys `infra/` resources and deletes the state bucket (and lock table if set).
- Safety: Only the repo owner can run it and it requires `confirm_cleanup=NUKE`.

## Required GitHub Configuration

### Repository variables
Set these in GitHub: Settings → Secrets and variables → Actions → Variables.
- `AWS_REGION` (optional, defaults to `us-east-1`)
- `TF_LOCK_TABLE` (optional)

### Repository secrets
Set these in GitHub: Settings → Secrets and variables → Actions → Secrets.
- `AWS_ROLE_ARN` (required)

The workflows use OIDC with `aws-actions/configure-aws-credentials@v4` and assume this role.
The state bucket name is derived from the repo name plus a random 4-digit hex suffix and discovered at runtime.

## Usage

1) Bootstrap the Terraform state
- Run the "Terraform State Bootstrap" workflow once.
- This will create the S3 bucket (and DynamoDB lock table if set).

2) Add infrastructure
- Add resources in `terraform/infra/` (start in `terraform/infra/main.tf`).

3) Apply on merge
- Merging to `main` runs the "Terraform Apply" workflow.

4) Manual destroy (owner only)
- Run the "Terraform Destroy" workflow.
- Provide input `confirm_destroy=DESTROY`.

## Notes
- The bootstrap bucket and lock table have `prevent_destroy = true`.
- The infra state backend is configured via workflow init arguments.
