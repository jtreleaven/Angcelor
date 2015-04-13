
/**
 * Created by jeff on 3/30/15.
 * Web app for live demo and continued updates and testing.
 */

var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var controllers = {};

controllers_path = process.cwd() + '/api/controllers';
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
    }
});

// Subnet actions start
app.get("/api/subnets", controllers.subnetController.getAllSubnets);
app.get("/api/subnets/:id", controllers.subnetController.getSubnet);
app.post("/api/subnets", controllers.subnetController.createSubnet);
app.delete("/api/subnets/:id", controllers.subnetController.deleteSubnet);
// End of Subnet actions

// Checkable actions section
app.get("/api/check/subnets", controllers.subnetController.getAvailableID);
// End of the checkable section

// IP Address actions start
app.get("/api/ip/:id", controllers.ipAddressController.getAllIPAddressesInSubnet);
app.post("/api/ip", controllers.ipAddressController.createIPAddress);
app.delete("/api/ip/:ip",controllers.ipAddressController.deleteIPAddress);
// End of IP Address actions

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname));
app.get('/', function(request, response) {
    response.sendFile('index.html', {root: __dirname});
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at http://localhost:" + app.get('port'));
});

