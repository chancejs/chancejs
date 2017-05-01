const gulp = require('gulp')
const eslint = require('gulp-eslint')
const ava = require('gulp-ava')

gulp.task('lint', () =>
    gulp.src(['chance.js', 'gulpfile.js', 'test/**/*.js'])
        .pipe(eslint({
            parser: 'babel-eslint',
            rules: {
                // quotes: ['error', 'single'],
                'no-trailing-spaces': 'error',
                'no-console': 'error'
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

gulp.task('travis', ['lint', 'test'])

gulp.task('default', ['watch', 'lint', 'test'])
