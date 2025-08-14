#! /bin/bash 

result=$(echo '{"result":"ok"}' | jq -r .result )
echo $result 
if [ $result = 'ok' ]
then
	echo 'success'
else
	echo 'failure'
fi
