# 관리자 권한 PowerShell에서 실행하세요

# 1. Scoop 설치 여부 확인 및 설치
if (-not (Get-Command scoop -ErrorAction SilentlyContinue)) {
    Write-Host "Scoop이 설치되어 있지 않습니다. 설치를 시작합니다..."

    # 실행 정책 임시 설정 (현재 사용자 범위)
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

    # Scoop 설치 (공식 설치 스크립트 사용)
    iwr -useb get.scoop.sh | iex

    Write-Host "Scoop 설치가 완료되었습니다."
} else {
    Write-Host "Scoop이 이미 설치되어 있습니다."
}

# 2. Scoop 'extras' bucket 추가 (MySQL이 extras bucket에 있을 수 있음)
scoop bucket add extras -ErrorAction SilentlyContinue

# 3. MySQL 설치
Write-Host "MySQL 설치를 시작합니다..."
scoop install mysql

# 4. 설치 확인
if (scoop list | Select-String mysql) {
    Write-Host "MySQL 설치가 완료되었습니다."
} else {
    Write-Host "MySQL 설치에 실패했습니다."
}

# 5. MySQL 초기 실행 안내 (필요 시 직접 서비스 시작 또는 수동 설정 필요)
Write-Host "MySQL 설치 스크립트가 완료되었습니다. MySQL을 처음 실행하거나 설정하려면 별도 작업이 필요할 수 있습니다."

