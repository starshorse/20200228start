#! /bin/bash 
# wqs data retrive  {'result':'ok', data:[ ...] }
# following will result ok 
Result=$(curl http://localhost:8888/getajax | jq -r .result )
echo 'show result'
echo $Result
if [ $Result = 'ok' ] ;then
	echo 'success'
else
	echo 'failure'
fi

