module.exports = function (grunt) {
    var glob = require('glob'),
        assetSource = require('./Assets.json'),
        testFilesPath = './tests/**/*.js',
        testFiles = glob.sync(testFilesPath, {}),
        _ = require('lodash'),
        fs = require('fs'),
        sourceFiles = ["./generated/js/templates.js"].concat(assetSource.js.files);

    if (_.isUndefined(fs.accessSync)) {
        fs.accessSync = fs.existsSync;
    }

    var filesToWatch = assetSource.js.files.concat([
        './templates/**/*.html',
        './templates/*.html',
        './Assets.json'
    ]);

    var config = {
        concat: {
            dist: {
                options: {
                    sourceMap: true,
                    banner: fs.readFileSync('./header.js', 'utf8'),
                    footer: fs.readFileSync('./footer.js', 'utf8')
                },
                src: sourceFiles,
                dest: assetSource.js.generatedFile
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'), // use jshint-stylish to make our errors look and read good
                validthis: true
            },
            files: assetSource.js.files
        },
        jst: {
            dist: {
                options: {
                    namespace: 'Templates',
                    compile: true,
                    processName: function (filepath) {
                        var lastSlash = filepath.lastIndexOf('/'),
                            fileName = filepath.substring(lastSlash + 1, filepath.length - 5);

                        return fileName;
                    }
                }
            }
        },
        jasmine: {
            src: testFilesPath,
            options: {
                vendor: [
                    "./node_modules/bootstrap-native/dist/polyfill.js",
                    "./node_modules/bootstrap-native/dist/bootstrap-native.js",
                    "./node_modules/taggle/src/taggle.js",
                    "./node_modules/flatpickr/src/flatpickr.js",
                    "./node_modules/underscore/underscore.js",
                    "./node_modules/backbone/backbone.js",
                    "./node_modules/backbone.nativeview/backbone.nativeview.js",
                    "./node_modules/backbone.collectionsubset/lib/backbone.collectionsubset.js",
                    "./node_modules/backbone.radio/build/backbone.radio.js",
                    "./node_modules/backbone.marionette/lib/backbone.marionette.js",
                    "./node_modules/lunr/lunr.js",
                    "./node_modules/pluralize/pluralize.js",
                    "./node_modules/ckeditor/ckeditor.js",
                    "./node_modules/simplemde/dist/simplemde.min.js",
                    assetSource.js.generatedFile,
                    './tests/testSetup.js'
                ]
            }
        },
        watch: {
            dist: {
                options: {
                    nospawn: true,
                    debounceDelay: 1000
                },
                files: filesToWatch,
                tasks: ['default']
            }
        }
    };

    config.jst.dist.files = {};
    config.jst.dist.files['./generated/js/templates.js'] = [
        './templates/**/*.html',
        './templates/*.html'
    ];

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-then');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', function () {
        grunt.task.run(['jshint', 'jst'])
            .then(function () {
             grunt.task.run(['concat'])
                 .then(function(){
                     if (testFiles.length > 0) {
                         grunt.task.run('jasmine');
                     }
                 });
            });
    });
};