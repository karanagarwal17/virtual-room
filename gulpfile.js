var gulp = require('gulp');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var node;

var clientSources = [
  'public/css/**/*',
  'public/img/**/*',
  'public/*'
];
var clientJsSources = [
  'public/js/*'
];
var serverSources = [
  'models/*',
  'routes/*',
  'services/*',
  'index.js'
];

gulp.task('start', function() {
  if (node) node.kill()
  node = spawn('node', ['index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('browser-sync', function() {
	browserSync.init(clientSources, {
		server: {
			baseDir: "public/",
			index: "index.html"
		},
    proxy: "localhost:3000"
	});
});

gulp.task('browser-reload',function(){
  browserSync.reload();
});

gulp.task('watch',function(){
  gulp.watch(clientJsSources,['browser-reload']);
  gulp.watch(serverSources,['start'])
});

function runCommand(command) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if(err !== null) {
        console.log('exec error: ' + err);
      }
  });
}

gulp.task('default',['start','watch']);

process.on('exit', function() {
    if (node) node.kill();
})
