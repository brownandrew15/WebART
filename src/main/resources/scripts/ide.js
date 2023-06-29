

class IDE {

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

        Debugger.enable();

        console.log("running ART");

        var artSpecification = document.getElementById("art-editor-input").value;
        var sampleProgram = document.getElementById("str-editor-input").value;

        var postObject = {
            "art": artSpecification,
            "str": sampleProgram
        }

        console.log("calling api");

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
        var editorGridClasses = document.getElementById("editor-grid").classList;
        const V = "vertical-output";
        const H = "horizontal-output";

        if (editorGridClasses.contains(V)) {
            editorGridClasses.remove(V);
            editorGridClasses.add(H);
        } else if (editorGridClasses.contains(H)) {
            editorGridClasses.remove(H);
            editorGridClasses.add(V);
        } else {
            editorGridClasses.remove(V);
            editorGridClasses.remove(V);
            editorGridClasses.add(H);
        }
        console.log(editorGridClasses);
    }



}