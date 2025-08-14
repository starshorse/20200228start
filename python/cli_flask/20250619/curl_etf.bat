curl -X POST "http://localhost:5000/calculate-dividend" ^
  -H "Content-Type: application/json" ^
  -d "{\"etf_name\":\"TIGER 국채3년\",\"nav\":10000,\"schedule\":\"분기\",\"year\":2023,\"dividends\":[65,70,68,69]}"
