/**
 * Created by jeff on 4/9/15.
 */

exports.Subnet = function(id, name, net, mask, description) {
    this.subnet_id = id;
    this.name = name;
    this.net = net;
    this.mask = mask;
    this.description = description;

    return this;
};
