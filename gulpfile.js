var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');		// 压缩 html
var imagemin = require('gulp-imagemin');		// 压缩 image
var uglify = require('gulp-uglify');			// 压缩js 代码
var concat = require('gulp-concat');      		// 将多个js文件合并成一个js文件， 接收一个参数，(合并后的路径js文件名)
var stripDebug = require('gulp-strip-debug');    //  去除 debugger console.log 等调试代码
var deporder = require('gulp-deporder');      // js文件合并  默认是按照字母顺序的，该插件通过 /*requires: xxx.js*/的形式，将xxx.js提前
var less = require('gulp-less');
var postcss = require('gulp-postcss');    		// css 插件组
var autoprefixer = require('autoprefixer');		// css 代码补前缀（css3）
var cssnano = require('cssnano');				// css 压缩
var connect = require('gulp-connect');     		// 打包到服务器
var folder = {
	src: './src/',
	dist: './dist/'
};

var devMode = process.env.NODE_ENV !== 'production';   // node环境变量 
gulp.task('html', function () {
	var page = gulp.src(folder.src + 'html/*')
				    .pipe(connect.reload());
	if(!devMode) {
		page.pipe(htmlclean());
	}	
	page.pipe(gulp.dest(folder.dist + 'html'));
});

gulp.task('images', function () {
	var image = gulp.src(folder.src + 'images/*')
					.pipe(connect.reload());
	if(!devMode) {
		image.pipe(imagemin());
	}	
	image.pipe(gulp.dest(folder.dist + 'images'));
});
gulp.task('js', function () {
	var js = gulp.src(folder.src + 'js/*')
					.pipe(connect.reload());
	if(!devMode) {
		js.pipe(deporder())
			.pipe(concat('main.js'))
			.pipe(stripDebug())
			.pipe(uglify())
	}
	js.pipe(gulp.dest(folder.dist  + 'js'));
});

gulp.task('css', function () {
	var css = gulp.src(folder.src + 'css/*')
					.pipe(connect.reload())
					.pipe(less());
	var options = [autoprefixer()];
	if(!devMode) {
		options.push(cssnano());
	}
	css.pipe(postcss(options))
		.pipe(gulp.dest(folder.dist + 'css'))
});

gulp.task('watch', function () {
	gulp.watch(folder.src + 'html/*', ['html']);
	gulp.watch(folder.src + 'js/*', ['js']);
	gulp.watch(folder.src + 'css/*', ['css']);
	gulp.watch(folder.src + 'images/*', ['images']);
});

gulp.task('server', function () {
	connect.server({
		port: '8081',
		livereload: true
	});
})
gulp.task('default', ['images', 'html', 'css', 'js', 'watch', 'server'], function () {
	console.log(1111);
})
