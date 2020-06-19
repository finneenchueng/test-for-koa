const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
// const ts = require('gulp-typescript');
// const tsConfig = ts.createProject('./src/server/tsconfig.json');
// const gulpTslint = require('gulp-tslint');
// const cleanEntry = ['./src/server/config/index.ts'];
const cleanEntry = [];
const rename = require('gulp-rename');
// const gulpCopy = require('gulp-copy');
const eslint = require('gulp-eslint');
const babelConfig = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-transform-modules-commonjs'
  ]
};

const entry = './src/server/**/*.ts';

const { isDev, isLint, isProd } = require('./config/enviroment');

//开发环境
// function builddev() {
//   return watch(
//     entry,
//     {
//       ignoreInitial: false
//     },
//     function() {
//       gulp
//         .src(entry)
//         .pipe(
//           babel({
//             babelrc: false,
//             ...babelConfig
//           })
//         )
//         .pipe(gulp.dest('dist'));
//     }
//   );
// }
//上线环境
function buildprod() {
    return gulp
      .src(entry)
      .pipe(
        babel({
          babelrc: false,
          ignore: cleanEntry,
          ...babelConfig
        })
      )
      .pipe(gulp.dest('dist'));
  }
  //对代码进行检查的环境
  function buildlint() {
    return gulp
      .src(entry)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  }
  // function buildlint() {
  //   return gulp
  //     .src(_entry)
  //     .pipe(
  //       gulpTslint({
  //         formatter: 'stylish'
  //       })
  //     )
  //     .pipe(
  //       gulpTslint.report({
  //         allowWarnings: true
  //       })
  //     )
  //     .pipe(tsConfig())
  //     .pipe(gulp.dest('dist'));
  // }
  //清洗环境
  function buildconfig() {
    return gulp
      .src(entry)
      .pipe(
        rollup({
          output: {
            file: 'index.js',
            format: 'cjs'
          },
          plugins: [
            replace({
              'process.env.NODE_ENV': JSON.stringify('production')
            })
          ],
          input: cleanEntry
        })
      )
      .pipe(
        rename(function(path) {
          // path.extname = '.js';
        })
      )
      .pipe(gulp.dest('./dist'));
  }
  function builddev() {
    const sourceFiles = ['./package.json', './src/server/**'];
    //多重拷贝
    // const outputPath = 'some-other-dest/';
    return (
      gulp
        .src(sourceFiles)
        // .pipe(gulpCopy(outputPath))
        .pipe(gulp.dest('./dist'))
    );
  }
  let build = gulp.series(builddev);
  if (isProd) {
    build = gulp.series(buildprod, buildconfig);
  }
  if (isLint) {
    build = gulp.series(buildlint);
  }
  gulp.task('default', build);
