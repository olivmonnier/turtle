const nunjucks = require('nunjucks');
const fileSystem = require('./file');
const CodeMirror = require('codemirror');
const Config = require('electron-config');
const config = new Config();

function nunjucksConfig() {
  nunjucksOptions = { autoescape: true };
  nunjucks.configure(TEMPLATES_PATH, nunjucksOptions);
}

module.exports = function(editor, output) {
  $(document).on('ready', function() {
    nunjucksConfig();
  });

  $(document).on('show.bs.modal', '#modal-settings', function() {
    $('#input-template-path').val(TEMPLATES_PATH);
  });

  $(document).on('click', '#modal-settings .btn-primary', function() {
    TEMPLATES_PATH = $('#input-template-path').val();
    config.set('templatePath', TEMPLATES_PATH);
    $('#modal-settings').modal('hide');
    nunjucksConfig();
    CodeMirror.signal(editor, 'change');
  });

  $(document).on('click', '.btn-save-mockup', function() {
    fileSystem.saveMockup(editor);
  });

  $(document).on('click', '.btn-export-mockup', function() {
    fileSystem.exportMockup(nunjucks.renderString(editor.getValue()));
  });

  $(document).on('click', '.btn-open', function() {
    fileSystem.openFile(editor);
  });

  editor.on('change', function() {
    output.setValue(nunjucks.renderString(editor.getValue()));
  });
}
