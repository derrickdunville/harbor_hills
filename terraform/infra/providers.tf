terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0.0"
    }
  }

  backend "s3" {
    # Bucket and table are provided via workflow init backend-config args.
  }
}

provider "aws" {
  region = var.aws_region
}
