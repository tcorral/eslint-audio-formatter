'use strict';

var grunt = require('grunt');
var path = require('path');
var cwd = process.cwd();
var fs = require('fs');
var q = require('q');
var CLIEngine = require("eslint").CLIEngine;
var cli = new CLIEngine({
  envs: ["browser", "mocha"],
  useEslintrc: false
});
var formatter = cli.getFormatter(cwd + '/src/index.js');
var code = fs.readFileSync(cwd + '/test/data/without-errors.js', 'utf8');
var code2 = fs.readFileSync(cwd + '/test/data/with-syntax-errors.js', 'utf8');

var report = cli.executeOnText(code);
var report2 = cli.executeOnText(code2);

function generateFiles() {
  var deferred = q.defer();
  formatter(report.results)
    .then(function(outputFile1) {
      var withoutErrorsBuffer = fs.readFileSync(outputFile1);
      formatter(report2.results)
        .then(function(outputFile2) {
            var withSyntaxErrorsBuffer = fs.readFileSync(outputFile2);
            deferred.resolve({
              withoutErrors: withoutErrorsBuffer,
              withSyntaxErrors: withSyntaxErrorsBuffer
            });
          },
          function(err) {
            deferred.reject(err);
          });
    });
  return deferred.promise;
}

exports['es-lint-audio-formatter'] = {
  analyzingFileWithoutErrors: function(test) {
    generateFiles()
      .then(function(controlBuffers) {
        var withoutErrorsBufferControl = controlBuffers.withoutErrors;

        test.expect(1);

        generateFiles()
          .then(function(buffers) {
            test.ok(withoutErrorsBufferControl.equals(buffers.withoutErrors), 'Check that both files the generated and the expected are the same.');
            test.done();
          }, function(err) {
            test.done();
          });
      });
  },
  analyzingFileWithSyntaxErrors: function(test) {
    generateFiles()
      .then(function(controlBuffers) {
        var withoutErrorsBufferControl = controlBuffers.withSyntaxErrors;

        test.expect(1);

        generateFiles()
          .then(function(buffers) {
            test.ok(withoutErrorsBufferControl.equals(buffers.withSyntaxErrors), 'Check that both files the generated and the expected are the same.');
            test.done();
          }, function(err) {
            test.done();
          });
      });
  }
};
