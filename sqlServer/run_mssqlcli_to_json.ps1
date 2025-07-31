# query.sql 파일 안에 쿼리문의 마지막에 FOR JSON PATH가 반드시 있어야 JSON 포맷으로 결과가 나옵니다.
# PowerShell에서 리다이렉션(>)을 하므로 Invoke-Expression을 사용했습니다.
# mssql-cli가 시스템 PATH에 있어야 합니다. 없다면 절대 경로로 변경하세요.
# 보안 문제로 비밀번호를 스크립트 인자로 전달하는 것은 위험할 수 있으니 사용 환경에 주의하세요.
#.\run_mssqlcli_to_json.ps1 `
#    -Server "myserver.database.windows.net" `
#    -Database "MyDB" `
#    -User "myuser" `
#    -Password "mypassword" `
#    -SqlFilePath ".\query.sql" `
#    -OutputJsonPath ".\output.json"



param (
    [Parameter(Mandatory = $true)]
    [string]$Server,

    [Parameter(Mandatory = $true)]
    [string]$Database,

    [Parameter(Mandatory = $true)]
    [string]$User,

    [Parameter(Mandatory = $true)]
    [string]$Password,

    [Parameter(Mandatory = $true)]
    [string]$SqlFilePath,

    [Parameter(Mandatory = $true)]
    [string]$OutputJsonPath
)

if (-not (Test-Path $SqlFilePath)) {
    Write-Error "SQL 파일이 존재하지 않습니다: $SqlFilePath"
    exit 1
}

# SQL 파일에서 쿼리 읽기
$query = Get-Content $SqlFilePath -Raw

# mssql-cli 실행 경로 확인 (PATH에 등록되어 있다고 가정)
# --disable-ampersand 는 mssql-cli 특성상 필요하면 추가 가능
# 쿼리 끝에 FOR JSON PATH가 포함되어 있어야 JSON 출력 가능

# 명령어 구성
$cmd = "mssql-cli -S `"$Server`" -d `"$Database`" -U `"$User`" -P `"$Password`" -i `"$SqlFilePath`" > `"$OutputJsonPath`""

Write-Host "실행 명령어:" $cmd

# PowerShell에서 실행 (Invoke-Expression 사용하면 리다이렉션도 적용됨)
Invoke-Expression $cmd

if (Test-Path $OutputJsonPath) {
    Write-Host "JSON 출력 완료: $OutputJsonPath"
} else {
    Write-Error "JSON 출력에 실패했습니다."
}

