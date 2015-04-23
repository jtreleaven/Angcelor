"use strict";

module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require("load-grunt-tasks")(grunt);

    // load configurations within grunt/
    require("load-grunt-config")(grunt);

    // Actually load this plugin"s task(s).
    grunt.loadNpmTasks('grunt-angular-architecture-graph');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'app/*.js',
                    'app/controllers/*.js',
                    'app/directives/*.js',
                    'app/models/*.js',
                    'app/services/*.js'
                ],
                dest: 'angcelor.js'
            }
        },
        angular_architecture_graph: {
            diagram: {
                files: {
                    // "PATH/TO/OUTPUT/FILES": ["PATH/TO/YOUR/FILES/*.js"]
                    "architecture": [
                        "angcelor.js"
                    ]
                }
            }
        }
    });


    grunt.registerTask('default', ['concat', 'angular_architecture_graph']);

};
