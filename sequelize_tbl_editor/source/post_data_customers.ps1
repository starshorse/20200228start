$body = @{
  name = "홍길동"
  age = 30
  gender = "남"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3005/data/customers `
                  -Method POST `
                  -Headers @{ "Content-Type" = "application/json" } `
                  -Body $body

