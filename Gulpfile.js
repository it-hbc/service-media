var gulp = require('gulp');

gulp.task('default', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/bootstrap/dist/js/bootstrap.bundle.js',])
        .pipe(gulp.dest('app/public/javascripts'))
})