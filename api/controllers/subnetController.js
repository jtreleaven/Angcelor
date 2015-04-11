/**
 * Created by jeff on 4/6/15.
 */

var _ = require("underscore");

var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jmt2347',
    database: 'arcelor_ipam'
});

models_path = process.cwd() + '/api/models';
var Subnet = require(models_path + "/Subnet.js");

exports.getAllSubnets = function(req, res, next) {
    pool.getConnection(function(err_c, conn){
        if (err_c) {
            return next(err_c);
        }
        conn.query("SELECT * FROM subnet", function(err_q, rows) {
            if (err_q) {
                return next(err_q);
            } else {
                var subnets = _.map(rows, function(row) {
                    return new Subnet.Subnet(row.subnet_id, row.name, row.mask, row.net, row.description)
                });

                res.send(subnets);
                return next();
            }
        });
        conn.release();
    });
};

exports.getSubnet = function(req, res, next) {
    pool.getConnection(function(err, conn) {
        if (err) {
            return next(err);
        }
        conn.query("SELECT * FROM subnet WHERE subnet_id=?", [req.params.id], function(err, rows) {
            if (err) {
                return next(err);
            }
            var row = rows[0];
            var subnet = new Subnet.Subnet(row.subnet_id, row.name, row.mask, row.net, row.description);
            res.send(subnet);
            return next();
        });

        conn.release();
    });
};

exports.createSubnet = function(req, res, next) {
    pool.getConnection(function(err, conn) {
        var _id = getAvailableID();
        conn.query("INSERT INTO subnet SET ?", req.params, function(err, result) {
            if (err) {
                res.json({
                    type: false,
                    data: _id
                });
            } else {
                res.json({
                    type: true,
                    data: result
                });
            }
        });
        conn.release();
    });
};

exports.deleteSubnet = function(req, res, next) {
    pool.getConnection(function(err, conn) {
        conn.query("DELETE FROM subnet WHERE subnet_id=?", [req.params.id], function(err, result) {
            if (err) throw err;

            res.json({
                type: true,
                data: result
            });
        });
        conn.release();
    });
};



