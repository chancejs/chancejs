const gulp = require('gulp')
const ava = require('gulp-ava')
const eslint = require('gulp-eslint')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const pump = require('pump')

gulp.task('lint', () =>
    gulp.src(['**/*.js', '!node_modules/**', '!dist/**', '!test/helpers/**/*.js'])
        .pipe(eslint({
            parser: 'babel-eslint',
            rules: {
                // quotes: ['error', 'single'],
                'curly': 'error',
                'eqeqeq': 'error',
                'new-parens': 'error',
                'no-cond-assign': 'error',
                'no-console': 'error',
                'no-debugger': 'error',
                'no-empty': 'error',
                'no-fallthrough': 'error',
                'no-trailing-spaces': 'error',
                'no-mixed-spaces-and-tabs': 'error',
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
)

gulp.task('test', () =>
    gulp.src('test/**/*.js')
        .pipe(ava({ verbose: true }))
)

gulp.task('watch', () => {
    var watcher = gulp.watch(['chance.js', 'gulpfile.js', 'test/**/*.js'], ['lint', 'test'])
})

gulp.task('watch-lint', () => {
    var watcher = gulp.watch(['chance.js', 'gulpfile.js', 'test/**/*.js'], ['lint'])
})

gulp.task('build', function (cb) {
    pump([ gulp.src('chance.js'), sourcemaps.init(),
        rename('chance.min.js'), uglify(), sourcemaps.write('.'),
        gulp.dest('dist'),
    ], cb)
})

gulp.task('travis', ['lint', 'test'])

gulp.task('default', ['watch', 'lint', 'test'])
