/**
 * Created by jeff on 4/26/15.
 */

var config = require("../../config/config");

var mysql = require("mysql");
var pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name
});

var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    path = require('path'),
    xlsx = require('xlsx'),
    _ = require('underscore');

var models_path = process.cwd() + '/api/models';
var Subnet = require(models_path + '/Subnet').Subnet;
var IP_Address = require(models_path + '/IpAddress').IP_Address;

function parse(filename, base_id) {
    var subnets = [];
    var ip_addrs = [];
    var wb = xlsx.readFile(filename);
    var names = wb['SheetNames'];

    for (var i = 0; i < names.length; i++) {

        var sheet = wb['Sheets'][names[i]];
        var nrows = sheet['!ref'].slice(sheet['!ref'].indexOf(':') + 2);

        var subnet_name = names[i],
            subnet_description = sheet['A1']['v'],
            subnet_id = base_id + i + 1,
            net = 0,
            mask = subnet_name;

        if (subnet_name.indexOf(".") === -1) {
            net = parseInt(subnet_name, 10);
            mask = '10.120.' + net;
        }

        var subnet = new Subnet(subnet_id, subnet_name, net, mask, subnet_description);
        subnets.push(subnet);

        var keys = Object.keys(sheet);

        for (var irow = 3; irow < nrows; irow++) {
            if (_.contains(keys, 'A' + irow)) {
                var ipv4 = sheet['A' + irow]['v'],
                    ipName = "",
                    desc = "";

                if (_.contains(keys, 'B' + irow)) {
                    ipName = sheet['B' + irow]['v'];
                }
                if (_.contains(keys, 'C' + irow)) {
                    desc = sheet['C' + irow]['v'];
                }

                // Check for ip range
                if (ipv4.indexOf("-") !== -1) {
                    var base_addr = ipv4.split("-")[0];
                    var cap_addr = ipv4.split("-")[1];
                    cap_addr = parseInt(cap_addr, 10);

                    var start = parseInt(base_addr.slice(base_addr.lastIndexOf('.') + 1), 10);
                    for (var j = start; j < cap_addr; j++) {
                        var ip_address = new IP_Address(mask + j, i + 1, ipName, '', desc, 9, 0);
                        ip_addrs.push(ip_address);

                    }
                } else {
                    var ip_address = new IP_Address(ipv4, i + 1, ipName, '', desc, 9, 0);
                    ip_addrs.push(ip_address);

                }
            }
        }
    }

    return {'subnets': subnets, 'ip_addrs': ip_addrs};
}

exports.uploadExcel = function(req, res, next) {
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        if (files && files.hasOwnProperty('file')) {
            var file = files['file'][0],
                content_type = file.headers['content-type'],
                tmpPath = file.path,
                extIdx = tmpPath.lastIndexOf('.'),
                extension = (extIdx < 0) ? '' : tmpPath.substr(extIdx);


            var fileName = uuid.v4() + extension;
            var destPath = process.cwd() + '/tmp/' + fileName;

            if (content_type !== 'application/vnd.ms-excel' && content_type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                fs.unlink(tmpPath);
                res.status(400).send({message: 'Unsupported file type.'});
                return next();
            }

            fs.rename(tmpPath, destPath, function(err) {
                if (err) {
                    return res.status(400).send({message: 'Excel file is not saved'});
                }

                pool.getConnection(
                    function(error, conn) {
                        conn.query("SELECT * FROM subnet ORDER BY subnet_id DESC LIMIT 1", function(err, subnet) {
                            if (err) {
                                return next(err);
                            }

                            var id_base = subnet[0].subnet_id;
                            var result = parse(destPath, id_base);
                            return res.json(result);
                        });
                        conn.release();
                    }
                );
            });
        } else {
            return res.status(400).send({message: "No files sent!"});
        }
    });
};
