module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },
        watch: {
            server: {
                files: ['*.js', 'json/*.json']
            },
            compass: {
                files: ['src/scss/*.scss'],
                tasks: ['compass']
            }
        },
        nodemon: {
          all: {
            script: 'server.js'
          }
        },
        'node-inspector': {
            dev: {}
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'node-inspector', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            prod: {
                tasks: ['nodemon', 'watch']
            }
        },
        compass: {
            all: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-contrib-compass');


    grunt.registerTask('build', ['compass']);
    grunt.registerTask('default', ['env:dev', 'build', 'concurrent:dev']);
    grunt.registerTask('production', ['env:prod', 'build', 'concurrent:prod']);
    grunt.registerTask('sub:build', ['build']);
    grunt.registerTask('sub:watch', ['watch']);


}
