npm init -y
npm i
npm install express sequelize sequelize-cli sqlite3
npx sequelize-cli init
Copy-Item -Path .\db_config.json -Destination   .\config\config.json -Force  
npm run copy-libs 
npm start 
