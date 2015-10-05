var express = require('express');
var serve = express();
serve.use(express.static(__dirname + '/app'));
serve.set('port', (process.env.PORT || 2342));
serve.listen(serve.get('port'), function () {
  console.log('Node app of CCC is running at localhost:' + serve.get('port'));
});
