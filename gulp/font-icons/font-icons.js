module.exports = gulp => {
  gulp.task(`icons`, function() {
    const iconFont = require('gulp-iconfont');
    const consolidate = require('gulp-consolidate');
    const timestamp = new Date().getTime();
    gulp.src('client/src/assets/icons/*.svg')
      .pipe(iconFont({
        fontName: `icons.${timestamp}`,
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
        timestamp: 121212,
        normalize: true,
        fontHeight: 1000,
        descent: 128
      }))
      .on('glyphs', function(glyphs) {
        gulp.src('gulp/font-icons/icons.css')
          .pipe(consolidate('lodash', {
            glyphs: glyphs,
            fontName: 'icons',
            fontPath: 'assets/fonts/',
            className: 'icon',
            timestamp: timestamp,
          }))
          .pipe(gulp.dest(`client/src/assets/css`));
      })
      .pipe(gulp.dest('client/src/assets/fonts'))
  });
};
