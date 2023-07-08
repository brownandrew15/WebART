
/**
 * Class to manage the output console.
 */
class Output {

    /**
     * Adds a single line to the console, appends a new line.
     * 
     * @param {String} outputId the output to append the line to
     * @param {String} line the content to append to the output
     */
    static addLine(outputId, line) {
        Debugger.log("Adding line: " + line);
        var content = Output._getOutputContent(outputId);
        content.innerHTML += Output._escapeHtml(line) + "\n";
        Output.scrollToBottom(outputId);
    }

    /**
     * Appends multiple lines to the console.
     * 
     * @param {String} outputId the output to append to
     * @param {Array} lines the lines to append
     */
    static addLines(outputId, lines) {
        Debugger.log("Adding lines: " + lines);
        for (var i=0; i<lines.length; i++) {
            Output.addLine(outputId, lines[i])
        }
    }

    /**
     * Clears the output console.
     * 
     * @param {String} outputId the output to clear
     */
    static clear(outputId) {
        Debugger.log("Clearing output console");
        Output._getOutputContent(outputId).innerHTML = "";
    }

    /**
     * Scrolls the output to the last line that was appended.
     * 
     * @param {String} outputId the output to scroll
     */
    static scrollToBottom(outputId) {
        var output = document.getElementById(outputId);
        output.scrollTop = output.scrollHeight;
    }

    /**
     * Prints a seperator between the previous execution and the next.
     * Includes the date and time of the execution.
     * 
     * @param {String} outputId the output start
     */
    static startNewOutput(outputId) {
        var timestamp = new Date().toLocaleString();
        Output.addLine(outputId, "");
        Output.addLine(outputId, "Execution at " + timestamp + ":");

    }



    /**
     * Returns the content element for the output.
     * 
     * @param {String} outputId the output containing the content
     * @returns {HTMLElement} the content element
     */
    static _getOutputContent(outputId){
        var output = document.getElementById(outputId);
        return Output._findElementWithId(output.children, "content");
    }


    /**
     * Returns the child from the given element with the id.
     * 
     * @param {HTMLCollection} elements the elements to search in
     * @param {String} id the id of the element to find
     * @returns {HTMLElement} the element
     */
    static _findElementWithId(elements, id) {
        var i = 0;
        while (!(elements[i].id == id)) {
            Debugger.log("Current element is a " + elements[i] + " and has id " + elements[i].id);
            i++;
        }
        return elements[i];
    };

    /**
     * Escapes HTML in a string.
     * 
     * @param {String} unsafe the string to escape
     * @returns {String} the escaped string
     */
    static _escapeHtml(unsafe) {
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }



}