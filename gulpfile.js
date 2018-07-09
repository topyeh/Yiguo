const gulp = require('gulp');
const connect = require('gulp-connect');
const minjs = require('gulp-uglify');
const amdOptimize = require("amd-optimize"); 
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('server', function(){
    connect.server({
        root: '',
        port: 89,
        livereload: true
    })
})

// gulp.task('rjs', function(){
//     gulp.src('./src/js/*.js')
//     .pipe(amdOptimize('index', {
//         paths: {
//             'index': './index',
//             'http': './httpclient',
//             'jquery': './jquery',
//             'spinner': './spinner'
//         }
//     }))
//     .pipe(concat('index.js'))
//     .pipe(gulp.dest('./dist'))
//     .pipe(rename('index.min.js'))
//     .pipe(minjs())
//     .pipe(gulp.dest('./dist'))
// })

gulp.task('sass', function(){
    gulp.src('./src/sass/*.scss')
    // .pipe(concat('common.scss'))
    // .pipe(gulp.dest('./css'))
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('autobuild', function(){
    gulp.watch('./src/*.html', function(){
        gulp.src('./src/*.html').pipe(connect.reload())
    })
    // gulp.watch('./src/js/*.js', ['rjs']);
    gulp.watch('./src/sass/*.scss', ['sass']);
})

gulp.task('default', ['server', 'sass', /*'rjs',*/ 'autobuild']);