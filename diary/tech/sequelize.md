﻿Sequelize/Sequelize-auto 
========================
## Query 

```javascript 
### INSERT INTO nodejs.users (name,age, married, comment) VALUES ('zero', 24, 0, '자기소개1') 
const { user } = require('../models') 
User.create({
	name: 'zero',
	age: 24,
	married: false,
	comment: '자기소개1'
	})

#### SELECT * FROM nodejs.users
User.findAll({}) 
#### SELECT * FROM nodejs.users LIMIT 1 
User.find({}) 
#### SELECT name, married FROM nodejs.users 
User.findAll({
	attributes: ['name', 'married'] 
})
#### SELECT name, age FROM nodejs WHERE married = 1 AND age > 30 
const { User, Sequelize: { Op }} = require('../models') 
User.findAll({
	attribes:['name','age'],
	where:{
		married: 1,
		age: { [Op.gt]: 30 },
	},
})
#### SELECT id , name FROM users WHERE married = 0 OR age > 30 
const { User, Sequelize: { Op }} = require('../models') 
User.findAll({
	attributes: ['id', 'name'],
	where:{
		[Op.or]:[{ married:0 },{ age: { [ Op.gt ]: 30 } }]
	},

})
#### SELECT id , name FROM users ORDER BY age DESC
User.findAll({
	attributes:[ 'id', 'name' ],
	order:[['age','DESC']] 
})
#### SELECT id, name FROM users ORDER BY age DESC LIMIT 1;
User.findAll({
	attributes:['id', 'name'] ,
	order: ['age','DESC'] ,
	limit:1,
})
#### SELECT id , name FROM users ORDER  BY age DESC LIMIT 1 OFFSET 1 
User.findAll({
	attributes: ['id', 'DESC'] ,
	order: ['age','DESC'],
	limit: 1,
	offset: 1,
})
#### UPDATE nodejs.users SET comment = '바꿀내용' WHERE id =2 
User.destory({ where:{id:2}}) 

```

## Sequelize 마이그레이션
Sequelize ORM을 사용하면서 편리한 점은 마이그레이션 지원이다. 특히 운영중인 서비스의 데이터베이스를 변경할 때 편리하다. 개발 단계에서는 매번 sync({force: true})로 데이터베이스를 갱신할 수 있겠지만 운영중인 서비스에서는 불가능하다. 그렇다고 데이터베이스 스키마를 직접 수정하고 Sequelize 모델링 코드를 변경한다는 것은 번거럽기도 할 뿐만아니라 까딱 잘못하면 돌이킬수 없는 결과를 낳을 수도 있다. 이번 포스팅에서는 Sequelize 마이그레이션 방법에 대해 알아보겠다.

마이그레이션 생성
마이그레이션은 필요할 때마다 생성할 수 있다. 데이터베이스 스키마에 변경이 필요할 때마다 마이그레이션 코드를 만들어서 진행하는 것이다. 아래 명령어를 실행하면 migrations 폴더에 타임스탬프가 찍힌 파일이 하나 생성될 것이다.
```bash
$ sequelize migration:create
// 20160113211643-unnamed-migration.js
```
물론 파일명을 변경할수 있다. 마이그레이션 내용을 반영할 수 있는 적절한 이름으로 변경하되 유니크 해야한다.
파일은 실행한 명령어가 만든 코드 템플릿으로 구성되어 있다.
```javascript
"use strict"

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },
  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
}
```
이 모듈은 up()과 down() 메소드를 노출하는데 각 각 마이그레이션과 롤백을 담당한다. up() 함수에 새로운 컬럼을 추가하는 코드를 작성하면, down() 함수에는 추가한 컬럼을 삭제하는 코드를 작성하는 식이다. 간단히 User 테이블에 nickname 컬럼을 추가하는 코드를 작성해 보자.
```javascript
"use strict"
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("User", "nickname", {
      type: Sequelize.STRING,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("User", "nickname")
  },
}
```
마이그레이션 진행
아래 명령어로 마이그레이션을 진행한다.

$ sequelize db:migrate --env development
--env 옵션으로 데이터베이스를 선택할수 있는데 로컬에서 운영(production)서버의 데이터베이스를 관리할 때 편리하다. development는 기본 값이다. 실행하면 마이그레이션이 진행되는 메세지를 터미널 창에서 볼 수 있다.

마이그레이션이 완료되면 데이터베이스에는 SequelizeMeta 테이블이 생성된다.

mysql> describe SequelizeMeta;

| Field | Type         | Null | Key | Default | Extra |
|-------|--------------|------|-----|---------|-------|
| name  | varchar(255) | NO   | PRI | NULL    |       |

1 row in set (0.00 sec)
name 컬럼 하나만 있는 테이블이다. 마이그레이션을 수행하면 그 마이그레이션의 파일명을 이 테이블에 기록한다. 반대로 마이그래이션을 취소하면 테이블에 해당 파일명을 삭제한다.
마이그레이션 파일이 여러개 있더라도 신규 마이그레이션만 동작하는 이유가 이것 때문이다. 마이그레이션 명령이 실행되면 SequelizeMeta 테이블을 확인하여 이미 수행한 마이그레이션은 제외하고 신규 마이그레이션만 진행하는 것이다. 만약 마이그레이션 롤백이 안되는 등 예외 사항이 발생한다면 이 테이블에 저장된 값을 삭제/추가하면서 문제를 해결할 수 있다.

마이그레이션 취소
아래 명령어로 간단히 롤백할 수 있다.

$ sequelize db:migrate:undo --env development
롤백은 한 단계씩 수행되며, 원하는만큼 실행 하면된다.

다중 마이그레이션
만약 컬럼을 여러개 추가할 때는 어떻게 해야할까?

