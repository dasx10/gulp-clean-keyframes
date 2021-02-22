const gulp = require('gulp');
module.exports.t=function(){
    return gulp.src('./test/src/*.spec.*').pipe(require('./index')()).pipe(gulp.dest('./test/dist'))
}