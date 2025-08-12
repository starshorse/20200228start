<#
.\run_ps1_in_custom_tmp.ps1 -Ps1FilePath ".\bootstrap\setup_grunt_serve.ps1" -SourceDirPath ".\bootstrap\grunt_serve" -SubFolderName "tmp_webpack_bts5"
#>
npm install -g grunt-cli
npm init -y
npm i
grunt connect 
