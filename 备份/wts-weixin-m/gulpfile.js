//方法名
const gulp = require('gulp');
const path = require('path')
const fs = require('fs');
const glob = require('glob');
const fileinclude = require('gulp-file-include'); //html合并
const del = require('del'); //删除
const runSequence = require('run-sequence'); //控制多个任务进行顺序执行
// const compass = require('gulp-compass'); //scss合并
const plumber = require('gulp-plumber'); //错误处理
const preprocess = require("gulp-preprocess"); //js模板处理
const stripDebug = require('gulp-strip-debug'); //去掉打印
const uglify = require('gulp-uglify'); //js压缩
const pump = require('pump'); //流连接
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
// const babel = require("gulp-babel");
const minimist = require('minimist');//获取命令行参数
const timestamp = (new Date()).getTime();
let NODE_ENV='1';
//定义css、js源文件路径
var cssSrc = 'src/lib/css/*.css',
    jsSrc = 'src/lib/js/*.js';

gulp.task('clean', function() {
    return del.sync(['dist/**/**/**/**']);
});

//copy
gulp.task('copy', function() {
    return gulp.src(['src/lib/**/*','!src/lib/units/*.js'])
        .pipe(gulp.dest('./dist/lib'))
});
gulp.task('copy:ico', function() {
    return gulp.src('src/*.ico')
        .pipe(gulp.dest('./dist'))
});

// 测试环境
// html模板
gulp.task('fileinclude', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'dev',
                admain: 'https://bx.wts9999.net',
                topic: 'https://topic.wts9999.net',
                time: timestamp
            },
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});
// js
gulp.task('js', function(cb) {
    pump([
            gulp.src('src/lib/units/*.js'),
            preprocess({ context: { NODE_ENV: NODE_ENV} }),
            gulp.dest('./dist/lib/units')
        ],
        cb
    );
});
// js
gulp.task('js-lint', function(cb) {
    pump([
            gulp.src('src/lib/units/*.js'),
            eslint({fix:true}),
            eslint.format(),
        ],
        cb
    );
});
//scss
gulp.task('sass', function() {
    gulp.src('./sass/main/**/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/lib/css'));
});

//正式环境
// html模板
gulp.task('fileinclude_build', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'build',
                admain: 'https://bx.wts999.com',
                topic: 'https://topic.wts999.com',
                time: timestamp
            },
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});
//scss
gulp.task('sass_build', function() {
    gulp.src('./sass/main/**/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/lib/css'))
});
// js
gulp.task('js_build', function(cb) {
    pump([
            gulp.src(['src/lib/units/*.js','!src/lib/units/questionnaire.js']),
            preprocess({ context: { NODE_ENV: NODE_ENV} }),
            stripDebug(),
            uglify(),
            gulp.dest('./dist/lib/units'),
        ],
        cb
    );
});
gulp.task('js_exclude', function(cb) {
    pump([
            gulp.src(['src/lib/units/questionnaire.js']),
            preprocess({ context: { NODE_ENV: NODE_ENV} }),
            stripDebug(),
            gulp.dest('./dist/lib/units'),
        ],
        cb
    );
});


gulp.task('task-dev', function() {
    runSequence(['sass', 'fileinclude', 'copy', 'copy:ico','js']);
});
gulp.task('task-lint', function() {
    runSequence(['sass', 'fileinclude', 'copy', 'copy:ico','js-lint']);
});
gulp.task('task-build', function() {
    runSequence(['clean'], ['sass_build', 'fileinclude_build', 'copy', 'copy:ico','js_build','js_exclude']);
});

// Watchers
gulp.task('watch', function() {
    gulp.watch([
        'src/**/*.html',
        'src/**/*.htm',
        'src/lib/units/*.js',
        'sass/**/*.scss',
    ], ['task-dev']);
});

var options = minimist(process.argv.slice(2), {string: ["rev"]});
gulp.task('default', function(){
    NODE_ENV='0';
    runSequence('task-dev','watch');
}); //测试环境
gulp.task('dev', function(){
    NODE_ENV='0';
    runSequence(['clean'],['sass', 'fileinclude', 'copy', 'copy:ico','js']);
}); //测试环境
gulp.task('pre', function(){
    NODE_ENV='2';
    runSequence(['clean'],['sass', 'fileinclude', 'copy', 'copy:ico','js']);
}); //测试环境
gulp.task('test', function(){
    runSequence('task-lint');
}); //测试环境
gulp.task('build',function() {
    runSequence('task-build');
}); //正式环境
