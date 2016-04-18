var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var filerev = require('gulp-file-rev');
var gulpIf = require('gulp-if');
var filesize = require('gulp-filesize');
var merge = require('merge-stream');
var order = require('gulp-order');
var addsrc = require('gulp-add-src');

var paths = {
 concatsrc:  [
		    'bower_components/jquery/dist/jquery.js',
		    'bower_components/jquery-ui/jquery-ui.js',
		    'bower_components/jquery-searcher/dist/jquery.searcher.js',
                    'src/js/jquery.jqplot.js',
                    'src/js/jqplot.dateAxisRenderer.js',
                    'src/js/jqplot.cursor.js',
                    'src/js/jqplot.highlighter.js',
                    'src/js/jquery.tablesorter.js',
                    'bower_components/fastclick/lib/fastclick.js',
                    'bower_components/foundation/js/foundation.js',
                    'bower_components/Chart.js/Chart.js',
                    'bower_components/select2/dist/js/select2.js',
                    'src/js/datatables.js'
],
concatsrc2: []
};

gulp.task('concat', function () {
 return gulp
    .src('bower_components/jquery/dist/jquery.js')
    .pipe(addsrc.append('bower_components/jquery-ui/jquery-ui.js'))
    .pipe(addsrc.append('bower_components/jquery-searcher/dist/jquery.searcher.js'))
    .pipe(addsrc.append('src/js/jquery.jqplot.js'))
    .pipe(addsrc.append('src/js/jqplot.dateAxisRenderer.js'))
    .pipe(addsrc.append('src/js/jqplot.cursor.js'))
    .pipe(addsrc.append('src/js/jqplot.highlighter.js'))
    .pipe(addsrc.append('src/js/jquery.tablesorter.js'))
    .pipe(addsrc.append('bower_components/fastclick/lib/fastclick.js'))
    .pipe(addsrc.append('bower_components/foundation/js/foundation.js'))
    .pipe(addsrc.append('bower_components/Chart.js/Chart.js'))
    .pipe(addsrc.append('bower_components/select2/dist/js/select2.js'))
    .pipe(addsrc.append('src/js/datatables.js'))
    .pipe(concat('thirdpartylibs.min.js',{newLine: '\r\n'}))
    .pipe(gulp.dest('tmpdist/'))
    .pipe(gulp.dest('build/minified/'))
});


gulp.task('sass-default-theme', function () { // WARNING: potential duplicate task
  return gulp
    .src('scss/app.scss')
    .pipe(sass({includePaths:['bower_components/foundation/scss'] }))
    .pipe(rename('default.css'))
    .pipe(gulp.dest('../styles/'))
  ;
});

gulp.task('sass-theme01',  function () { // WARNING: potential duplicate task
  
  console.log('RUN::::sass-theme01');
  return gulp
    .src('scss/app-theme01.scss')
    .pipe(sass({includePaths:['bower_components/foundation/scss'] }))
    .pipe(rename('theme01.css'))
    .pipe(gulp.dest('../styles/'))
  ;
});

gulp.task('sass',gulp.parallel('sass-default-theme','sass-theme01'));

gulp.task('clean', function () {
  return gulp
    .src(['js/*','css/*', 'tmpdist/*', 'build/src/*', 'build/minified/*'], { read: false })
	       .pipe(clean());
  ;
});


gulp.task('copy',function() {
  return gulp.src([
    'tmpdist/*',
    'bower_components/jquery.cookie/jquery.cookie.js',
    'bower_components/jquery-placeholder/jquery.placeholder.js',
    'bower_components/modernizr/modernizr.js',
    'src/js/local.js'
  ])
    .pipe(copy('build/src/',{ prefix: 2 }));

});


gulp.task('uglify', function () {
  return gulp.src(['build/src/jquery.cookie.js','build/src/jquery.placeholder.js','build/src/modernizr.js','build/src/local.js'])
     .pipe(uglify())
     .pipe(rename({suffix: '.min' }))
     .pipe(gulp.dest('build/minified/'));
});


gulp.task('filerev', function () {
  return gulp.src('build/minified/*.min.js')
    .pipe(filerev())
    .pipe(gulp.dest('../js/'));
});





gulp.task('devpublish', gulp.series('clean','sass','concat','copy','uglify','filerev'));


