
/**
 * Class containing methods for controling the editor grid.
 */
class IDEEditorGrid {

    static VERTICAL_OUTPUT = "vertical-output";
    static HORIZONTAL_OUTPUT = "horizontal-output";
    static ORIENTATION_COOKIE = "ide-orientation";


    /**
     * Initalises the editor grid.
     */
    static initalise() {
        var orientation = Cookies.get(IDEEditorGrid.ORIENTATION_COOKIE, "horizontal");
        Debugger.log("Cookie set to '" + orientation + "'");
        if (orientation == "horizontal") {
            IDEEditorGrid._setHorizontalOrientation();
        } else {
            IDEEditorGrid._setVerticalOrientation();
        }
    }



    /**
     * Changes the orientation of the IDE from the output console being below the editors to
     * the right of the editors.
     */
    static switchOrientation() {
        if (IDEEditorGrid._getEditorGridClasses().contains(IDEEditorGrid.HORIZONTAL_OUTPUT)) {
            IDEEditorGrid._setVerticalOrientation();
        } else {
            IDEEditorGrid._setHorizontalOrientation();
        }
    }


    /**
     * Returns the list of classes on the editor grid.
     * 
     * @returns the list of editor grid classes
     */
    static _getEditorGridClasses() {
        return document.getElementById("editor-grid").classList;
    }


    /**
     * Sets the editor grid orientation to be vertical.
     */
    static _setVerticalOrientation() {
        IDEEditorGrid._clearOrientation();
        IDEEditorGrid._getEditorGridClasses().add(IDEEditorGrid.VERTICAL_OUTPUT);
        Cookies.set(IDEEditorGrid.ORIENTATION_COOKIE, "vertical");
        Debugger.log("Editor set to vertical orientation");
    }

    /**
     * Sets the editor grid orientation to be horizontal.
     */
    static _setHorizontalOrientation() {
        IDEEditorGrid._clearOrientation();
        IDEEditorGrid._getEditorGridClasses().add(IDEEditorGrid.HORIZONTAL_OUTPUT);
        Cookies.set(IDEEditorGrid.ORIENTATION_COOKIE, "horizontal");
        Debugger.log("Editor set to horizontal orientation");
    }

    /**
     * Removes the horizontal and vertical classes from the list of editor grid classes.
     */
    static _clearOrientation() {
        IDEEditorGrid._getEditorGridClasses().remove(IDEEditorGrid.HORIZONTAL_OUTPUT);
        IDEEditorGrid._getEditorGridClasses().remove(IDEEditorGrid.VERTICAL_OUTPUT);
    }



}