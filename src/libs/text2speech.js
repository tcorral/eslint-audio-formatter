var q = require('q');
var say = require('say');
var temp = require('temp');
var audiosprite = require('audiosprite');

// Automatically track and cleanup files at exit
temp.track();

var text2speech = {
  audiosprite: audiosprite,
  createVoiceMessage: function (message, info, clips) {
    var deferred = q.defer();
    say.export(message, 'Alex', 0.75, info.path, function(err) {
      if (err) {
        deferred.reject(err);
      }
      deferred.resolve(clips);
    });
    return deferred.promise;
  }
};

module.exports = text2speech;
