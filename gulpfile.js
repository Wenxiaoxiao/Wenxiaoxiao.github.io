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
const watch = require('gulp-watch');
const timestamp = (new Date()).getTime();
let NODE_ENV='1';
//定义css、js源文件路径
var cssSrc = 'm/lib/css/*.css',
    jsSrc = 'm/lib/js/*.js';

gulp.task('clean', function() {
    return del.sync(['dist/**/**/**/**']);
});

//copy
gulp.task('copy', function() {
    return gulp.src(['m/lib/**/*','!m/lib/*.js'])
        .pipe(gulp.dest('./dist/lib'))
});
gulp.task('copy:ico', function() {
    return gulp.src('m/*.ico')
        .pipe(gulp.dest('./dist'))
});

// Watchers
// gulp.task('watch',gulp.series(function(done){
//      w('m/**/*.html', 'fileinclude');
//     w('m/lib/*.js', 'js');
//     w('m/lib/*.js', 'js-lint');
//     w('./sass/main/**/*.scss', 'sass');

//     function w(path,task){
//         gulp.watch(path,[task]);
//         // watch(path, function (done) {
//         //     // gulp.start(task);
//         //     // done();
//         // });
//     }
//     done()
// }))
gulp.task('watch', function () {
    w('m/**/*.html', 'fileinclude');
    w('m/lib/*.js', 'js');
    w('m/lib/*.js', 'js-lint');
    w('./sass/main/**/*.scss', 'sass');

    function w(path,task){
        // gulp.watch(path,[task]);
        watch(path, function (done) {
            gulp.start(task);
            // done();
        });
    }
});
// gulp.task('start', gulp.series(gulp.parallel(connectServe, watchCode, openInBrowser)));
// 测试环境
// html模板
gulp.task('fileinclude', function(ab) {
    gulp.src(['m/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'dev',
                admain: 'https://devoutact.top',
                topic: 'https://devoutact.top',
                time: timestamp
            },
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
        ab()
});
// js
gulp.task('js', function(cb) {
    pump([
            gulp.src('m/lib/*.js'),
            preprocess({ context: { NODE_ENV: NODE_ENV} }),
            gulp.dest('./dist/lib/js')
        ],
        cb()
    );
});
// js
gulp.task('js-lint', function(cb) {
    pump([
            gulp.src('m/lib/*.js'),
            eslint({fix:true}),
            eslint.format(),
        ],
        cb()
    );
});
//scss
gulp.task('sass', function(ab) {
    gulp.src('./sass/main/**/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass())
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            overrideBrowserslist:['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/lib/css'));
        ab()
});

//正式环境
// html模板
gulp.task('fileinclude_build', function() {
    gulp.src(['m/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'build',
                admain: 'https://devoutact.top',
                topic: 'https://devoutact.top',
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
            gulp.src(['m/lib/*.js','!m/lib/questionnaire.js']),
            preprocess({ context: { NODE_ENV: NODE_ENV} }),
            stripDebug(),
            uglify(),
            gulp.dest('./dist/lib/js'),
        ],
        cb()
    );
});
gulp.task('js_exclude', function(cb) {
    pump([
            gulp.src(['m/lib/questionnaire.js']),
            preprocess({ context: { NODE_ENV: NODE_ENV} }),
            stripDebug(),
            gulp.dest('./dist/lib/js'),
        ],
        cb()
    );
});

gulp.task('task-dev', gulp.series('sass','fileinclude', 'copy','copy:ico','js', function (done) {
    done();
}));
gulp.task('task-lint', gulp.series('sass','fileinclude', 'copy','copy:ico','js-lint', function (done) {
    done();
}));
gulp.task('task-build', gulp.series('clean','sass_build', 'fileinclude_build','copy','copy:ico','js_build','js_exclude', function (done) {
    done();
}));
// gulp.task('watch',gulp.series(function(ab){
//     gulp.watch([
//         'm/**/*.html',
//         'm/**/*.htm',
//         'm/lib/*.js',
//         'm/sass/**/*.scss',
//     ], ['task-dev']);
//     ab()
// }));
// gulp.task("watch",gulp.series(function(ab){
//     gulp.watch('m/**/*.html','m/**/*.htm','m/lib/*.js','m/sass/**/*.scss',gulp.series("task-dev"))
//     ab()
// }))
// gulp.task("watch",function (done) {
//     gulp.watch('m/**/*.html','m/**/*.htm','m/lib/*.js','m/sass/**/*.scss',gulp.series("task-dev"))
//     done()
// });

var options = minimist(process.argv.slice(2), {string: ["rev"]});
// gulp.task('default', function(ab){
//     NODE_ENV='0';
//     //因为我没有你的gulpfile.js,所以我只能尝试使用gulp.series和gulp.parallel与你的gulp任务而不是run-sequence
//     //runSequence('task-dev','watch');
    
//     ab()
// }); 
gulp.task('default', gulp.series('task-dev','watch',function (done) {
    done();
}));
//测试环境
gulp.task('dev', gulp.series('clean','sass', 'fileinclude', 'copy', 'copy:ico','js', function (done) {
    done();
}));
//测试环境
gulp.task('pre', gulp.series('clean','sass', 'fileinclude', 'copy', 'copy:ico','js', function (done) {
    done();
}));
//测试环境
// gulp.task('test', function(){
//     runSequence('task-lint');
// }); 
gulp.task('test', gulp.series('task-lint', function (done) {
    // task 1 code here
    done();
}));
//测试环境
// gulp.task('build',function() {
//     runSequence('task-build');
// }); 
//正式环境
gulp.task('build', gulp.series('task-build', function (done) {
    // task 1 code here
    done();
}));
