# GULP CLEAN KEYFRAMES

Cleans up unused @keyfarames


## instal 
```
npm i -D gulp-clean-keyfarames
```

## use 

```
const gulp = require('gulp');
const keyfarames = require('gulp-clean-keyfarames')

function css(){
    return gulp.src('./src/*.css')
    .pipe(keyfarames())
    .pipe(gulp.dest('./dist'))
}

module.exports.css = css;
```