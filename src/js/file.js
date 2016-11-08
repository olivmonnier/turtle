const {dialog} = require('electron').remote
const fs = require('fs');

exports.openFile = function(editor) {
  dialog.showOpenDialog({ properties: ['openFile']}, function(filepath) {
    if (filepath) {
      var content = fs.readFileSync(filepath[0], 'utf8');

      FILE_OPEN = filepath[0];
      editor.setValue(content);
    }
  });
}
