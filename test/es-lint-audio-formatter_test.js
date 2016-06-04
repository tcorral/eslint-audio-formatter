'use strict';

var grunt = require('grunt');
var path = require('path');
var cwd = process.cwd();
var fs = require('fs');
var CLIEngine = require("eslint").CLIEngine;

exports['es-lint-audio-formatter'] = {
  analyzingFileWithoutErrors: function(test) {
    var input = cwd + '/test/data/without-errors.js';
    var expectedFile = cwd + '/test/expected/without-errors.mp3';
    var cli = new CLIEngine({
      envs: ["browser", "mocha"],
      useEslintrc: false
    });

    test.expect(1);

    fs.readFile(input, 'utf8', function (err, code) {
      if(err) {
        return test.done();
      }
      var formatter = cli.getFormatter(cwd + '/src/index.js');
      var report = cli.executeOnText(code);

      formatter(report.results)
        .then(function(outputFile) {
          fs.readFile(expectedFile, function(err, data) {
            fs.readFile(outputFile, function(err, data2) {
              console.log(data.length);
              console.log(data2.length);
              test.ok(data.equals(data2), 'Check that both files the generated and the expected are the same.');
              test.done();
            });
          });
        });
    });
  },
  analyzingFileWithSyntaxErrors: function(test) {
    var input = cwd + '/test/data/with-syntax-errors.js';
    var expectedFile = cwd + '/test/expected/with-syntax-errors.mp3';
    var cli = new CLIEngine({
      envs: ["browser", "mocha"],
      useEslintrc: false
    });

    test.expect(1);

    fs.readFile(input, 'utf8', function (err, code) {
      if(err) {
        return test.done();
      }
      var formatter = cli.getFormatter(cwd + '/src/index.js');
      var report = cli.executeOnText(code);

      formatter(report.results)
        .then(function(outputFile) {
          fs.readFile(expectedFile, function(err, data) {
            fs.readFile(outputFile, function(err, data2) {
              console.log(data.length);
              console.log(data2.length);
              test.ok(data.equals(data2), 'Check that both files the generated and the expected are the same.');
              test.done();
            });
          });
        });
    });

  }
};
