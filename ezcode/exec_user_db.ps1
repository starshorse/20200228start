# MySQL root 비밀번호 초기화가 완료되었다고 가정(무중단 기본 비밀번호 없거나 설치 시 설정)
#
#데이터베이스와 테이블, 컬럼 문자셋 및 콜레이션 확인 및 변경
<#
    아래 명령어로 현재 문자셋과 콜레이션을 확인합니다:
    sql
    SHOW VARIABLES LIKE 'character_set%';
    SHOW VARIABLES LIKE 'collation%';
    SHOW CREATE TABLE quotations;
    데이터베이스 문자셋 utf8mb4로 변경 (utf8mb4가 UTF8의 완전판으로 한글, 이모지 모두 지원)
    sql
    ALTER DATABASE ezWebQt CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
    테이블 문자셋과 콜레이션을 utf8mb4로 변경
    sql
    ALTER TABLE quotations CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    컬럼 문자셋이 개별 컬럼도 변경 가능
    sql
    ALTER TABLE quotations MODIFY company VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    MySQL 클라이언트 연결 시 문자셋 지정
    PowerShell 또는 프로그램에서 MySQL에 접속할 때 반드시 UTF8 문자셋으로 연결해야 합니다.
    bash
    mysql -u sa -p1234 --default-character-set=utf8mb4 ezWebQt
	

./mysql 디렉토리에서 mysql설치및 기초 유저설정이 필요.	

DBeaver에서 MySQL 8.0 연결 시 "Public Key Retrieval is not allowed" 문제를 해결하고 정상적으로 접속하는 방법은 다음과 같습니다:
DBeaver에서 MySQL 연결 설정 방법
1. 새 연결 만들기
	DBeaver 실행 후, 좌측 상단의 플러그 모양 아이콘(또는 메뉴 Database → New Database Connection) 클릭
	데이터베이스 종류에서 MySQL 선택 후 Next 클릭
2. MySQL 접속 정보 입력
	Host: MySQL 서버 주소 (예: localhost 또는 IP)
	Port: 일반적으로 3306
	Database: 접속할 DB 명 (선택, 비워도 됨)
	Username: MySQL 사용자명 (예: root)
	Password: 사용자의 MySQL 비밀번호
3. 드라이버 설치 및 테스트
	처음 연결할 때 드라이버 없으면 설치하라는 창이 뜸 → Download 클릭해서 설치
	모든 정보 입력 후, 하단 Test Connection 버튼 클릭 → 연결 성공 여부 확인
4. Public Key Retrieval 오류 해결 (중요!)
	만약 오류 메시지로 "Public Key Retrieval is not allowed" 가 뜨면,
	오른쪽 창에서 Driver Properties 탭으로 이동
	다음 두 가지 속성 추가 또는 수정:
	allowPublicKeyRetrieval → true
	useSSL → false
	추가 후 다시 Test Connection → 오류 없이 정상 연결되면 Finish 클릭
5. 연결 완료 후
	왼쪽 Database Navigator 에서 연결한 MySQL 서버와 데이터베이스들이 표시됨
	원하는 테이블 조회, 쿼리 작성, 데이터 조작 등 가능
#>

# 1. mysql 접속용 명령어 문자열 준비
# root로 접속 (설치 시 암호가 없다는 전제로 - 필요 시 초기 암호로 접속)
$mysqlCmd = "mysql -u root"

# 2. 초기 설정 쿼리 작성
# sa 사용자 생성, 비밀번호 1234, ezWebQt DB 생성, 권한 부여
$setupSql = @"
CREATE DATABASE IF NOT EXISTS ezWebQt;
CREATE USER IF NOT EXISTS 'sa'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'sa'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
"@

# 3. 쿼리를 임시 파일에 저장
$sqlFile = "$env:TEMP\mysql-setup.sql"
#$sqlFile = ".\mysql-setup.sql"
Set-Content -Path $sqlFile -Value $setupSql -Encoding UTF8

# 4. mysql CLI로 쿼리 실행
#& mysql -u root < $sqlFile
Get-Content $sqlFile | & mysql -u root -p1234 


