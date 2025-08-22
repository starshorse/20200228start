const { execFile } = require('child_process');
execFile('python', ['-c', 'import sys; print(sys.executable)'], (err, stdout) => {
  console.log('실행되는 파이썬:', stdout);
});

