# . .\Kill-PortProcess.ps1 #Load 후 사용
# Kill-PortProcess -Port 3000 
function Kill-PortProcess {
    param (
        [int]$Port
    )
    netstat -ano | findstr :$Port 

    try {
        # 해당 포트를 사용하는 프로세스 ID(PID) 찾기
        $processIds = Get-NetTCPConnection -LocalPort $Port | Select-Object -ExpandProperty OwningProcess -Unique

        if ($processIds) {
            foreach ($processId in $processIds) {
                Stop-Process -Id $processId -Force
                Write-Host "포트 $Port 를 사용하던 PID $processId 프로세스를 종료했습니다."
            }
        } else {
            Write-Host "포트 $Port 를 사용 중인 프로세스를 찾을 수 없습니다."
        }
    } catch {
        Write-Host "오류 발생: $_"
    }
}
netstat -ano | findstr :3000 

