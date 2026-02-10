variable "aws_region" {
  type        = string
  description = "AWS region to deploy into."
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Base name used for resource naming."
  default     = "harbor-hills"
}

variable "domain_name" {
  type        = string
  description = "Primary domain name for the API (e.g. app.example.com)."
}

variable "hosted_zone_id" {
  type        = string
  description = "Route53 hosted zone ID that contains the domain_name."
}

variable "db_name" {
  type        = string
  description = "Postgres database name."
  default     = "app"
}

variable "db_username" {
  type        = string
  description = "Postgres master username."
  default     = "appuser"
}

variable "db_instance_class" {
  type        = string
  description = "RDS instance class."
  default     = "db.t4g.micro"
}

variable "db_allocated_storage" {
  type        = number
  description = "Allocated storage in GB."
  default     = 20
}

variable "lambda_image_uri" {
  type        = string
  description = "ECR image URI for the Next.js Lambda container."
}

variable "lambda_memory" {
  type        = number
  description = "Lambda memory in MB."
  default     = 1024
}

variable "lambda_timeout" {
  type        = number
  description = "Lambda timeout in seconds."
  default     = 30
}

variable "tags" {
  type        = map(string)
  description = "Tags applied to resources."
  default     = {}
}
