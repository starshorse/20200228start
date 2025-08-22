# get_table_data.ps1
$url = "http://localhost:3005/data/customers"

$response = Invoke-RestMethod -Uri $url -Method GET

# JSON 결과를 예쁘게 출력
$response | Format-Table -AutoSize

