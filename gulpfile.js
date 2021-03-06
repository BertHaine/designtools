var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});


/**
 * Compile files from js folder into both _site/js folder (for live injecting)
 */
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
  .pipe(gulp.dest('_site/js'))
  .pipe(browserSync.reload({stream:true}));
  });


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['_scss/**/*.scss','_scss/*.scss'], ['sass']);
    gulp.watch(['js/*.js'], ['scripts']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*', '_data/*'], ['jekyll-rebuild']);
});



// ============================= PROD ============================== //

// Build the Jekyll Site in production mode
gulp.task('jekyll-prod', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done);
  });

gulp.task('styles-prod', function () {
  return gulp.src('_scss/*.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
    }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(gulp.dest('_site/css'))
  .pipe(gulp.dest('css'));
  });

gulp.task('scripts-prod', function() {
  return gulp.src(['js/*.js'])
  .pipe(gulp.dest('_site/js'));
  });


gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('_site/fonts'));
  });

// Default task, running just gulp will compile the sass, compile the Jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);

// Build task, run using gulp build to compile Sass and Javascript ready for deployment.
gulp.task('build', ['styles-prod', 'scripts-prod', 'fonts', 'jekyll-prod']);