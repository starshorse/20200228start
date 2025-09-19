# save as post_generate_model.ps1
# ./post_generate_model_json -TableName "tbl_1"
param(
    [Parameter(Mandatory = $true)]
    [string]$TableName      # 실행할 ps1 파일 전체 경로
)

$body = '{
  "tableName": "customers",
  "attributes": {
    "name": { "type": "STRING", "allowNull": false },
    "age": { "type": "INTEGER", "allowNull": false },
    "gender": { "type": "STRING", "allowNull": false }
  }
}'

curl -Uri http://localhost:3005/generate-model-json/$TableName`
     -Method POST `
     -Headers @{ "Content-Type" = "application/json" } `
     -Body $body

