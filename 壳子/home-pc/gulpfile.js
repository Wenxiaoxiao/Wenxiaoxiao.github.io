
//方法名
var gulp = require('gulp');
var fileinclude  = require('gulp-file-include');//html合并
var del = require('del');//删除
var runSequence = require('run-sequence');//控制多个任务进行顺序执行
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');//图片压缩
var plumber = require('gulp-plumber');//错误处理
var stripDebug = require('gulp-strip-debug');//去掉打印
var uglify = require('gulp-uglify');//js压缩
var pump = require('pump');//流连接
var minifycss=require('gulp-minify-css');  //css压缩
var revs = require('gulp-rev-append');//生成版本号
sass.compiler = require('node-sass');

var spritesmith=require('gulp.spritesmith');//精灵图

//定义css、js源文件路径
var cssSrc = 'src/lib/css/*.css',
    jsSrc = 'src/lib/js/*.js';
    
var sprites=['sprite-index'];//精灵图数量

gulp.task('clean', function(){
    return del.sync(['dest/**/**/**/**' ]);
});

gulp.task('fileinclude', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'test',
                admain:''
            },
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dest'));
});
//精灵图自动生成
gulp.task('sprites', function () {
    let _sprite;
    for(let k in sprites){
        _sprite= sprites[k]
        gulp.src('./src/lib/sprites/'+_sprite+'/**.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'lib/images/'+_sprite+'.png',//保存合并后图片的地址
            cssName: 'lib/css/'+_sprite+'.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate:"./src/lib/sprites/handlebarsStrs.css"//注释2
        }))
        // .pipe(minifycss())
        .pipe(gulp.dest('./dest'));
    }
    
});
gulp.task('fileinclude-dev', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'dev',
                admain:''
            },
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(revs())
        .pipe(gulp.dest('./dest'));
});


//测试环境
gulp.task('copy',function() {
    return gulp.src('src/lib/**/*')
        .pipe(gulp.dest('./dest/lib'))
});
//正式环境
gulp.task('copy_img',function() {
    return gulp.src('src/lib/images/**')
        .pipe(gulp.dest('./dest/lib/images'))
});
gulp.task('copy_font',function() {
    return gulp.src('src/lib/fonts/*')
        .pipe(gulp.dest('./dest/lib/fonts'))
});
gulp.task('copy_iconfont',function() {
    return gulp.src('src/lib/iconfont/*')
        .pipe(gulp.dest('./dest/lib/iconfont'))
});
gulp.task('copy_css',function() {
    return gulp.src('src/lib/css/*')
        .pipe(minifycss())
        .pipe(gulp.dest('./dest/lib/css'))
});
gulp.task('copy_notjs',function() {
    return gulp.src('src/lib/js/**/*')
        .pipe(gulp.dest('./dest/lib/js/'))
});
gulp.task('copy_layer',function() {
    return gulp.src('src/lib/layer/**/*')
        .pipe(gulp.dest('./dest/lib/layer/'))
});

gulp.task('js', function (cb) {
    pump([
            gulp.src('src/lib/js/*.js'),
            stripDebug(),
            uglify(),
            gulp.dest('./dest/lib/js')
        ],
        cb
    );
});

gulp.task('copy:ico',function() {
    return gulp.src('src/*.ico')
        .pipe(gulp.dest('./dest'))
});

//测试环境
gulp.task('compass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('dest/lib/css'));
});
//正式环境
gulp.task('compass_dev', function() {
    return gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest('dest/lib/css'))
});


// Images   gulp images
gulp.task('testImagemin', function() {
    return gulp.src('src/lib/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ], {
            verbose: true
        }))
        .pipe(gulp.dest('dest/lib/images'))
});


gulp.task('task-name', function() {
    runSequence(['compass','fileinclude','sprites','copy','copy:ico']);
});
gulp.task('task-name-dev', function() {
    runSequence(['clean'],['compass_dev','fileinclude-dev','sprites','copy_notjs','copy_img','copy_css','copy_font','copy_layer','copy_iconfont','copy:ico'],['js']);
});

// Watchers
gulp.task('watch', function() {
    gulp.watch([
        'src/**/*.html',
        'src/**/*.htm',
        'src/lib/**',
        'sass/**/*.scss',
    ],['task-name']);
});


//gulp images
gulp.task('default', ['task-name','watch']);//测试环境
gulp.task('dev',['task-name-dev']);//正式环境