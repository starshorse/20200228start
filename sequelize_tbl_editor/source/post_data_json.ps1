# post_data_json.ps1 -TableName "tbl_1" 

param(
    [Parameter(Mandatory = $true)]
    [string]$TableName      # 실행할 ps1 파일 전체 경로
)


$body = @{
  name = "홍길동"
  age = 30
  gender = "남"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3005/data/json/$TableName `
                  -Method POST `
                  -Headers @{ "Content-Type" = "application/json" } `
                  -Body $body

