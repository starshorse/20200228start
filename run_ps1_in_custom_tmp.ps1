########################################################################################################################
#
#  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
#
##  .\run_ps1_in_custom_tmp.ps1 -Ps1FilePath "C:\MyFolder\script.ps1" -SourceDirPath "C:\MyFolder" -SubFolderName "tmp2"


param(
    [Parameter(Mandatory = $true)]
    [string]$Ps1FilePath,      # 실행할 ps1 파일 전체 경로

    [Parameter(Mandatory = $true)]
    [string]$SourceDirPath,    # 복사할 소스 디렉토리 전체 경로

    [Parameter(Mandatory = $false)]
    [string]$SubFolderName = "tmp"  # 상위 폴더에 생성할 하위 폴더명 (기본 "tmp")
)

# 현재 경로와 상위 경로
$CurrentDir = Get-Location
$ParentDir = Split-Path -Parent $CurrentDir

# 최종 대상 경로: 상위 폴더 안에 SubFolderName 폴더 생성
$DestDir = Join-Path $ParentDir $SubFolderName

# 폴더 없으면 생성
if (-not (Test-Path -Path $DestDir)) {
    Write-Host "Creating folder: $DestDir"
    New-Item -Path $DestDir -ItemType Directory | Out-Null
} else {
    Write-Host "Folder already exists: $DestDir"
}

# 소스 디렉토리 존재 확인
if (-not (Test-Path -Path $SourceDirPath -PathType Container)) {
    Write-Error "Source directory does not exist: $SourceDirPath"
    exit 1
}

# 소스 디렉토리 내 모든 파일 복사 (하위 폴더 없이 파일만)
Write-Host "Copying files from $SourceDirPath to $DestDir"
Get-ChildItem -Path $SourceDirPath -File | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $DestDir -Force
}

# ps1 파일 존재 확인 및 복사
if (-not (Test-Path -Path $Ps1FilePath -PathType Leaf)) {
    Write-Error "PS1 file does not exist: $Ps1FilePath"
    exit 1
}

$Ps1FileName = Split-Path -Leaf $Ps1FilePath
$DestPs1Path = Join-Path $DestDir $Ps1FileName
Copy-Item -Path $Ps1FilePath -Destination $DestPs1Path -Force

Write-Host "Changing current directory to: $DestDir"
Set-Location -Path $DestDir

Write-Host "Running ps1 file: $Ps1FileName"

# 현재 폴더에서 ps1 실행
& powershell -NoProfile -ExecutionPolicy Bypass -File "./$Ps1FileName"
$exitCode = $LASTEXITCODE

Write-Host "Script execution finished with exit code: $exitCode"

exit $exitCode

