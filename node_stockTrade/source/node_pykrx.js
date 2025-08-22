/*
 powershell에서한글 깨지는 문제 해결 
 1. powershell version 7.0 
 2.2. 제어판 설정 (국가 또는 지역)
	필자는 위의 1번 방법으로 한글 깨짐을 해결할 수 없었습니다. 제어판 설정에서 "국가 또는 지역" 설정을 변경하는 것으로 한글 깨짐 문제를 깨끗하게 해결할 수 있었습니다.
	2-1. 실행창에서 "intl.cpl" 실행
	제어판 -> 시계 및 국가 -> 국가 또는 지역으로 들어가도 되고, 실행창에서 "intl.cpl"을 실행시키는 방법도 있습니다. "국가 또는 지역" 설정에 들어가서 "관리자 옵션" 텝을 선택합니다.
	2-2. 시스템 로캘 변경 버튼을 선택합니다.
	유니코드를 지원하지 않는 프로그램용 언어에서 "시스템 로캘 변경" 버튼을 클릭합니다.
	2-3. 지역 설정에서 "Beta: 세계 언어 지원을 위해 Unicode UTF-8 사용"을 체크합니다.
	2-4. 현재 시스템 로캘이 한국어로 되어 있는지 확인합니다.
	추가적으로, 현재 시스템 로캘이 "한국어(대한민국)"으로 설정되어 있는지 재확인합니다. 필자의 경우 "영어(미국)"으로 선택되어 있어서 발생한 문제였습니다.
	2-5. 확인 버튼을 누른 후 재시작합니다.
	확인 버튼을 누른 후에 재시작을 합니다. 재시작을 하기 전까지는 설정을 적용되지 않기 때문입니다.
*/
const express = require('express');
const { execFile } = require('child_process');

const app = express();
const port = 3005;

app.get('/stock/:code', (req, res) => {
  const code = req.params.code;
  execFile('python', ['get_stock_info.py', code], { encoding: 'utf8' }, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
	console.log( stdout );
    const [name, per, pbr, div] = stdout.trim().split(',');
    res.json({ name , per: Number(per).toFixed(2) , pbr : Number(pbr).toFixed(2), div : Number(div).toFixed(2) });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

