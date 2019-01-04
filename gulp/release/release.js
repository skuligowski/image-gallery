module.exports = gulp => {
  gulp.task(`release`, function() {
    const ignore = require('gulp-ignore');
    gulp.src(['server/**/*', '!server/node_modules', '!server/node_modules/**'])      
      .pipe(gulp.dest('dist'));
  });
};
