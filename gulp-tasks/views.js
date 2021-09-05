'use strict';

import { paths } from "../gulpfile.babel";
import gulp from 'gulp';
import browsersync from 'browser-sync';
import gulpfilter from 'gulp-filter';

gulp.task('views', () => {
    return gulp.src(paths.src.html)
        .pipe(gulpfilter((file) => {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(gulp.dest(paths.build.general))
        .on('end', browsersync.reload);
});
