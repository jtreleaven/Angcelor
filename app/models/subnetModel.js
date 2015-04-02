
angcelor.factory('Subnet', function() {

    function Subnet(name, net, mask, description) {
        this.name = name;
        this.net = net;
        this.mask = mask;
        this.description = description;
    }


    /*
     * Gives a instance method to build the Subnet
     * object as if it was a static method.
     */
    Subnet.build = function(data) {
        return new Subnet(
            data.name,
            data.net,
            data.mask,
            data.description
        );
    };

    return Subnet;
});
