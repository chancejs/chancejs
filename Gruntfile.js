module.exports = function (grunt) {
    var js_files = ['Gruntfile.js', 'chance.js', 'test/*.js'];

    grunt.initConfig({
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                expr: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                trailing: true,
                boss: true,
                eqnull: true,
                browser: true,
                white: false
            },
            globals: {
                exports: true,
                module: false
            },
            all: js_files
        },
        mocha_phantomjs: {
            all: ["test/runner.html"]
        },
        uglify: {
            my_target: {
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
