// 몽구스 연결
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://rrr:ch1whdrb@cluster0.9fnmklj.mongodb.net/?retryWrites=true&w=majority',	  
//'mongodb+srv://devCecy:<password>@devcecy.dprgf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });

exports.mongoose = mongoose 
