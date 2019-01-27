module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({

    clean: {
      options: { force: true },
      stuff : ['dist','D:/Dev/grafana-5.4.3/data/plugins/grafana-flowcharting']
    },

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss', '!img/**/*'],
        dest: 'dist'
      },
      js_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*.js'],
        dest: 'dist'
      },
      libs_to_dist: {
        cwd: 'src/libs',
        expand: true,
        src: ['mxgraph/**/*'],
        dest: 'dist/libs'
      },
      readme: {
        expand: true,
        src: ['README.md'],
        dest: 'dist',
      },
      grafana: {
        cwd: './',
        expand: true,
        src: ['**/*', '!**/bower_components/**', '!**/node_modules/**', '!gitignore'],
        dest: 'D:/Dev/grafana-5.4.3/data/plugins/grafana-flowcharting'
      },
      sass: {
        dist: {
          options: {
            style: "expanded",
          },
          files: [
          {
            expand: true,
            cwd: "src/css/",
            src: ["*.scss"],
            dest: "dist/css/",
            ext: ".css",
          },
        ],
      },
    },
    img_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['img/**/*'],
        dest: 'dist/'
      },
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'README.md'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'copy:libs_to_dist', 'copy:sass', 'copy:readme', 'copy:img_to_dist', 'babel', 'copy:grafana']);
};
