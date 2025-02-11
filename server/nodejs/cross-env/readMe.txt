{
   "name": "nordbird",
   "version": "1.0.0",
   "description": "포트폴리오",
   "main": "app.js",
   
   "scripts": {
      "start": "NODE_ENV=production PORT=80 node app", // NODE_ENV 환경변수를 production으로 PORT 환경변수를 80으로 하고 서버 실행
      "dev": "nodemon app",
   },
   
   "keywords": [],
   "author": "inpa",
   "license": "MIT",
   "devDependencies": {
      "nodemon": "^2.0.15"
   },
   "dependencies": {
      // ...
   }
}


npm start 
npm run dev 

{
  ...

  "scripts": {
    "start": "cross-env NODE_ENV=production PORT=80 node server", // cross-env 를 명시해준다
    "dev": "nodemon server",
    "test": "jest"
  },

  ...

}

적용 방법은 매우 간단하다. package.json 의 환경변수 부분 앞에 cross-env를 붙이기만 하면 이제 윈도우에서도 실행이 되게 된다.
            Info
출처: https://inpa.tistory.com/entry/NODE-📚-cross-env-모듈-사용법 [Inpa Dev 👨‍💻:티스토리]
