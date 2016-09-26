var gulp = require('gulp')
var clean = require('gulp-clean')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var browserify = require('browserify')
var fs = require('fs')

function standalone(name, entry) {
  return browserify(entry, { debug: true, standalone: name })
    .bundle()
    .pipe(fs.createWriteStream('./dist/'+ name +'.js'))
}

gulp.task('bundle:snabbdom', function() {
  return standalone('snabbdom', './snabbdom.js')
})

gulp.task('bundle:snabbdom:h', function() {
  return standalone('h', './h.js')
})

gulp.task('bundle:module:class', function() {
  return standalone('snabbdom_class', './modules/class.js')
})

gulp.task('bundle:module:props', function() {
  return standalone('snabbdom_props', './modules/props.js')
})

gulp.task('bundle:module:attributes', function() {
  return standalone('snabbdom_attributes', './modules/attributes.js')
})

gulp.task('bundle:module:style', function() {
  return standalone('snabbdom_style', './modules/style.js')
})

gulp.task('bundle:module:eventlisteners', function() {
  return standalone('snabbdom_eventlisteners', './modules/eventlisteners.js')
})

gulp.task('bundle', [
  'bundle:snabbdom',
  'bundle:snabbdom:h',
  'bundle:module:attributes',
  'bundle:module:class',
  'bundle:module:props',
  'bundle:module:style',
  'bundle:module:eventlisteners'
])

gulp.task('compress', ['bundle'], function() {
  return gulp.src('dist/*.js')
    .pipe(sourcemaps.init())    
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function() { 
	return gulp.src('dist/*.js', {read: false})
		.pipe(clean())
})

gulp.task('default', ['bundle'])
