var gulp = require('gulp');
var babel = require('gulp-babel'); // 语法转换
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');//重命名
var uglify = require('gulp-uglify');//js压缩
var concat = require('gulp-concat'); // 合并
var sass = require('gulp-sass') // scc编译
var del = require('del');

// js 
gulp.task('js', async () => {
    await gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js"}))
        .pipe(gulp.dest('dist/js'))
});

//scss
gulp.task("scss", async () => {
    await gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest('dist/css'))
});

//css
gulp.task("css", async () => {
    await gulp.src('./src/css/*.css')
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest('dist/css'))
});

// clean
gulp.task('clean', async ()=>{
    await del(['dist/*']);
});

//watch
gulp.task('watch', async ()=>{
    gulp.watch('./src/scss/*.scss', gulp.series('scss'))
    gulp.watch('./src/css/*.css', gulp.series('css'))
    gulp.watch('./src/js/*.js', gulp.series('js'))
})

//gulp.series是串行 gulp.parallel是并行
gulp.task('default',gulp.series('clean',gulp.parallel('js','css','scss')),'watch');
