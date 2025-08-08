########################################################################################################################
#
#  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
#
##  .\run_ps1_in_custom_tmp.ps1 -Ps1FilePath "C:\MyFolder\script.ps1" -SourceDirPath "C:\MyFolder" -SubFolderName "tmp2"
#  이제 -SourceDirPath 옵션을 생략해 실행할 수 있으며, 생략 시 복사는 수행하지 않습니다.

param(
    [Parameter(Mandatory = $true)]
    [string]$Ps1FilePath,      # 실행할 ps1 파일 전체 경로

    [Parameter(Mandatory = $false)]
    [string]$SourceDirPath,    # 복사할 소스 디렉토리 전체 경로 (옵션)

    [Parameter(Mandatory = $false)]
    [string]$SubFolderName = "tmp"  # 상위 폴더에 생성할 하위 폴더명 (기본 "tmp")
)

# 현재 경로와 상위 경로
$CurrentDir = Get-Location
$ParentDir = Split-Path -Parent $CurrentDir

# 최종 대상 경로: 상위 폴더 안에 SubFolderName 폴더 생성
$DestDir = Join-Path $ParentDir $SubFolderName
Remove-Item $DestDir -Recurse -Force

# 폴더 없으면 생성
if (-not (Test-Path -Path $DestDir)) {
    Write-Host "Creating folder: $DestDir"
    New-Item -Path $DestDir -ItemType Directory | Out-Null
} else {
    Write-Host "Folder already exists: $DestDir"
}

# SourceDirPath가 지정된 경우에만 복사
if ($SourceDirPath) {
    if (-not (Test-Path -Path $SourceDirPath -PathType Container)) {
        Write-Error "Source directory does not exist: $SourceDirPath"
        exit 1
    }
    Write-Host "Copying all contents from $SourceDirPath to $DestDir"
    Copy-Item -Path (Join-Path $SourceDirPath '*') -Destination $DestDir -Recurse -Force
} else {
    Write-Host "-SourceDirPath 입력이 없어 복사 과정을 건너뜁니다."
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
& powershell -NoProfile -ExecutionPolicy Bypass -File "./$Ps1FileName"
$exitCode = $LASTEXITCODE
Write-Host "Script execution finished with exit code: $exitCode"
exit $exitCode


