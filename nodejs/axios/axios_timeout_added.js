const axios = require('axios');

console.log = (() => {
  var console_log = console.log;
  var timeStart = new Date().getTime();
  
  return function() {
    var delta = new Date().getTime() - timeStart;
    var args = [];
    args.push((delta / 1000).toFixed(2) + ':');
    for(var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console_log.apply(console, args);
  };
})();

axios.interceptors.request.use( req => {
  req.meta = req.meta || {}
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});

axios.interceptors.response.use(res => {
  console.log(`Execution time for: ${res.config.url} - ${ new Date().getTime() - res.config.meta.requestStartedAt} ms`)
  return res;
},
res => {
  console.error(`Execution time for: ${res.config.url} - ${new Date().getTime() - res.config.meta.requestStartedAt} ms`)
  throw res;
});
(async () => {

  try {
    const eightSecondsinMs = 8000;
    const url = `http://localhost:3000/api/mock-response-time/${eightSecondsinMs}`;
    console.log(`Sending a GET reqeust to: ${url}`);
    const response = await axios.get(url, {timeout: 900});
    console.log(`Response: `, response?.data?.message );
    console.log('do this after you have data');
  } catch(err) {
    console.log(`Error message : ${err.message} - `, err.code);
  }
  
  console.log('do the next task');
})();
