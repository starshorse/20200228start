# Save as get_model.ps1
# get_model.ps1 -TableName "tbl_1" 

param(
    [Parameter(Mandatory = $true)]
    [string]$TableName      # 실행할 ps1 파일 전체 경로
)

curl -Uri "http://localhost:3005/model-schema/$TableName" -Method GET
Invoke-RestMethod -Uri "http://localhost:3005/model-schema/$TableName" -Method GET

