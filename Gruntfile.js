module.exports = function(grunt) {
    grunt.initConfig({
        shell: {
            'mocha-phantomjs': {
                command: './node_modules/mocha-phantomjs/bin/mocha-phantomjs test/runner.html',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['shell:mocha-phantomjs']);
};
