'use babel';

import QtDebugIncludeTogglerView from './qt-debug-include-toggler-view';
import { CompositeDisposable } from 'atom';

export default {

  qtDebugIncludeTogglerView: null,
  modalPanel: null,
  subscriptions: null,
  config: {
    "include": {
      "description": "Define the include string.",
      "type": "string",
      "default": "#include <QtCore/QDebug>"
    }
  },

  activate(state) {
    this.qtDebugIncludeTogglerView = new QtDebugIncludeTogglerView(state.qtDebugIncludeTogglerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.qtDebugIncludeTogglerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'qt-debug-include-toggler:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.qtDebugIncludeTogglerView.destroy();
  },

  serialize() {
    return {
      qtDebugIncludeTogglerViewState: this.qtDebugIncludeTogglerView.serialize()
    };
  },

  toggle() {
    var editor = atom.workspace.getActiveTextEditor()
    var include = atom.config.get('qt-debug-include-toggler.include')
    if (editor.getPath())
    var text = editor.getText()
    if (text.startsWith(include)) {
      var lines = text.split('\n');
      lines.splice(0, 1);
      editor.setText(lines.join('\n'));
    } else
      editor.setText(include + '\n' + text);

    return false;
  }

};
