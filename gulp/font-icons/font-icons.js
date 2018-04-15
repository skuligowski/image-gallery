module.exports = gulp => {
  gulp.task(`icons`, function() {
    const iconFont = require('gulp-iconfont');
    const consolidate = require('gulp-consolidate');
    gulp.src('src/assets/icons/*.svg')
      .pipe(iconFont({
        fontName: 'icons.121212',
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
            timestamp: '121212'
          }))
          .pipe(gulp.dest(`src/assets/css`));
      })
      .pipe(gulp.dest('src/assets/fonts'))
  });
};
