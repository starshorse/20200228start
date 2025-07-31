
#  .\setup_and_run_jupyter.ps1 -SourceDirPath "C:\path\to\source" -TargetDirName "tmp_jupyter"


param(
    [Parameter(Mandatory = $true)]
    [string]$SourceDirPath,        # 복사할 소스 디렉토리 전체 경로

    [Parameter(Mandatory = $true)]
    [string]$TargetDirName   )      # 상위 폴더에 생성할 대상 디렉토리명


# 1. 현재 경로 및 상위 경로
$CurrentDir = Get-Location
$ParentDir = Split-Path -Parent $CurrentDir

# 2. 타겟 디렉토리 절대경로
$TargetDir = Join-Path $ParentDir $TargetDirName

# 3. 타겟 디렉토리 생성 (없으면)
if (-not (Test-Path -Path $TargetDir)) {
    Write-Host "Creating target directory: $TargetDir"
    New-Item -Path $TargetDir -ItemType Directory | Out-Null
} else {
    Write-Host "Target directory already exists: $TargetDir"
}

# 4. 소스 디렉토리 존재 확인
if (-not (Test-Path -Path $SourceDirPath -PathType Container)) {
    Write-Error "Source directory does not exist: $SourceDirPath"
    exit 1
}

# 5. 소스 디렉토리 내 모든 파일 및 하위 폴더 복사 (재귀)
Write-Host "Copying all contents from $SourceDirPath to $TargetDir"
Copy-Item -Path (Join-Path $SourceDirPath '*') -Destination $TargetDir -Recurse -Force

# 6. 타겟 디렉토리로 이동
Write-Host "Changing location to target directory: $TargetDir"
Set-Location -Path $TargetDir

# 7. 가상환경 생성 (venv 폴더 내)
$venvFolder = "venv"

if (-not (Test-Path -Path $venvFolder)) {
    Write-Host "Creating Python virtual environment in $venvFolder"
    python -m venv $venvFolder
} else {
    Write-Host "Virtual environment already exists"
}

# 8. 가상환경 활성화 (PowerShell용)
$activateScript = ".\$venvFolder\Scripts\Activate.ps1"

if (-not (Test-Path -Path $activateScript)) {
    Write-Error "Virtual environment activation script not found: $activateScript"
    exit 1
}

Write-Host "Activating virtual environment..."
. $activateScript

# 9. jupyter 설치 및 실행

Write-Host "Upgrading pip..."
pip install --upgrade pip

Write-Host "Installing Jupyter notebook..."
pip install jupyter

Write-Host "Starting Jupyter notebook..."

# Jupyter notebook 실행 (포그라운드 실행 -> Ctrl+C 로 종료 가능)
jupyter notebook

