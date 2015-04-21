/**
 * Created by jeff on 4/16/15.
 */

var env = process.env.NODE_ENV || 'development';

module.exports = require('./env/' + env + '.js');
