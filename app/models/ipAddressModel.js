angcelor.factory('ipAddress', function() {

    function ipAddress(name, in_subnet, address, monitored, description, deviceType) {
        this.dns = name;
        this.in_subnet = in_subnet;
        this.ipv4_address = address;
        this.monitor = monitored;
        this.description = description;
        this.device_type= deviceType;

        return this;
    }

    return ipAddress;
});
