# Save as get_model_schema.ps1

curl -Uri "http://localhost:3005/model-schema/customers" -Method GET
Invoke-RestMethod -Uri "http://localhost:3005/model-schema/customers" -Method GET

