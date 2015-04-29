/**
 * Created by jeff on 4/16/15.
 */

var port = 8000;

module.exports = {
    port: port,
    db: {
        name: "arcelor_ipam",
        host: "localhost",
        user: "root",
        password: process.env.MYSQL_PWD
    }
};

