var temp = require('temp');
var q = require('q');
var text2speech = require('../src/libs/text2speech');
var path = require('path');

module.exports = function (report) {
  var deferred = q.defer();
  var errorCount = 0;
  var warningCount = 0;
  var messages = [];
  var clips = [];
  var promises = [];
  report.forEach(function (fileReport) {
    var outputFileName = path.basename(fileReport.filePath, '.js');
    var filePath = path.dirname(fileReport.filePath);
    var filePathOutput = path.join(filePath, '..', 'mp3-report-output', outputFileName + '.mp3');
    errorCount += fileReport.errorCount;
    warningCount += fileReport.warningCount;
    fileReport.messages.forEach(function (objMessage) {
      messages.push(objMessage.message);
    });

    if(messages.length === 0) {
      messages.push('Nice. You did a good job!');
    } else {
      messages.unshift('Really? Are you kidding me? You have ' + errorCount + ' errors in your code and ' + warningCount + ' warnings. Listen what you did wrong!;');
    }

    messages.forEach(function (message) {
      var info = temp.openSync({prefix: "jssl", suffix: ".wav"});
      clips.push(info.path);
      promises.push(text2speech.createVoiceMessage(message, info, clips));
    });

    q.all(promises)
      .then(
        function(responses) {
          var opts = { output: filePathOutput.replace('.mp3', ''), gap: -2, export: 'mp3'};
          var clips = responses[responses.length - 1];
          text2speech.audiosprite(clips, opts, function(err) {
            deferred.resolve(filePathOutput);
          });
        }, function (error) {
          deferred.reject(error);
        });
  });

  return deferred.promise;
};
