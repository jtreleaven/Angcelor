/**
 * Created by jeff on 4/6/15.
 */

var _ = require("underscore");

var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'brownie',
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
    pool.getConnection(function(error, conn) {
        if (error) {
            return next(error);
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
    pool.getConnection(function(error, conn) {
        if (error) {
            return next(error);
        }
        conn.query("INSERT INTO subnet SET ?", req.body, function(err, result) {
            if (err) {
                res.send({
                    result: err,
                    status: "failed"
                });
                return next(err);
            } else {
                res.send({
                    result: result,
                    status: "success"
                });
                return next();
            }
        });
        conn.release();
    });
};

exports.deleteSubnet = function(req, res, next) {
    pool.getConnection(function(error, conn) {
        if (error) {
            return next(error);
        }
        conn.query("DELETE FROM subnet WHERE subnet_id=?", [req.params.id], function(err, result) {
            if (err) {
                res.send({
                    result: err,
                    status: "failed"
                });
                return next(err);
            }

            res.send({
                result: result,
                status: "success"
            });
            return next();
        });
        conn.release();
    });
};

exports.getAvailableID = function(req, res, next) {
    pool.getConnection(function(error, conn) {
        if (error) {
            return next(error);
        }
        conn.query("SELECT * FROM subnet ORDER BY subnet_id DESC LIMIT 1", function(err, subnet) {
            if (err) {
                return next(err);
            }

            res.send({"available_id": subnet[0].subnet_id + 1});
            return next();
        });
        conn.release();
    });
}



