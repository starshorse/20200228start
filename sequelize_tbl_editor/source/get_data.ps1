# get_table_data.ps1
#
# get_data.ps1 -TableName "tbl_1" 

param(
    [Parameter(Mandatory = $true)]
    [string]$TableName      # 실행할 ps1 파일 전체 경로
)

$url = "http://localhost:3005/data/$TableName"

$response = Invoke-RestMethod -Uri $url -Method GET

# JSON 결과를 예쁘게 출력
$response | Format-Table -AutoSize

