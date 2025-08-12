<# 
.\run_ps1_in_custom_tmp.ps1 -Ps1FilePath ".\bootstrap\setup_bootstrap.ps1" -SourceDirPath ".\bootstrap\theme" -SubFolderName "tmp_webpack_bts5"
#>
npm i -g sass 
npm i 
sass --version 
sass .\scss\phoenix\phoenix.scss .\dist\phoenix\bootstrap.css 
sass .\scss\phoenix\phoenix.scss .\dist\phoenix\bootstrap.min.css --style=compressed
sass .\scss\phoenix\phoenix.v5.scss .\dist.v5\phoenix\bootstrap.css 
sass .\scss\phoenix\phoenix.v5.scss .\dist.v5\phoenix\bootstrap.min.css --style=compressed
sass .\scss\now-ui\now-ui-dashboard.scss .\dist\now-ui\bootstrap.css 
sass .\scss\now-ui\now-ui-dashboard.scss .\dist\now-ui\bootstrap.min.css --style=compressed
sass .\scss\now-ui\now-ui-dashboard.v5.scss .\dist.v5\now-ui\bootstrap.css 
sass .\scss\now-ui\now-ui-dashboard.v5.scss .\dist.v5\now-ui\bootstrap.min.css --style=compressed
gulp
gulp connect
