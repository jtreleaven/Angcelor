
angcelor.factory('Subnet', function() {

    function Subnet(subnet_id, name, net, mask, description) {
        this.subnet_id = subnet_id;
        this.name = name;
        this.net = net;
        this.mask = mask;
        this.description = description;
        return this;
    }

    return Subnet;
});
