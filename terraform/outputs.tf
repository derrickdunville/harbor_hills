output "api_endpoint" {
  description = "Default API Gateway endpoint."
  value       = aws_apigatewayv2_api.http.api_endpoint
}

output "custom_domain" {
  description = "Custom domain for the API."
  value       = var.domain_name
}

output "database_endpoint" {
  description = "RDS endpoint hostname."
  value       = aws_db_instance.postgres.address
}

output "database_secret_arn" {
  description = "Secrets Manager ARN for database credentials."
  value       = aws_secretsmanager_secret.db.arn
}
