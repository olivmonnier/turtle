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

exports.saveMockup = function(editor) {
  if (FILE_OPEN) {
    fs.writeFileSync(FILE_OPEN, editor.getValue());
  } else {
    dialog.showSaveDialog(function(filepath) {
      if (filepath) {
        FILE_OPEN = filepath;
        fs.writeFileSync(filepath, editor.getValue());
      }
    });
  }
}

exports.exportMockup = function(content) {
  dialog.showSaveDialog(function(filepath) {
    if (filepath) {
      fs.writeFileSync(filepath, content);
    }
  });
}
