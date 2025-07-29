# mssql-cli 가 설치되어 있어야 합니다.
# 설치: https://github.com/dbcli/mssql-cli#installation 참고
# (또는 pip install mssql-cli로 Python pip 통해 설치 가능)
# Windows PowerShell 환경에서 실행합니다.
# .\run_mssqlcli.ps1 -hostname "localhost" -database "ezchemtech" -id "sa" -password "your_password"

param(
    [Parameter(Mandatory=$true)][string]$hostname,
    [Parameter(Mandatory=$true)][string]$database,
    [Parameter(Mandatory=$true)][string]$id,
    [Parameter(Mandatory=$true)][string]$password
)

# 실행할 SQL 쿼리 (여기에 이전에 작성한 SQL 스크립트를 문자열로 넣음)
$sql = @"
USE [ezchemtech];
GO

IF OBJECT_ID('dbo.TB_eztable', 'U') IS NOT NULL
   DROP TABLE dbo.TB_eztable;
GO

CREATE TABLE dbo.TB_eztable (
    seq INT IDENTITY(1,1) PRIMARY KEY,
    수주확정일 DATE NOT NULL,        -- 수주확정일 (Date)
    발주처 NVARCHAR(100) NOT NULL,   -- 발주처 (Vendor/Client)
    담당자 NVARCHAR(50) NOT NULL,    -- 담당자 (Person in charge)
    수요자판매가 INT NOT NULL        -- 수요자판매가 (Price)
);
GO

DECLARE @i INT = 1;
DECLARE @today DATE = CONVERT(DATE, GETDATE());

WHILE @i <= 100
BEGIN
    INSERT INTO dbo.TB_eztable (수주확정일, 발주처, 담당자, 수요자판매가)
    VALUES (
        DATEADD(DAY, - (ABS(CHECKSUM(NEWID())) % 30), @today),
        CASE 
            WHEN @i % 3 = 0 THEN N'서브원'
            WHEN @i % 3 = 1 THEN N'코리아이플랫폼' 
            ELSE N'기타업체' 
        END,
        N'담당자' + RIGHT('00' + CAST((ABS(CHECKSUM(NEWID())) % 20 + 1) AS NVARCHAR), 2),
        ABS(CHECKSUM(NEWID())) % 100000 + 1000
    );

    SET @i += 1;
END
GO
"@

# 임시 SQL 파일 경로 생성
$tempSqlFile = [System.IO.Path]::GetTempFileName() + ".sql"
$sql | Out-File -Encoding utf8 -FilePath $tempSqlFile

Write-Host "Executing SQL script file: $tempSqlFile"

# mssql-cli 접속 및 SQL 실행
# --disable-warnings 옵션은 버전마다 다름, 필요시 제거하세요.
$mssqlCliPath = "mssql-cli"  # 환경변수 PATH에 있을 경우

$arguments = @(
    "-S", $host,
    "-d", $database,
    "-U", $id,
    "-P", $password,
    "-i", $tempSqlFile,
    "--output", "results.txt"
)

# 실행 및 출력
try {
    & $mssqlCliPath @arguments
    Write-Host "SQL 실행이 완료되었습니다."
    Write-Host "출력 결과는 results.txt 파일을 확인하세요."
}
catch {
    Write-Error "mssql-cli 실행 중 오류 발생: $_"
}
finally {
    # 임시 파일 삭제
    if (Test-Path $tempSqlFile) {
        Remove-Item $tempSqlFile
    }
}

