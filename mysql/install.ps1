<#
.SYNOPSIS
  MySQL Installer 자동 설치 및 사용자 계정/권한 설정 스크립트

.DESCRIPTION
  - Windows 10에서 MySQL Installer (8.0.36 Community) 다운로드 및 설치
  - MySQL Workbench 설치 (옵션)
  - 사용자 계정 생성 및 권한 부여 명령 실행
  - Sequelize (MSSQL → MySQL migration) 환경 준비를 위한 초기 세팅

.NOTES
  Author: hades migration setup (2025-08-28)
#>

Param(
    [string]$MySQLInstallerUrl = "https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.36.0.msi",
    [string]$InstallerPath = "$env:TEMP\mysql-installer.msi",
    [string]$RootPassword = "1234",
    [string]$NewUserId = "sa",
    [string]$NewUserPassword = "1234",
    [string]$DatabaseName = "config"
)
<#
Write-Host "=== MySQL Installer 다운로드 시작 ==="
Invoke-WebRequest -Uri $MySQLInstallerUrl -OutFile $InstallerPath -UseBasicParsing
Write-Host "다운로드 완료: $InstallerPath"

 .\install.ps1 -InstallerPath "f:\mysql_installer\mysql-installer-community-8.0.43.0.msi"
 Oracle 사이트에서 설치파일을 직접 다운로드 받아서 설치한다.
#>

Write-Host "=== MySQL Installer 설치 시작 ==="
# MySQL Installer는 GUI기반이라 완전한 무인 설치는 제한적임 (Configuration 파일 방식으로 일부 제약 가능)
Start-Process "msiexec.exe" -ArgumentList "/i `"$InstallerPath`" /qn" -Wait
Write-Host "MySQL Installer 설치 완료!"

# MySQL이 정상적으로 설치되었는지 확인
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
if (!(Test-Path $mysqlPath)) {
    Write-Host "⚠ MySQL이 설치되지 않았습니다. 경로를 확인하세요."
    exit 1
}

Write-Host "=== MySQL 서버 초기 설정 ==="
# 루트 계정 패스워드 설정 및 사용자 생성/권한 부여
$SqlSetupCmd = @"
ALTER USER 'root'@'localhost' IDENTIFIED BY '$RootPassword';
CREATE DATABASE IF NOT EXISTS $DatabaseName;
CREATE USER IF NOT EXISTS '$NewUserId'@'localhost' IDENTIFIED BY '$NewUserPassword';
GRANT ALL PRIVILEGES ON $DatabaseName.* TO '$NewUserId'@'localhost';
CREATE USER IF NOT EXISTS '$NewUserId'@'%' IDENTIFIED BY '$NewUserPassword';
GRANT ALL PRIVILEGES ON $DatabaseName.* TO '$NewUserId'@'%';
FLUSH PRIVILEGES;
"@

# 임시 SQL 파일 저장
$sqlFile = "$env:TEMP\mysql_init.sql"
$SqlSetupCmd | Out-File -Encoding utf8 $sqlFile

# MySQL 실행
Write-Host "SQL 명령 실행 중..."
& $mysqlPath --user=root --password=$RootPassword --execute="source $sqlFile"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ MySQL 사용자 및 권한 설정 완료!"
} else {
    Write-Host "❌ SQL 실행 오류 발생, 수동 확인 필요."
}

# 옵션: Workbench 설치 (원하는 경우)
#$WorkbenchUrl = "https://downloads.mysql.com/archives/get/p/8/file/mysql-workbench-community-5.2.47-win32.msi"
#$WorkbenchPath = "$env:TEMP\mysql-workbench.msi"
#Invoke-WebRequest -Uri $WorkbenchUrl -OutFile $WorkbenchPath -UseBasicParsing
#Start-Process "msiexec.exe" -ArgumentList "/i `"$WorkbenchPath`" /qn" -Wait
#Write-Host "MySQL Workbench 설치 완료!"

