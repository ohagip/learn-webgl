import path from 'path';
import gulp from 'gulp';
import del from 'del';
import config from '../config';

import { server, reloadServer } from './server';
import { clean } from './clean';
import copy from './copy';
import views from './views';
import { scripts, scriptLibs } from './scripts';
import styles from './styles';
import images from './images';

const defaultTasks = [];

function watchDefault(callback) {
  config.isWatch = true;

  const imagesWatcher = gulp.watch(
    config.paths.image.watch,
    gulp.series(images, reloadServer),
  );
  const staticWatcher = gulp.watch(
    config.paths.static.watch,
    gulp.series(copy, reloadServer),
  );

  gulp.watch(
    config.paths.view.watch,
    gulp.series(views, reloadServer),
  );
  gulp.watch(
    config.paths.style.watch,
    gulp.series(styles, reloadServer),
  );
  gulp.watch(
    config.paths.script.watch,
    gulp.series(scripts, reloadServer),
  );

  imagesWatcher.on('unlink', (filePath) => {
    const filePathFromSrc = path.relative(config.paths.image.dir, filePath);
    const destFilePath = path.resolve(config.paths.image.dist, filePathFromSrc);
    del.sync(destFilePath);
  });
  staticWatcher.on('unlink', (filePath) => {
    const filePathFromSrc = path.relative(config.paths.static.dir, filePath);
    const destFilePath = path.resolve(config.paths.static.dist, filePathFromSrc);
    del.sync(destFilePath);
  });

  callback();
}

defaultTasks.push(watchDefault);
defaultTasks.push(server);

exports.default = gulp.series.apply(this, defaultTasks);

exports.build = gulp.series(
  clean,
  gulp.parallel(
    copy,
    views,
    scripts,
    scriptLibs,
    styles,
    images,
  ),
);