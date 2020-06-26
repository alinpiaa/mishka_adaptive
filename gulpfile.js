const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const include = require('posthtml-include');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const posthtml = require('gulp-posthtml');
const rename = require('gulp-rename');
const sourcemap = require('gulp-sourcemaps');
const svgstore = require('gulp-svgstore');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const server = browserSync.create();

function html() {
    return src('src/*.html')
        .pipe(posthtml([
            include()
        ]))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('./build'));
}

function css() {
    return src('src/less/style.less')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer(),
        ]))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(sourcemap.write('.'))
        .pipe(dest('build/css'))
        .pipe(server.stream());
}

function js() {
    return src('src/js/**/*.js')
        .pipe(sourcemap.init())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemap.write('.'))
        .pipe(dest('build/js'))
        .pipe(server.stream());
}

function images() {
    return src('src/img/**/*.{png,jpg,svg}')
        .pipe(
            imagemin([
                imagemin.optipng({
                    optimizationLevel: 3
                }),
                imagemin.mozjpeg({
                    progressive: true
                })
            ])
        )
        .pipe(dest('build/img'));
}

function toWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp({
            quality: 90
        }))
        .pipe(dest('build/img/webp'));
}

function svgSprite() {
    return src('src/img/icon-*.svg')
        .pipe(imagemin([
            imagemin.svgo()
        ]))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(dest('build/img'));
}

function fonts() {
    return src('src/fonts/**/*.{woff,woff2}', {
        base: 'src' 
    })
        .pipe(dest('build'));
}

function clean(done) {
    del('build');

    done();
}

function refresh(done) {
    server.reload();

    done();
}

function serve() {
    server.init({
        server: 'build/',
        injectChanges: true,
        notify: false,
        open: true,
        cors: true,
        port: '3000',
        ui: false
    });

    watch('src/*.html', series(html, refresh));
    watch('src/less/**/*.less', css);
    watch('src/js/**/*.js', series(js, refresh));
    watch('src/fonts/**/*.{woff,woff2}', series(fonts, refresh));
    watch('src/img/**/*.{png,jpg}', series(images, toWebp, refresh));
    watch('src/img/**/*.svg', series(images, refresh));
    watch('src/img/**/icon-*.svg', series(svgSprite, html, refresh));
}

const build = series(clean, svgSprite, html, parallel(css, js, fonts, images, toWebp));
const start = series(build, serve);

exports.clean = clean;
exports.build = build;
exports.start = start;