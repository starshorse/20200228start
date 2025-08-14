"""
curl -X POST http://localhost:5000/calculate-dividend \
     -H "Content-Type: application/json" \
     -d '{
           "etf_name": "TIGER 국채3년",
           "nav": 10000,
           "schedule": "분기",
           "year": 2023,
           "dividends": [65, 70, 68, 69]
         }'
[ windows 용 .. ]        
curl -X POST "http://localhost:5000/calculate-dividend" ^
  -H "Content-Type: application/json" ^
  -d "{\"etf_name\":\"TIGER ??ä3??\",\"nav\":10000,\"schedule\":\"?б?\",\"year\":2023,\"dividends\":[65,70,68,69]}"

"""

from flask import Flask, request, jsonify
app = Flask(__name__)

def calculate_total_dividend(dividends, schedule):
    if not dividends or not isinstance(dividends, list):
        return 0.0
    n = len(dividends)
    if schedule == "월":
        return sum(dividends)
    elif schedule == "분기":
        return sum(dividends)
    elif schedule == "연":
        return sum(dividends)
    else:
        return sum(dividends) * (12 / n) if n > 0 else 0.0

@app.route('/calculate-dividend', methods=['POST'])
def calculate_dividend_yield():
    try:
        data = request.get_json()
        etf_name = data.get("etf_name")
        nav = float(data.get("nav"))
        schedule = data.get("schedule")
        year = int(data.get("year"))
        dividends = data.get("dividends")

        if not all([etf_name, nav, schedule, year, dividends]):
            return jsonify({"error": "모든 필드를 입력해야 합니다."}), 400

        total_dividend = calculate_total_dividend(dividends, schedule)
        dividend_yield = round((total_dividend / nav) * 100, 2) if nav != 0 else 0.0

        result = {
            "ETF명": etf_name,
            "연도": year,
            "기준가(NAV)": nav,
            "분배주기": schedule,
            "총분배금(원)": total_dividend,
            "연간 분배수익률(%)": dividend_yield
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

