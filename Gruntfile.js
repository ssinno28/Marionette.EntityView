module.exports = function (grunt) {
    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                options: {
                    separator: ';',
                    sourceMap: true
                },
                src: [
                    './util/formValidator.js',
                    './util/timeoutUtil.js',
                    './util/uriUtil.js',
                    
                ],
                dest: './generated/js/main.js'
            }
        },

        watch: {
            js: {
                files: ['./*.js'],
                tasks: ['concat:js']
            }
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // dev task
    grunt.registerTask('dev', ['concat']);
};
/**
 * Created by Sammi on 5/6/2016.
 */
