<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 지금까지 한 작업들을 다시 복기 할수 있도록  ebook형태로 정리 해죠

아래에 지금까지 진행한 작업들을 차례대로 정리한 eBook 형태 개요를 제시합니다.
필요하면 각 챕터별 내용을 확장해 자세한 설명/스크립트 포함도 가능합니다.

# PowerShell 기반 SQLite3 + Sequelize 자동 설치 및 설정 가이드

## 목차

1. 소개
2. PowerShell 스크립트 작성 및 옵션 처리
3. Sequelize 프로젝트 초기화 및 디렉터리 구성
4. Sequelize 모델 생성과 마이그레이션 실행
5. 시더(Seeder) 생성과 데이터 삽입
6. 테스트 스크립트 작성 및 실행
7. PowerShell 파일 인코딩 문제와 UTF-8 BOM 처리
8. PowerShell 콘솔 한글 출력 환경 설정
9. PowerShell 버전 확인과 업그레이드 방법
10. Windows 패키지 관리자 Winget 설치 및 활용법
11. 요약 및 참고자료

## 1. 소개

본 문서는 SQLite와 Sequelize를 사용하는 Node.js 프로젝트를 Windows PowerShell 환경에서 자동으로 설치, 설정, 실행할 수 있도록 스크립트를 작성하는 방법을 다룹니다.
한글 처리, 파일 인코딩 문제, 출력 인코딩 문제도 함께 해결합니다.

## 2. PowerShell 스크립트 작성 및 옵션 처리

- 주요 작업: PowerShell 스크립트에서 명령줄 인자를 받아 처리
- `-SourceDirPath`를 선택 옵션으로 만들고 값이 없으면 복사를 건너뛰도록 구현
- 예제 코드 포함


## 3. Sequelize 프로젝트 초기화 및 디렉터리 구성

- `npx sequelize-cli init` 명령으로 기본 프로젝트 구조 생성
- `models`, `migrations`, `seeders`, `config` 폴더 생성 원리
- SQLite3 및 Sequelize 패키지 설치


## 4. Sequelize 모델 생성과 마이그레이션 실행

- Sequelize CLI를 사용해 모델(테이블) 생성
- 주요 컬럼 속성 정의
- 마이그레이션 스크립트 작성 및 `db:migrate` 커맨드 실행 시 주의점(문법 오류, 인코딩 문제)
- 구문 오류 예시 및 수정방법


## 5. 시더(Seeder) 생성과 데이터 삽입

- `sequelize-cli seed:generate` 명령어로 시드파일 생성
- JavaScript 코드에서 데이터 배열 작성법
- `db:seed:all`로 데이터 삽입 실행


## 6. 테스트 스크립트 작성 및 실행

- Sequelize를 통해 DB 연결 후 모델 데이터 조회하는 Node.js 테스트 스크립트 작성
- PowerShell here-string(`@" ... "@`) 사용 시 JS 템플릿 리터럴 백틱(`\``) 이스케이프 주의
- 실행 결과 출력 예시
- 인코딩과 문법 오류 점검법


## 7. PowerShell 파일 인코딩 문제와 UTF-8 BOM 처리

- UTF-8과 UTF-8 BOM 차이 및 중요성
- PowerShell에서 UTF-8 BOM 포함 저장 스크립트 예제
- `Set-Content -Encoding utf8BOM` 활용법
- 파일 저장 인코딩 확인 및 변환 방법


## 8. PowerShell 콘솔 한글 출력 환경 설정

- PowerShell 출력 인코딩 기본값과 문제점
- `[Console]::OutputEncoding = [Text.Encoding]::UTF8` 명령어로 UTF-8 출력 설정하는 법
- 콘솔 폰트 한글 지원 설정 권장
- 프로필(`$PROFILE`)에 자동 설정 추가 방법


## 9. PowerShell 버전 확인과 업그레이드 방법

- PowerShell 버전 확인법: `$PSVersionTable`
- Windows 10/11 기본 PowerShell 5.x와 PowerShell 7+ 구분
- 최신 PowerShell 7 이상 설치법
    - Winget 패키지 관리자 활용
    - MSI 설치 파일 직접 다운로드
    - Microsoft Store 설치


## 10. Windows 패키지 관리자 Winget 설치 및 활용법

- Winget 설치 확인: `winget --version`
- Microsoft Store에서 앱 설치 관리자 설치 및 업데이트
- GitHub에서 최신 Winget MSIX 패키지 다운로드 설치
- Winget을 통한 PowerShell 최신 버전 설치 예

```powershell
winget install --id Microsoft.Powershell --source winget
```

- Winget 기본 사용법 및 주의사항


## 11. 요약 및 참고자료

- 전체 작업 과정 요약
- 주요 문제 발생 시 점검해야 할 인코딩, 문법, 환경 설정 이슈 열거
- 참고한 공식 문서 및 블로그 링크 목록 제공

필요하시면 이 내용을 Markdown, PDF 등의 포맷으로 변환하거나, 코드 샘플과 이미지, 명령 실행 결과를 함께 삽입한 완성본 eBook 문서로도 제작 가능합니다.

