/*
 * grunt-zlib
 * https://github.com/firehist/grunt-zlib
 *
 * Copyright (c) 2014 Benjamin Longearet
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var zlib = require('zlib');

  /**
   * Generic method to provide a zlib[method] action
   *  * Should be executed in a grunt task context *
   * @param {string} method
   */
  var processAction = function(method) {
    // Create async task
    var done = this.async();
    // Manage countdown to know when done task
    var filesNum = this.files.length;
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf("\n"));

      // Launch gzip action
      zlib[method](src, function(err, res) {
        if (err) {
          grunt.log.error(err);
        }
        // countdown to make this task DONE
        if (!--filesNum) {
          done();
        }
        // Write the destination file.
        grunt.file.write(f.dest, res);
        // Print a success message.
        grunt.log.writeln('[' + method + '] File "' + f.dest + '" created.');
      });

    });
  };

  // http://nodejs.org/api/zlib.html#zlib_class_zlib_gzip
  var availableMethod = ['gzip', 'deflate', 'deflateRaw'];

  // Programaticaly create all multiTask called as in availableMethod
  availableMethod.forEach(function (method) {
    grunt.registerMultiTask(method, 'Grunt task to manage ' + method, function() {
      processAction.call(this, method);
    });
  });

};
