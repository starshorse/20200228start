# .\run_mssqlcli_with_sqlfile.ps1 "C:\path\to\your\script.sql" "192.168.0.106" "ezchemtech" "sa" "your_password"
#
param(
    [Parameter(Mandatory=$true, Position=0)][string]$sqlFilePath,   # 실행할 SQL 파일 경로
    [Parameter(Mandatory=$true, Position=1)][string]$hostname,
    [Parameter(Mandatory=$true, Position=2)][string]$database,
    [Parameter(Mandatory=$true, Position=3)][string]$id,
    [Parameter(Mandatory=$true, Position=4)][string]$password
)

if (-not (Test-Path $sqlFilePath)) {
    Write-Error "지정한 SQL 파일이 존재하지 않습니다: $sqlFilePath"
    exit 1
}

# mssql-cli 실행 명령어 및 옵션 구성
$mssqlCliPath = "mssql-cli"  # PATH에 등록되어 있다고 가정, 없으면 전체경로 입력

$arguments = @(
    "-S", $hostname,
    "-d", $database,
    "-U", $id,
    "-P", $password,
    "-i", $sqlFilePath,
    "--output", "results.txt"
)

Write-Host "=== MSSQL-CLI를 사용하여 SQL 파일 실행 ==="
Write-Host "호스트: $hostname"
Write-Host "데이터베이스: $database"
Write-Host "SQL 파일: $sqlFilePath"
Write-Host ""

try {
    & $mssqlCliPath @arguments
    Write-Host "SQL 실행이 완료되었습니다."
    Write-Host "출력 결과는 현재 디렉토리의 results.txt 파일에서 확인하세요."
}
catch {
    Write-Error "mssql-cli 실행 중 오류 발생: $_"
}

