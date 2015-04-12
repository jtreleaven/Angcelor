angcelor.factory('ipAddress', function() {

    function ipAddress(name, in_subnet, address, monitored, description, deviceType) {
        this.name = name;
        this.in_subnet = in_subnet;
        this.address = address;
        this.monitored = monitored;
        this.description = description;
        this.deviceType= deviceType;

        return this;
    }

    return ipAddress;
});
