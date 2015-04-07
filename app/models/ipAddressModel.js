angcelor.factory('ipAddress', function() {

    function ipAddress(name, address, monitored, description, deviceType) {
        this.name = name;
        this.address = address;
        this.monitored = monitored;
        this.description = description;
        this.deviceType= deviceType;
    }


    /*
     * Gives a instance method to build the ip Address
     * object as if it was a static method.
     */
    ipAddress.build = function(data) {
        return new ipAddress(
            data.name,
            data.address,
            data.monitored,
            data.description,
            data.deviceType
        );
    };

    return ipAddress;
});
