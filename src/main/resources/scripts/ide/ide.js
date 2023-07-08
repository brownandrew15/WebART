

class IDE {

    static ART_EDITOR_ID = "art-editor-input";
    static PROGRAM_EDITOR_ID = "str-editor-input";
    static OUTPUT_ID = "output";

    /**
     * Initalise the IDE with the user's settings and values from the Cookies.
     */
    static initalise() {

        // initalise the editor grid
        IDEEditorGrid.initalise();

    }

    /**
     * Resets the IDE. Clears the editors and output console.
     */
    static reset() {

        Debugger.log("resetting IDE");

        var artSpecification = document.getElementById(IDE.ART_EDITOR_ID);
        var sampleProgram = document.getElementById(IDE.PROGRAM_EDITOR_ID);
        artSpecification.value = "";
        sampleProgram.value = "";

        Output.clear(IDE.OUTPUT_ID);

    }

    /**
     * Runs ART.
     */
    static run() {

        Output.startNewOutput(IDE.OUTPUT_ID);

        Debugger.log("running ART");
        var artSpecification = document.getElementById(IDE.ART_EDITOR_ID).value;
        var sampleProgram = document.getElementById(IDE.PROGRAM_EDITOR_ID).value;
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
        Output.addLines(IDE.OUTPUT_ID, output);
    }

    /**
     * Changes the orientation of the IDE from the output console being below the editors to
     * the right of the editors.
     */
    static switchOrientation() {
        IDEEditorGrid.switchOrientation();
    }



}