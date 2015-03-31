
/**
 * Created by jeff on 3/30/15.
 * Web server for live demo and continued updates and testing.
 */

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname));

app.get('/', function(request, response) {
    response.sendFile('index.html', {root: __dirname});
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at http://localhost:" + app.get('port'));
});

