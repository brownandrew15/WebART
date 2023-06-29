

class IDE {


    static VERTICAL_OUTPUT = "vertical-output";
    static HORIZONTAL_OUTPUT = "horizontal-output";
    static ORIENTATION_COOKIE = "ide-orientation";

    /**
     * Initalise the IDE with the user's settings and values from the Cookies.
     */
    static initalise() {

        // turn the debugger on
        Debugger.enable();

        // check for an orientation cookie
        var orientation = Cookies.get(IDE.ORIENTATION_COOKIE, "horizontal");
        Debugger.log("Cookie set to " + orientation);
        if (orientation == "horizontal") {
            IDE._setHorizontalOrientation();
        } else {
            IDE._setVerticalOrientation();
        }



    }

    /**
     * Resets the IDE. Clears the editors and output console.
     */
    static reset() {

        console.log("resetting IDE");

        var artSpecification = document.getElementById("art-editor-input");
        var sampleProgram = document.getElementById("str-editor-input");
        var outputElement = document.getElementById("output");

        artSpecification.value = "";
        sampleProgram.value = "";
        outputElement.innerHTML = "";

    }

    /**
     * Runs ART.
     */
    static run() {
        Debugger.log("running ART");
        var artSpecification = document.getElementById("art-editor-input").value;
        var sampleProgram = document.getElementById("str-editor-input").value;
        var postObject = {
            "art": artSpecification,
            "str": sampleProgram
        }
        Debugger.log("calling api");
        APIRequest.post("api/run", postObject, IDE.updateOutput);
    }

    /**
     * Updates the output console with the data from the ART api.
     * 
     * @param {JSON} data The data returned from ART
     */
    static updateOutput(data) {
        var output = data.output;
        var outputElement = document.getElementById("output");
        output.forEach(line => {
            outputElement.innerHTML += line + "<br />";
        });
    }

    /**
     * Changes the orientation of the IDE from the output console being below the editors to
     * the right of the editors.
     */
    static switchOrientation() {
        if (IDE._getEditorGridClasses().contains(IDE.HORIZONTAL_OUTPUT)) {
            IDE._setVerticalOrientation();
        } else {
            IDE._setHorizontalOrientation();
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
        IDE._clearOrientation();
        IDE._getEditorGridClasses().add(IDE.VERTICAL_OUTPUT);
        Cookies.set(IDE.ORIENTATION_COOKIE, "vertical");
        Debugger.log("Editor set to vertical orientation");
    }

    /**
     * Sets the editor grid orientation to be horizontal.
     */
    static _setHorizontalOrientation() {
        IDE._clearOrientation();
        IDE._getEditorGridClasses().add(IDE.HORIZONTAL_OUTPUT);
        Cookies.set(IDE.ORIENTATION_COOKIE, "horizontal");
        Debugger.log("Editor set to horizontal orientation");
    }

    /**
     * Removes the horizontal and vertical classes from the list of editor grid classes.
     */
    static _clearOrientation() {
        IDE._getEditorGridClasses().remove(IDE.HORIZONTAL_OUTPUT);
        IDE._getEditorGridClasses().remove(IDE.VERTICAL_OUTPUT);
    }



}