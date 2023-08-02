
/**
 * Class to control the IDE.
 */
class IDE {

    static ART_EDITOR_ID = "art-highlighted-editor";
    static PROGRAM_EDITOR_ID = "str-highlighted-editor";
    static OUTPUT_ID = "output";

    static ART_SPEC_COOKIE = "art-specification";
    static PROGRAM_COOKIE = "sample-program";
    static ART_VERSION_COOKIE = "art-version";

    static ART_FILENAME_COOKIE = "art-specification-filename";
    static STR_FILENAME_COOKIE = "sample-program-filename";
    static OUTPUT_FILENAME_COOKIE = "output-filename";

    /**
     * Initalise the IDE with the user's settings and values from the Cookies.
     */
    static initalise() {

        // initalise the editor grid
        IDEEditorGrid.initalise();

        EditorInput.initalise(IDE.ART_EDITOR_ID);
        EditorInput.initalise(IDE.PROGRAM_EDITOR_ID);

        Output.initalise(IDE.OUTPUT_ID);

        IDE.initaliseVersionSelector();

        IDE.load();

        // get the ART syntax highlighting mapping and set within the syntax highlighter
        APIRequest.get(
            "/api/art-keywords", 
            (mapping) => {
                SyntaxHighlighter.addMapping(IDE.ART_EDITOR_ID, mapping);
                Debugger.log(
                    JSON.stringify(SyntaxHighlighter.mappings)
                );
            }
        );

    }

    /**
     * Resets the IDE. Clears the editors and output console.
     */
    static reset() {
        let text = "Are you sure you want to reset the IDE?\nThis will clear data saved in cookies!";
        if (confirm(text) == true) {
            IDE._clear();
            Cookies.delete(IDE.ART_SPEC_COOKIE);
            Cookies.delete(IDE.PROGRAM_COOKIE);

            Cookies.delete(IDE.ART_FILENAME_COOKIE);
            Cookies.delete(IDE.STR_FILENAME_COOKIE);
            Cookies.delete(IDE.OUTPUT_FILENAME_COOKIE);
        }

    }

    /**
     * Reloads the IDE as if the IDE had just been loaded.
     */
    static reload() {
        IDE._clear();
        IDE.initalise();
    }

    /**
     * Clears the editors and the output console.
     */
    static _clear() {
        EditorInput.reset(IDE.ART_EDITOR_ID);
        EditorInput.reset(IDE.PROGRAM_EDITOR_ID);

        Output.clear(IDE.OUTPUT_ID);
    }


    /**
     * Runs ART.
     */
    static run() {

        Output.startNewOutput(IDE.OUTPUT_ID);

        Debugger.log("running ART");
        var artSpecification = EditorInput.getValue(IDE.ART_EDITOR_ID);
        var sampleProgram = EditorInput.getValue(IDE.PROGRAM_EDITOR_ID);
        var postObject = {
            "art": artSpecification,
            "str": sampleProgram,
            "art-version": IDE.getVersionSelector().value
        }
        Debugger.log("calling api");
        APIRequest.post("api/run", postObject, IDE.updateOutput, IDE.artFailed);
    }

    /**
     * Updates the output console with the data from the ART api.
     *
     * @param {JSON} data The data returned from ART
     */
    static updateOutput(data) {
        var output = data.output;
        Output.addLines(IDE.OUTPUT_ID, output);
        Output.addLines(IDE.OUTPUT_ID, ["Execution Complete"]);
    }

    static artFailed() {
        Output.addLines(IDE.OUTPUT_ID, ["Failed to run ART"]);
    }

    /**
     * Changes the orientation of the IDE from the output console being below the editors to
     * the right of the editors.
     */
    static switchOrientation() {
        IDEEditorGrid.switchOrientation();
    }


    /**
     * Saves the current IDE inputs to the cookies.
     */
    static save() {
        Cookies.set(IDE.ART_SPEC_COOKIE, EditorInput.getValue(IDE.ART_EDITOR_ID));
        Cookies.set(IDE.PROGRAM_COOKIE, EditorInput.getValue(IDE.PROGRAM_EDITOR_ID));
    }

    /**
     * Loads the saved specification from the cookies.
     */
    static load() {
        EditorInput.setValue(IDE.ART_EDITOR_ID, Cookies.get(IDE.ART_SPEC_COOKIE));
        EditorInput.setValue(IDE.PROGRAM_EDITOR_ID, Cookies.get(IDE.PROGRAM_COOKIE));
    }




    static downloadARTSpec() {
        var filename = Cookies.get(IDE.ART_FILENAME_COOKIE, 'specification.art');
        filename = prompt("Enter a filename:", filename);
        if (!(filename == null)) {
            EditorInput.download(IDE.ART_EDITOR_ID, filename);
            Cookies.set(IDE.ART_FILENAME_COOKIE, filename);
        }
    }

    static downloadSampleProgram() {
        var filename = Cookies.get(IDE.STR_FILENAME_COOKIE, 'program.str');
        filename = prompt("Enter a filename:", filename);
        if (!(filename == null)) {
            EditorInput.download(IDE.PROGRAM_EDITOR_ID, filename);
            Cookies.set(IDE.STR_FILENAME_COOKIE, filename);
        }
    }

    static downloadOutput() {
        var filename = Cookies.get(IDE.OUTPUT_FILENAME_COOKIE, 'output.txt');
        filename = prompt("Enter a filename:", filename);
        if (!(filename == null)) {
            Output.download(IDE.OUTPUT_ID, filename);
            Cookies.set(IDE.OUTPUT_FILENAME_COOKIE, filename);
        }
    }




    static decreaseFontSize() {
        EditorInput.decreaseFontSize('art-highlighted-editor');
        EditorInput.decreaseFontSize('art-highlighted-editor');
        Output.decreaseFontSize('output');
    }

    static increaseFontSize() {
        EditorInput.increaseFontSize('art-highlighted-editor');
        EditorInput.increaseFontSizeFontSize('art-highlighted-editor');
        Output.increaseFontSize('output');
    }



    static getVersionSelector() {
        return document.getElementById("art-version-selector");
    }

    static updateSavedVersion() {
        Cookies.set(IDE.ART_VERSION_COOKIE, IDE.getVersionSelector().value);
    }

    static initaliseVersionSelector() {
        var version = Cookies.get(IDE.ART_VERSION_COOKIE);
        if (version == "") {
            version = "4";
        }
        IDE.getVersionSelector().value = version;
    }


}
