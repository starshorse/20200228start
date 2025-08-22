$currentPath = Get-Location
$currentDirName = ""

# 특정 디렉토리 이름까지의 경로 구하기
$targetName = "20200228start"
$targetFullPath = $currentPath -split [regex]::Escape($targetName) | Select-Object -First 1
$targetFullPath = "$targetFullPath$targetName"

Write-Output $targetFullPath

# 현재 디렉토리명 구하기
#$currentDirName = Split-Path (Get-Location) -Leaf
$currentDirName = Split-Path $currentPath -Leaf

# "venv" + 현재 디렉토리명 만들기
$venvName = "venv$currentDirName"

Write-Output $venvName

$ParentDir = Split-Path  $targetFullPath   -Parent

# 2. 상위 디렉토리로 이동
Set-Location $parentDir

#3. venv 생성
deactivate
python -m venv "venv$currentDirName"
# 7. 가상환경 활성화 (Windows용, CMD 명령 호출)
& ".\venv$currentDirName\Scripts\activate"

# 5. 원래 작업 디렉토리로 복귀
Set-Location $currentPath 
try{
   PIP install -r requirements.txt 
}catch{
	Write-Output "requirements.txt absent error"
}