# MySQL 접속 정보
$mysqlUser = "sa"
$mysqlPass = "1234"
$mysqlDB = "ezWebQt"

# mysql.exe 경로 (환경변수 PATH에 없다면 절대경로 지정)
$mysqlExe = "mysql"

# JSON 데이터 파일 경로
$jsonPath = ".\source\public\Resource\equations_jdata.json"

# quotations 테이블 생성 쿼리 (필요 시 컬럼 및 타입 조정)
$createTableSql = @"
CREATE TABLE IF NOT EXISTS quotations (
    idx INT PRIMARY KEY,
    trackId VARCHAR(255),
    generated_time DATETIME,
    generated_by VARCHAR(255),
    updated_time DATETIME,
    progress_status INT,
    qt_number VARCHAR(100),
    mro VARCHAR(255),
    company VARCHAR(255),
    user VARCHAR(255),
    internal_remark TEXT,
    c_maker VARCHAR(255),
    c_chemical_name VARCHAR(255),
    c_cas_no VARCHAR(100),
    c_cat_no VARCHAR(100),
    c_unit VARCHAR(50),
    c_qty INT,
    c_purity FLOAT,
    c_is_purity_greater TINYINT,
    c_remark TEXT,
    c_is_requested TINYINT,
    c_updated_time DATETIME,
    c_requested_time DATETIME,
    o_maker VARCHAR(255),
    o_chemical_name VARCHAR(255),
    o_cas_no VARCHAR(100),
    o_cat_no VARCHAR(100),
    o_unit VARCHAR(50),
    o_qty INT,
    o_purity FLOAT,
    o_is_included_vat TINYINT,
    o_is_1fee TINYINT,
    o_calculated_price DECIMAL(20,2)
);
"@
function Exec-MySQLQuery($query) {
    # 임시 SQL파일로 저장
    #$tempFile = [System.IO.Path]::GetTempFileName()
    #Set-Content -Path $tempFile -Value $query -Encoding UTF8
    #Get-Content $tempFile | & mysql -u $mysqlUser -p$mysqlPass --default-character-set=utf8mb4  $mysqlDB  
    #Write-Host ( Get-Content $tempFile );
    #Get-Content $tempFile | & mysql -u $mysqlUser  -p1234 --default-character-set=utf8mb4 $mysqlDB  
    mysql -u $mysqlUser  -p1234 --default-character-set=utf8mb4 $mysqlDB  -e $query  
    #Remove-Item $tempFile
}

# 테이블 생성 실행
Write-Host "Creating 'quotations' table if not exists..."
Exec-MySQLQuery $createTableSql

# JSON 데이터 로드
Write-Host "Loading JSON data from file..."
$jsonContent = Get-Content $jsonPath -Raw | ConvertFrom-Json

