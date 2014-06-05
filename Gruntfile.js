/*
 * grunt-zlib
 * https://github.com/firehist/grunt-gzip
 *
 * Copyright (c) 2014 Benjamin Longearet
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    gzip: {
      default_options: {
        files: {
          'tmp/gzip.gz': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },
    deflate: {
      default_options: {
        files: {
          'tmp/deflate': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },
    deflateRaw: {
      default_options: {
        files: {
          'tmp/deflateRaw': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    // Generate CHANGELOG
    changelog: {
      version: null,
      to: 'HEAD',
      file: 'CHANGELOG.md',
      subtitle: '',
      log: console.log.bind(console)
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'gzip', 'deflate', 'deflateRaw', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
