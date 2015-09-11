module.exports = function (grunt) {
    var js_files = ['Gruntfile.js', 'chance.js', 'test/*.js'];

    grunt.initConfig({
        'js-test': {
            options: {
                coverage: true,
                coverageTool: 'istanbul',
                coverageFormat: 'lcov',
                identifier: 'chance-coverage',
                reporter: 'Spec',
                pattern: 'test/*.js'
            },
            watch: {
                options: {
                    coverage: false,
                    reporter: "Dot",
                    pattern: 'test/*.js',
                    root: '.'
                }
            }
        },
        jshint: {
            options: {
                // Enforcing
                curly: true,
                eqeqeq: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                undef: true,
                unused: true,

                // Relaxing
                boss: true,
                eqnull: true,
                expr: true,
                sub: true,

                // Environments
                browser: true,
                mocha: true,
                node: true,

                // Custom Globals
                globals: {
                    _: true,
                    chai: true,
                    chance: true,
                    Chance: true,
                    define: false,
                    mocha: true,
                    mochaPhantomJS: false,
                    phoneNumber: true,
                    unescape: true
                }
            },
            all: js_files
        },
        shell: {
            target: {
                command: 'cat coverage/chance-coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage'
            }
        },
        uglify: {
            dist: {
                options: {
                  sourceMap: true,
                  sourceMapName: 'dist/chance.min.js.map'
                },
                files: {
                    'dist/chance.min.js': ['chance.js']
                }
            }
        },
        watch: {
            options: { livereload: true },
            files: js_files,
            tasks: ['jshint', 'js-test:watch', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-js-test');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['js-test', 'shell']);
    grunt.registerTask('test-ci', ['jshint', 'js-test', 'shell']);
};
