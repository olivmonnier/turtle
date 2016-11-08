// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const Config = require('electron-config');
const config = new Config();
const CodeMirror = require('codemirror');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/html-hint');
window.FILE_OPEN = null;
window.TEMPLATES_PATH = config.get('templatePath') || process.cwd();
const events = require('./src/js/events');

const editor = CodeMirror(document.getElementById('editor'), {
  mode: 'htmlmixed',
  theme: 'material',
  lineNumbers: true,
  autofocus: true,
  tabSize: 2,
  extraKeys: {"Ctrl-Space": "autocomplete"}
});
const output = CodeMirror(document.getElementById('output'), {
  mode: 'htmlmixed',
  theme: 'material',
  lineNumbers: true,
  tabSize: 2,
  readOnly: true,
  extraKeys: {"Ctrl-Space": "autocomplete"}
});

if(typeof(window) !== 'undefined') {
  $('[data-toggle="tooltip"]').tooltip();
  events(editor, output);
}
