// Load plugins
const browsersync = require('browser-sync');
const del = require('del');
const gulp = require('gulp');
const hb = require('gulp-hb');
const prefix = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const tildeImporter = require('node-sass-tilde-importer');

// Define Paths
const path = {
  src: {
    root: 'src/',
    data: 'src/hbs/data/',
    hbs: 'src/hbs/**/*.hbs',
    pages: 'src/hbs/pages/',
    partials: 'src/hbs/partials/',
    helpers: 'src/hbs/helpers/',
    components: 'src/hbs/components/',
    scss: 'src/scss/',
  },
  dist: {
    root: 'dist/',
    css: 'dist/css/'
  }
};

// Config: SASS
var sassOptions = {
  outputStyle: 'expanded',
  importer: tildeImporter
};

// Config: Errors
const onError = function (err) {
  notify.onError({
    title: "Gulp",
    subtitle: "Failure!",
    message: "Error: <%= error.message %>",
    sound: "Basso"
  })(err);
  this.emit('end');
};

// Task: Clean /dist/ folder
function cleanDist() {
  return del(path.dist.root);
}

// Task: Build CSS
function css() {
  return gulp
    .src(path.src.scss + '*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass(sassOptions))
    .pipe(prefix())
    .pipe(gulp.dest(path.dist.css))
    .pipe(browsersync.stream());
}

// Task: Run Style Linting
function styleLint() {
  return gulp.src([
    path.src.scss + '**/*.scss'
  ])
    .pipe(stylelint({
      failAfterError: false,
      reportOutputDir: 'reports/lint',
      reporters: [
        { formatter: 'verbose', console: true }
      ],
      debug: true
    }));
}

// Task: Build HTML
function html() {
  return gulp
    .src(path.src.pages + '**/*.hbs')
    .pipe(hb({ debug: false })
      .partials(path.src.partials + '**/*.{hbs,js}')
      .helpers(path.src.helpers + '**/*.js')
      .data(path.src.data + '**/*.{js,json}')
    )
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(path.dist.root))
    .pipe(browsersync.stream());
}

// BrowserSync and server
function runBrowsersync(done) {
  browsersync.init({
    server: {
      baseDir: path.dist.root
    },
    port: 3000,
    notify: true
  });
  done();
}

// Watch files
function watchFiles() {
  gulp.watch(path.src.root + '**/*', html);
  gulp.watch(path.src.root + '**/*.scss', gulp.series(css, styleLint));
}

// Default
gulp.task('default', gulp.series(cleanDist, css, styleLint, html, gulp.parallel(watchFiles, runBrowsersync), function (done) {
  done();
}));
