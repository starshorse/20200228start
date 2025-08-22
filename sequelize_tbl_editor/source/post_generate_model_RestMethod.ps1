$body = '{
  "tableName": "customers",
  "attributes": {
    "name": { "type": "STRING", "allowNull": false },
    "age": { "type": "INTEGER", "allowNull": false },
    "gender": { "type": "STRING", "allowNull": false }
  }
}'


Invoke-RestMethod -Uri http://localhost:3000/generate-model `
                  -Method POST `
                  -Headers @{ "Content-Type" = "application/json" } `
                  -Body $body