up() 함수는 프라미스를 리턴하게 되어있는데 프라미스로 구성된 배열을 반환해도 된다. 컬럼을 여러개 추가할 것이라면 addColumn()을 배열에 담아 리턴하면 된다. 물론 롤백할 때도 동일하게 removeColumn()를 배열에 담아서 반환한다. (참고)
```javascript 
module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("User", "name", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("User", "nickname", {
        type: Sequelize.STRING,
      }),
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn("Challenges", "name"),
      queryInterface.removeColumn("Challenges", "nickname"),
    ]
  },
}
```
물론 다른 방법도 있다. 직접 로우(raw) 쿼리를 실행할 수도 있다.
```javascript
module.exports = {
  up: function (queryInterface, Sequelize) {
    var sql = "ALTER TABLE User ADD COLUMN nickname varchar(255) NOT NULL"

    return queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.RAW,
    })
  },

  down: function (queryInterface, Sequelize) {
    var sql = "ALTER TABLE User DROP COLUMN nickname"

    return queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.RAW,
    })
  },
}
```
## Migration Skeleton
### The .sequelizerc file
This is a special configuration file. It lets you specify the following options that you would usually pass as arguments to CLI:

* env: The environment to run the command in
* config: The path to the config file
* options-path: The path to a JSON file with additional options
* migrations-path: The path to the migrations folder
* seeders-path: The path to the seeders folder
* models-path: The path to the models folder
* url: The database connection string to use. Alternative to using --config files
* debug: When available show various debug information
* Some scenarios where you can use it:

You want to override default path to migrations, models, seeders or config folder.
You want to rename config.json to something else like database.json
And a whole lot more. Let's see how you can use this file for custom configuration.

To begin, let's create the .sequelizerc file in the root directory of your project, with the following content:

// .sequelizerc

const path = require('path');
```javascript
module.exports = {
  'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};
```
With this config you are telling the CLI to:
* Use config/database.json file for config settings;
* Use db/models as models folder;
* Use db/seeders as seeders folder;
* Use db/migrations as migrations folder.

## Dynamic configuration
The configuration file is by default a JSON file called config.json. But sometimes you need a dynamic configuration, for example to access environment variables or execute some other code to determine the configuration.

Thankfully, the Sequelize CLI can read from both .json and .js files. This can be setup with .sequelizerc file. You just have to provide the path to your .js file as the config option of your exported object:
```javascript
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js')
}
```
Now the Sequelize CLI will load config/config.js for getting configuration options.

An example of config/config.js file:
```javascript
const fs = require('fs');

module.exports = {
  development: {
    username: 'database_dev',
    password: 'database_dev',
    database: 'database_dev',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      }
    }
  }
};
```
The example above also shows how to add custom dialect options to the configuration.

##  sequelize-auto 
Sequelize-Auto
Build Status Build status Code Climate Test Coverage

Automatically generate models for SequelizeJS via the command line.

Install
```
npm install sequelize-auto
```
Prerequisites
You will need to install sequelize; it's no longer installed by sequelize-auto.
You will need to install the correct dialect binding before using sequelize-auto.
```
Dialect	Install
MySQL/MariaDB	npm install sequelize mysql2
Postgres	npm install sequelize pg pg-hstore
Sqlite	npm install sequelize sqlite3
MSSQL	npm install sequelize tedious
```
###   Usage
```
sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName]

Options:
    --help               Show help                                   [boolean]
    --version            Show version number                         [boolean]
-h, --host               IP/Hostname for the database.                [string]
-d, --database           Database name.                               [string]
-u, --user               Username for database.                       [string]
-x, --pass               Password for database. If specified without providing
                          a password, it will be requested interactively from
                          the terminal.
-p, --port               Port number for database (not for sqlite). Ex:
                          MySQL/MariaDB: 3306, Postgres: 5432, MSSQL: 1433
                                                                      [number]
-c, --config             Path to JSON file for Sequelize-Auto options and
                          Sequelize's constructor "options" flag object as
                          defined here:
                          https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
                                                                      [string]
-o, --output             What directory to place the models.          [string]
-e, --dialect            The dialect/engine that you're using: postgres,
                          mysql, sqlite, mssql                         [string]
-a, --additional         Path to JSON file containing model options (for all
                          tables). See the options: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init
                                                                      [string]
    --indentation        Number of spaces to indent                   [number]
-t, --tables             Space-separated names of tables to import     [array]
-T, --skipTables         Space-separated names of tables to skip       [array]
--caseModel, --cm        Set case of model names: c|l|o|p|u
                          c = camelCase
                          l = lower_case
                          o = original (default)
                          p = PascalCase
                          u = UPPER_CASE
--caseProp, --cp         Set case of property names: c|l|o|p|u
--caseFile, --cf         Set case of file names: c|l|o|p|u|k
                          k = kebab-case
--noAlias                Avoid creating alias `as` property in relations
                                                                     [boolean]
--noInitModels           Prevent writing the init-models file        [boolean]
-n, --noWrite            Prevent writing the models to disk          [boolean]
-s, --schema             Database schema from which to retrieve tables[string]
-v, --views              Include database views in generated models  [boolean]
-l, --lang               Language for Model output: es5|es6|esm|ts
                          es5 = ES5 CJS modules (default)
                          es6 = ES6 CJS modules
                          esm = ES6 ESM modules
                          ts = TypeScript                             [string]
--useDefine              Use `sequelize.define` instead of `init` for es6|esm|ts
--singularize, --sg      Singularize model and file names from plural table
                          names                                      [boolean]

On Windows, provide the path to sequelize-auto: node_modules\.bin\sequelize-auto [args]

sequelize-auto -o "./models" -d sequelize_auto_test -h localhost -u my_username -p 5432 -x my_password -e postgres
```







