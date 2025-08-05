<#
.\ConvertTo-UTF8BOM.ps1 -SourceFilePath "C:\path\to\yourfile.txt"
#>
param (
    [Parameter(Mandatory=$true)]
    [string]$SourceFilePath,

    [Parameter(Mandatory=$false)]
    [string]$DestinationFilePath
)

if (-not $DestinationFilePath) {
    $DestinationFilePath = [System.IO.Path]::Combine(
        [System.IO.Path]::GetDirectoryName($SourceFilePath),
        ([System.IO.Path]::GetFileNameWithoutExtension($SourceFilePath) + '_BOM' + [System.IO.Path]::GetExtension($SourceFilePath))
    )
}

# UTF8 인코딩 객체 (BOM 포함)
$utf8BomEncoding = New-Object System.Text.UTF8Encoding($true)

# 파일 내용을 읽어서 쓰기 (BOM 포함 인코딩으로 저장)
$content = Get-Content -Path $SourceFilePath -Raw
[System.IO.File]::WriteAllText($DestinationFilePath, $content, $utf8BomEncoding)

Write-Host "파일이 UTF-8 BOM 인코딩으로 저장되었습니다:`n$DestinationFilePath"

$env:LC_ALL = 'C.UTF-8'
[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[System.Console]::InputEncoding = [System.Text.Encoding]::UTF8
