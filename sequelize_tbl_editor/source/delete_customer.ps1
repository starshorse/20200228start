# delete_customer.ps1

$uri = "http://localhost:3005/data/customers/1"

Invoke-RestMethod -Uri $uri -Method DELETE

