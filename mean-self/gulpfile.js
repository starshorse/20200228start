var gulp = require('gulp')
var concat = require('gulp-concat')
gulp.task('hello', function (done) {
    console.log('hello world')
    done();
    })
gulp.task('js', function (done) {
    gulp.src('ng/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets'))
    done();
})
