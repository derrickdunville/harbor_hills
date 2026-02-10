variable "aws_region" {
  type        = string
  description = "AWS region to provision the state bucket in."
}

variable "state_bucket_name" {
  type        = string
  description = "Name of the Terraform state bucket."
}

variable "lock_table_name" {
  type        = string
  description = "Optional DynamoDB table name for state locking. Leave empty to skip."
  default     = ""
}
