

class IDE {


    static reset() {

        console.log("resetting IDE");

        var artSpecification = document.getElementById("art-editor-input");
        var sampleProgram = document.getElementById("str-editor-input");
        var outputElement = document.getElementById("output");

        artSpecification.value = "";
        sampleProgram.value = "";
        outputElement.innerHTML = "";

    }


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


    static updateOutput(data) {
        var output = data.output;
        var outputElement = document.getElementById("output");

        output.forEach(line => {
            outputElement.innerHTML += line + "<br />";
        });

    }



}