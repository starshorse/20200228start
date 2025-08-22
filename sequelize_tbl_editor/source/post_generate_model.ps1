# save as post_generate_model.ps1

$body = '{
  "tableName": "customers",
  "attributes": {
    "name": { "type": "STRING", "allowNull": false },
    "age": { "type": "INTEGER", "allowNull": false },
    "gender": { "type": "STRING", "allowNull": false }
  }
}'

curl -Uri http://localhost:3005/generate-model `
     -Method POST `
     -Headers @{ "Content-Type" = "application/json" } `
     -Body $body

