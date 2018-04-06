'use babel';

import QtDebugIncludeToggler from '../lib/qt-debug-include-toggler';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('QtDebugIncludeToggler', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('qt-debug-include-toggler');
  });

  describe('when the qt-debug-include-toggler:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.qt-debug-include-toggler')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'qt-debug-include-toggler:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.qt-debug-include-toggler')).toExist();

        let qtDebugIncludeTogglerElement = workspaceElement.querySelector('.qt-debug-include-toggler');
        expect(qtDebugIncludeTogglerElement).toExist();

        let qtDebugIncludeTogglerPanel = atom.workspace.panelForItem(qtDebugIncludeTogglerElement);
        expect(qtDebugIncludeTogglerPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'qt-debug-include-toggler:toggle');
        expect(qtDebugIncludeTogglerPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.qt-debug-include-toggler')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'qt-debug-include-toggler:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let qtDebugIncludeTogglerElement = workspaceElement.querySelector('.qt-debug-include-toggler');
        expect(qtDebugIncludeTogglerElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'qt-debug-include-toggler:toggle');
        expect(qtDebugIncludeTogglerElement).not.toBeVisible();
      });
    });
  });
});
