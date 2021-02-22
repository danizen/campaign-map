const gulp = require('gulp');
const concat = require('gulp-concat');
const { spawn } = require('child_process');
const del = require('del');

gulp.task('clean', function() {
    return del(['dest']);
});

gulp.task('genlore', function(cb) {
    var PIPE = {stdio: 'inherit'};
    spawn('python', ['genlore.py', '-o', 'src/js/lore.js'], PIPE).on('close', cb);
});

gulp.task('styles', function() {
    return gulp.src([
        'src/css/*.css',
    ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./dest/css'));
});

gulp.task('scripts', function() {
    return gulp.src([
        'node_modules/leaflet/dist/leaflet.js',
        'node_modules/leaflet-draw/dist/leaflet.draw.js',
        'src/js/*.js',
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dest/js'));
});

gulp.task('default',
    gulp.series('styles', 'genlore', 'scripts')
);
