/**
 * Created by jeff on 4/9/15.
 */

exports.IP_Address = function(ipv4_address, in_subnet, name, dns, description, device_type, monitor) {
    this.ipv4_address = ipv4_address;
    this.in_subnet = in_subnet;
    this.name = name;
    this.dns = dns;
    this.description = description;
    this.device_type = device_type;
    this.monitor = monitor;

    return this;
};
