/**
 * Created by jeff on 4/9/15.
 */

exports.Subnet = function(id, name, net, mask, description) {
    this.subnet_id = id;
    this.name = name;
    this.mask = mask;
    this.net = net;
    this.description = description;

    return this;
};
