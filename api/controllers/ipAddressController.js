/**
 * Created by jeff on 4/7/15.
 */
var strs = [];
var _ = require("underscore");
var config = require('../../config/config');

var mysql = require("mysql");
var conn = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name
});

models_path = process.cwd() + '/api/models';
var ip = require(models_path + "/IpAddress.js");

exports.getAllIP = function(req, res, next) {
    conn.query("SELECT * FROM ip_address", function(err, rows) {
        if (err) {
            return next(err);
        }
        strs = [];
        var ip_addrs = _.map(rows, function(row) {
            strs.push(row.name + " " + row.description);
            return new ip.IP_Address(row.ipv4_address, row.in_subnet, row.name, row.dns, row.description, row.device_type, row.monitor);
        });
        var search = reds.createSearch('ip');
        res.send(ip_addrs);
        return next();
    });
};

exports.getAllIPAddressesInSubnet = function(req, res, next) {
    conn.query("SELECT * FROM ip_address WHERE in_subnet=?", [req.params.id], function(err, rows) {
        if (err) {
            return next(err);
        }

        var ip_addrs = _.map(rows, function(row) {
            return new ip.IP_Address(row.ipv4_address, row.in_subnet, row.name, row.dns, row.description, row.device_type, row.monitor);
        });
        res.send(ip_addrs);
        return next();
    });
};

exports.createIPAddress = function(req, res, next) {
    conn.query("INSERT INTO ip_address SET ?", req.params, function(err, results) {
        if (err) {
            res.json({
                type: false,
                data: err
            });
        } else {
            res.json({
                type: true,
                data: results
            });
        }
    });
};

exports.searchAllIP = function(req, res) {
    var foundIP = [];
    search
    .query(query = req)
    .end(function(err, ids){
        if (err) throw err;
        ids.forEach(function(id){
          console.log('  - %s', strs[id]);
          foundIP.push(id);
      });
        res.send(foundIP);
        process.exit();
    });

};

exports.updateIPAddress = function(req, res, next) {
    console.log(req.body);
    conn.query("UPDATE ip_address SET name = ?, dns = ?, description = ?, device_type = ?, monitor = ? WHERE ipv4_address = ?",
        [req.body.name, req.body.dns, req.body.description, req.body.device_type, req.body.monitor, req.body.ipv4_address],
        function(err, result) {
            if (err) {
                return next(err);
            }

            res.send({ status: 'success', result: result });
            return next();
        }
    );
};

exports.deleteIPAddress = function(req, res, next) {
    conn.query("DELETE FROM ip_address WHERE ipv4_address=?", [req.params.ip], function(err, results) {
        if (err) {
            res.json({
                type: false,
                data: err
            });
        } else {
            res.json({
                type: true,
                data: results
            });
        }
    });
};
