const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const header = require('gulp-header');
const pkgJSON = require("./package.json");

const comment = 
`/**
* @name olum-writer
* @version ${pkgJSON.version}
* @copyright 2021
* @author Eissa Saber
* @license MIT
*/
`;

gulp.task("compile", () => {
  return gulp
    .src("./src/olum-writer.js")
    .pipe(concat("olum-writer.min.js"))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(uglify())
    .pipe(header(comment))
    .pipe(gulp.dest("dist"));
});
gulp.task("copy", () => gulp.src("./src/olum-writer.js").pipe(gulp.dest("dist")));

gulp.task("default", gulp.series(["compile", "copy"]));