# 각 레코드를 쿼리로 변환 후 INSERT 실행
foreach ($record in $jsonContent) {
    # 각 필드 값 추출 (null 체크 포함)
    $idx = $record.idx
    $trackId = if ($record.trackId) { "'$($record.trackId)'" } else { "NULL" }
    $generated_time = if ($record.generated_time) { "'$($record.generated_time)'" } else { "NULL" }
    $generated_by = if ($record.generated_by) { "'$($record.generated_by)'" } else { "NULL" }
    $updated_time = if ($record.updated_time) { "'$($record.updated_time)'" } else { "NULL" }
    $progress_status = if ($record.progress_status) { $record.progress_status } else { "NULL" }
    $qt_number = if ($record.qt_number) { "'$($record.qt_number)'" } else { "NULL" }
    $mro = if ($record.mro) { "'$($record.mro)'" } else { "NULL" }
    $company = if ($record.company) { "'$($record.company)'" } else { "NULL" }
    $user = if ($record.user) { "'$($record.user)'" } else { "NULL" }
    $internal_remark = if ($record.internal_remark) { "'$($record.internal_remark)'" } else { "NULL" }
    $c_maker = if ($record.c_maker) { "'$($record.c_maker)'" } else { "NULL" }
    $c_chemical_name = if ($record.c_chemical_name) { "'$($record.c_chemical_name)'" } else { "NULL" }
    $c_cas_no = if ($record.c_cas_no) { "'$($record.c_cas_no)'" } else { "NULL" }
    $c_cat_no = if ($record.c_cat_no) { "'$($record.c_cat_no)'" } else { "NULL" }
    $c_unit = if ($record.c_unit) { "'$($record.c_unit)'" } else { "NULL" }
    $c_qty = if ($record.c_qty) { $record.c_qty } else { "NULL" }
    $c_purity = if ($record.c_purity) { $record.c_purity } else { "NULL" }
    $c_is_purity_greater = if ($record.c_is_purity_greater) { $record.c_is_purity_greater } else { "NULL" }
    $c_remark = if ($record.c_remark) { "'$($record.c_remark)'" } else { "NULL" }
    $c_is_requested = if ($record.c_is_requested) { $record.c_is_requested } else { "NULL" }
    $c_updated_time = if ($record.c_updated_time) { "'$($record.c_updated_time)'" } else { "NULL" }
    $c_requested_time = if ($record.c_requested_time) { "'$($record.c_requested_time)'" } else { "NULL" }
    # (유사하게 필요한 컬럼 추가...)

    # 예: o_... 값도 추출 (생략 가능)
    $o_maker = if ($record.o_maker) { "'$($record.o_maker)'" } else { "NULL" }
    $o_chemical_name = if ($record.o_chemical_name) { "'$($record.o_chemical_name)'" } else { "NULL" }
    $o_cas_no = if ($record.o_cas_no) { "'$($record.o_cas_no)'" } else { "NULL" }
    $o_cat_no = if ($record.o_cat_no) { "'$($record.o_cat_no)'" } else { "NULL" }
    $o_unit = if ($record.o_unit) { "'$($record.o_unit)'" } else { "NULL" }
    $o_qty = if ($record.o_qty) { $record.o_qty } else { "NULL" }
    $o_purity = if ($record.o_purity) { $record.o_purity } else { "NULL" }
    $o_is_included_vat = if ($record.o_is_included_vat) { $record.o_is_included_vat } else { "NULL" }
    $o_is_1fee = if ($record.o_is_1fee) { $record.o_is_1fee } else { "NULL" }
    $o_calculated_price = if ($record.o_calculated_price) { $record.o_calculated_price } else { "NULL" }

    # INSERT 쿼리 생성 (필요 컬럼에 맞게 조정)
    $insertSql = @"
INSERT INTO quotations (
    idx, trackId, 
    generated_time, 
    generated_by, 
    updated_time,
    progress_status, qt_number, mro, company, user, internal_remark,
    c_maker, c_chemical_name, c_cas_no, c_cat_no, c_unit,
    c_qty, c_purity, c_is_purity_greater, c_remark, c_is_requested,
    c_updated_time, c_requested_time,
    o_maker, o_chemical_name, o_cas_no, o_cat_no, o_unit,
    o_qty, o_purity, o_is_included_vat, o_is_1fee, o_calculated_price
) VALUES (
    $idx, $trackId, 
    STR_TO_DATE( $generated_time , '%Y-%m-%dT%H:%i:%s.000Z' ), 
    $generated_by, 
    STR_TO_DATE( $updated_time,  '%Y-%m-%dT%H:%i:%s.000Z' ),
    $progress_status, $qt_number, $mro, $company, $user, $internal_remark,
    $c_maker, $c_chemical_name, $c_cas_no, $c_cat_no, $c_unit,
    $c_qty, $c_purity, $c_is_purity_greater, $c_remark, $c_is_requested,
    STR_TO_DATE(  $c_updated_time, '%Y-%m-%dT%H:%i:%s.000Z' ), 
    STR_TO_DATE(  $c_requested_time, '%Y-%m-%dT%H:%i:%s.000Z' ),
    $o_maker, $o_chemical_name, $o_cas_no, $o_cat_no, $o_unit,
    $o_qty, $o_purity, $o_is_included_vat, $o_is_1fee, $o_calculated_price
);
"@
    
    # 쿼리 실행
#Write-Host $insertSql
    Exec-MySQLQuery $insertSql
    Write-Host "Inserted record idx=$idx"
}

Write-Host "All records inserted."
