const gulp = require('gulp');
const test = require('./index')

function css(){
    return gulp.src('./test/src/*.spec.*')
    .pipe(test())
    .pipe(gulp.dest('./test/dist'))
}

module.exports.css = css;