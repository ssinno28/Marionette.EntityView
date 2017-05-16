module.exports = function (grunt) {
    var glob = require('glob'),
        assetSource = require('./Assets.json'),
        testFilesPath = './tests/**/*.js',
        testFiles = glob.sync(testFilesPath, {}),
        _ = require('lodash'),
        fs = require('fs');

    if (_.isUndefined(fs.accessSync)) {
        fs.accessSync = fs.existsSync;
    }

    var filesToWatch = assetSource.js.files.concat([
        './' + assetSource.js.template,
        './templates/**/*.html',
        './templates/*.html',
        './Assets.json'
    ]);

    var config = {
        concat: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'generated/js/main.js.map'
                },
                src: assetSource.js.files,
                dest: './generated/js/main.js'
            }
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
                    "./node_modules/jquery/dist/jquery.js",
                    "./node_modules/bootstrap/dist/js/bootstrap.js",
                    "./node_modules/moment/moment.js",
                    "./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js",
                    "./node_modules/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js",
                    "./node_modules/@danielfarrell/bootstrap-combobox/js/bootstrap-combobox.js",
                    "./node_modules/underscore/underscore.js",
                    "./node_modules/backbone/backbone.js",
                    "./node_modules/backbone.collectionsubset/lib/backbone.collectionsubset.js",
                    "./node_modules/backbone.radio/build/backbone.radio.js",
                    "./node_modules/backbone.marionette/lib/backbone.marionette.js",
                    "./node_modules/lunr/lunr.js",
                    "./node_modules/pluralize/pluralize.js",
                    "./node_modules/ckeditor/ckeditor.js",
                    "./node_modules/ckeditor/adapters/jquery.js",
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
        grunt.task.run(['concat', 'jst'])
            .then(function () {
                var content = fs.readFileSync('./generated/js/main.js', 'utf8'),
                    templates = fs.readFileSync('./generated/js/templates.js', 'utf8'),
                    template = fs.readFileSync(assetSource.js.template, 'utf8'),
                    fileContent = grunt.template.process(template, {
                        data: {
                            content: content,
                            templates: templates
                        }
                    });

                grunt.file.write(assetSource.js.generatedFile, fileContent);
                if (testFiles.length > 0) {
                    grunt.task.run('jasmine');
                }
            });
    });
};