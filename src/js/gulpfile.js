var uglify_z = require('gulp-uglify');
var concat_z = require('gulp-concat');
var rename_z = require('gulp-rename');
var gulp = require('gulp');
var sass = require('gulp-sass'); 

gulp.task('compileSass',function(){
    //执行任务时,会执行这里的代码
    
    //在此把sass编译成css
    //2.找出cass文件
    gulp.src(['./src/js/*.scss'])  //返回一个文件

    //编译scss->css
    .pipe(sass({outputStyle:"compact"}).on('error',sass.logError))   //得到css文件流

    
    //输出到硬盘
    .pipe(gulp.dest('../css'))


});

//自动化编译
//
gulp.task('autoSass',function(){
    gulp.watch('./src/js/*.scss',['compileSass'])
})