#위 코드를 예를 들어 setup_and_run.ps1 파일명으로 저장하세요.
#
#PowerShell 관리자 권한으로 실행 권한을 허용해 주세요:
#
#powershell
#Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
#그리고 프로젝트 폴더(예: app.py 파일 있는 폴더)에서
#PowerShell을 열어 아래 명령어 실행:
#
#powershell
#.\setup_and_run.ps1
#상환경까지 자동으로 만들어지고 활성화된 상태에서 필요 패키지가 설치되고,
#마이그레이션 수행 후 DB가 초기화됩니다. 마지막으로 app.py 실행 결과를 확인할 수 있습니다.
#
# 실행: powershell -ExecutionPolicy Bypass -File ./setup_and_run.ps1

param(
    [string]$venvName = "venv"                   # 생성할 가상환경 폴더명 (기본 venv)
)

# 1. Python 설치 확인
Write-Host "Checking python version..."
$pythonExe = "python"
$pythonVersion = & $pythonExe --version 2>$null
if (-not $pythonVersion) {
    Write-Error "Python이 설치되어 있지 않거나 PATH에 없습니다. 먼저 설치 후 다시 시도하세요."
    exit 1
}
Write-Host $pythonVersion

# 2. 가상환경 생성 (venv 폴더가 없으면)
if (-not (Test-Path $venvName)) {
    Write-Host "Create virtual environment: $venvName"
    & $pythonExe -m venv $venvName
} else {
    Write-Host "Virtual environment already exists: $venvName"
}

# 3. 가상환경 활성화 (PowerShell 환경용)
$activateScript = ".\$venvName\Scripts\Activate.ps1"

if (-Not (Test-Path $activateScript)) {
    Write-Error "가상환경 활성화 스크립트가 없습니다: $activateScript"
    exit 1
}

Write-Host "Activating virtual environment..."
# 실행 정책 문제로 직접 dot-sourcing으로 활성화
. $activateScript

# 4. 의존성 설치 (Flask, Flask-SQLAlchemy, Flask-Migrate)
Write-Host "Installing required packages..."
& pip install --upgrade pip
& pip install flask flask_sqlalchemy flask_migrate

# 5. Flask 마이그레이션 및 DB 초기화

# 환경변수 FLASK_APP 설정 (PowerShell용)
$env:FLASK_APP = "app.py"

Write-Host "Initialize Flask-Migrate (if not done)..."
if (-not (Test-Path ".\migrations")) {
    & flask db init
}

Write-Host "Generate migration scripts..."
& flask db migrate -m "Create auth tables"

Write-Host "Upgrade database to latest migration..."
& flask db upgrade

# 6. app.py 실행 (더미 데이터 삽입 및 확인)
Write-Host "Running Flask app to insert dummy data and verify..."
& python app.py

