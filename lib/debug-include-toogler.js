'use babel';

import DebugIncludeTooglerView from './debug-include-toogler-view';
import { CompositeDisposable } from 'atom';

export default {

  debugIncludeTooglerView: null,
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
    this.debugIncludeTooglerView = new DebugIncludeTooglerView(state.debugIncludeTooglerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.debugIncludeTooglerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'debug-include-toogler:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.debugIncludeTooglerView.destroy();
  },

  serialize() {
    return {
      debugIncludeTooglerViewState: this.debugIncludeTooglerView.serialize()
    };
  },

  toggle() {
    var editor = atom.workspace.getActiveTextEditor()
    var include = {
      "description": "Define the include string.",
      "type": "string",
      "default": "#include <QtCore/QDebug>"
    };
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
