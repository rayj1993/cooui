let gulp = require('gulp');
// let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
// let raname = require('gulp-rename');
let less = require('gulp-less');
let cleanCss = require('gulp-clean-css');

gulp.task('js', function () {
    return gulp.src('src/modules/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/modules/'))
})

gulp.task('less', function () {
    return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
})

gulp.task('watch',function(){
    return gulp.watch('src/less/**/*.less',['less']);
})

gulp.task('css',['less'], function () {
    return gulp.src('src/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css/'))
})


 //gulp.series|4.0 依赖
 //gulp.parallel|4.0 多个依赖嵌套 ,'css'

gulp.task('default', ['js','less','css']);
