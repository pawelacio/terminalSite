const   gulp = require( 'gulp' ),
        sass = require( 'gulp-sass' ),
        cssnano = require( 'gulp-cssnano' ),
        autoprefixer = require( 'gulp-autoprefixer' ),
        plumber = require( 'gulp-plumber' ),
        babel = require( 'gulp-babel' ),
        concat = require( 'gulp-concat' ),
        uglify = require('gulp-uglify'),
        watch = require( 'gulp-watch' );

const onError = function( err ) {
  console.log( err )
  // gutil.beep()
  this.emit( 'end' )
}
const sassOptions = {
  outputStyle: 'compressed'
  //outputStyle: 'compact'
}
const autoprefixerOptions = {
  browsers: ['last 15 versions'],
  cascade: false
}
// CSS task
gulp.task( 'css', function() {
  return gulp.src( './_src/scss/main.scss' )
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass( sassOptions ) )
    .pipe( autoprefixer( autoprefixerOptions ) )
    .pipe( cssnano() )
    .pipe( gulp.dest( './dist/css' ) )
} )


gulp.task( 'js', function() {
    return gulp.src( [
      './_src/js/**/*.js'
    ] )
      .pipe( concat( 'class.js' ) )
      .pipe( babel( {
        presets: [ 'env' ]
      } ) )
      // .pipe(uglify())
      .pipe( gulp.dest( './dist/js/' ) )

  } )

gulp.task( 'watch', [ 'css', 'js' ], function() {
    gulp.start( 'js' )
    gulp.watch( [ './_src/scss/**/*.scss' ], [ 'css' ] )
    gulp.watch( [ './_src/js//**/*' ], [ 'js' ] )
  } )
  
  // default tasks
  gulp.task( 'default', [ 'css', 'js-vendors-raw', 'js-vendors', 'js-class' ], function() {
    gulp.start( 'js' )
  } )
