module.exports = function (grunt) {
    var js_files = ['Gruntfile.js', 'chance.js', 'test/*.js'];

    grunt.initConfig({
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
                    define: false,
                    mochaPhantomJS: false,
                    chance: true
                }
            },
            all: js_files
        },
        mocha_phantomjs: {
            all: ["test/runner.html"]
        },
        uglify: {
            my_target: {
                options: {
                  sourceMap: true,
                  sourceMapName: 'chance.min.js.map'
                },
                files: {
                    'chance.min.js': ['chance.js']
                }
            }
        },
        watch: {
            options: { livereload: true },
            files: js_files,
            tasks: ['jshint', 'mocha_phantomjs', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['mocha_phantomjs']);
};
