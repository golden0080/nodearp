var exec = require('child_process').exec;

exports.entries = function(cb) {
  exec('arp -an', function(err, stdout, stderr) {
    var entries = [];
    stdout.split('\n')
      .map((i) => {
        var entry = i.split(/[ ,]+/);
        if (entry[1]) {
          const mac = entry[3].replace(/^0:/g, '00:')
            .replace(/:0:/g, ':00:')
            .replace(/:0$/g, ':00')
            .replace('<incomplete>', '');
          var interface =
            entries.push({
              ip: entry[1].replace('(', '')
                .replace(')', ''),
              mac: mac
            });
        }
      });
    return cb(entries);
  });
};
