curl -X POST "http://localhost:5000/calculate-dividend" ^
  -H "Content-Type: application/json" ^
  -d "{\"etf_name\":\"TIGER ��ä3��\",\"nav\":10000,\"schedule\":\"�б�\",\"year\":2023,\"dividends\":[65,70,68,69]}"
